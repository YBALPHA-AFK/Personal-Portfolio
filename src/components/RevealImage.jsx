import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Scroll-triggered image reveal:
 *  - Curtain sweep panel slides off (cyan flash, then ink dark)
 *  - Inner content scales from zoom + un-blurs into place
 *  - Subtle outline accent flicker on enter
 *
 * Drop-in wrapper around any image / placeholder block.
 *
 *   <RevealImage className="rounded-2xl">
 *     <img src="/headshot.jpg" alt="Suhaan" className="h-full w-full object-cover" />
 *   </RevealImage>
 *
 * Props:
 *   direction: 'up' | 'down' | 'left' | 'right'   (curtain origin side)
 *   delay:     number                              (seconds)
 *   className: string                              (size/rounding/etc)
 */
export default function RevealImage({
  children,
  className = '',
  direction = 'up',
  delay = 0,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })

  const origin = {
    up: 'bottom',
    down: 'top',
    left: 'right',
    right: 'left',
  }[direction]

  // The flash sweep slides one way; the dark cover slides the other.
  // Cover runs first (covers the content), then peels away revealing the image.
  const coverOrigin = origin
  const flashOrigin =
    direction === 'up' ? 'top'
    : direction === 'down' ? 'bottom'
    : direction === 'left' ? 'left'
    : 'right'

  const axis = direction === 'left' || direction === 'right' ? 'X' : 'Y'

  return (
    <motion.div
      ref={ref}
      className={`relative isolate overflow-hidden ${className}`}
    >
      {/* Inner content: scale + blur to crisp */}
      <motion.div
        initial={{ scale: 1.18, opacity: 0, filter: 'blur(14px)' }}
        animate={
          inView
            ? { scale: 1, opacity: 1, filter: 'blur(0px)' }
            : { scale: 1.18, opacity: 0, filter: 'blur(14px)' }
        }
        transition={{
          duration: 1.3,
          delay: delay + 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="h-full w-full"
      >
        {children}
      </motion.div>

      {/* Dark cover — peels away to reveal */}
      <motion.div
        aria-hidden
        initial={{ [`scale${axis}`]: 1 }}
        animate={inView ? { [`scale${axis}`]: 0 } : { [`scale${axis}`]: 1 }}
        transition={{
          duration: 1.0,
          delay: delay + 0.25,
          ease: [0.85, 0, 0.15, 1],
        }}
        style={{ transformOrigin: coverOrigin }}
        className="pointer-events-none absolute inset-0 z-20 bg-ink-900"
      />

      {/* Cyan flash — slides the opposite way under the cover */}
      <motion.div
        aria-hidden
        initial={{ [`scale${axis}`]: 0 }}
        animate={
          inView
            ? { [`scale${axis}`]: [0, 1, 0] }
            : { [`scale${axis}`]: 0 }
        }
        transition={{
          duration: 1.1,
          delay: delay + 0.05,
          times: [0, 0.5, 1],
          ease: [0.85, 0, 0.15, 1],
        }}
        style={{
          transformOrigin: flashOrigin,
          background:
            'linear-gradient(135deg, rgba(0,218,255,0.9), rgba(122,235,255,0.9))',
        }}
        className="pointer-events-none absolute inset-0 z-10"
      />

      {/* Brief border-flicker accent */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 1, 0.0] } : { opacity: 0 }}
        transition={{
          duration: 1.2,
          delay: delay + 0.4,
          times: [0, 0.4, 1],
        }}
        className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] ring-1 ring-cyan-glow"
      />

      {/* Scan-line shimmer — sweeps across once content is revealed.
          Note: framer-motion's `x: '%'` is relative to the element's own
          width (here w-1/3 ≈ 33% of parent), so the offsets need to be
          large enough to push the band fully off-screen on both ends. */}
      <motion.div
        aria-hidden
        initial={{ x: '-300%' }}
        animate={inView ? { x: '300%' } : { x: '-300%' }}
        transition={{
          duration: 1.4,
          delay: delay + 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="pointer-events-none absolute inset-y-0 z-30 w-1/3 -skew-x-12"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,218,255,0.25), transparent)',
        }}
      />
    </motion.div>
  )
}
