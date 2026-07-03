import { useEffect, useMemo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Camera,
  ImagePlus,
  Filter,
  Grid3x3,
  Heart,
  ZoomIn,
  Sparkles,
  Trophy,
  Users,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import SplitText from '../components/SplitText'

const filters = [
  { id: 'all', label: 'All', icon: Grid3x3 },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'competitions', label: 'Competitions', icon: Trophy },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'bts', label: 'Behind the scenes', icon: Sparkles },
]

/**
 * Add a photo by dropping a file into `public/gallery/` and adding an entry below.
 *
 *   {
 *     src:      '/gallery/your-file.jpg',  // path under public/
 *     caption:  'Short caption',           // shown on hover + in lightbox
 *     category: 'events',                  // one of the filter ids above
 *     size:     'lg',                      // 'sm' (1x1) | 'md' (1x2 tall) | 'wide' (2x1) | 'lg' (2x2)
 *     focus:    '50% 30%',                 // optional CSS object-position to keep face in frame
 *   }
 *
 * Order in the array = order on the page. Entries with no `src` render as
 * styled placeholders so the layout still looks intentional before photos arrive.
 */
const photos = [
  { size: 'lg', src: '/gallery/IMG_4676.jpg', focus: '50% 28%', category: 'team', caption: '26-27 Inauguration Day' },
  { size: 'sm', category: 'team', caption: 'Detail' },
  { size: 'sm', category: 'team', caption: 'Portrait' },
  { size: 'md', src: '/gallery/IMG_7737.jpg', focus: '50% 35%', category: 'competitions', caption: 'FLDC 2026' },
  { size: 'wide', category: 'events', caption: 'Wide moment' },
  { size: 'sm', category: 'bts', caption: 'Snapshot' },
  { size: 'sm', category: 'bts', caption: 'Detail' },
  { size: 'lg', src: '/gallery/IMG_4629.jpg', focus: '50% 30%', category: 'competitions', caption: 'Rishin Shah - 25-26 Georgia VP of Finance' },
  { size: 'sm', category: 'team', caption: 'Quick capture' },
  { size: 'md', src: '/gallery/IMG_4652.jpg', focus: '50% 35%', category: 'events', caption: 'Hannah Heidari - 25-26 NARVP' },
  { size: 'wide', category: 'team', caption: 'Group shot' },
  { size: 'sm', category: 'competitions', caption: 'Spotlight' },
  { size: 'lg', src: '/gallery/IMG_4668.jpg', focus: '50% 30%', category: 'events', caption: 'Mason St. Jean - 25-26 SRVP' },
  { size: 'sm', src: '/gallery/IMG_4654.jpg', focus: '60% 22%', category: 'bts', caption: 'Cullen Watanuki - 25-26 CRVP' },
  { size: 'sm', category: 'team', caption: 'Reaction' },
  { size: 'md', src: '/gallery/IMG_4637.jpg', focus: '60% 30%', category: 'competitions', caption: 'Conference floor' },
  { size: 'wide', category: 'events', caption: 'Crowd shot' },
  { size: 'sm', category: 'competitions', caption: 'Award close-up' },
  { size: 'sm', category: 'events', caption: 'Hand-off' },
  { size: 'lg', category: 'competitions', caption: 'Big moment' },
  { size: 'sm', category: 'bts', caption: 'Quick frame' },
  { size: 'md', src: '/gallery/IMG_6155.jpg', focus: '50% 40%', category: 'team', caption: 'FLDC 2026 Networking' },
  { size: 'wide', category: 'events', caption: 'Panorama' },
  { size: 'sm', category: 'bts', caption: 'Detail #2' },
  { size: 'lg', category: 'events', caption: 'Stage moment' },
  { size: 'sm', category: 'competitions', caption: 'Quick note' },
  { size: 'sm', category: 'bts', caption: 'Setup detail' },
  { size: 'md', category: 'team', caption: 'Tall capture' },
  { size: 'wide', category: 'competitions', caption: 'Wide stage' },
  { size: 'sm', category: 'events', caption: 'Snapshot #2' },
  { size: 'sm', category: 'team', caption: 'Hand-off #2' },
  { size: 'lg', category: 'bts', caption: 'Behind the scenes' },
  { size: 'sm', category: 'events', caption: 'Quick frame #2' },
  { size: 'md', category: 'competitions', caption: 'Tall portrait #2' },
  { size: 'wide', category: 'team', caption: 'Group huddle' },
  { size: 'sm', category: 'bts', caption: 'Candid #2' },
  { size: 'lg', category: 'team', caption: 'Feature block' },
  { size: 'sm', category: 'competitions', caption: 'Trophy detail' },
  { size: 'sm', category: 'events', caption: 'Reaction #2' },
  { size: 'md', category: 'events', caption: 'Vertical capture #2' },
]

