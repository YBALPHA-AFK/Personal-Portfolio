import { motion } from 'framer-motion'

/**
 * Kinetic typography: splits text into characters (or words) and reveals
 * them with a staggered rise + un-blur. Characters also lift individually
 * on hover, so headlines feel alive under the cursor.
 *
 *   <SplitText text="Suhaan" className="..." delay={0.2} />
 *
 * Props:
 *   by:        'char' | 'word'  — split granularity
 *   delay:     seconds before the first unit animates
 *   stagger:   seconds between units
 *   once:      animate on mount (true) or on scroll into view (false)
 *   hoverLift: enable the per-character hover pop
 */
const unitVariants = {
  hidden: {
    opacity: 0,
    y: '0.6em',
    rotate: 6,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function SplitText({
  text,
  className = '',
  unitClassName = '', // applied per character/word — use for bg-clip-text gradients
  by = 'char',
  delay = 0,
  stagger = 0.035,
  once = true,
  hoverLift = true,
  as: Tag = 'span',
}) {
  const words = String(text).split(' ')

  const MotionTag = motion[Tag] || motion.span

  const viewProps = once
    ? { initial: 'hidden', animate: 'visible' }
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.5 },
      }

  return (
    <MotionTag
      className={`inline-block ${className}`}
      aria-label={text}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...viewProps}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {by === 'word' ? (
            <motion.span
              variants={unitVariants}
              className={`inline-block will-change-transform ${unitClassName}`}
            >
              {word}
            </motion.span>
          ) : (
            word.split('').map((ch, ci) => (
              <motion.span
                key={ci}
                variants={unitVariants}
                whileHover={
                  hoverLift
                    ? { y: '-0.08em', scale: 1.06, transition: { duration: 0.2 } }
                    : undefined
                }
                className={`inline-block will-change-transform ${unitClassName}`}
              >
                {ch}
              </motion.span>
            ))
          )}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </MotionTag>
  )
}
