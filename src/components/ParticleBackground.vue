<script setup>
/**
 * ParticleBackground — 全站 canvas 粒子背景
 *
 * 由 files/js/ixbg.js 移植而來，三個核心步驟不變：
 *   1. 狀態：一個陣列，每個元素描述一顆粒子（位置、速度、半徑）
 *   2. update()：每幀改變狀態（飄浮、撞邊界反彈、被滑鼠吸引）
 *   3. draw()：每幀清空畫布並依狀態重畫
 *
 * 與原版的差異：舞台從側邊欄改成整個視窗、支援 devicePixelRatio、
 * 配色跟著日／夜模式切換，並尊重 prefers-reduced-motion。
 *
 * 效能重點：原版每幀對每顆粒子設定 ctx.filter = 'blur(...)'。在側邊欄那種
 * 小畫布還能接受，但全螢幕時每次設定 filter 都會讓瀏覽器配置一張與整個
 * 畫布同尺寸的暫存圖層再做模糊，一幀幾十次直接把主執行緒吃光（實測 4 FPS）。
 * 這裡改成：模糊只在建立粒子時做一次，烘焙成小張 sprite，每幀只 drawImage。
 */
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useTheme } from '../composables/useTheme'

const MIN_RADIUS = 6
const MAX_RADIUS = 28
const GRAVITY_RANGE = 160
const GRAVITY_PULL = 0.03
const BLUR_BASE = 3
const DENSITY_DIVISOR = 42000
const MIN_COUNT = 16
const MAX_COUNT = 46
const MIN_LINE_WIDTH = 0.35
// 全螢幕畫布在 DPR 3 的螢幕上像素量是 DPR 2 的 2.25 倍，收益卻看不太出來
const MAX_DPR = 2

const PALETTE = {
  light: {
    circle: 'rgba(148, 163, 184, 0.75)',
    line: '100, 116, 139',
    lineAlpha: 0.7,
  },
  dark: {
    circle: 'rgba(130, 175, 240, 0.8)',
    line: '130, 175, 240',
    lineAlpha: 0.75,
  },
}

const canvasRef = ref(null)
const { theme } = useTheme()

let ctx = null
let rafId = null
let width = 0
let height = 0
let dpr = 1
let dusts = []

// 半徑取整數，模糊圈就只有 MIN_RADIUS ~ MAX_RADIUS 這幾種，可以共用 sprite
let spriteCache = new Map()

const mouse = { x: null, y: null }

function random(min, max) {
  return Math.random() * (max - min) + min
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 把一顆模糊光暈圈預先畫在離螢幕小畫布上。
 * 模糊半徑與線寬都只跟 radius 有關，所以同半徑的粒子可以共用同一張。
 */
function buildSprite(radius, color) {
  const blur = Math.abs(radius / 5 - BLUR_BASE)
  const lineWidth = Math.max(MIN_LINE_WIDTH, Math.abs(radius / 5 - 4))
  // 模糊會往外暈開，留 3 倍 blur 的邊界才不會被裁掉
  const pad = Math.ceil(blur * 3 + lineWidth / 2 + 2)
  const size = (radius + pad) * 2

  const sprite = document.createElement('canvas')
  sprite.width = Math.ceil(size * dpr)
  sprite.height = Math.ceil(size * dpr)

  const sctx = sprite.getContext('2d')
  sctx.scale(dpr, dpr)
  if (blur > 0.05) sctx.filter = `blur(${blur.toFixed(2)}px)`
  sctx.beginPath()
  sctx.arc(size / 2, size / 2, radius, 0, 2 * Math.PI)
  sctx.lineWidth = lineWidth
  sctx.strokeStyle = color
  sctx.stroke()

  return { canvas: sprite, size, offset: size / 2 }
}

function spriteFor(radius) {
  const cached = spriteCache.get(radius)
  if (cached) return cached

  const palette = theme.value === 'dark' ? PALETTE.dark : PALETTE.light
  const sprite = buildSprite(radius, palette.circle)
  spriteCache.set(radius, sprite)
  return sprite
}

// 換主題或換 DPR 時整批重畫，下一幀會依需要重新烘焙
function invalidateSprites() {
  spriteCache = new Map()
}

function particleCount(w, h) {
  const raw = Math.round((w * h) / DENSITY_DIVISOR)
  return Math.min(MAX_COUNT, Math.max(MIN_COUNT, raw))
}

function createDust(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    inertiaX: random(-0.55, 0.55), // 每幀的位移量
    inertiaY: random(-0.55, 0.55),
    radius: randomInt(MIN_RADIUS, MAX_RADIUS),
    rate: 0, // 與滑鼠的接近程度，0 ~ 1
    distance: Infinity,
  }
}

