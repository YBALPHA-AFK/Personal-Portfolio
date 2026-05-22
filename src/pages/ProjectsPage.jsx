import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FolderGit2,
  Plus,
  Github,
  ExternalLink,
  Sparkles,
  Layers,
  Target,
  ImagePlus,
  Filter,
  Star,
} from 'lucide-react'
import GlowCard from '../components/GlowCard'
import ScrollReveal from '../components/ScrollReveal'

const filters = ['All', 'Featured', 'Case Studies', 'Initiatives', 'Experiments']

// Richer placeholder shape — replace once real projects are ready.
const projects = [
  { id: 1, category: 'Case Study', tag: 'DECA' },
  { id: 2, category: 'Initiative', tag: 'School Store' },
  { id: 3, category: 'Experiment', tag: 'AI Workflow' },
  { id: 4, category: 'Case Study', tag: 'Marketing Plan' },
  { id: 5, category: 'Initiative', tag: 'Volunteer Sys.' },
  { id: 6, category: 'Experiment', tag: 'Branding' },
  { id: 7, category: 'Case Study', tag: 'Competition' },
  { id: 8, category: 'Initiative', tag: 'Community' },
  { id: 9, category: 'Experiment', tag: 'Automation' },
]

export default function ProjectsPage() {
  const [active, setActive] = useState('All')

  return (
    <div className="relative">
      {/* Hero header */}
      <section className="section-pad pt-40 lg:pt-48">
        <div className="container-max">
          <ScrollReveal distance={60}>
            <span className="badge">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-glow-sm" />
              Projects · Comprehensive
            </span>
          </ScrollReveal>

          <ScrollReveal distance={70}>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient">Selected work, in depth.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal distance={50}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              A deeper cut than the About page summary — full case studies, build logs, and the
              numbers behind each initiative. Real entries land here as projects ship.
            </p>
          </ScrollReveal>

          {/* Stats strip */}
          <ScrollReveal distance={60}>
            <div className="glass-strong mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cyan-glow/15 sm:grid-cols-4">
              <Stat label="Case Studies" value="—" />
              <Stat label="Initiatives" value="—" />
              <Stat label="Experiments" value="—" />
              <Stat label="In progress" value="—" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter pills */}
      <section className="px-6 sm:px-10 lg:px-20">
        <div className="container-max">
          <ScrollReveal distance={40}>
            <div className="flex flex-wrap items-center gap-3 border-y border-white/5 py-5">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/68">
                <Filter size={12} />
                Filter
              </span>
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  data-cursor="hover"
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                    active === f
                      ? 'border-cyan-glow/60 bg-cyan-glow/15 text-cyan-glow shadow-glow-sm'
                      : 'border-white/10 bg-white/[0.03] text-white/80 hover:border-cyan-glow/30 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured project */}
      <section className="px-6 pt-14 sm:px-10 lg:px-20">
        <div className="container-max">
          <ScrollReveal distance={80} scaleFrom={0.96}>
            <FeaturedCard />
          </ScrollReveal>
        </div>
      </section>

      {/* Project grid */}
      <section className="section-pad pt-14">
        <div className="container-max">
          <div className="mb-8 flex items-end justify-between">
            <ScrollReveal distance={40}>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-glow/80">
                  All Projects
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                  Working catalogue
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal distance={30}>
              <span className="hidden text-xs uppercase tracking-wider text-white/62 sm:block">
                {projects.length} placeholder slots
              </span>
            </ScrollReveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ScrollReveal key={p.id} distance={70} data-cursor="hover">
                <ProjectCard project={p} index={i} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal distance={40}>
            <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-cyan-glow/25 bg-cyan-glow/[0.03] py-6 font-mono text-xs uppercase tracking-[0.3em] text-cyan-glow/60">
              <Plus size={14} />
              Add a project — drop content into projects array
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

function FeaturedCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyan-glow/20 bg-ink-800/60 backdrop-blur-xl">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-glow/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-cyan-deep/30 blur-3xl" />

      <div className="relative grid gap-0 lg:grid-cols-[1.1fr_1fr]">
        {/* Cover slot */}
        <div className="img-placeholder relative aspect-[16/10] overflow-hidden lg:aspect-auto">
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-3 text-cyan-glow/70">
              <ImagePlus size={36} />
              <p className="font-mono text-[11px] uppercase tracking-[0.3em]">Featured cover</p>
              <p className="text-[11px] text-white/58">Drop a hero image when ready</p>
            </div>
          </div>
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-md border border-cyan-glow/40 bg-ink-900/70 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-glow/90">
            <Star size={11} />
            Featured
          </span>
        </div>

        {/* Detail */}
        <div className="space-y-5 p-7 sm:p-9 lg:p-10">
          <span className="badge w-fit">
            <Sparkles size={11} />
            Case Study
          </span>

          <div>
            <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Project title — coming soon
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              A short pitch goes here. What was the goal, what did you build, what was the outcome?
              The featured slot is for your strongest work — a marketing plan, a competition entry, or a
              shipped initiative.
            </p>
          </div>

          {/* meta rows */}
          <div className="space-y-3 border-t border-white/5 pt-5">
            <MetaRow label="Role" value="Lead / Strategist" placeholder />
            <MetaRow label="Outcome" value="Result + measurable impact" placeholder />
            <MetaRow label="Stack" value="Tools + methodology" placeholder />
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {['Strategy', 'Marketing', 'Leadership', 'Execution'].map((t) => (
              <span
                key={t}
                className="rounded-full border border-cyan-glow/20 bg-cyan-glow/5 px-3 py-1 text-[11px] font-medium text-cyan-glow"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              data-cursor="hover"
              className="magnetic-button inline-flex items-center gap-2 rounded-full bg-cyan-glow px-5 py-2.5 text-xs font-semibold text-ink-900 shadow-glow transition-transform hover:scale-[1.03]"
            >
              <ExternalLink size={14} />
              Read case study
            </button>
            <button
              type="button"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/5 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:border-cyan-glow hover:bg-cyan-glow/10"
            >
              <Github size={14} />
              Source
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetaRow({ label, value, placeholder }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-glow/80">
        {label}
      </span>
      <span className={`text-sm ${placeholder ? 'text-white/62' : 'text-white/85'}`}>{value}</span>
    </div>
  )
}

function ProjectCard({ project, index }) {
  return (
    <GlowCard className="group flex h-full flex-col overflow-hidden">
      {/* cover */}
      <div className="img-placeholder relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 grid place-items-center">
          <FolderGit2 className="text-cyan-glow/40" size={32} />
        </div>
        <span className="absolute left-3 top-3 rounded-md border border-cyan-glow/30 bg-ink-900/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-glow/80">
          {String(index + 1).padStart(2, '0')} · {project.category}
        </span>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-glow/80">
          <Layers size={11} />
          {project.tag}
        </p>
        <div className="h-5 w-3/4 rounded-md bg-white/10" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded-md bg-white/[0.06]" />
          <div className="h-3 w-[88%] rounded-md bg-white/[0.06]" />
          <div className="h-3 w-2/3 rounded-md bg-white/[0.06]" />
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/72">
            <Target size={10} />
            Goal · TBD
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/72">
            Status · Planned
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-glow/80">
            Project #{String(index + 1).padStart(2, '0')}
          </span>
          <motion.span
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-glow"
          >
            View
            <ExternalLink size={11} />
          </motion.span>
        </div>
      </div>
    </GlowCard>
  )
}
