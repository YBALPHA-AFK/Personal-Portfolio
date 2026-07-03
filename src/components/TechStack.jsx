import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Zap, Sparkles } from 'lucide-react'
import SectionHeading from './SectionHeading'
import ScrollReveal from './ScrollReveal'

// Rotating spotlight at the top of the section. Each variant carries its own
// product mark — splat (Claude logo), lightning bolt, and robot.
const claudeVariants = [
  {
    name: 'Chat',
    pillIcon: Sparkles,
    tag: 'Long-form thinking, drafts, research.',
    renderLogo: (size) => (
      <img
        src="https://cdn.simpleicons.org/claude/D97757"
        alt="Claude Chat"
        width={size}
        height={size}
        style={{ filter: 'drop-shadow(0 0 36px rgba(217,119,87,0.55))' }}
        loading="eager"
      />
    ),
  },
  {
    name: 'CoWork',
    pillIcon: Zap,
    tag: 'Drafting alongside the whole team.',
    renderLogo: (size) => (
      <Zap
        size={size}
        strokeWidth={1.6}
        fill="#D97757"
        className="text-orange-300"
        style={{ filter: 'drop-shadow(0 0 36px rgba(217,119,87,0.6))' }}
      />
    ),
  },
  {
    name: 'Code',
    pillIcon: Bot,
    tag: 'Pair-programming inside the terminal.',
    renderLogo: (size) => (
      <Bot
        size={size}
        strokeWidth={1.6}
        className="text-orange-300"
        style={{ filter: 'drop-shadow(0 0 36px rgba(217,119,87,0.6))' }}
      />
    ),
  },
]

// slug → Simple Icons CDN. `initial` is used when no slug exists or the CDN
// fails to load (graceful fallback to a colored letter chip).
const techStack = [
  {
    name: 'LLMs',
    items: [
      { name: 'Claude', slug: 'claude', color: 'D97757' },
      { name: 'ChatGPT', slug: null, color: '10A37F', initial: 'C' },
      { name: 'Gemini', slug: 'googlegemini', color: '8E75B2' },
      { name: 'Grok', slug: 'x', color: 'FFFFFF' },
    ],
  },
  {
    name: 'Frameworks & Libraries',
    items: [
      { name: 'Ollama', slug: 'ollama', color: 'FFFFFF' },
      { name: 'React', slug: 'react', color: '61DAFB' },
      { name: 'Angular', slug: 'angular', color: 'DD0031' },
      { name: 'TensorFlow', slug: 'tensorflow', color: 'FF6F00' },
      { name: 'PyTorch', slug: 'pytorch', color: 'EE4C2C' },
      { name: 'NumPy', slug: 'numpy', color: '4DABCF' },
    ],
  },
  {
    name: 'Cloud Platforms',
    items: [
      { name: 'Vercel', slug: 'vercel', color: 'FFFFFF' },
      { name: 'Google Cloud', slug: 'googlecloud', color: '4285F4' },
      // Simple Icons dropped the AWS mark (trademark) — use the initial chip
      { name: 'AWS', slug: null, color: 'FF9900', initial: 'A' },
      { name: 'GitHub', slug: 'github', color: 'FFFFFF' },
      { name: 'Supabase', slug: 'supabase', color: '3FCF8E' },
    ],
  },
  {
    name: 'Languages',
    items: [
      { name: 'Python', slug: 'python', color: '3776AB' },
      { name: 'Java', slug: 'openjdk', color: 'FFFFFF', initial: 'J' },
      { name: 'Swift', slug: 'swift', color: 'F05138' },
      { name: 'HTML/CSS', slug: 'html5', color: 'E34F26' },
      { name: 'Javascript', slug: 'javascript', color: 'F7DF1E' },
      { name: 'C++', slug: 'cplusplus', color: '00599C' },
    ],
  },
  {
    name: 'AI Tools',
    items: [
      { name: 'Lovable', slug: null, color: 'FF6B6B', initial: 'L' },
      { name: 'Manus', slug: null, color: '8B5CF6', initial: 'M' },
      { name: 'Perplexity', slug: 'perplexity', color: '20808D' },
      { name: 'NotebookLM', slug: 'notebooklm', color: '4285F4' },
      { name: 'ElevenLabs', slug: 'elevenlabs', color: 'FFFFFF' },
      { name: 'GAMMA', slug: null, color: 'C026D3', initial: 'G' },
    ],
  },
  {
    name: 'Workflows',
    items: [
      { name: 'N8N', slug: 'n8n', color: 'EA4B71' },
      { name: 'Zapier', slug: 'zapier', color: 'FF4F00' },
      { name: 'Make', slug: 'make', color: '6D00CC', initial: 'M' },
    ],
  },
]