/** 視窗尺寸變化時保留既有粒子，只補齊／裁掉數量並把位置夾回畫面內 */
function syncDusts() {
  const target = particleCount(width, height)

  if (dusts.length > target) {
    dusts = dusts.slice(0, target)
  } else {
    while (dusts.length < target) {
      dusts = [...dusts, createDust(width, height)]
    }
  }

  dusts.forEach((dust) => {
    dust.x = Math.min(Math.max(dust.x, 0), width)
    dust.y = Math.min(Math.max(dust.y, 0), height)
  })
}

// canvas 的 width/height 屬性是「畫布解析度」，CSS 的 width/height 才是顯示尺寸。
// 兩者要分開設定，否則在高解析度螢幕上會糊掉。
function resize(canvas) {
  const nextDpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
  if (nextDpr !== dpr) {
    dpr = nextDpr
    invalidateSprites() // sprite 是照 DPR 烘焙的，換螢幕就要重做
  }
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = Math.round(width * dpr)
  canvas.height = Math.round(height * dpr)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function update() {
  dusts.forEach((dust) => {
    dust.x += dust.inertiaX
    dust.y += dust.inertiaY

    // 撞到邊界就把速度反向
    if (dust.x > width || dust.x < 0) dust.inertiaX *= -1
    if (dust.y > height || dust.y < 0) dust.inertiaY *= -1

    if (mouse.x === null) {
      dust.rate = 0
      dust.distance = Infinity
      return
    }

    // 兩點距離：畢氏定理
    const diffX = dust.x - mouse.x
    const diffY = dust.y - mouse.y
    const distance = Math.sqrt(diffX * diffX + diffY * diffY)
    dust.distance = distance

    if (distance < GRAVITY_RANGE) {
      dust.x -= GRAVITY_PULL * diffX
      dust.y -= GRAVITY_PULL * diffY
    }

    // 越靠近 rate 越接近 1，用來控制線的粗細與濃淡
    dust.rate = Math.max(0, (GRAVITY_RANGE - distance) / GRAVITY_RANGE)
  })
}

function draw() {
  const palette = theme.value === 'dark' ? PALETTE.dark : PALETTE.light

  ctx.clearRect(0, 0, width, height)

  // 滑鼠連線：先一次畫完，省下每顆粒子切換 strokeStyle 以外的狀態
  if (mouse.x !== null) {
    dusts.forEach((dust) => {
      if (dust.distance >= GRAVITY_RANGE) return
      ctx.beginPath()
      ctx.moveTo(mouse.x, mouse.y)
      ctx.lineTo(dust.x, dust.y)
      ctx.lineWidth = Math.max(0.2, dust.rate / 2)
      // 用樣板字串包住數字運算，避免字串拼接產生 "0.30.5" 這種無效顏色
      ctx.strokeStyle = `rgba(${palette.line}, ${(dust.rate * palette.lineAlpha).toFixed(2)})`
      ctx.stroke()
    })
  }

  // 光暈圈：模糊早就烘焙在 sprite 裡了，這裡只是把圖貼上去
  dusts.forEach((dust) => {
    const sprite = spriteFor(dust.radius)
    ctx.drawImage(
      sprite.canvas,
      dust.x - sprite.offset,
      dust.y - sprite.offset,
      sprite.size,
      sprite.size,
    )
  })
}

function loop() {
  update()
  draw()
  rafId = requestAnimationFrame(loop)
}

function onPointerMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function onPointerLeave() {
  mouse.x = null
  mouse.y = null
}

function onResize() {
  if (!canvasRef.value) return
  resize(canvasRef.value)
  syncDusts()
}

let reducedMotion = null

function onMotionPreferenceChange() {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = null

  if (reducedMotion.matches) {
    draw() // 靜態呈現，不跑動畫迴圈
  } else {
    loop()
  }
}

// sprite 把顏色一起烘焙進去了，所以換日／夜模式必須整批重做
watch(theme, () => {
  if (!ctx) return
  invalidateSprites()
  if (!rafId) draw() // 減少動態模式沒有動畫迴圈，得手動補畫一次
})

onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')

  resize(canvas)
  dusts = Array.from({ length: particleCount(width, height) }, () =>
    createDust(width, height),
  )

  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.addEventListener('change', onMotionPreferenceChange)
  onMotionPreferenceChange()

  window.addEventListener('mousemove', onPointerMove, { passive: true })
  window.addEventListener('mouseout', onPointerLeave)
  window.addEventListener('blur', onPointerLeave)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
  reducedMotion?.removeEventListener('change', onMotionPreferenceChange)
  window.removeEventListener('mousemove', onPointerMove)
  window.removeEventListener('mouseout', onPointerLeave)
  window.removeEventListener('blur', onPointerLeave)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <canvas ref="canvasRef" class="particle-canvas" aria-hidden="true" />
</template>

<style scoped>
.particle-canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
}
</style>
