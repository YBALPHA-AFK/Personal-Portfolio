import { motion } from 'framer-motion'
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowUpRight,
  Tag,
  Sparkles,
  PenLine,
  Rss,
  Bookmark,
} from 'lucide-react'
import GlowCard from '../components/GlowCard'
import ScrollReveal from '../components/ScrollReveal'

// Each entry can be filled in later. Set `url` to the external article link
// (LinkedIn / Medium / Substack / personal blog) — the card opens in a new tab.
//   {
//     title: 'How DECA taught me to write a 30-page strategic plan',
//     excerpt: 'Lessons on constraint-driven thinking from competition prep.',
//     category: 'Leadership',
//     date: 'Jul 2026',
//     readTime: '6 min read',
//     url: 'https://...',
//     featured: true,
//   }
const articles = [
  { id: 1, category: 'Leadership', featured: true },
  { id: 2, category: 'Strategy' },
  { id: 3, category: 'Marketing' },
  { id: 4, category: 'Lessons Learned' },
  { id: 5, category: 'Process' },
  { id: 6, category: 'Reflection' },
  { id: 7, category: 'AI Fluency' },
]

const categories = ['All', 'Leadership', 'Strategy', 'Marketing', 'AI Fluency', 'Reflection']

export default function BlogPage() {
  const featured = articles.find((a) => a.featured) || articles[0]
  const rest = articles.filter((a) => a.id !== featured.id)

  return (
    <div className="relative">
      {/* Hero header */}
      <section className="section-pad pt-40 lg:pt-48">
        <div className="container-max">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <ScrollReveal distance={60}>
                <span className="badge">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-glow-sm" />
                  Blog · Notes & essays
                </span>
              </ScrollReveal>

              <ScrollReveal distance={70}>
                <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                  <span className="text-gradient">Thinking out loud.</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal distance={50}>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                  Articles on leadership, marketing strategy, AI fluency, and the lessons I'm
                  picking up along the way. New entries link out to where they live.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal distance={50} from="right">
              <div className="glass-strong rounded-2xl border-cyan-glow/15 p-6">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-glow/30 bg-cyan-glow/10 text-cyan-glow">
                    <PenLine size={18} />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-white">
                      Writing in progress
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/72">
                      Articles ship as I finish them. The cards below are reserved slots — drop a
                      title, excerpt, and external URL into the <code className="font-mono text-cyan-glow">articles</code> array.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-white/5 pt-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-glow/20 bg-cyan-glow/5 px-3 py-1 text-[11px] font-medium text-cyan-glow">
                    <Sparkles size={11} />
                    {articles.length} drafts queued
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-white/80">
                    <Rss size={11} />
                    RSS coming
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Category pills */}
      <section className="px-6 sm:px-10 lg:px-20">
        <div className="container-max">
          <ScrollReveal distance={40}>
            <div className="flex flex-wrap items-center gap-3 border-y border-white/5 py-5">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/68">
                <Tag size={12} />
                Topics
              </span>
              {categories.map((c, i) => (
                <button
                  key={c}
                  type="button"
                  data-cursor="hover"
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                    i === 0
                      ? 'border-cyan-glow/60 bg-cyan-glow/15 text-cyan-glow shadow-glow-sm'
                      : 'border-white/10 bg-white/[0.03] text-white/80 hover:border-cyan-glow/30 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured article */}
      <section className="px-6 pt-14 sm:px-10 lg:px-20">
        <div className="container-max">
          <ScrollReveal distance={70} scaleFrom={0.96}>
            <FeaturedArticle article={featured} />
          </ScrollReveal>
        </div>
      </section>

      {/* Article grid */}
      <section className="section-pad pt-14">
        <div className="container-max">
          <div className="mb-8 flex items-end justify-between">
            <ScrollReveal distance={40}>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-glow/80">
                  Recent
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                  Latest articles
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal distance={30}>
              <span className="hidden text-xs uppercase tracking-wider text-white/62 sm:block">
                {rest.length} reserved slots
              </span>
            </ScrollReveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <ScrollReveal key={a.id} distance={70} data-cursor="hover">
                <ArticleCard article={a} index={i + 1} />
              </ScrollReveal>
            ))}
          </div>

          {/* Subscribe CTA */}
          <ScrollReveal distance={50}>
            <div className="mt-14 grid gap-6 rounded-3xl border border-cyan-glow/20 bg-ink-800/60 p-8 backdrop-blur-xl sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  Want updates when new articles ship?
                </h3>
                <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                  This space is reserved for an email signup or LinkedIn follow CTA. Drop a form,
                  Substack embed, or LinkedIn newsletter link here when ready.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                <button
                  type="button"
                  data-cursor="hover"
                  className="magnetic-button inline-flex items-center gap-2 rounded-full bg-cyan-glow px-5 py-2.5 text-sm font-semibold text-ink-900 shadow-glow transition-transform hover:scale-[1.03]"
                >
                  <Bookmark size={14} />
                  Subscribe — coming soon
                </button>
                <button
                  type="button"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/5 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-cyan-glow hover:bg-cyan-glow/10"
                >
                  <Rss size={14} />
                  RSS feed
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

function FeaturedArticle({ article }) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-cyan-glow/20 bg-ink-800/60 backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-glow/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-deep/30 blur-3xl" />

      <div className="relative grid gap-0 lg:grid-cols-[1.1fr_1fr]">
        {/* Cover */}
        <div className="img-placeholder relative aspect-[16/10] overflow-hidden lg:aspect-auto">
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-3 text-cyan-glow/70">
              <BookOpen size={36} />
              <p className="font-mono text-[11px] uppercase tracking-[0.3em]">Featured cover</p>
              <p className="text-[11px] text-white/58">Hero image for the headline article</p>
            </div>
          </div>
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-md border border-cyan-glow/40 bg-ink-900/70 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-glow/90">
            <Sparkles size={11} />
            Featured · {article.category}
          </span>
        </div>

        {/* Detail */}
        <div className="space-y-5 p-7 sm:p-9 lg:p-10">
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/72">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} className="text-cyan-glow/70" />
              Date · TBD
            </span>
            <span className="h-3 w-px bg-white/10" />
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} className="text-cyan-glow/70" />
              ~ min read
            </span>
          </div>

          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Headline article — drop a title here
          </h2>

          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            Two or three sentences of excerpt that pull the reader in. The featured slot is for your
            most important essay — a manifesto, a long-form lesson, or a published case study you
            want to surface above the rest.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {['Leadership', 'Strategy', 'Long read'].map((t) => (
              <span
                key={t}
                className="rounded-full border border-cyan-glow/20 bg-cyan-glow/5 px-3 py-1 text-[11px] font-medium text-cyan-glow"
              >
                #{t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              type="button"
              data-cursor="hover"
              className="magnetic-button inline-flex items-center gap-2 rounded-full bg-cyan-glow px-5 py-2.5 text-xs font-semibold text-ink-900 shadow-glow transition-transform hover:scale-[1.03]"
            >
              Read article
              <ArrowUpRight size={14} />
            </button>
            <span className="text-[11px] uppercase tracking-wider text-white/58">
              Hosted externally · LinkedIn / Medium / Substack
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

function ArticleCard({ article, index }) {
  return (
    <GlowCard className="group flex h-full flex-col overflow-hidden">
      {/* cover */}
      <div className="img-placeholder relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 grid place-items-center">
          <BookOpen className="text-cyan-glow/40" size={28} />
        </div>
        <span className="absolute left-3 top-3 rounded-md border border-cyan-glow/30 bg-ink-900/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-glow/80">
          {String(index).padStart(2, '0')} · {article.category}
        </span>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-3 text-[10px] text-white/62">
          <span className="inline-flex items-center gap-1">
            <Calendar size={11} className="text-cyan-glow/70" />
            Date · TBD
          </span>
          <span className="h-2 w-px bg-white/10" />
          <span className="inline-flex items-center gap-1">
            <Clock size={11} className="text-cyan-glow/70" />
            ~ min
          </span>
        </div>

        <div>
          <div className="h-5 w-4/5 rounded-md bg-white/10" />
          <div className="mt-2 h-5 w-2/3 rounded-md bg-white/10" />
        </div>

        <div className="space-y-2">
          <div className="h-3 w-full rounded-md bg-white/[0.06]" />
          <div className="h-3 w-[92%] rounded-md bg-white/[0.06]" />
          <div className="h-3 w-3/4 rounded-md bg-white/[0.06]" />
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-glow/80">
            Article #{String(index).padStart(2, '0')}
          </span>
          <motion.span
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-glow"
          >
            Read
            <ArrowUpRight size={11} />
          </motion.span>
        </div>
      </div>
    </GlowCard>
  )
}
