import ScrollReveal from './ScrollReveal'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <ScrollReveal
      className={`flex flex-col gap-4 ${alignment}`}
      distance={60}
    >
      {eyebrow && (
        <span className="badge">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-glow-sm" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base text-white/75 sm:text-lg">{subtitle}</p>
      )}
    </ScrollReveal>
  )
}
