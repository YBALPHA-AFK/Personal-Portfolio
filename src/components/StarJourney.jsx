import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Scroll-driven star set piece ("Shoot For The Stars"):
 *
 *  - At page load the plasma star peeks up from the bottom of the hero
 *    (~30% visible), its fire drifting slowly (see .star-wrap CSS).
 *  - Scrolling carries the star up the screen until the section pins it
 *    (position: sticky) dead-center in the viewport.
 *  - While pinned, "Shoot" → "For" → "The Stars" fade in and out, each
 *    word scrubbed directly by scroll position — scrolling back reverses.
 *
 * The tall section (350vh) provides the scroll runway; the negative top
 * margin overlaps the hero so the star starts inside it.
 */

function Word({ progress, range, children }) {
  const [start, end] = range
  const mid1 = start + (end - start) * 0.3
  const mid2 = start + (end - start) * 0.7

  const opacity = useTransform(progress, [start, mid1, mid2, end], [0, 1, 1, 0])
  const scale = useTransform(progress, [start, mid1, mid2, end], [0.8, 1, 1, 1.15])
  const y = useTransform(progress, [start, end], [40, -40])
  const blur = useTransform(
    progress,
    [start, mid1, mid2, end],
    ['blur(12px)', 'blur(0px)', 'blur(0px)', 'blur(10px)'],
  )

  return (
    <motion.span
      aria-hidden
      style={{ opacity, scale, y, filter: blur }}
      className="absolute inset-x-0 text-center font-display text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
    >
      {/* dark drop-shadow halo keeps the words readable over the star's
          bright core (text-shadow would paint over a bg-clip:text fill) */}
      <span
        className="text-gradient inline-block"
        style={{
          filter:
            'drop-shadow(0 0 10px rgba(2, 6, 12, 0.9)) drop-shadow(0 0 28px rgba(2, 6, 12, 0.8)) drop-shadow(0 6px 60px rgba(2, 6, 12, 0.6))',
        }}
      >
        {children}
      </span>
    </motion.span>
  )
}

export default function StarJourney() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      ref={ref}
      aria-label="Shoot for the stars"
      className="relative"
      style={{ height: '350vh', marginTop: '-38vh' }}
    >
      {/* screen-reader text — the animated words are decorative */}
      <p className="sr-only">Shoot for the stars.</p>

      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Star — layered, masked, breathing (CSS in index.css) */}
        <div className="star-wrap h-[min(92vh,58rem)] w-[min(92vh,58rem)] shrink-0">
          <img
            src="/star.png"
            alt=""
            className="star-layer-a"
            loading="eager"
            decoding="async"
            draggable={false}
          />
          <img
            src="/star.png"
            alt=""
            aria-hidden
            className="star-layer-b"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </div>

        {/* Words — scrubbed by scroll while the star is pinned */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
          <Word progress={scrollYProgress} range={[0.18, 0.42]}>
            Shoot
          </Word>
          <Word progress={scrollYProgress} range={[0.42, 0.64]}>
            For
          </Word>
          <Word progress={scrollYProgress} range={[0.64, 0.9]}>
            The Stars
          </Word>
        </div>
      </div>
    </section>
  )
}
