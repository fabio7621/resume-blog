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
  }
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

  for (const b of bubbles) {
    b.x += b.vx
    b.y += b.vy

    if (mouse.active) {
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

    if (dark) {
      const strokeAlpha = b.alpha * 0.9
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
      grad.addColorStop(0, `hsla(${b.hue}, 80%, 80%, ${b.alpha + 0.2})`)
      grad.addColorStop(0.7, `hsla(${b.hue}, 80%, 70%, ${b.alpha})`)
      grad.addColorStop(1, `hsla(${b.hue}, 80%, 70%, 0)`)

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = `hsla(${b.hue}, 90%, 85%, ${b.alpha * 0.6})`
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.fillStyle = `hsla(${b.hue}, 100%, 95%, ${b.alpha * 0.8})`
      ctx.beginPath()
      ctx.arc(b.x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.18, 0, Math.PI * 2)
      ctx.fill()
    }
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
