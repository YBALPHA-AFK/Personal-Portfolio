import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // Dot — fast, low-lag spring tracking the raw cursor.
  const sx = useSpring(x, { stiffness: 500, damping: 38, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 38, mass: 0.4 })

  // Ring — chains OFF the dot's smoothed position so the two are
  // always perfectly centered on each other (the ring trails the dot,
  // not the raw cursor).
  const ringX = useSpring(sx, { stiffness: 220, damping: 24, mass: 0.6 })
  const ringY = useSpring(sy, { stiffness: 220, damping: 24, mass: 0.6 })

  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(true)
  const visibleRef = useRef(false)

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) {
      setHidden(true)
      return
    }

    document.body.classList.add('has-custom-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visibleRef.current) {
        visibleRef.current = true
        setHidden(false)
      }
    }

    const enter = (e) => {
      const t = e.target
      if (t.closest && t.closest('a, button, [data-cursor="hover"], input, textarea')) {
        setHovering(true)
      }
    }
    const leave = (e) => {
      const t = e.target
      if (t.closest && t.closest('a, button, [data-cursor="hover"], input, textarea')) {
        setHovering(false)
      }
    }
    const out = () => setHidden(true)
    const over = () => setHidden(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', enter, true)
    window.addEventListener('mouseout', leave, true)
    document.addEventListener('mouseleave', out)
    document.addEventListener('mouseenter', over)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', enter, true)
      window.removeEventListener('mouseout', leave, true)
      document.removeEventListener('mouseleave', out)
      document.removeEventListener('mouseenter', over)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [x, y])

  if (hidden) return null

  return (
    <>
      {/* Dot — translate by half the dot size so its center sits on (sx, sy) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-cyan-glow"
        style={{
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 12px #00daff',
        }}
      />

      {/* Ring — chained spring off (sx, sy) so it shares the dot's path */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-cyan-glow/60 mix-blend-screen"
        animate={{
          width: hovering ? 64 : 36,
          height: hovering ? 64 : 36,
          opacity: hovering ? 0.9 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 240, damping: 22 }}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}
