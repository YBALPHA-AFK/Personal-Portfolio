import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Quote } from 'lucide-react'
import { profile } from '../data/portfolioData'
import SectionHeading from './SectionHeading'
import RevealImage from './RevealImage'
import ScrollReveal from './ScrollReveal'

function highlight(text, words) {
  let html = text
  words.forEach((w) => {
    const re = new RegExp(`(${w})`, 'gi')
    html = html.replace(re, '<mark>$1</mark>')
  })
  return html
}

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const yImg = useTransform(scrollYProgress, [0, 1], [-30, 30])
  // Layered parallax: each piece moves at its own speed for depth.
  const headingY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const valuesY = useTransform(scrollYProgress, [0, 1], [80, -20])
  const imgInnerY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.0, 1.08])
  const imgRotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5])
  const quoteY = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const ringScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.9])

  const html = highlight(profile.summary, profile.summaryHighlight)

  return (
    <section id="about" ref={ref} className="section-pad relative">
      <div className="container-max grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <motion.div style={{ y: headingY }}>
            <SectionHeading
              eyebrow="About me"
              title="Driven To Deliver"
              subtitle="A short story about who I am and how I think."
            />
          </motion.div>

          <motion.div style={{ y }} className="mt-10 space-y-6">
            <div className="relative">
              <Quote
                className="absolute -left-2 -top-3 text-cyan-glow/30"
                size={36}
              />
              <p
                className="relative pl-8 text-lg leading-relaxed text-white/80 [&_mark]:bg-transparent [&_mark]:font-semibold [&_mark]:text-cyan-glow"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>

            <motion.div style={{ y: valuesY }} className="grid grid-cols-3 gap-3 pt-2">
              {profile.values.map((v) => (
                <ScrollReveal key={v} distance={40}>
                  <motion.div
                    className="glass rounded-xl p-4 text-center"
                    whileHover={{ y: -4, borderColor: 'rgba(0,218,255,0.4)' }}
                  >
                    <p className="font-display text-sm font-semibold text-white sm:text-base">{v}</p>
                    <div className="mx-auto mt-2 h-px w-8 bg-cyan-glow/60" />
                  </motion.div>
                </ScrollReveal>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Image column */}
        <motion.div style={{ y: yImg }} className="relative">
          <div className="sticky top-32">
            <motion.div
              style={{ rotate: imgRotate }}
              className="relative"
            >
              <motion.div
                style={{ scale: ringScale }}
                className="absolute inset-0 -m-1 rounded-3xl bg-gradient-to-br from-cyan-glow/40 via-cyan-deep/20 to-transparent blur-xl"
              />
              <div className="relative overflow-hidden rounded-3xl border border-cyan-glow/20 bg-ink-800/60 backdrop-blur">
                <RevealImage className="aspect-[4/5]" direction="up">
                  <div className="relative h-full w-full overflow-hidden">
                    <motion.img
                      src="/about.jpg"
                      alt={`${profile.name || 'Portfolio'} — about`}
                      loading="lazy"
                      decoding="async"
                      style={{ y: imgInnerY, scale: imgScale }}
                      className="absolute inset-0 h-full w-full object-cover will-change-transform"
                    />
                    {/* on-brand cyan tint */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/55 via-transparent to-ink-900/15" />

                    {/* corner labels */}
                    <span className="absolute left-3 top-3 z-20 rounded-md border border-cyan-glow/30 bg-ink-900/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-glow/80">
                      01 · profile
                    </span>
                    <span className="absolute right-3 top-3 z-20 rounded-md border border-cyan-glow/30 bg-ink-900/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-glow/80">
                      SM
                    </span>
                  </div>
                </RevealImage>

                {/* footer card */}
                <div className="border-t border-cyan-glow/15 bg-ink-900/70 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display text-sm font-semibold text-white">{profile.role}</p>
                      <p className="text-xs text-white/68">{profile.subRole}</p>
                    </div>
                    <span className="rounded-full border border-cyan-glow/30 bg-cyan-glow/10 px-3 py-1 text-[11px] font-medium text-cyan-glow">
                      Now
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* floating quote chip — scroll-driven parallax + idle bob */}
            <motion.div
              style={{ y: quoteY }}
              className="absolute -bottom-6 -left-4 hidden max-w-[240px] rounded-2xl border border-cyan-glow/25 bg-ink-900/90 p-4 backdrop-blur sm:block"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="text-sm leading-snug text-white/85">
                  “Once I set a goal, I commit fully.”
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-cyan-glow/70">
                  — Suhaan
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
