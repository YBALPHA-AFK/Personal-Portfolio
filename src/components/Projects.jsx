import { useEffect, useRef } from 'react'
import { FolderGit2, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import SectionHeading from './SectionHeading'
import GlowCard from './GlowCard'
import ScrollReveal from './ScrollReveal'

// Placeholder slots — fill in later with real project data.
const slots = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
]

export default function Projects() {
  const trackRef = useRef(null)
  const offsetRef = useRef(0)   // current rendered x (px)
  const targetRef = useRef(0)   // where we're heading
  const pausedRef = useRef(false)
  const halfWidthRef = useRef(0)

  // duplicate the list so the loop has no visible seam
  const looped = [...slots, ...slots]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const recalc = () => {
      // half the track holds one full copy of the list
      halfWidthRef.current = track.scrollWidth / 2
    }
    recalc()

    const ro = new ResizeObserver(recalc)
    ro.observe(track)

    let raf = 0
    let last = performance.now()
    const speed = 28 // px/sec auto-scroll

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      if (!pausedRef.current && !reduced) {
        targetRef.current += speed * dt
      }
      // smooth follow
      offsetRef.current += (targetRef.current - offsetRef.current) * Math.min(1, dt * 7)

      const hw = halfWidthRef.current
      if (hw > 0) {
        while (offsetRef.current >= hw) {
          offsetRef.current -= hw
          targetRef.current -= hw
        }
        while (offsetRef.current < 0) {
          offsetRef.current += hw
          targetRef.current += hw
        }
      }

      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  const nudge = (dir) => {
    const track = trackRef.current
    if (!track || !track.firstElementChild) return
    const card = track.firstElementChild
    const styles = window.getComputedStyle(track)
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0
    const step = card.getBoundingClientRect().width + gap
    targetRef.current += dir * step
  }

  return (
    <section id="projects" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          subtitle="A collection of initiatives, builds, and case studies — coming soon."
        />

        <div
          className="relative mt-14"
          onMouseEnter={() => { pausedRef.current = true }}
          onMouseLeave={() => { pausedRef.current = false }}
        >
          {/* edge fades */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink-900 to-transparent sm:w-24"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink-900 to-transparent sm:w-24"
          />

          {/* viewport */}
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex w-max gap-6 will-change-transform"
              style={{ transform: 'translate3d(0,0,0)' }}
            >
              {looped.map((s, i) => {
                const realIndex = i % slots.length
                return (
                  <div
                    key={`${s.id}-${i}`}
                    data-cursor="hover"
                    className="w-[280px] shrink-0 sm:w-[320px] lg:w-[360px]"
                  >
                    <GlowCard className="group flex h-full flex-col p-6">
                      {/* image / preview slot */}
                      <div className="img-placeholder relative mb-5 aspect-[16/10] overflow-hidden rounded-xl">
                        <div className="absolute inset-0 grid place-items-center">
                          <FolderGit2 className="text-cyan-glow/50" size={32} />
                        </div>
                        <span className="absolute left-3 top-3 rounded-md border border-cyan-glow/30 bg-ink-900/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-glow/80">
                          {String(realIndex + 1).padStart(2, '0')} · project
                        </span>
                      </div>

                      {/* title placeholder */}
                      <div className="h-5 w-2/3 rounded-md bg-white/10" />

                      {/* description placeholder lines */}
                      <div className="mt-3 space-y-2">
                        <div className="h-3 w-full rounded-md bg-white/[0.06]" />
                        <div className="h-3 w-[88%] rounded-md bg-white/[0.06]" />
                        <div className="h-3 w-3/4 rounded-md bg-white/[0.06]" />
                      </div>

                      {/* tag placeholders */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="h-6 w-16 rounded-full border border-white/10 bg-white/[0.04]" />
                        <span className="h-6 w-20 rounded-full border border-white/10 bg-white/[0.04]" />
                        <span className="h-6 w-14 rounded-full border border-white/10 bg-white/[0.04]" />
                      </div>

                      {/* footer */}
                      <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-glow/80">
                          Project #{String(realIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="rounded-full bg-cyan-glow/10 px-2 py-0.5 text-[10px] font-medium text-cyan-glow">
                          Soon
                        </span>
                      </div>
                    </GlowCard>
                  </div>
                )
              })}
            </div>
          </div>

          {/* nav arrows */}
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Previous projects"
            data-cursor="hover"
            className="absolute left-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-cyan-glow/30 bg-ink-900/70 text-white/80 backdrop-blur transition-colors hover:border-cyan-glow hover:text-cyan-glow sm:left-4"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Next projects"
            data-cursor="hover"
            className="absolute right-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-cyan-glow/30 bg-ink-900/70 text-white/80 backdrop-blur transition-colors hover:border-cyan-glow hover:text-cyan-glow sm:right-4"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* "add a project" trailing card */}
        <ScrollReveal distance={60} className="mt-6">
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-cyan-glow/25 bg-cyan-glow/[0.03] py-5 font-mono text-xs uppercase tracking-[0.3em] text-cyan-glow/60">
            <Plus size={14} />
            More projects coming
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