const sizeMap = {
  sm:   { span: 'col-span-1 row-span-1', aspect: 'aspect-square' },
  md:   { span: 'col-span-1 row-span-2', aspect: 'aspect-[3/5]' },
  wide: { span: 'col-span-2 row-span-1', aspect: 'aspect-[16/9]' },
  lg:   { span: 'col-span-2 row-span-2', aspect: 'aspect-[4/3]' },
}

export default function GalleryPage() {
  const [active, setActive] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const visible = useMemo(
    () => photos.filter((p) => active === 'all' || p.category === active),
    [active],
  )

  // Only real photos (with src) are navigable in the lightbox
  const lightboxList = useMemo(
    () => visible.filter((p) => Boolean(p.src)),
    [visible],
  )

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + lightboxList.length) % lightboxList.length,
    )
  }, [lightboxList.length])
  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % lightboxList.length))
  }, [lightboxList.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightboxIndex, closeLightbox, goPrev, goNext])

  const realCount = photos.filter((p) => p.src).length
  const visibleRealCount = visible.filter((p) => p.src).length

  return (
    <div className="relative">
      {/* Hero header */}
      <section className="section-pad pt-40 lg:pt-48">
        <div className="container-max">
          <ScrollReveal distance={60}>
            <span className="badge">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-glow-sm" />
              Gallery · Visual log
            </span>
          </ScrollReveal>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <SplitText
              text="Moments worth keeping."
              by="word"
              stagger={0.08}
              delay={0.1}
              hoverLift={false}
              unitClassName="text-gradient"
            />
          </h1>

          <ScrollReveal distance={50}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Conferences, competitions, team huddles, and the in-between. A growing collage —
              drop your photos in and the layout takes care of the rest.
            </p>
          </ScrollReveal>

          <ScrollReveal distance={40}>
            <div className="mt-8 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.28em] text-white/62">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-glow-sm" />
                {realCount} photo{realCount === 1 ? '' : 's'} live
              </span>
              <span className="h-px w-8 bg-white/15" />
              <span>{photos.length - realCount} placeholder slot{photos.length - realCount === 1 ? '' : 's'}</span>
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
              {filters.map((f) => {
                const Icon = f.icon
                const count =
                  f.id === 'all'
                    ? photos.length
                    : photos.filter((p) => p.category === f.id).length
                return (
                  <button
                    key={f.id}
                    onClick={() => setActive(f.id)}
                    data-cursor="hover"
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                      active === f.id
                        ? 'border-cyan-glow/60 bg-cyan-glow/15 text-cyan-glow shadow-glow-sm'
                        : 'border-white/10 bg-white/[0.03] text-white/80 hover:border-cyan-glow/30 hover:text-white'
                    }`}
                  >
                    <Icon size={12} />
                    {f.label}
                    <span className={`ml-1 rounded-md px-1.5 py-px font-mono text-[10px] ${
                      active === f.id ? 'bg-cyan-glow/20 text-cyan-glow' : 'bg-white/5 text-white/68'
                    }`}>
                      {count}
                    </span>
                  </button>
                )
              })}

              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.28em] text-white/58">
                Showing {visible.length} · {visibleRealCount} live
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Collage grid */}
      <section className="px-6 pt-10 sm:px-10 lg:px-20">
        <div className="container-max">
          <motion.div
            layout
            className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
            style={{ gridAutoRows: 'minmax(180px, auto)' }}
          >
            <AnimatePresence mode="popLayout">
              {visible.map((photo, i) => {
                const dims = sizeMap[photo.size] || sizeMap.sm
                const lightboxIdx = photo.src
                  ? lightboxList.findIndex((p) => p === photo)
                  : -1
                return (
                  <motion.div
                    layout
                    key={`${photo.caption}-${i}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.45, delay: Math.min(i * 0.02, 0.3), ease: [0.16, 1, 0.3, 1] }}
                    className={dims.span}
                  >
                    <Tile
                      photo={photo}
                      aspect={dims.aspect}
                      index={i}
                      onOpen={lightboxIdx >= 0 ? () => setLightboxIndex(lightboxIdx) : null}
                    />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 bg-ink-900/40 p-12 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/68">
                Nothing in this category yet
              </p>
              <p className="mt-2 text-sm text-white/58">
                Try switching filters or add a photo to this category.
              </p>
            </div>
          )}

          {/* Featured strip */}
          <ScrollReveal distance={60}>
            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              <FeatureBlock icon={Trophy} title="Competition wins" sub="Hardware, podiums, post-results selfies" />
              <FeatureBlock icon={Users} title="Team moments" sub="Officer huddles, prep nights, transition days" />
              <FeatureBlock icon={Camera} title="Behind the scenes" sub="The work nobody sees that makes it ship" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* How to add */}
      <section className="section-pad pt-16">
        <div className="container-max">
          <ScrollReveal distance={60}>
            <div className="relative overflow-hidden rounded-3xl border border-dashed border-cyan-glow/30 bg-ink-900/60 p-8 backdrop-blur-xl sm:p-12">
              <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-glow/20 blur-3xl" />

              <div className="relative grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-10">
                <span className="grid h-16 w-16 place-items-center rounded-2xl border border-cyan-glow/30 bg-cyan-glow/10 text-cyan-glow shadow-glow-sm">
                  <ImagePlus size={28} />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    How to add photos
                  </h3>
                  <ol className="mt-4 space-y-2 text-sm text-white/80 sm:text-base">
                    <li>
                      <span className="font-mono text-cyan-glow">1.</span> Drop the file into{' '}
                      <code className="rounded bg-cyan-glow/10 px-1.5 py-0.5 font-mono text-cyan-glow">public/gallery/</code>
                    </li>
                    <li>
                      <span className="font-mono text-cyan-glow">2.</span> Open{' '}
                      <code className="rounded bg-cyan-glow/10 px-1.5 py-0.5 font-mono text-cyan-glow">src/pages/GalleryPage.jsx</code>
                      {' '}and fill in the next entry's{' '}
                      <code className="rounded bg-cyan-glow/10 px-1.5 py-0.5 font-mono text-cyan-glow">src</code>{' '}
                      (or add a new one)
                    </li>
                    <li>
                      <span className="font-mono text-cyan-glow">3.</span> Pick a{' '}
                      <code className="rounded bg-cyan-glow/10 px-1.5 py-0.5 font-mono text-cyan-glow">size</code>{' '}
                      (<span className="text-white/80">sm · md · wide · lg</span>) and{' '}
                      <code className="rounded bg-cyan-glow/10 px-1.5 py-0.5 font-mono text-cyan-glow">category</code>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && lightboxList[lightboxIndex] && (
          <Lightbox
            photo={lightboxList[lightboxIndex]}
            index={lightboxIndex}
            total={lightboxList.length}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function Tile({ photo, aspect, index, onOpen }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  // A photo that 404s falls back to the styled placeholder instead of
  // leaving a blank skeleton tile.
  const hasImage = Boolean(photo.src) && !failed
  const clickable = Boolean(onOpen) && hasImage

  return (
    <div
      onClick={onOpen || undefined}
      data-cursor={clickable ? 'hover' : undefined}
      className={`group relative h-full w-full overflow-hidden rounded-2xl border border-cyan-glow/15 bg-ink-800/60 backdrop-blur transition-all duration-500 hover:border-cyan-glow/40 hover:shadow-glow-sm ${
        clickable ? 'cursor-pointer' : ''
      }`}
    >
      <div className={`relative h-full w-full ${aspect}`}>
        {hasImage ? (
          <>
            {/* gradient skeleton shown until the image is decoded */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${loaded ? 'opacity-0' : 'opacity-100'}`}
              style={{
                backgroundImage:
                  'radial-gradient(circle at 30% 20%, rgba(0,218,255,0.18), transparent 55%), radial-gradient(circle at 80% 70%, rgba(0,153,184,0.20), transparent 60%), linear-gradient(135deg, rgba(10,14,21,0.95), rgba(5,8,13,1))',
              }}
            />
            <img
              src={photo.src}
              alt={photo.caption || 'Gallery photo'}
              loading="lazy"
              decoding="async"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
              style={{ objectPosition: photo.focus || 'center' }}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              } group-hover:scale-[1.04]`}
            />
          </>
        ) : (
          <PlaceholderArt />
        )}

        {/* corner brackets */}
        <span className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t border-cyan-glow/40" />
        <span className="pointer-events-none absolute right-2 top-2 h-4 w-4 border-r border-t border-cyan-glow/40" />
        <span className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b border-l border-cyan-glow/40" />
        <span className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b border-r border-cyan-glow/40" />

        {/* index chip */}
        <span className="absolute left-3 top-3 rounded-md border border-cyan-glow/30 bg-ink-900/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-glow/80">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* status chip */}
        {!hasImage && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md border border-white/15 bg-ink-900/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/72">
            <ImagePlus size={10} />
            Open
          </span>
        )}

        {/* center placeholder content (only when no image) */}
        {!hasImage && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-2 text-cyan-glow/55 transition-colors duration-500 group-hover:text-cyan-glow/90">
              <ImagePlus size={26} />
              <span className="px-2 text-center font-mono text-[10px] uppercase tracking-[0.25em]">
                {photo.caption}
              </span>
            </div>
          </div>
        )}

        {/* hover overlay (real photos only) */}
        {hasImage && (
          <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="flex w-full items-end justify-between gap-3 p-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-glow/80">
                  {photo.category || 'Photo'}
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  {photo.caption || 'Untitled'}
                </p>
              </div>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan-glow/40 bg-ink-900/70 text-cyan-glow">
                <ZoomIn size={14} />
              </span>
            </div>
          </div>
        )}

        {/* heart corner (real photos only) */}
        {hasImage && (
          <span className="pointer-events-none absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-ink-900/60 text-white/75 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:border-cyan-glow/50 group-hover:text-cyan-glow">
            <Heart size={12} />
          </span>
        )}
      </div>
    </div>
  )
}

