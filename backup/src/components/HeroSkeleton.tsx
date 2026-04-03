export default function HeroSkeleton() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--brutal-void)' }}
    >
      {/* CSS gradient fallback for Three.js */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,234,0,0.1) 0%, rgba(10,10,10,1) 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center px-6">
        <h1 className="display-h1 mb-4" style={{ color: 'var(--brutal-border)' }}>
          MARK ANTHONY<br />TANTONGCO
        </h1>
        <p className="label-text mb-6" style={{ color: 'var(--brutal-yellow)' }}>
          AI Creative Strategist | Prompt Architect | Cinematic Vision
        </p>
        <p className="label-text" style={{ color: 'var(--brutal-text-muted)' }}>
          Building at the intersection of AI and design.
        </p>
      </div>
    </div>
  );
}
