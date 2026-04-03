import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';
import { liveMetrics } from '@/lib/data';

export default function LiveMetrics() {
  const [timestamp, setTimestamp] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const liveIndicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    // Live indicator pulse
    if (liveIndicatorRef.current) {
      gsap.to(liveIndicatorRef.current, {
        opacity: 0.3,
        duration: 1.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // Metric counter animations: count up from 0 to target value
    gsap.utils.toArray<HTMLElement>('.metric-counter').forEach((counter) => {
      const target = parseFloat(counter.getAttribute('data-target') || '0');
      gsap.fromTo(counter,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 0.1 },
          scrollTrigger: {
            trigger: counter,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Metric visual bars
    gsap.utils.toArray<HTMLElement>('.metric-bar-fill').forEach((bar) => {
      const targetWidth = bar.getAttribute('data-width') || '0%';
      gsap.fromTo(bar,
        { width: '0%' },
        {
          width: targetWidth,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Metric cards stagger in
    gsap.utils.toArray<HTMLElement>('.metric-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      {/* Live indicator */}
      <div className="flex items-center gap-2 mb-6">
        <span
          ref={liveIndicatorRef}
          className="inline-block w-2 h-2"
          style={{ background: 'var(--brutal-green)' }}
        />
        <span className="label-text" style={{ color: 'var(--brutal-green)' }}>LIVE</span>
        <span className="label-text ml-2" style={{ color: 'var(--brutal-text-muted)' }}>WebGPU Accelerated</span>
        <span className="label-text ml-auto" style={{ color: 'var(--brutal-text-muted)' }}>
          Updated {timestamp.toLocaleTimeString()}
        </span>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {liveMetrics.map((metric) => (
          <div
            key={metric.label}
            className="metric-card p-6"
            style={{ background: 'var(--brutal-surface)', border: 'var(--border-thick)', boxShadow: 'var(--shadow-brutal)' }}
          >
            <span className="label-text block mb-2" style={{ color: 'var(--brutal-text-muted)' }}>{metric.label}</span>
            <div className="flex items-baseline gap-2">
              <span
                className="metric-counter text-3xl font-black"
                style={{ color: metric.color }}
                data-target={metric.value}
              >
                {metric.value.toFixed(1)}
              </span>
              <span className="label-text" style={{ color: 'var(--brutal-text-muted)' }}>{metric.unit}</span>
            </div>
            {/* Visual bar */}
            <div className="mt-3 h-1" style={{ background: 'var(--brutal-void)' }}>
              <div
                className="metric-bar-fill h-full"
                style={{ background: metric.color }}
                data-width={`${(metric.value / 100) * 100}%`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
