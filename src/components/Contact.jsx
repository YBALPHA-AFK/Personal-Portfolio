import { motion } from 'framer-motion'
import { Mail, Linkedin, MapPin, ArrowUpRight, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { profile } from '../data/portfolioData'
import SectionHeading from './SectionHeading'
import Magnetic from './Magnetic'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  return (
    <section id="contact" className="section-pad relative">
      <div className="container-max">
        <div className="border-beam relative overflow-hidden rounded-3xl border border-cyan-glow/20 bg-ink-800/60 backdrop-blur-xl">
          {/* gradient flourishes */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-glow/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-deep/30 blur-3xl" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,218,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,218,255,0.06) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            }}
          />

          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:p-16">
            <div>
              <SectionHeading
                eyebrow="Let's connect"
                title="Always open to driven students, mentors, and pros."
                subtitle="Reach out for partnerships, mentorship, or just to talk strategy."
              />

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <a
                    href={`mailto:${profile.email}`}
                    data-cursor="hover"
                    className="magnetic-button inline-flex items-center gap-2 rounded-full bg-cyan-glow px-6 py-3.5 text-sm font-semibold text-ink-900 shadow-glow transition-transform hover:scale-[1.03]"
                  >
                    <Mail size={16} />
                    Send an email
                    <ArrowUpRight size={14} />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="magnetic-button inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-cyan-glow hover:bg-cyan-glow/10"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                    <ArrowUpRight size={14} />
                  </a>
                </Magnetic>
              </div>
            </div>

            {/* Contact card */}
            <div className="relative">
              <div className="glass-strong relative overflow-hidden rounded-2xl p-1">
                <div className="space-y-1 rounded-[1rem] bg-ink-900/80 p-6">
                  <ContactRow
                    icon={Mail}
                    label="Email"
                    value={profile.email}
                    href={`mailto:${profile.email}`}
                    action={
                      <button
                        onClick={copyEmail}
                        className="rounded-md border border-white/10 px-2 py-1 text-[11px] font-medium text-white/70 transition hover:border-cyan-glow/40 hover:text-cyan-glow"
                        aria-label="Copy email"
                        data-cursor="hover"
                      >
                        {copied ? (
                          <span className="inline-flex items-center gap-1 text-cyan-glow">
                            <Check size={12} /> Copied
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1">
                            <Copy size={12} /> Copy
                          </span>
                        )}
                      </button>
                    }
                  />
                  <Divider />
                  <ContactRow
                    icon={Linkedin}
                    label="LinkedIn"
                    value="linkedin.com/in/suhaanmeerapatel"
                    href={profile.linkedin}
                  />
                  <Divider />
                  <ContactRow icon={MapPin} label="Based in" value={profile.location} />
                </div>
              </div>

              {/* status pill */}
              <div className="absolute -right-2 -top-2 flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[11px] font-medium text-emerald-200">Open to chat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Divider() {
  return <div className="my-1 h-px bg-white/5" />
}

function ContactRow({ icon: Icon, label, value, href, action }) {
  const Inner = (
    <div className="flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-cyan-glow/5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-cyan-glow/25 bg-cyan-glow/10 text-cyan-glow">
        <Icon size={16} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/62">{label}</p>
        <p className="truncate text-sm font-medium text-white/90">{value}</p>
      </div>
      {action}
    </div>
  )

  if (!href) return Inner
  return (
    <motion.a
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      data-cursor="hover"
      className="block"
    >
      {Inner}
    </motion.a>
  )
}
