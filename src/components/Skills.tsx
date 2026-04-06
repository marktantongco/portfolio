import { useEffect, useRef, useState, useCallback } from 'react';
import { Chart } from 'chart.js/auto';
import { gsap, ScrollTrigger } from '@/lib/gsap-setup';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SKILL_CATEGORIES, SKILL_RADAR_LABELS, SKILL_RADAR_BASE } from '@/lib/data';

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const radarRef = useRef<HTMLCanvasElement>(null);
  const radarWrapRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const reduced = useReducedMotion();
  const [activeScores, setActiveScores] = useState<number[]>([...SKILL_RADAR_BASE]);
  const [activePillIndex, setActivePillIndex] = useState<number | null>(null);

  // Radar chart
  useEffect(() => {
    if (!radarRef.current) return;
    const ctx = radarRef.current.getContext('2d');
    if (!ctx) return;

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: SKILL_RADAR_LABELS,
        datasets: [{
          data: activeScores,
          backgroundColor: 'rgba(204,255,0,0.1)',
          borderColor: 'rgba(204,255,0,0.7)',
          borderWidth: 2,
          pointBackgroundColor: '#ccff00',
          pointBorderColor: '#ccff00',
          pointRadius: 4,
          pointHoverRadius: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: { display: false },
            grid: { color: 'rgba(204,255,0,0.08)' },
            angleLines: { color: 'rgba(204,255,0,0.08)' },
            pointLabels: {
              color: 'rgba(239,239,239,0.5)',
              font: { family: 'DM Mono', size: 10 },
            },
          },
        },
        animation: { duration: 300 },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [activeScores]);

  // Update radar on hover
  const handlePillHover = useCallback((catIndex: number) => {
    setActivePillIndex(catIndex);
    const newScores = SKILL_RADAR_BASE.map((base, i) =>
      i === catIndex ? 100 : base * 0.7
    );
    setActiveScores(newScores);
  }, []);

  const handlePillLeave = useCallback(() => {
    setActivePillIndex(null);
    setActiveScores([...SKILL_RADAR_BASE]);
  }, []);

  // GSAP scroll animations
  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.sk-heading', {
        scrollTrigger: { trigger: '.sk-heading', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
      });

      // Radar chart: animate from scale 0.5 with rotation when entering viewport
      if (radarWrapRef.current) {
        gsap.fromTo(radarWrapRef.current,
          { scale: 0.5, rotation: -90, opacity: 0 },
          {
            scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: radarWrapRef.current, start: 'top 85%' },
          }
        );
      }

      gsap.from('.sk-pill', {
        scrollTrigger: { trigger: '.sk-pills-grid', start: 'top 85%' },
        opacity: 0, y: 15, duration: 0.4, stagger: 0.03, ease: 'power2.out',
      });

      gsap.from('.sk-cat-title', {
        scrollTrigger: { trigger: '.sk-pills-grid', start: 'top 85%' },
        opacity: 0, x: -20, duration: 0.6, stagger: 0.15, ease: 'power2.out',
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="skills" ref={sectionRef}>
      <div className="sk-left">
        <div>
          <p className="s-label">002 — Expertise</p>
          <h2 className="sk-heading">Skill Matrix</h2>
        </div>
        <p className="sk-footnote">
          Hover any skill to see how it maps to the four core disciplines.
          Scores reflect production-level proficiency, not theoretical knowledge.
        </p>
      </div>

      <div className="sk-right">
        <div className="sk-radar-header">
          <div className="radar-wrap" ref={radarWrapRef} style={{ minHeight: 200 }}>
            <canvas ref={radarRef} />
          </div>
        </div>

        <div className="sk-pills-grid">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.index}>
              <div className="sk-cat-title">{cat.title}</div>
              <div className="sk-list">
                {cat.skills.map((sk, j) => (
                  <span
                    className={`sk-pill${activePillIndex === cat.index ? ' active' : ''}`}
                    key={j}
                    onMouseEnter={() => handlePillHover(cat.index)}
                    onMouseLeave={handlePillLeave}
                  >
                    {sk.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
