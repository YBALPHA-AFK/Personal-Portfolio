import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { animate } from 'framer-motion'

// Parse "4+", "2029", "5" → { number, prefix, suffix }
function parseValue(value) {
  const str = String(value)
  const match = str.match(/^([^\d.-]*)(-?[\d,]*\.?\d+)(.*)$/)
  if (!match) return { number: null, prefix: '', suffix: str }
  return {
    number: parseFloat(match[2].replace(/,/g, '')),
    prefix: match[1] || '',
    suffix: match[3] || '',
  }
}

function formatNumber(n, original) {
  const isInt = Number.isInteger(original)
  // Years like 2029 must render without grouping separators ("2029", not "2,029")
  if (isInt && original >= 1000 && original <= 9999) return String(Math.round(n))
  if (isInt) return Math.round(n).toLocaleString()
  return n.toFixed(1)
}

export default function AnimatedCounter({ value, duration = 1.8, className = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })
  const nodeRef = useRef(null)
  const [parsed] = useState(() => parseValue(value))

  useEffect(() => {
    if (!inView || parsed.number === null) return
    const node = nodeRef.current
    if (!node) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      node.textContent = `${parsed.prefix}${formatNumber(parsed.number, parsed.number)}${parsed.suffix}`
      return
    }

    const controls = animate(0, parsed.number, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent = `${parsed.prefix}${formatNumber(latest, parsed.number)}${parsed.suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, parsed, duration])

  // Fallback when not a number
  if (parsed.number === null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  return (
    <span ref={ref} className={className}>
      <span ref={nodeRef}>{parsed.prefix}0{parsed.suffix}</span>
    </span>
  )
}
