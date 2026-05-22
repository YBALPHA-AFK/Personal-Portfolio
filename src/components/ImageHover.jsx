import { useEffect, useRef } from 'react'

const IMAGE_URL =
  'https://www.shutterstock.com/shutterstock/videos/1107406205/thumb/1.jpg?ip=x480'

/**
 * Cursor-following image reveal. Uses the same liquid metaball field as
 * MatrixHover so the visible image patch morphs around the cursor instead
 * of being a hard circle. Rendered behind MatrixHover so the matrix
 * characters stay the dominant visual element on top of the image.
 */
export default function ImageHover() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // No crossOrigin: lets the image render even without CORS headers.
    // The canvas becomes tainted (no pixel readback) but compositing works.
    const img = new Image()
    let imgReady = false
    img.onload = () => {
      imgReady = true
    }
    img.src = IMAGE_URL

    const TARGET_FPS = 30
    const REVEAL_OPACITY = 0.5 // kept dimmer so the matrix reads brighter

    // Same blob layout as MatrixHover (slightly larger radii so the image
    // patch is comfortably bigger than the brightest matrix region).
    const BLOBS = [
      { ax: 0,  ay: 0,  sx: 0,   sy: 0,   r: 60, phx: 0,   phy: 0   },
      { ax: 32, ay: 38, sx: 0.9, sy: 1.2, r: 70, phx: 0,   phy: 0.6 },
      { ax: 48, ay: 42, sx: 1.3, sy: 0.7, r: 64, phx: 1.7, phy: 2.1 },
      { ax: 38, ay: 52, sx: 0.6, sy: 1.5, r: 66, phx: 3.2, phy: 4.4 },
    ]

    const HIDE_TAGS = new Set(['IMG', 'PICTURE', 'VIDEO'])
    const MUTE_TAGS = new Set([
      'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
      'LI', 'A', 'BUTTON', 'LABEL', 'MARK',
    ])
    const MUTED_MUL = 0.25

    let raf
    let lastDraw = 0
    let mx = -9999
    let my = -9999
    let modeMul = 1.0
    let modeMulTarget = 1.0
    let lastDetectAt = 0

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

      modeMul = modeMul + (modeMulTarget - modeMul) * 0.18

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (mx < 0 || modeMul <= 0.02 || !imgReady) return

      const ts = now * 0.0008
      const live = BLOBS.map((b) => ({
        x: (mx + Math.cos(ts * b.sx + b.phx) * b.ax) * dpr,
        y: (my + Math.sin(ts * b.sy + b.phy) * b.ay) * dpr,
        r: b.r * dpr,
      }))

      // 1. Paint the metaball mask: radial gradients combined with
      //    'lighter' merge into one soft, breathing blob shape.
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      for (const b of live) {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        grad.addColorStop(0, 'rgba(255,255,255,1)')
        grad.addColorStop(0.55, 'rgba(255,255,255,0.45)')
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // 2. Replace the mask pixels with the image, scaled to cover with
      //    a slow Ken-Burns-style drift + breathing zoom so the backdrop
      //    feels alive even though it only shows under the cursor.
      ctx.globalCompositeOperation = 'source-in'
      ctx.globalAlpha = REVEAL_OPACITY * modeMul
      const iw = img.naturalWidth || 854
      const ih = img.naturalHeight || 480
      const cw = canvas.width
      const ch = canvas.height
      const t = now * 0.00012
      const zoom = 1.08 + Math.sin(t * 1.4) * 0.06          // 1.02–1.14
      const driftX = Math.cos(t) * 0.05 * cw                 // ±5% width
      const driftY = Math.sin(t * 0.8) * 0.04 * ch           // ±4% height
      const baseScale = Math.max(cw / iw, ch / ih)
      const scale = baseScale * zoom
      const dw = iw * scale
      const dh = ih * scale
      const dx = (cw - dw) / 2 + driftX
      const dy = (ch - dh) / 2 + driftY
      ctx.drawImage(img, dx, dy, dw, dh)
      ctx.restore()
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
      style={{ zIndex: 0 }}
    />
  )
}
