import { motion } from 'framer-motion'

// Animated horizontal divider that draws in on scroll. Pairs a thin
// cyan gradient line with a centered diamond marker and optional
// monospace label — gives sections a quiet, deliberate break.
export default function SectionDivider({ label }) {
  return (
    <div className="container-max relative px-6 sm:px-10 lg:px-20" aria-hidden>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
        className="relative flex items-center justify-center gap-4 py-2"
      >
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="block h-px flex-1 origin-right bg-gradient-to-r from-transparent via-cyan-glow/30 to-cyan-glow/40"
        />
        <motion.span
          initial={{ scale: 0, rotate: 45 }}
          whileInView={{ scale: 1, rotate: 45 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid h-3 w-3 place-items-center"
        >
          <span className="absolute inset-0 rounded-[2px] border border-cyan-glow/70 shadow-glow-sm" />
          <span className="block h-1 w-1 rounded-[1px] bg-cyan-glow" />
        </motion.span>
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-glow/70">
            {label}
          </span>
        )}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="block h-px flex-1 origin-left bg-gradient-to-l from-transparent via-cyan-glow/30 to-cyan-glow/40"
        />
      </motion.div>
    </div>
  )
}
