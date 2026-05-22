import { useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Card with a glow that follows the cursor (--mx, --my CSS vars are used by .glow-card).
 */
export default function GlowCard({ children, className = '', as: Tag = 'div', ...rest }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--mx', `${x}%`)
    el.style.setProperty('--my', `${y}%`)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      className={`glow-card rounded-2xl ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
