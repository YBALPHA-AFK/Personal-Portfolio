import ScrollReveal from './ScrollReveal'
import SplitText from './SplitText'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      {eyebrow && (
        <ScrollReveal distance={40} as="span" className="badge">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-glow-sm" />
          {eyebrow}
        </ScrollReveal>
      )}
      <h2 className="font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
        <SplitText
          text={title}
          by="word"
          once={false}
          stagger={0.07}
          hoverLift={false}
          unitClassName="text-gradient"
        />
      </h2>
      {subtitle && (
        <ScrollReveal distance={40}>
          <p className="max-w-2xl text-base text-white/75 sm:text-lg">{subtitle}</p>
        </ScrollReveal>
      )}
    </div>
  )
}
