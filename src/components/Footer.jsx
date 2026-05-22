import { ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { profile, navLinks } from '../data/portfolioData'

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-white/5 bg-ink-950/60 backdrop-blur">
      <div className="container-max flex flex-col gap-8 px-6 py-12 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-20">
        <div>
          <p className="font-display text-2xl font-bold text-white">{profile.name}</p>
          <p className="mt-1 text-sm text-white/72">
            {profile.role} · {profile.subRole}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/72">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-cursor="hover"
              className="transition-colors hover:text-cyan-glow"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={scrollTop}
          data-cursor="hover"
          className="magnetic-button inline-flex items-center gap-2 self-start rounded-full border border-cyan-glow/30 bg-cyan-glow/5 px-4 py-2 text-sm font-medium text-cyan-glow transition-all hover:border-cyan-glow hover:bg-cyan-glow/10 lg:self-auto"
        >
          Back to top
          <ArrowUp size={14} />
        </button>
      </div>

      <div className="border-t border-white/5">
        <div className="container-max flex flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-white/58 sm:flex-row sm:px-10 lg:px-20">
          <p>© {new Date().getFullYear()} {profile.name}. Immersed In Knowledge, Committed To Excellence.</p>
          <p className="font-mono uppercase tracking-[0.25em]">React · Tailwind · Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}
