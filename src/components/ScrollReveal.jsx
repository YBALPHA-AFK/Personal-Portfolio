import { motion } from 'framer-motion'

// Reversible viewport reveal: animates IN as element enters the viewport
// and animates OUT (back to initial) when it leaves — so scrolling up
// makes elements slide+fade back toward the bottom of the screen.
export default function ScrollReveal({
  children,
  className,
  style,
  distance = 100,
  from = 'bottom', // 'top' | 'bottom' | 'left' | 'right' | 'none'
  scaleFrom = 1,
  duration = 0.8,
  amount = 0.15,
  as = 'div',
  ...rest
}) {
  const fromY = from === 'bottom' ? distance : from === 'top' ? -distance : 0
  const fromX = from === 'left' ? -distance : from === 'right' ? distance : 0

  const Comp =
    as === 'li' ? motion.li :
    as === 'section' ? motion.section :
    as === 'article' ? motion.article :
    as === 'span' ? motion.span :
    motion.div

  return (
    <Comp
      className={className}
      style={style}
      initial={{ opacity: 0, x: fromX, y: fromY, scale: scaleFrom }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ amount, margin: '0px 0px -80px 0px' }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
