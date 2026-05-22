import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { certifications } from '../data/portfolioData'
import SectionHeading from './SectionHeading'
import GlowCard from './GlowCard'
import RevealImage from './RevealImage'
import ScrollReveal from './ScrollReveal'

const ROTATE_INTERVAL_MS = 4000

export default function Certifications() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = certifications[activeIndex]

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % certifications.length)
    }, ROTATE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [activeIndex])

  return (
    <section id="certifications" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Certifications"
          title="Always learning, always shipping."
          subtitle="Hands-on AI fluency credentials and contributor accreditation."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Cert list */}
          <div className="space-y-4">
            {certifications.map((c, i) => {
              const Icon = c.icon
              const isActive = i === activeIndex
              return (
                <ScrollReveal
                  key={c.title}
                  from="left"
                  distance={50}
                  data-cursor="hover"
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className="block w-full text-left"
                  >
                    <GlowCard
                      className={`relative flex items-center gap-5 p-5 sm:p-6 transition-all duration-500 ${
                        isActive
                          ? 'ring-2 ring-cyan-glow/70 shadow-[0_0_32px_-8px_rgba(0,229,255,0.45)]'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      {isActive && (
                        <span className="pointer-events-none absolute inset-y-3 left-0 w-0.5 rounded-full bg-cyan-glow" />
                      )}
                      <div className="relative shrink-0">
                        <span className="absolute inset-0 rounded-xl bg-cyan-glow/30 blur-md" />
                        {c.image ? (
                          <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-xl border border-cyan-glow/30 bg-ink-900 p-1">
                            <img
                              src={c.image}
                              alt={c.title}
                              className="h-full w-full object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                              }}
                            />
                          </span>
                        ) : (
                          <span className="relative grid h-12 w-12 place-items-center rounded-xl border border-cyan-glow/30 bg-ink-900 text-cyan-glow">
                            <Icon size={20} />
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-display text-base font-semibold text-white sm:text-lg">
                          {c.title}
                        </h3>
                        <p className="text-xs text-white/72 sm:text-sm">{c.issuer}</p>
                      </div>
                      <CheckCircle2
                        size={18}
                        className="shrink-0 text-cyan-glow/70"
                      />
                    </GlowCard>
                  </button>
                </ScrollReveal>
              )
            })}
          </div>

          {/* Featured card with selected cert image */}
          <ScrollReveal
            from="right"
            distance={60}
            scaleFrom={0.95}
            className="relative"
          >
            <div className="absolute inset-0 -m-2 rounded-3xl bg-gradient-to-br from-cyan-glow/30 via-cyan-glow/5 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-cyan-glow/20 bg-ink-800/70 backdrop-blur">
              <RevealImage className="aspect-[4/3]" direction="left">
                <div className="relative h-full w-full bg-ink-900">
                  <img
                    key={active.image}
                    src={active.image}
                    alt={active.title}
                    className="h-full w-full object-contain animate-cert-fade"
                  />
                  <span className="absolute left-3 top-3 rounded-md border border-cyan-glow/30 bg-ink-900/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-glow/80">
                    {activeIndex + 1} / {certifications.length}
                  </span>
                </div>
              </RevealImage>

              <div className="space-y-3 p-6">
                <h3 className="font-display text-lg font-semibold text-white">
                  {active.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/75">
                  Issued by {active.issuer}.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Prompt Engineering', 'Agents', 'Workflows', 'Production'].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-cyan-glow/20 bg-cyan-glow/5 px-3 py-1 text-[11px] font-medium text-cyan-glow"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
