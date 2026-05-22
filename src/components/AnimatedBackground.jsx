import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Layered background:
 *  - Animated cyan grid (CSS)
 *  - Drifting blurred orbs (Framer Motion)
 *  - Lightweight canvas particle field
 */
export default function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = (canvas.width = window.innerWidth * dpr)
    let h = (canvas.height = window.innerHeight * dpr)
    canvas.style.width = window.innerWidth + 'px'
    canvas.style.height = window.innerHeight + 'px'

    const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 22000))
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25 * dpr,
      vy: (Math.random() - 0.5) * 0.25 * dpr,
      r: (Math.random() * 1.4 + 0.4) * dpr,
      a: Math.random() * 0.5 + 0.2,
    }))

    const resize = () => {
      w = canvas.width = window.innerWidth * dpr
      h = canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
    }
    window.addEventListener('resize', resize)

    const linkDist = 140 * dpr

    const tick = () => {
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        ctx.beginPath()
        ctx.fillStyle = `rgba(0, 218, 255, ${p.a})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < linkDist) {
            const o = 1 - d / linkDist
            ctx.strokeStyle = `rgba(0, 218, 255, ${o * 0.18})`
            ctx.lineWidth = 0.6 * dpr
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* base ink */}
      <div className="absolute inset-0 bg-ink-900" />

      {/* grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,218,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,218,255,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)',
        }}
      />

      {/* drifting orbs */}
      <motion.div
        className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(0,218,255,0.35), transparent 70%)' }}
        animate={{ x: [0, 80, -40, 0], y: [0, 60, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[30%] right-[-10%] h-[520px] w-[520px] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(0,153,184,0.28), transparent 70%)' }}
        animate={{ x: [0, -60, 40, 0], y: [0, -40, 60, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[30%] h-[460px] w-[460px] rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(122,235,255,0.18), transparent 70%)' }}
        animate={{ x: [0, 40, -60, 0], y: [0, -50, 20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </div>
  )
}
