import useMagnetic from '../hooks/useMagnetic'

/**
 * Wraps a single element with a magnetic pull toward the cursor.
 * Reuses the useMagnetic hook, which also feeds --mx/--my for the
 * .magnetic-button radial hover glow.
 *
 *   <Magnetic><a className="magnetic-button ...">CTA</a></Magnetic>
 */
export default function Magnetic({ children, strength = 0.22, radius = 110, className = '' }) {
  const ref = useMagnetic({ strength, radius })

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  )
}
