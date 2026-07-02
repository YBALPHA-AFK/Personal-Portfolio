import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, ImagePlus } from 'lucide-react'
import { experience } from '../data/portfolioData'
import SectionHeading from './SectionHeading'
import GlowCard from './GlowCard'
import ScrollReveal from './ScrollReveal'

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 20%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Experience"
          title="A timeline of leadership and competition."
          subtitle="From middle-school competitor to high-school officer — every role earned."
        />

        <div ref={ref} className="relative mt-16">
          {/* Center spine on lg, left spine on mobile */}
          <div className="absolute left-5 top-0 h-full w-px bg-white/[0.06] lg:left-1/2 lg:-translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-5 top-0 w-px bg-gradient-to-b from-cyan-glow via-cyan-glow/60 to-transparent shadow-[0_0_12px_rgba(0,218,255,0.6)] lg:left-1/2 lg:-translate-x-1/2"
          />

          <ol className="space-y-12 lg:space-y-20">
            {experience.map((item, i) => (
              <TimelineItem key={`${item.org}-${item.role}-${i}`} item={item} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ item, index }) {
  const Icon = item.icon
  const isRight = index % 2 === 1

  return (
    <ScrollReveal
      as="li"
      from={isRight ? 'right' : 'left'}
      distance={60}
      className="relative grid grid-cols-[40px_1fr] gap-4 lg:grid-cols-2 lg:gap-12"
    >
      {/* Node — powers on as the glowing spine reaches it */}
      <div
        className={`relative flex justify-center lg:absolute lg:left-1/2 lg:top-8 lg:-translate-x-1/2`}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -120px 0px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="absolute h-12 w-12 rounded-full bg-cyan-glow/20 blur-xl"
        />
        <motion.span
          initial={{ scale: 0.3, opacity: 0.3 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -120px 0px' }}
          transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
          className="relative grid h-10 w-10 place-items-center rounded-full border border-cyan-glow/40 bg-ink-900 text-cyan-glow shadow-glow-sm"
        >
          <Icon size={16} />
          {/* single expanding pulse when the node activates */}
          <motion.span
            aria-hidden
            initial={{ scale: 1, opacity: 0 }}
            whileInView={{ scale: [1, 2.2], opacity: [0.7, 0] }}
            viewport={{ once: true, margin: '0px 0px -120px 0px' }}
            transition={{ duration: 1.1, delay: 0.25, ease: 'easeOut' }}
            className="pointer-events-none absolute inset-0 rounded-full border border-cyan-glow"
          />
          {item.badge && (
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-ink-900 bg-emerald-400">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
            </span>
          )}
        </motion.span>
      </div>

      {/* Card slot */}
      <div className={`${isRight ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1 lg:pr-8'}`}>
        <GlowCard className="p-6 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-glow">
                {item.period}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-white sm:text-2xl">
                {item.role}
              </h3>
              <p className="mt-0.5 text-sm font-medium text-white/70">{item.org}</p>
            </div>
            <span className="rounded-full border border-cyan-glow/20 bg-cyan-glow/5 px-3 py-1 text-[11px] font-medium text-cyan-glow">
              {item.duration}
            </span>
          </div>

          <ul className="mt-5 space-y-2.5">
            {item.points.map((p, idx) => (
              <li key={idx} className="flex gap-3 text-sm leading-relaxed text-white/75">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-glow shadow-glow-sm" />
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
            <span className="inline-flex items-center gap-2 text-xs text-white/68">
              <MapPin size={12} className="text-cyan-glow/70" />
              {item.location}
            </span>

            {/* mini image placeholder slot */}
            <div className="flex items-center gap-1.5 rounded-md border border-dashed border-cyan-glow/20 px-2 py-1 text-[10px] uppercase tracking-wider text-white/62">
              <ImagePlus size={11} className="text-cyan-glow/60" />
              add photo
            </div>
          </div>
        </GlowCard>
      </div>
    </ScrollReveal>
  )
}
