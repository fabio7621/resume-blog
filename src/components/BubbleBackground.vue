<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const canvasRef = ref(null)
let animationId = null
let bubbles = []
let ctx = null
const mouse = { x: -9999, y: -9999, active: false }

const BUBBLE_COUNT = 28
const MOUSE_RADIUS = 140
const REPEL_STRENGTH = 0.6
const TETHER_RADIUS = 170
const MAX_TETHER = 6
const TETHER_TARGET = 95

let tetheredCount = 0
let releaseFlash = 0
let releaseFlashX = 0
let releaseFlashY = 0

function rand(min, max) {
  return Math.random() * (max - min) + min
}

function createBubble(width, height) {
  const radius = rand(12, 60)
  return {
    x: rand(0, width),
    y: rand(0, height),
    r: radius,
    baseR: radius,
    vx: rand(-0.25, 0.25),
    vy: rand(-0.5, -0.15),
    hue: rand(190, 260),
    alpha: rand(0.18, 0.42),
    tethered: false,
    popping: false,
    popLife: 1,
    popDelay: 0,
  }
}

function respawnBubble(b, w, h) {
  const fresh = createBubble(w, h)
  Object.assign(b, fresh)
  b.y = h + fresh.r + rand(10, 80)
  b.x = rand(0, w)
}

function attemptTether() {
  if (!mouse.active || tetheredCount >= MAX_TETHER) return
  for (const b of bubbles) {
    if (b.tethered) continue
    const dx = b.x - mouse.x
    const dy = b.y - mouse.y
    if (Math.hypot(dx, dy) < TETHER_RADIUS) {
      b.tethered = true
      tetheredCount++
      if (tetheredCount >= MAX_TETHER) break
    }
  }
}

function releaseAll() {
  releaseFlashX = mouse.x
  releaseFlashY = mouse.y
  let stagger = 0
  for (const b of bubbles) {
    if (!b.tethered) continue
    const dx = b.x - releaseFlashX
    const dy = b.y - releaseFlashY
    const dist = Math.hypot(dx, dy) || 1
    const speed = rand(1.1, 2.2)
    b.vx = (dx / dist) * speed
    b.vy = (dy / dist) * speed - 0.4
    b.tethered = false
    b.popping = true
    b.popLife = 1
    b.popDelay = stagger
    stagger += rand(2, 5)
  }
  tetheredCount = 0
  releaseFlash = 1
}

function isDarkMode() {
  return document.documentElement.classList.contains('dark')
}

function resize(canvas) {
  const dpr = window.devicePixelRatio || 1
  const w = window.innerWidth
  const h = window.innerHeight
  canvas.width = w * dpr
  canvas.height = h * dpr
  canvas.style.width = `${w}px`
  canvas.style.height = `${h}px`
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.scale(dpr, dpr)
}

function init(canvas) {
  ctx = canvas.getContext('2d')
  resize(canvas)
  bubbles = Array.from({ length: BUBBLE_COUNT }, () =>
    createBubble(window.innerWidth, window.innerHeight),
  )
}

