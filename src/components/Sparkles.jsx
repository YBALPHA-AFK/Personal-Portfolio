import { useEffect, useRef } from 'react'

// Ambient sparkles: few, slow, soft. Designed as quiet decoration —
// not a dense graph of dots. Each sparkle gently drifts up and
// twinkles its alpha. Skipped when the user prefers reduced motion.
export default function Sparkles({ density = 0.00008, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const sizeCanvas = () => {
      const parent = canvas.parentElement
      const w = parent.offsetWidth
      const h = parent.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
    }
    sizeCanvas()

    const makeParticle = () => {
      const w = canvas.width
      const h = canvas.height
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.3 + 0.4) * dpr,
        vy: -(Math.random() * 0.15 + 0.05) * dpr,
        vx: (Math.random() - 0.5) * 0.05 * dpr,
        phase: Math.random() * Math.PI * 2,
        speed: 0.008 + Math.random() * 0.015,
        baseAlpha: 0.35 + Math.random() * 0.45,
      }
    }

    let count = Math.max(18, Math.floor(canvas.width * canvas.height * density))
    count = Math.min(count, 60)
    let particles = Array.from({ length: count }, makeParticle)

    const ro = new ResizeObserver(() => {
      sizeCanvas()
      count = Math.max(18, Math.floor(canvas.width * canvas.height * density))
      count = Math.min(count, 60)
      particles = Array.from({ length: count }, makeParticle)
    })
    ro.observe(canvas.parentElement)

    let raf
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.phase += p.speed
        if (p.y < -10) {
          p.y = canvas.height + 10
          p.x = Math.random() * canvas.width
        }
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10

        const a = p.baseAlpha * (0.55 + 0.45 * Math.sin(p.phase))
        ctx.beginPath()
        ctx.fillStyle = `rgba(122, 235, 255, ${a})`
        ctx.shadowBlur = 6 * dpr
        ctx.shadowColor = 'rgba(0, 218, 255, 0.8)'
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  )
}
