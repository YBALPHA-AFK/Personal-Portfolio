import { useEffect, useRef } from 'react'

// Subtle magnetic pull toward the cursor, plus updates the
// .magnetic-button CSS variables (--mx, --my) used by index.css for the
// radial hover glow. Disabled for reduced-motion users.
export default function useMagnetic({ strength = 0.25, radius = 120 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let target = { x: 0, y: 0 }
    let current = { x: 0, y: 0 }

    const animateFrame = () => {
      current.x += (target.x - current.x) * 0.18
      current.y += (target.y - current.y) * 0.18
      el.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`
      if (Math.abs(target.x - current.x) > 0.1 || Math.abs(target.y - current.y) > 0.1) {
        raf = requestAnimationFrame(animateFrame)
      } else {
        raf = 0
      }
    }

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist > radius + Math.max(r.width, r.height) / 2) {
        // Cursor left the magnetic field — release, don't keep following.
        if (target.x !== 0 || target.y !== 0) {
          target = { x: 0, y: 0 }
          if (!raf) raf = requestAnimationFrame(animateFrame)
        }
        return
      }
      target = { x: dx * strength, y: dy * strength }

      const mx = ((e.clientX - r.left) / r.width) * 100
      const my = ((e.clientY - r.top) / r.height) * 100
      el.style.setProperty('--mx', `${mx}%`)
      el.style.setProperty('--my', `${my}%`)

      if (!raf) raf = requestAnimationFrame(animateFrame)
    }

    const onLeave = () => {
      target = { x: 0, y: 0 }
      if (!raf) raf = requestAnimationFrame(animateFrame)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
      el.style.transform = ''
    }
  }, [strength, radius])

  return ref
}