function PlaceholderArt() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 20%, rgba(0,218,255,0.18), transparent 55%), radial-gradient(circle at 80% 70%, rgba(0,153,184,0.20), transparent 60%), linear-gradient(135deg, rgba(10,14,21,0.95), rgba(5,8,13,1))',
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,218,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,218,255,0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
    </>
  )
}

function Lightbox({ photo, index, total, onClose, onPrev, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/90 backdrop-blur-xl"
      onClick={onClose}
    >
      {/* close */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        data-cursor="hover"
        aria-label="Close"
        className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-ink-900/70 text-white/80 backdrop-blur transition-all hover:border-cyan-glow/50 hover:text-cyan-glow"
      >
        <X size={18} />
      </button>

      {/* counter */}
      <span className="absolute left-6 top-6 rounded-full border border-white/10 bg-ink-900/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>

      {/* prev / next */}
      {total > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            data-cursor="hover"
            aria-label="Previous"
            className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-900/70 text-white/80 backdrop-blur transition-all hover:border-cyan-glow/50 hover:text-cyan-glow sm:left-8"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            data-cursor="hover"
            aria-label="Next"
            className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-900/70 text-white/80 backdrop-blur transition-all hover:border-cyan-glow/50 hover:text-cyan-glow sm:right-8"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* image */}
      <motion.div
        key={photo.src}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-6 max-h-[85vh] max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.caption || 'Gallery photo'}
          className="max-h-[85vh] w-auto rounded-2xl border border-cyan-glow/20 object-contain shadow-glow"
        />
        <div className="mt-4 flex items-end justify-between gap-4 text-left">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-glow/80">
              {photo.category || 'Photo'}
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-white sm:text-xl">
              {photo.caption || 'Untitled'}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function FeatureBlock({ icon: Icon, title, sub }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-cyan-glow/15 bg-ink-800/50 p-6 backdrop-blur transition-all duration-500 hover:border-cyan-glow/40">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-glow/20 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-cyan-glow/30 bg-cyan-glow/10 text-cyan-glow">
          <Icon size={20} />
        </span>
        <div>
          <p className="font-display text-base font-semibold text-white">{title}</p>
          <p className="mt-1 text-sm text-white/72">{sub}</p>
        </div>
      </div>
    </div>
  )
}
