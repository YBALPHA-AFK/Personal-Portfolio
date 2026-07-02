import { motion } from 'framer-motion'
import {
  MapPin,
  Calendar,
  Briefcase,
  Building2,
  ArrowUpRight,
  Mail,
  ChevronsUp,
  GitBranch,
} from 'lucide-react'
import { experience, profile } from '../data/portfolioData'
import GlowCard from '../components/GlowCard'
import ScrollReveal from '../components/ScrollReveal'
import SplitText from '../components/SplitText'

// Group consecutive entries with the same org so a multi-role arc (e.g. DECA)
// renders under one header with a connecting timeline rail.
function buildExperienceGroups(items) {
  const groups = []
  items.forEach((exp, idx) => {
    const last = groups[groups.length - 1]
    const enriched = { ...exp, originalIndex: idx }
    if (last && last.org === exp.org) {
      last.items.push(enriched)
    } else {
      groups.push({ org: exp.org, items: [enriched] })
    }
  })
  return groups
}

export default function ExperiencesPage() {
  const totalRoles = experience.length
  const orgCount = new Set(experience.map((e) => e.org)).size
  const locations = new Set(experience.map((e) => e.location)).size
  const currentRoles = experience.filter((e) => e.badge === 'Current' || /Present/i.test(e.period)).length
  const groups = buildExperienceGroups(experience)

  return (
    <div className="relative">
      {/* Hero header */}
      <section className="section-pad pt-40 lg:pt-48">
        <div className="container-max">
          <ScrollReveal distance={60}>
            <span className="badge">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-glow-sm" />
              Experiences
            </span>
          </ScrollReveal>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <SplitText
              text="A leadership timeline."
              by="word"
              stagger={0.08}
              delay={0.1}
              hoverLift={false}
              unitClassName="text-gradient"
            />
          </h1>

          <ScrollReveal distance={50}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Every role I've earned — from middle-school competitor to high-school officer.
              Each entry below is a chapter in how I learned to lead, market, and execute.
            </p>
          </ScrollReveal>

          {/* Stats strip */}
          <ScrollReveal distance={60}>
            <div className="glass-strong mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cyan-glow/15 sm:grid-cols-4">
              <Stat label="Total roles" value={String(totalRoles)} />
              <Stat label="Organizations" value={String(orgCount)} />
              <Stat label="Locations" value={String(locations)} />
              <Stat label="Active now" value={String(currentRoles)} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Experience list — grouped by org so multi-role arcs read as one journey */}
      <section className="px-6 pb-32 sm:px-10 lg:px-20">
        <div className="container-max space-y-16 lg:space-y-20">
          {groups.map((group, gIdx) => (
            <ExperienceGroup key={`${group.org}-${gIdx}`} group={group} />
          ))}
        </div>
      </section>

      {/* CTA footer */}
      <section className="section-pad pt-0">
        <div className="container-max">
          <ScrollReveal distance={60}>
            <div className="relative overflow-hidden rounded-3xl border border-cyan-glow/20 bg-ink-800/60 p-8 backdrop-blur-xl sm:p-12 lg:p-16">
              <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-glow/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-deep/30 blur-3xl" />

              <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                    Want to collaborate?
                  </h2>
                  <p className="mt-3 max-w-xl text-base text-white/75">
                    I'm always open to mentorship, partnerships, or competition prep. Reach out and
                    let's talk strategy.
                  </p>
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  data-cursor="hover"
                  className="magnetic-button inline-flex items-center gap-2 rounded-full bg-cyan-glow px-6 py-3.5 text-sm font-semibold text-ink-900 shadow-glow transition-transform hover:scale-[1.03]"
                >
                  <Mail size={16} />
                  Get in touch
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="bg-ink-900/40 p-5 sm:p-6">
      <p className="font-display text-2xl font-bold text-cyan-glow sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-white/68 sm:text-sm">{label}</p>
    </div>
  )
}

