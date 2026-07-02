import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { skills, languages } from '../data/portfolioData'
import SectionHeading from './SectionHeading'
import ScrollReveal from './ScrollReveal'
import { Globe } from 'lucide-react'

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Top Skills"
          title="Tools, talents, and the way I work."
          subtitle="A growing toolkit — leadership, marketing, and AI fluency."
          align="center"
        />

        <div className="mt-14 flex flex-wrap justify-center gap-3 sm:gap-4">
          {skills.map((s) => {
            const Icon = s.icon
            return (
              <ScrollReveal key={s.name} distance={40} scaleFrom={0.85}>
                <motion.div
                  whileHover={{
                    y: -6,
                    scale: 1.04,
                    transition: { duration: 0.25 },
                  }}
                  className="group relative"
                  data-cursor="hover"
                >
                  <div className="absolute inset-0 rounded-full bg-cyan-glow/0 blur-xl transition-all duration-500 group-hover:bg-cyan-glow/30" />
                  <div className="relative flex items-center gap-2.5 rounded-full border border-cyan-glow/15 bg-ink-800/70 px-5 py-3 backdrop-blur transition-all duration-300 group-hover:border-cyan-glow/60 group-hover:shadow-glow-sm">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-cyan-glow/10 text-cyan-glow transition-all duration-300 group-hover:bg-cyan-glow group-hover:text-ink-900">
                      <Icon size={14} />
                    </span>
                    <span className="text-sm font-medium text-white/85 transition-colors group-hover:text-white">
                      {s.name}
                    </span>
                  </div>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Languages strip */}
        <ScrollReveal
          distance={40}
          className="mx-auto mt-14 flex max-w-fit items-center gap-3 rounded-full border border-cyan-glow/15 bg-ink-800/50 px-5 py-2.5 backdrop-blur"
        >
          <Globe size={14} className="text-cyan-glow" />
          <span className="text-xs font-mono uppercase tracking-wider text-white/72">
            Languages
          </span>
          <span className="h-3 w-px bg-white/10" />
          {languages.map((l, i) => (
            <span key={l.name} className="inline-flex items-center gap-3 text-sm font-medium text-white/85">
              {i > 0 && <span className="text-white/30" aria-hidden>|</span>}
              <span>
                {l.name} <span className="text-white/62">— {l.level}</span>
              </span>
            </span>
          ))}
        </ScrollReveal>

        {/* Marquee strip */}
        <Marquee />
      </div>
    </section>
  )
}

// Wrap v into [min, max) — keeps the marquee's translate% in a seamless loop.
const wrap = (min, max, v) => min + ((((v - min) % (max - min)) + (max - min)) % (max - min))

/**
 * Scroll-velocity-reactive marquee: drifts on its own, but scrolling
 * accelerates it, scrolling up reverses it, and fast flicks skew the
 * whole rail like it's catching g-force. Words are stroke-only type
 * that floods cyan under the cursor.
 */
function Marquee() {
  const items = [
    'Leadership',
    'Strategy',
    'Marketing',
    'Finance',
    'Public Relations',
    'Discipline',
    'Execution',
    'AI Fluency',
    'Competition',
    'Goal-Setting',
    'Communication',
    'Mentorship',
  ]
  const stream = [...items, ...items]

  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  // multiplies base drift; sign flips travel direction with scroll direction
  const velocityFactor = useTransform(smoothVelocity, [-1200, 1200], [-4, 4], { clamp: false })
  const skewX = useSpring(useTransform(smoothVelocity, [-1200, 1200], [8, -8]), {
    damping: 40,
    stiffness: 300,
  })

  const directionRef = useRef(1)
  const reducedRef = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useAnimationFrame((_, delta) => {
    if (reducedRef.current) return
    const vf = velocityFactor.get()
    if (vf < 0) directionRef.current = -1
    else if (vf > 0) directionRef.current = 1

    let moveBy = directionRef.current * 1.6 * (delta / 1000) // % per second base drift
    moveBy += moveBy * Math.abs(vf)
    baseX.set(wrap(-50, 0, baseX.get() + moveBy))
  })

  const x = useTransform(baseX, (v) => `${v}%`)

  return (
    <div
      className="relative mt-16 overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <motion.div style={{ x, skewX }} className="flex w-max gap-6 py-2 will-change-transform">
        {stream.map((it, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-3 font-display text-3xl font-semibold sm:text-4xl"
          >
            <span className="text-outline cursor-default" data-cursor="hover">
              {it}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow/50" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
