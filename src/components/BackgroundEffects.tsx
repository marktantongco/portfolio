export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Grid overlay — spatial depth cue for the void */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(var(--brutal-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--brutal-cyan) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.02,
        }}
      />

      {/* Vignette — draws eye toward center content */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, var(--brutal-void) 75%)',
        }}
      />
    </div>
  );
}