export default function TechStack() {
  return (
    <section id="tech-stack" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Tech Stack"
          title="My Tech Tool Arsenal"
          subtitle="From conversational AI to production code — the full kit I reach for."
          align="center"
        />

        {/* Claude Specialist hero — rotating spotlight */}
        <ScrollReveal distance={70} className="mt-14">
          <ClaudeSpecialistCard />
        </ScrollReveal>

        {/* Categories — one card per group */}
        <div className="mt-16 space-y-8 lg:space-y-10">
          {techStack.map((cat, i) => (
            <ScrollReveal
              key={cat.name}
              distance={50}
              from={i % 2 === 0 ? 'left' : 'right'}
            >
              <CategoryRow category={cat} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClaudeSpecialistCard() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setIndex((v) => (v + 1) % claudeVariants.length),
      3500,
    )
    return () => clearInterval(id)
  }, [])

  const current = claudeVariants[index]

  return (
    <div
      className="border-beam relative overflow-hidden rounded-3xl border border-orange-400/30 bg-gradient-to-br from-orange-500/10 via-ink-900/80 to-amber-700/10 px-6 py-12 backdrop-blur-xl sm:px-10 sm:py-16 lg:px-14 lg:py-20"
      style={{ '--beam-c1': '#ffb38a', '--beam-c2': 'rgba(217,119,87,0.45)' }}
    >
      {/* glow accents */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-orange-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl" />

      {/* grid bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(217,119,87,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,87,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative flex flex-col items-center text-center">
        {/* Eyebrow chip */}
        <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/40 bg-orange-500/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.32em] text-orange-200">
          <Sparkles size={13} />
          Specialty
        </span>

        {/* "Claude Expert" — large gradient heading */}
        <h3 className="mt-5 bg-gradient-to-r from-orange-300 via-amber-200 to-orange-400 bg-clip-text font-display text-5xl font-bold leading-[1.05] tracking-tight text-transparent sm:text-6xl lg:text-7xl">
          Claude Expert
        </h3>

        {/* "4x Anthropic Certified" subline */}
        <p className="mt-4 font-display text-lg font-medium text-orange-100/80 sm:text-xl">
          4x Anthropic Certified
        </p>

        {/* Rotating product logo — large, centered */}
        <div className="relative mt-12 sm:mt-14">
          <span className="pointer-events-none absolute inset-0 rounded-[2rem] bg-orange-400/30 blur-3xl" />
          <div className="relative grid h-56 w-56 place-items-center rounded-[2rem] border border-orange-400/40 bg-ink-900/80 shadow-[0_0_80px_-10px_rgba(217,119,87,0.65)] sm:h-64 sm:w-64 lg:h-72 lg:w-72">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ opacity: 0, scale: 0.5, rotate: -25 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 25 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="grid place-items-center"
              >
                {current.renderLogo(140)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Rotating word — Chat / CoWork / Code */}
        <div className="mt-10 flex h-[4.5rem] items-center justify-center sm:h-24 lg:h-28">
          <AnimatePresence mode="wait">
            <motion.span
              key={current.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-gradient-to-r from-orange-300 via-amber-200 to-orange-400 bg-clip-text font-display text-6xl font-bold leading-none tracking-tight text-transparent sm:text-7xl lg:text-8xl"
            >
              {current.name}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Tag line */}
        <AnimatePresence mode="wait">
          <motion.p
            key={current.tag}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="mt-6 max-w-xl text-base text-white/80 sm:text-lg"
          >
            {current.tag}
          </motion.p>
        </AnimatePresence>

        {/* Variant pills — clickable shortcuts */}
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {claudeVariants.map((v, i) => {
            const Icon = v.pillIcon
            const active = i === index
            return (
              <button
                key={v.name}
                onClick={() => setIndex(i)}
                data-cursor="hover"
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                  active
                    ? 'border-orange-300/70 bg-orange-500/20 text-orange-100 shadow-[0_0_20px_-5px_rgba(217,119,87,0.7)]'
                    : 'border-white/10 bg-white/[0.03] text-white/72 hover:border-orange-300/40 hover:text-white'
                }`}
              >
                <Icon size={13} />
                Claude {v.name}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function CategoryRow({ category }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-ink-800/40 p-6 backdrop-blur-md transition-colors hover:border-cyan-glow/30 sm:p-8 lg:p-10">
      <div className="mb-8 border-b border-white/10 pb-5 text-center sm:mb-10 sm:pb-6">
        <h3 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {category.name}
        </h3>
        <span className="mx-auto mt-3 block h-px w-16 bg-gradient-to-r from-transparent via-cyan-glow/60 to-transparent" />
      </div>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
        {category.items.map((item) => (
          <TechChip key={item.name} item={item} />
        ))}
      </div>
    </div>
  )
}

function TechChip({ item }) {
  return (
    <div
      className="group inline-flex w-36 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-ink-900/70 px-4 py-6 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-glow/40 hover:bg-cyan-glow/5 hover:shadow-glow-sm sm:w-44 sm:gap-4 sm:px-5 sm:py-8"
      data-cursor="hover"
    >
      <BrandLogo
        name={item.name}
        slug={item.slug}
        color={item.color}
        initial={item.initial}
        size={56}
      />
      <span className="text-base font-semibold text-white/90 transition-colors group-hover:text-white sm:text-lg">
        {item.name}
      </span>
    </div>
  )
}

function BrandLogo({ name, slug, color, initial, size = 20 }) {
  const [errored, setErrored] = useState(false)

  if (!slug || errored) {
    return (
      <span
        className="grid shrink-0 place-items-center rounded-md font-display font-bold text-white ring-1 ring-white/15"
        style={{
          width: size,
          height: size,
          fontSize: Math.round(size * 0.5),
          backgroundColor: `#${color || '00DAFF'}`,
          textShadow: '0 1px 2px rgba(0,0,0,0.45)',
        }}
        aria-label={`${name} logo`}
      >
        {initial || name.charAt(0)}
      </span>
    )
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color || 'FFFFFF'}`}
      alt={`${name} logo`}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setErrored(true)}
      className="shrink-0"
    />
  )
}
