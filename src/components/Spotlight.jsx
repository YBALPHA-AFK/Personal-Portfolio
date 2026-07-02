import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'

/**
 * Ambient pointer spotlight: a large, very soft cyan radial glow that
 * lags behind the cursor on a spring, giving the whole page a sense of
 * depth and light. Screen-blended so it brightens without washing out.
 * Skipped on touch devices and for reduced-motion users.
 */
export default function Spotlight() {
  const x = useMotionValue(-600)
  const y = useMotionValue(-600)
  const sx = useSpring(x, { stiffness: 60, damping: 18, mass: 0.8 })
  const sy = useSpring(y, { stiffness: 60, damping: 18, mass: 0.8 })

  const background = useMotionTemplate`radial-gradient(560px circle at ${sx}px ${sy}px, rgba(0, 218, 255, 0.07), rgba(0, 153, 184, 0.03) 40%, transparent 70%)`

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] mix-blend-screen"
      style={{ background }}
    />
  )
}
