import { ImagePlus } from 'lucide-react'
import { education } from '../data/portfolioData'
import SectionHeading from './SectionHeading'
import GlowCard from './GlowCard'
import RevealImage from './RevealImage'
import ScrollReveal from './ScrollReveal'

export default function Education() {
  return (
    <section id="education" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Education"
          title="Schools that shape the strategy."
          subtitle="Business-focused programs with a leadership academy at the core."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {education.map((e, i) => {
            const Icon = e.icon
            return (
              <ScrollReveal
                key={e.school}
                distance={80}
                data-cursor="hover"
              >
                <GlowCard className="flex h-full flex-col overflow-hidden">
                  {/* image strip — replace inner placeholder with an <img> when ready */}
                  <RevealImage
                    className="h-32 border-b border-cyan-glow/10"
                    direction={i % 2 === 0 ? 'up' : 'down'}
                    delay={i * 0.05}
                  >
                    <div className="img-placeholder relative h-full w-full">
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="flex items-center gap-2 text-cyan-glow/70">
                          <ImagePlus size={16} />
                          <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
                            School photo
                          </span>
                        </div>
                      </div>
                      <span className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-wider text-cyan-glow/80">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </RevealImage>

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-glow/30 bg-cyan-glow/10 text-cyan-glow">
                        <Icon size={16} />
                      </span>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-glow/80">
                        {e.period}
                      </p>
                    </div>
                    <h3 className="font-display text-lg font-semibold leading-snug text-white">
                      {e.school}
                    </h3>
                    <p className="text-sm text-white/75">{e.program}</p>
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
