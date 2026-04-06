import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { Chart } from 'chart.js/auto';
import { gsap, ScrollTrigger } from '@/lib/gsap-setup';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  IDENTITY_TAGS,
  PHILOSOPHIES,
  STATS,
  CLI_COMMANDS,
  SKILL_RADAR_LABELS,
  SKILL_RADAR_BASE,
} from '@/lib/data';

export default function Identity() {
  const cliRef = useRef<HTMLDivElement>(null);
  const radarRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const reduced = useReducedMotion();
  const animated = useRef(false);

  // CLI Typewriter
  useEffect(() => {
    if (reduced) {
      // Just show all lines immediately
      const lines = cliRef.current?.querySelectorAll('.cli-line');
      lines?.forEach((l) => {
        const cmd = l.querySelector('.cmd');
        const out = l.querySelector('.out');
        if (cmd) cmd.textContent = cmd.getAttribute('data-cmd') || '';
        if (out) out.textContent = out.getAttribute('data-out') || '';
      });
      return;
    }

    if (!cliRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: cliRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => runTypewriter(),
    });

    const runTypewriter = async () => {
      const lines = cliRef.current?.querySelectorAll('.cli-line');
      if (!lines) return;

      for (let i = 0; i < CLI_COMMANDS.length; i++) {
        const line = lines[i] as HTMLElement;
        if (!line) continue;
        const cmd = line.querySelector('.cmd') as HTMLElement;
        const out = line.querySelector('.out') as HTMLElement;
        if (!cmd || !out) continue;

        const cmdText = cmd.getAttribute('data-cmd') || '';
        const outText = out.getAttribute('data-out') || '';

        // Type command
        cmd.textContent = '';
        for (let c = 0; c < cmdText.length; c++) {
          cmd.textContent += cmdText[c];
          await sleep(30 + Math.random() * 40);
        }

        await sleep(300);

        // Show output
        out.textContent = outText;
        await sleep(600);
      }
    };

    return () => {
      trigger.kill();
    };
  }, [reduced]);

  // Radar chart
  useEffect(() => {
    if (!radarRef.current) return;
    const ctx = radarRef.current.getContext('2d');
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: SKILL_RADAR_LABELS,
        datasets: [{
          data: SKILL_RADAR_BASE,
          backgroundColor: 'rgba(204,255,0,0.08)',
          borderColor: 'rgba(204,255,0,0.6)',
          borderWidth: 1.5,
          pointBackgroundColor: '#ccff00',
          pointBorderColor: '#ccff00',
          pointRadius: 3,
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
            grid: {
              color: 'rgba(204,255,0,0.1)',
            },
            angleLines: {
              color: 'rgba(204,255,0,0.1)',
            },
            pointLabels: {
              color: 'rgba(239,239,239,0.5)',
              font: { family: 'DM Mono', size: 9 },
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // GSAP scroll animations
  useEffect(() => {
    if (reduced || animated.current) return;
    animated.current = true;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.id-heading', {
        scrollTrigger: { trigger: '.id-heading', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
      });

      gsap.from('.cli-block', {
        scrollTrigger: { trigger: '.cli-block', start: 'top 85%' },
        opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
      });

      gsap.from('.id-tag', {
        scrollTrigger: { trigger: '.id-tags', start: 'top 85%' },
        opacity: 0, y: 15, duration: 0.5, stagger: 0.08, ease: 'power2.out',
      });

      gsap.from('.philosophy-card', {
        scrollTrigger: { trigger: '.philosophy-card', start: 'top 85%' },
        opacity: 0, y: 25, duration: 0.7, stagger: 0.2, ease: 'power2.out',
      });

      // Stats counter animation
      const stats = section.querySelectorAll('.stat-n');
      stats.forEach((stat) => {
        const el = stat as HTMLElement;
        const finalText = el.textContent || '';
        const numMatch = finalText.match(/[\d+]/);
        if (numMatch) {
          const obj = { val: 0 };
          gsap.to(obj, {
            scrollTrigger: { trigger: el, start: 'top 85%' },
            val: parseInt(numMatch[0]) || 0,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.floor(obj.val) + finalText.replace(numMatch[0], '');
            },
          });
        } else {
          gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 85%' },
            opacity: 0, duration: 0.8,
          });
        }
      });

      gsap.from('.stats-radar-wrap', {
        scrollTrigger: { trigger: '.stats-radar-wrap', start: 'top 85%' },
        opacity: 0, y: 20, duration: 0.8, ease: 'power2.out',
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="identity" ref={sectionRef}>
      <div className="id-left">
        <p className="s-label">001 — About</p>
        <h2 className="id-heading">
          BUILD / <span className="acc">THINK</span> / <span className="ghost">CREATE</span>
        </h2>

        {/* CLI Block */}
        <div className="cli-block" ref={cliRef}>
          <div className="cli-topbar">
            <span className="cli-dot red" />
            <span className="cli-dot yellow" />
            <span className="cli-dot green" />
          </div>
          {CLI_COMMANDS.map((c, i) => (
            <div className="cli-line" key={i}>
              <span className="prompt">❯</span>
              <span className="cmd" data-cmd={c.cmd} />
              <br />
              <span className={`out ${c.type}`} data-out={c.output} />
              {i < CLI_COMMANDS.length - 1 && <span className="cli-cursor" />}
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="id-tags">
          {IDENTITY_TAGS.map((tag, i) => (
            <span className="id-tag" key={i}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="id-right">
        {/* Philosophy cards */}
        {PHILOSOPHIES.map((p, i) => (
          <div className="philosophy-card" key={i}>
            <p>{p.quote}</p>
            <cite>{p.cite}</cite>
          </div>
        ))}

        {/* Stats + Radar */}
        <div className="stats-radar-wrap">
          <div className="stat-col">
            {STATS.map((s, i) => (
              <div className="id-stat" key={i}>
                <div className="stat-n">{s.n}</div>
                <div className="stat-l">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="radar-wrap">
            <canvas ref={radarRef} />
          </div>
        </div>
      </div>
    </section>
  );
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