function ExperienceGroup({ group }) {
  const isMulti = group.items.length > 1

  return (
    <div className="relative">
      <ScrollReveal distance={50}>
        <div className="mb-3 flex items-center gap-4">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-glow/80">
            <GitBranch size={12} />
            {isMulti ? `${group.items.length}-role arc` : 'Standalone role'}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-cyan-glow/30 via-cyan-glow/10 to-transparent" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
          {group.org}
        </h2>
        {isMulti && (
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/72">
            <ChevronsUp size={14} className="text-cyan-glow" />
            Newest role at the top — scroll down to see how it started.
          </p>
        )}
      </ScrollReveal>

      <div className={`relative mt-7 ${isMulti ? 'pl-7 sm:pl-9' : ''}`}>
        {isMulti && (
          <>
            {/* Timeline rail */}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-3 left-3 top-3 w-px bg-gradient-to-b from-cyan-glow via-cyan-glow/40 to-cyan-glow/15 sm:left-3.5"
            />
            {/* Top cap — current end of the arc */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1.5 top-1 grid h-3 w-3 place-items-center rounded-full border border-cyan-glow bg-ink-900 shadow-glow-sm sm:left-2"
            >
              <span className="h-1 w-1 rounded-full bg-cyan-glow" />
            </span>
            {/* Bottom cap — where it began */}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-1 left-1.5 h-3 w-3 rounded-full border border-cyan-glow/40 bg-ink-900 sm:left-2"
            />
          </>
        )}

        <div className={isMulti ? 'space-y-5 lg:space-y-6' : 'space-y-8'}>
          {group.items.map((item, i) => (
            <ScrollReveal
              key={`${item.org}-${item.role}-${item.originalIndex}`}
              from={i % 2 === 0 ? 'left' : 'right'}
              distance={70}
            >
              <DetailCard
                item={item}
                index={item.originalIndex}
                progression={
                  isMulti
                    ? {
                        step: group.items.length - i,
                        total: group.items.length,
                        isCurrent: i === 0,
                        isStart: i === group.items.length - 1,
                      }
                    : null
                }
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}

function DetailCard({ item, index, progression }) {
  const Icon = item.icon
  const isCurrent = item.badge === 'Current' || /Present/i.test(item.period)

  return (
    <GlowCard className="group relative overflow-hidden p-7 sm:p-9" data-cursor="hover">
      {/* Color accent stripe */}
      <span
        className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${item.color || 'from-cyan-glow to-cyan-deep'}`}
      />

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Meta column */}
        <div className="flex flex-row flex-wrap items-start gap-5 lg:flex-col lg:gap-6 lg:border-r lg:border-white/5 lg:pr-8">
          <div className="relative">
            <span className="absolute inset-0 rounded-2xl bg-cyan-glow/20 blur-xl" />
            <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-cyan-glow/30 bg-ink-900 text-cyan-glow shadow-glow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <Icon size={22} />
              {isCurrent && (
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-ink-900 bg-emerald-400">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                </span>
              )}
            </span>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-glow">
              <Calendar size={11} className="mr-1 inline-block -translate-y-px" />
              {item.period}
            </p>
            <p className="text-xs uppercase tracking-wider text-white/62">
              {item.duration}
            </p>
            <p className="inline-flex items-center gap-1.5 text-xs text-white/72">
              <MapPin size={11} className="text-cyan-glow/70" />
              {item.location}
            </p>
            {progression ? (
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-glow/70">
                Step {String(progression.step).padStart(2, '0')} / {String(progression.total).padStart(2, '0')}
                {progression.isCurrent && <span className="ml-1 text-emerald-300">· latest</span>}
                {progression.isStart && <span className="ml-1 text-white/58">· origin</span>}
              </p>
            ) : (
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                No. {String(index + 1).padStart(2, '0')}
              </p>
            )}
          </div>
        </div>

        {/* Content column */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                {item.role}
              </h3>
              <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-white/70">
                <Building2 size={14} className="text-cyan-glow/70" />
                {item.org}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {progression && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-glow/30 bg-cyan-glow/10 px-3 py-1 text-[11px] font-medium text-cyan-glow">
                  Step {progression.step}/{progression.total}
                </span>
              )}
              {isCurrent && (
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-[11px] font-medium text-emerald-200">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Active role
                </span>
              )}
            </div>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {item.points.map((p, idx) => (
              <li
                key={idx}
                className="flex gap-3 rounded-xl border border-white/5 bg-ink-900/40 p-4 text-sm leading-relaxed text-white/75 transition-colors hover:border-cyan-glow/30 hover:bg-cyan-glow/5"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-glow shadow-glow-sm" />
                <span>{p}</span>
              </li>
            ))}
          </ul>

          {/* Tag row — meta tags pulled from the entry */}
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/5 pt-5">
            <span className="rounded-full border border-cyan-glow/20 bg-cyan-glow/5 px-3 py-1 text-[11px] font-medium text-cyan-glow">
              <Briefcase size={11} className="mr-1 inline-block -translate-y-px" />
              {item.org.includes('DECA')
                ? 'DECA'
                : item.org.includes('FBLA')
                ? 'FBLA'
                : item.org.includes('Taekwondo')
                ? 'Mentorship'
                : item.org.includes('Student')
                ? 'School'
                : 'Leadership'}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-white/80">
              {item.points.length} highlight{item.points.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>
      </div>

      {/* hover gradient */}
      <motion.div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r ${item.color || 'from-cyan-glow to-cyan-deep'} opacity-50`}
      />
    </GlowCard>
  )
}
