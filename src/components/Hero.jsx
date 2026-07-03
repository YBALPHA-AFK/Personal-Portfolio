import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDown, Mail, Linkedin, MapPin, Sparkles as SparklesIcon } from 'lucide-react'
import { profile } from '../data/portfolioData'
import AnimatedCounter from './AnimatedCounter'
import SplitText from './SplitText'

function Typewriter({ phrases, typeSpeed = 60, eraseSpeed = 30, hold = 1800 }) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const phrase = phrases[i % phrases.length]
    let t

    if (phase === 'typing') {
      if (text.length < phrase.length) {
        t = setTimeout(() => setText(phrase.slice(0, text.length + 1)), typeSpeed)
      } else {
        t = setTimeout(() => setPhase('erasing'), hold)
      }
    } else if (phase === 'erasing') {
      if (text.length > 0) {
        t = setTimeout(() => setText(phrase.slice(0, text.length - 1)), eraseSpeed)
      } else {
        setI((v) => v + 1)
        setPhase('typing')
      }
    }
    return () => clearTimeout(t)
  }, [text, phase, i, phrases, typeSpeed, eraseSpeed, hold])

  return (
    <span className="font-mono text-base sm:text-lg">
      <span className="text-cyan-glow">{text}</span>
      <span className="ml-0.5 inline-block h-5 w-[2px] -translate-y-0.5 bg-cyan-glow align-middle animate-blink" />
    </span>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  // Headshot tilt on mouse move
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const handleTilt = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setTilt({ rx: (py - 0.5) * -10, ry: (px - 0.5) * 10 })
  }
  const resetTilt = () => setTilt({ rx: 0, ry: 0 })

  // Aurora parallax — the two glow fields drift gently against the cursor,
  // giving the backdrop real depth. Normalized pointer position → springs.
  const pmx = useMotionValue(0)
  const pmy = useMotionValue(0)
  const auroraX1 = useSpring(useTransform(pmx, [-1, 1], [36, -36]), { stiffness: 40, damping: 20 })
  const auroraY1 = useSpring(useTransform(pmy, [-1, 1], [24, -24]), { stiffness: 40, damping: 20 })
  const auroraX2 = useSpring(useTransform(pmx, [-1, 1], [-48, 48]), { stiffness: 40, damping: 20 })
  const auroraY2 = useSpring(useTransform(pmy, [-1, 1], [-30, 30]), { stiffness: 40, damping: 20 })
  const handlePointer = (e) => {
    pmx.set((e.clientX / window.innerWidth) * 2 - 1)
    pmy.set((e.clientY / window.innerHeight) * 2 - 1)
  }

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={handlePointer}
      className="relative min-h-[100svh] overflow-hidden pt-28 sm:pt-32"
    >
      {/* aurora accents — cursor-parallaxed */}
      <motion.div
        aria-hidden
        style={{ x: auroraX1, y: auroraY1 }}
        className="pointer-events-none absolute -top-32 left-1/2 -z-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-cyan-glow/15 blur-[120px]"
      />
      <motion.div
        aria-hidden
        style={{ x: auroraX2, y: auroraY2 }}
        className="pointer-events-none absolute bottom-0 right-[-10%] -z-0 h-[420px] w-[520px] rounded-full bg-cyan-deep/15 blur-[140px]"
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="container-max relative grid items-center gap-12 px-6 pb-16 sm:px-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-20"
      >
        {/* Left: text */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="badge w-fit"
          >
            <SparklesIcon size={12} />
            Available for partnerships & mentorship
          </motion.div>

          <h1 className="font-display text-5xl font-bold leading-[1] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
            <SplitText
              text="Suhaan"
              delay={0.2}
              stagger={0.045}
              className="block text-white/95"
            />
            <span className="block">
              <SplitText
                text="Meerapatel"
                delay={0.45}
                stagger={0.04}
                unitClassName="bg-gradient-to-br from-cyan-glow via-cyan-soft to-cyan-glow bg-clip-text text-transparent"
              />
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="ml-3 inline-block h-2 w-16 origin-left rounded-full bg-cyan-glow shadow-glow"
              />
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex min-h-[28px] items-center gap-3"
          >
            <span className="h-px w-8 bg-cyan-glow/60" />
            <Typewriter phrases={profile.taglines} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            DECA <span className="text-cyan-glow">VP of Finance</span>. WFHS ’29. 3DE Leadership Academy.
            Building marketing plans, leadership systems, and competitive strategy with discipline
            and execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href="#experience"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 rounded-full bg-cyan-glow px-6 py-3 text-sm font-semibold text-ink-900 shadow-glow transition-[box-shadow,background] hover:shadow-glow-lg"
            >
              Explore my journey
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-glow hover:bg-cyan-glow/10"
            >
              <Mail size={16} />
              Contact
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:border-cyan-glow hover:text-cyan-glow"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 text-sm text-white/72"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} className="text-cyan-glow" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to opportunities
            </span>
          </motion.div>
        </div>

        {/* Right: headshot card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md sm:max-w-lg lg:mx-0 lg:max-w-xl xl:max-w-2xl"
          style={{ perspective: 1200 }}
        >
          {/* rotating gradient ring */}
          <div className="absolute inset-0 -m-3 rounded-[2rem] bg-gradient-to-br from-cyan-glow via-cyan-deep to-cyan-soft opacity-30 blur-2xl animate-tilt" />
          <div className="absolute inset-0 -m-1 rounded-[2rem] bg-gradient-conic from-cyan-glow via-transparent to-cyan-glow opacity-40 animate-spin-slow" />

          <motion.div
            ref={cardRef}
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="border-beam relative rounded-[1.75rem] border border-cyan-glow/25 bg-ink-800/80 p-3 backdrop-blur-xl"
            data-cursor="hover"
          >
            {/* Headshot */}
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-2xl"
              style={{ transform: 'translateZ(40px)' }}
            >
              <img
                src="/headshot.jpg"
                alt={`${profile.name || 'Portfolio'} headshot`}
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />

              {/* subtle cyan tint to keep the headshot on-brand */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />

              {/* corner brackets */}
              <CornerBrackets />

              {/* shimmer sweep */}
              <div className="pointer-events-none absolute inset-0 bg-shimmer-cyan bg-[length:200%_100%] animate-shimmer opacity-20" />
            </div>

            {/* floating chips */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transform: 'translateZ(60px)' }}
              className="absolute -left-6 top-12 hidden rounded-2xl border border-cyan-glow/30 bg-ink-900/90 px-4 py-3 backdrop-blur-md sm:block"
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-cyan-glow/70">Status</p>
              <p className="mt-0.5 text-sm font-semibold text-white">VP of Finance</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transform: 'translateZ(60px)' }}
              className="absolute -right-6 bottom-12 hidden rounded-2xl border border-cyan-glow/30 bg-ink-900/90 px-4 py-3 backdrop-blur-md sm:block"
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-cyan-glow/70">Class of</p>
              <p className="mt-0.5 text-sm font-semibold text-white">2029 · WFHS</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="container-max relative px-6 pb-16 sm:px-10 lg:px-20"
      >
        <div className="glass-strong grid grid-cols-2 overflow-hidden rounded-2xl border-cyan-glow/15 sm:grid-cols-4">
          {profile.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3 }}
              className={`group relative bg-ink-900/40 p-5 transition-colors hover:bg-ink-900/60 sm:p-6 ${
                i > 0 ? 'border-l border-cyan-glow/10' : ''
              } ${i === 2 ? 'sm:border-l sm:border-cyan-glow/10' : ''}`}
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <p className="font-display text-2xl font-bold text-cyan-glow sm:text-3xl">
                <AnimatedCounter value={s.value} duration={1.6 + i * 0.15} />
              </p>
              <p className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-white/72 sm:text-xs">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </section>
  )
}

function CornerBrackets() {
  const cls = 'absolute h-6 w-6 border-cyan-glow'
  return (
    <>
      <span className={`${cls} left-2 top-2 border-l-2 border-t-2`} />
      <span className={`${cls} right-2 top-2 border-r-2 border-t-2`} />
      <span className={`${cls} left-2 bottom-2 border-l-2 border-b-2`} />
      <span className={`${cls} right-2 bottom-2 border-r-2 border-b-2`} />
    </>
  )
}
