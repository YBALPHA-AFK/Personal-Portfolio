// Quiet, static depth layer. No animation, no movement — just a few
// soft gradient blooms, a faint grid, and a grain overlay to keep
// the page from feeling flat. Sits behind everything (z-[-10]).
export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink-900" />

      {/* faint masked grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,218,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,218,255,0.05) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(ellipse 70% 55% at 50% 25%, black 35%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 55% at 50% 25%, black 35%, transparent 85%)',
        }}
      />

      {/* soft gradient blooms */}
      <div
        className="absolute -top-40 left-[-12%] h-[520px] w-[520px] rounded-full opacity-60"
        style={{
          background:
            'radial-gradient(circle, rgba(0,218,255,0.22), transparent 70%)',
          filter: 'blur(110px)',
        }}
      />
      <div
        className="absolute top-[35%] right-[-15%] h-[600px] w-[600px] rounded-full opacity-50"
        style={{
          background:
            'radial-gradient(circle, rgba(0,153,184,0.20), transparent 70%)',
          filter: 'blur(140px)',
        }}
      />
      <div
        className="absolute bottom-[-15%] left-[35%] h-[480px] w-[480px] rounded-full opacity-40"
        style={{
          background:
            'radial-gradient(circle, rgba(122,235,255,0.16), transparent 70%)',
          filter: 'blur(130px)',
        }}
      />

      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.6) 100%)',
        }}
      />
    </div>
  )
}
