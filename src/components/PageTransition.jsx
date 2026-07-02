import { motion } from 'framer-motion'

/**
 * Route transition shell: content fades/rises in while a cyan light-bar
 * sweeps across the top edge — a quiet nod to the site's scan-line motif.
 * Used by App.jsx around the matched <Routes> so every page change lands
 * with intention instead of a hard swap.
 */
export default function PageTransition({ children, id }) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* sweep — a thin beam races across the viewport top on entry */}
      <motion.span
        aria-hidden
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
        transition={{ duration: 0.9, times: [0, 0.55, 1], ease: [0.85, 0, 0.15, 1] }}
        style={{ transformOrigin: '0% 50%' }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-gradient-to-r from-transparent via-cyan-glow to-cyan-soft shadow-glow-sm"
      />
      {children}
    </motion.div>
  )
}
