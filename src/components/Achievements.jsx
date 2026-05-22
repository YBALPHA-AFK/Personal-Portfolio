import { motion } from 'framer-motion'
import { honors } from '../data/portfolioData'
import SectionHeading from './SectionHeading'
import GlowCard from './GlowCard'
import ScrollReveal from './ScrollReveal'

export default function Achievements() {
  return (
    <section id="achievements" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Honors & Awards"
          title="Recognized for execution at every level."
          subtitle="Top finishes at regional and state competitions — and the hardware to prove it."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {honors.map((h, i) => {
            const Icon = h.icon
            return (
              <ScrollReveal
                key={h.title}
                distance={80}
                data-cursor="hover"
              >
                <GlowCard className="group h-full p-6">
                  <div className="relative mb-5 inline-grid h-14 w-14 place-items-center rounded-2xl border border-cyan-glow/30 bg-cyan-glow/10 text-cyan-glow shadow-glow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon size={26} />
                    <motion.span
                      className="absolute inset-0 rounded-2xl border border-cyan-glow/40"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                    />
                  </div>

                  <h3 className="font-display text-lg font-semibold leading-snug text-white">
                    {h.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/72">{h.detail}</p>

                  <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-glow/80">
                      Award #{String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="rounded-full bg-cyan-glow/10 px-2 py-0.5 text-[10px] font-medium text-cyan-glow">
                      Verified
                    </span>
                  </div>
                </GlowCard>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
