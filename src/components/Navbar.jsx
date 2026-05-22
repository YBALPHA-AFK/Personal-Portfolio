import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, profile } from '../data/portfolioData'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (to) => {
    if (to === '/') return pathname === '/' || pathname === '/about'
    return pathname.startsWith(to)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-3 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
        scrolled ? 'w-[94%] sm:w-[88%]' : 'w-[96%] sm:w-[92%]'
      } max-w-3xl`}
    >
      <div
        className={`flex items-center gap-2 rounded-full px-3 py-2 transition-all duration-500 ${
          scrolled
            ? 'glass-strong shadow-[0_8px_40px_-12px_rgba(0,218,255,0.25)]'
            : 'glass'
        }`}
      >
        <Link to="/" className="group flex items-center gap-2.5" data-cursor="hover">
          <motion.span
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-glow/30 bg-cyan-glow/5 font-display text-sm font-bold text-cyan-glow shadow-glow-sm"
          >
            {profile.initials}
          </motion.span>
          <span className="hidden font-display text-sm font-medium tracking-tight text-white/90 sm:block">
            {profile.name}
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="ml-2 hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              data-cursor="hover"
              className="relative whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:text-white"
            >
              {isActive(link.to) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-cyan-glow/10 ring-1 ring-cyan-glow/30"
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                />
              )}
              <span className={`relative ${isActive(link.to) ? 'text-cyan-glow' : ''}`}>
                {link.label}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            data-cursor="hover"
            className="hidden whitespace-nowrap rounded-full bg-cyan-glow px-3.5 py-1.5 text-[13px] font-semibold text-ink-900 transition-all hover:shadow-glow lg:block"
          >
            Get In Touch
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/80 lg:hidden"
            data-cursor="hover"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="glass-strong mt-2 flex flex-col gap-1 rounded-2xl p-3 lg:hidden"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  isActive(link.to)
                    ? 'bg-cyan-glow/10 text-cyan-glow'
                    : 'text-white/80 hover:bg-cyan-glow/10 hover:text-cyan-glow'
                }`}
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href={`mailto:${profile.email}`}
              onClick={() => setOpen(false)}
              className="mt-1 rounded-xl bg-cyan-glow px-4 py-2.5 text-center text-sm font-semibold text-ink-900"
            >
              Get In Touch
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
