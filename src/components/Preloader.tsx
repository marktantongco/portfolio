import { useState, useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-setup';

export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const logoRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cinematic GSAP timeline
    const tl = gsap.timeline();
    tl.fromTo(logoRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'bounce.out' });
    tl.fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power2.out' }, '-=0.4');

    // Shimmer loop on the bar
    if (shimmerRef.current) {
      gsap.to(shimmerRef.current, {
        x: '120%',
        duration: 1.2,
        repeat: -1,
        ease: 'power1.inOut',
      });
    }

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 6 + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setPct(100);
        // 400ms pause before fade-out
        setTimeout(() => setDone(true), 400);
      }
      setPct(Math.min(Math.floor(current), 100));
    }, 40);

    return () => {
      clearInterval(interval);
      tl.kill();
    };
  }, []);

  return (
    <div id="preloader" className={done ? 'done' : ''}>
      <span className="pre-logo" ref={logoRef}>MAT</span>
      <div className="pre-bar-wrap" ref={barRef}>
        <div className="pre-bar" style={{ width: `${pct}%` }}>
          <div className="pre-bar-shimmer" ref={shimmerRef} />
        </div>
      </div>
      <span className="pre-pct">{pct}%</span>
      <span className="pre-loading-text">LOADING</span>
    </div>
  );
}
