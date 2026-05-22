import { useEffect, useRef } from 'react'

/**
 * Cursor-following binary "matrix" effect with three behaviors:
 *
 *  1. Liquid shape — the visible area is a sum of metaballs (one fixed
 *     core + three orbiting blobs) so it morphs and breathes around the
 *     cursor instead of being a static circle.
 *
 *  2. Always-on core — the first blob never moves, so a small region
 *     directly under the cursor always shows the matrix (unless it is
 *     suppressed by element detection, see #3).
 *
 *  3. Element-aware suppression — on every mouse move we sample the
 *     element under the cursor with `document.elementFromPoint` and
 *     pick a multiplier:
 *       • images / video / image placeholders → 0   (fully hidden)
 *       • text-bearing elements (p, h1–h6, a…) → 0.25 (faintly visible
 *         through the translucent backdrop, text stays readable)
 *       • everything else                     → 1.0 (full strength)
 *     Override per-element with `data-matrix="hide" | "muted" | "show"`.
 *
 * Rendered behind content (`zIndex: 0`) so cards and sections naturally
 * cover it; pair with `<main className="relative z-10">` in App.jsx.
 */
export default function MatrixHover() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // ---- tuning ----
    const CELL = 20             // grid spacing in CSS pixels
    const FONT_SIZE = 13        // CSS pixels
    const FLIP_MIN = 350        // ms — min before a cell flips its char
    const FLIP_MAX = 1300       // ms — max before a cell flips
    const TARGET_FPS = 40
    const MAX_OPACITY = 0.95    // brightest char near the core
    const MUTED_MUL = 0.25      // multiplier when over text

    // Liquid blob field: each entry orbits the cursor with its own
    // amplitude (ax, ay), angular speed (sx, sy), base radius (r), and
    // phase (phx, phy). Blob 0 has zero amplitude → fixed always-on core.
    const BLOBS = [
      { ax: 0,  ay: 0,  sx: 0,    sy: 0,    r: 48, phx: 0,    phy: 0    },
      { ax: 32, ay: 38, sx: 0.9,  sy: 1.2,  r: 56, phx: 0,    phy: 0.6  },
      { ax: 48, ay: 42, sx: 1.3,  sy: 0.7,  r: 50, phx: 1.7,  phy: 2.1  },
      { ax: 38, ay: 52, sx: 0.6,  sy: 1.5,  r: 52, phx: 3.2,  phy: 4.4  },
    ]
    const REACH = Math.max(...BLOBS.map((b) => Math.max(b.ax, b.ay) + b.r))

    const HIDE_TAGS = new Set(['IMG', 'PICTURE', 'VIDEO'])
    const MUTE_TAGS = new Set([
      'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
      'LI', 'A', 'BUTTON', 'LABEL', 'MARK',
    ])
    // ----------------

    let raf
    let lastDraw = 0
    let mx = -9999
    let my = -9999
    let modeMul = 1.0          // current (lerped)
    let modeMulTarget = 1.0    // requested
    let lastDetectAt = 0
    const cells = new Map()    // "row,col" -> { char, nextFlip }

    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
    }
    resize()
    window.addEventListener('resize', resize)

    /**
     * Walk up from the element under the cursor to find the strongest
     * matrix-mode signal. Limits depth to keep the cost bounded.
     */
    function detectMode(x, y) {
      let el
      try {
        el = document.elementFromPoint(x, y)
      } catch {
        return 1.0
      }
      if (!el) return 1.0

      let cur = el
      let depth = 0
      while (cur && depth < 8 && cur !== document.body && cur !== document.documentElement) {
        if (cur.dataset) {
          const m = cur.dataset.matrix
          if (m === 'hide') return 0
          if (m === 'muted') return MUTED_MUL
          if (m === 'show') return 1.0
        }
        // image-like placeholders behave like images for this effect
        if (cur.classList && cur.classList.contains('img-placeholder')) return 0
        const tag = cur.tagName
        if (HIDE_TAGS.has(tag)) return 0
        if (MUTE_TAGS.has(tag)) return MUTED_MUL
        cur = cur.parentElement
        depth++
      }
      return 1.0
    }

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      const now = performance.now()
      if (now - lastDetectAt > 60) {
        modeMulTarget = detectMode(mx, my)
        lastDetectAt = now
      }
    }
    const onLeave = () => {
      mx = -9999
      my = -9999
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('blur', onLeave)

    const minFrame = 1000 / TARGET_FPS

    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      if (now - lastDraw < minFrame) return
      lastDraw = now

      // smooth transition between modes (~5-frame ease)
      modeMul = modeMul + (modeMulTarget - modeMul) * 0.18

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (mx < 0 || modeMul <= 0.02) return

      // resolve live blob centers from time
      const ts = now * 0.0008
      const live = BLOBS.map((b) => ({
        x: mx + Math.cos(ts * b.sx + b.phx) * b.ax,
        y: my + Math.sin(ts * b.sy + b.phy) * b.ay,
        r: b.r,
      }))

      ctx.font = `700 ${FONT_SIZE * dpr}px "JetBrains Mono", ui-monospace, monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const startCol = Math.max(0, Math.floor((mx - REACH) / CELL))
      const endCol = Math.ceil((mx + REACH) / CELL)
      const startRow = Math.max(0, Math.floor((my - REACH) / CELL))
      const endRow = Math.ceil((my + REACH) / CELL)

      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          const cx = col * CELL + CELL / 2
          const cy = row * CELL + CELL / 2

          // metaball field: sum smoothstep contributions from each blob
          let contrib = 0
          for (let i = 0; i < live.length; i++) {
            const b = live[i]
            const dx = cx - b.x
            const dy = cy - b.y
            const d2 = dx * dx + dy * dy
            const r2 = b.r * b.r
            if (d2 >= r2) continue
            const u = 1 - Math.sqrt(d2) / b.r
            contrib += u * u * (3 - 2 * u)
          }
          if (contrib < 0.05) continue
          if (contrib > 1) contrib = 1

          const opacity = contrib * MAX_OPACITY * modeMul
          if (opacity < 0.02) continue

          const key = row + ',' + col
          let entry = cells.get(key)
          if (!entry || now > entry.nextFlip) {
            entry = {
              char: Math.random() < 0.5 ? '0' : '1',
              nextFlip: now + FLIP_MIN + Math.random() * (FLIP_MAX - FLIP_MIN),
            }
            cells.set(key, entry)
          }

          ctx.shadowColor = 'rgba(0, 218, 255, 0.55)'
          ctx.shadowBlur = 6 * dpr
          ctx.fillStyle = `rgba(0, 218, 255, ${opacity})`
          ctx.fillText(entry.char, cx * dpr, cy * dpr)
        }
      }
      ctx.shadowBlur = 0

      if (cells.size > 6000) cells.clear()
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('blur', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{
        zIndex: 0,
        mixBlendMode: 'screen',
      }}
    />
  )
}