function step() {
  const w = window.innerWidth
  const h = window.innerHeight
  ctx.clearRect(0, 0, w, h)

  const dark = isDarkMode()

  attemptTether()
  if (tetheredCount >= MAX_TETHER) releaseAll()

  for (const b of bubbles) {
    b.x += b.vx
    b.y += b.vy

    if (b.popping) {
      if (b.popDelay > 0) {
        b.popDelay--
      } else {
        b.popLife -= 0.022
        b.r = b.baseR * (1 + (1 - b.popLife) * 0.35)
        b.vx *= 0.96
        b.vy *= 0.96
        if (b.popLife <= 0) {
          respawnBubble(b, w, h)
        }
      }
    } else if (b.tethered && mouse.active) {
      const dx = mouse.x - b.x
      const dy = mouse.y - b.y
      const dist = Math.hypot(dx, dy) || 1
      const diff = dist - TETHER_TARGET
      const force = diff * 0.006
      b.vx += (dx / dist) * force
      b.vy += (dy / dist) * force
      b.vx *= 0.9
      b.vy *= 0.9
      b.r += (b.baseR * 1.15 - b.r) * 0.12
    } else if (mouse.active) {
      const dx = b.x - mouse.x
      const dy = b.y - mouse.y
      const dist = Math.hypot(dx, dy)
      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * REPEL_STRENGTH
        b.x += (dx / dist) * force * 6
        b.y += (dy / dist) * force * 6
        b.r = b.baseR * (1 + force * 0.4)
      } else {
        b.r += (b.baseR - b.r) * 0.08
      }
    } else {
      b.r += (b.baseR - b.r) * 0.08
    }

    if (b.y + b.r < 0) {
      b.y = h + b.r
      b.x = rand(0, w)
    }
    if (b.x + b.r < 0) b.x = w + b.r
    if (b.x - b.r > w) b.x = -b.r

    const lifeMult = b.popping ? Math.max(0, b.popLife) : 1
    const a = b.alpha * lifeMult

    if (dark) {
      const strokeAlpha = a * 0.9
      ctx.strokeStyle = `hsla(0, 0%, 90%, ${strokeAlpha})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
      ctx.stroke()

      ctx.fillStyle = `hsla(0, 0%, 100%, ${strokeAlpha * 0.9})`
      ctx.beginPath()
      ctx.arc(b.x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.08, 0, Math.PI * 2)
      ctx.fill()
    } else {
      const grad = ctx.createRadialGradient(
        b.x - b.r * 0.3,
        b.y - b.r * 0.3,
        b.r * 0.1,
        b.x,
        b.y,
        b.r,
      )
      grad.addColorStop(0, `hsla(${b.hue}, 80%, 80%, ${a + 0.2 * lifeMult})`)
      grad.addColorStop(0.7, `hsla(${b.hue}, 80%, 70%, ${a})`)
      grad.addColorStop(1, `hsla(${b.hue}, 80%, 70%, 0)`)

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = `hsla(${b.hue}, 90%, 85%, ${a * 0.6})`
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.fillStyle = `hsla(${b.hue}, 100%, 95%, ${a * 0.8})`
      ctx.beginPath()
      ctx.arc(b.x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.18, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  if (mouse.active && tetheredCount > 0) {
    ctx.save()
    ctx.lineWidth = 1.1
    ctx.setLineDash([5, 5])
    for (const b of bubbles) {
      if (!b.tethered) continue
      const dx = b.x - mouse.x
      const dy = b.y - mouse.y
      const dist = Math.hypot(dx, dy)
      const fade = Math.max(0.2, 1 - dist / 320)
      ctx.strokeStyle = dark
        ? `hsla(0, 0%, 92%, ${fade * 0.55})`
        : `hsla(${b.hue}, 75%, 65%, ${fade * 0.7})`
      ctx.beginPath()
      ctx.moveTo(mouse.x, mouse.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
    }
    ctx.restore()

    const cursorR = 3 + tetheredCount * 1.6
    ctx.fillStyle = dark
      ? `hsla(0, 0%, 100%, ${0.35 + tetheredCount * 0.08})`
      : `hsla(220, 80%, 70%, ${0.35 + tetheredCount * 0.08})`
    ctx.beginPath()
    ctx.arc(mouse.x, mouse.y, cursorR, 0, Math.PI * 2)
    ctx.fill()

    ctx.strokeStyle = dark
      ? `hsla(0, 0%, 100%, ${0.25 + tetheredCount * 0.06})`
      : `hsla(220, 80%, 70%, ${0.25 + tetheredCount * 0.06})`
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(mouse.x, mouse.y, cursorR + 4 + tetheredCount, 0, Math.PI * 2)
    ctx.stroke()
  }

  if (releaseFlash > 0) {
    const radius = 6 + (1 - releaseFlash) * 22
    ctx.strokeStyle = dark
      ? `hsla(0, 0%, 100%, ${releaseFlash * 0.25})`
      : `hsla(220, 70%, 75%, ${releaseFlash * 0.28})`
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(releaseFlashX, releaseFlashY, radius, 0, Math.PI * 2)
    ctx.stroke()
    releaseFlash *= 0.82
    if (releaseFlash < 0.02) releaseFlash = 0
  }

  animationId = requestAnimationFrame(step)
}

function onMouseMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
  mouse.active = true
}

function onMouseLeave() {
  mouse.active = false
}

function onClick(e) {
  for (let i = 0; i < 4; i++) {
    const b = createBubble(window.innerWidth, window.innerHeight)
    b.x = e.clientX + rand(-20, 20)
    b.y = e.clientY + rand(-20, 20)
    b.vy = rand(-1.2, -0.6)
    b.vx = rand(-0.6, 0.6)
    bubbles.push(b)
  }
  if (bubbles.length > BUBBLE_COUNT + 40) {
    bubbles.splice(0, bubbles.length - (BUBBLE_COUNT + 40))
  }
}

function onResize() {
  if (canvasRef.value) resize(canvasRef.value)
}

onMounted(() => {
  init(canvasRef.value)
  step()
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('mouseout', onMouseLeave)
  window.addEventListener('click', onClick)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseout', onMouseLeave)
  window.removeEventListener('click', onClick)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="bubble-canvas"
    aria-hidden="true"
  />
</template>

<style scoped>
.bubble-canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
}
</style>
