import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Logo scales in with a bounce
    tl.from('.loading-logo', {
      scale: 0,
      rotation: -10,
      duration: 0.6,
      ease: 'back.out(1.4)',
    });

    // Label fades in
    tl.from('.loading-label', {
      opacity: 0,
      y: 10,
      duration: 0.4,
      ease: 'power2.out',
    }, '-=0.2');

    // Rings spin continuously using gsap.to
    if (ring1Ref.current) {
      gsap.to(ring1Ref.current, {
        rotation: 360,
        duration: 2,
        ease: 'none',
        repeat: -1,
      });
    }

    if (ring2Ref.current) {
      gsap.to(ring2Ref.current, {
        rotation: -360,
        duration: 1.5,
        ease: 'none',
        repeat: -1,
      });
    }

    // Progress bar fills
    if (progressBarRef.current) {
      tl.fromTo(progressBarRef.current,
        { width: '0%' },
        {
          width: '100%',
          duration: 2,
          ease: 'power2.inOut',
        },
        '-=0.1'
      );
    }

    // Logo pulses
    gsap.to('.loading-logo', {
      opacity: 0.5,
      duration: 1,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      delay: 0.6,
    });

    // Scan lines sweep
    gsap.utils.toArray<HTMLElement>('.loading-scan').forEach((line, i) => {
      gsap.to(line, {
        x: '100vw',
        duration: 3,
        ease: 'none',
        repeat: -1,
        delay: i * 0.5,
      });
      gsap.set(line, { x: '-100%' });
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: 'var(--brutal-void)', zIndex: 100 }}
      role="status"
      aria-label="Loading portfolio"
    >
      {/* MT Logo */}
      <h1
        className="loading-logo display-h1 mb-4"
        style={{ color: 'var(--brutal-yellow)' }}
      >
        MT
      </h1>

      {/* Label */}
      <p className="loading-label label-text mb-8" style={{ color: 'var(--brutal-text-muted)' }}>
        INITIALIZING SYSTEMS
      </p>

      {/* Dual counter-rotating rings */}
      <div className="relative w-24 h-24 mb-8">
        <div
          ref={ring1Ref}
          className="absolute inset-0"
          style={{
            border: '3px solid var(--brutal-yellow)',
            borderTopColor: 'transparent',
            borderRadius: '50%',
          }}
        />
        <div
          ref={ring2Ref}
          className="absolute inset-3"
          style={{
            border: '3px solid var(--brutal-magenta)',
            borderBottomColor: 'transparent',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 overflow-hidden" style={{ background: 'var(--brutal-surface)' }}>
        <div
          ref={progressBarRef}
          className="h-full"
          style={{ background: 'linear-gradient(90deg, var(--brutal-yellow), var(--brutal-cyan))' }}
        />
      </div>

      {/* Scan lines */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="loading-scan absolute h-px w-full"
          style={{
            background: 'var(--brutal-yellow)',
            opacity: 0.1,
            top: `${33 + i * 33}%`,
            left: '-100%',
          }}
        />
      ))}
    </div>
  );
}
