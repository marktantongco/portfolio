import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from '@/lib/gsap-setup';
import { type Project } from '@/lib/data';

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const demoCanvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<{ cleanup: (() => void) | null }>({ cleanup: null });
  const entranceTlRef = useRef<gsap.core.Timeline | null>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  // GSAP entrance animation when project changes
  useEffect(() => {
    if (!project) {
      entranceTlRef.current?.kill();
      entranceTlRef.current = null;
      return;
    }

    // Kill any previous entrance timeline
    entranceTlRef.current?.kill();

    const tl = gsap.timeline();
    entranceTlRef.current = tl;

    // Overlay fade in
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' }, 0);

    // Modal slide up with scale
    tl.fromTo(modalRef.current,
      { y: 40, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' },
      0.1
    );

    // Stagger metrics
    tl.fromTo('.cs-metric',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power3.out' },
      0.4
    );

    // Stagger steps
    tl.fromTo('.cs-step',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power3.out' },
      0.55
    );

    // Stagger results
    tl.fromTo('.cs-result-item',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out' },
      0.7
    );

    return () => {
      tl.kill();
    };
  }, [project]);

  // GSAP exit animation handler
  const handleClose = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: onClose,
    });

    tl.to('.cs-result-item', { y: 15, opacity: 0, duration: 0.25, stagger: 0.05, ease: 'power3.in' }, 0);
    tl.to('.cs-step', { x: -20, opacity: 0, duration: 0.25, stagger: 0.05, ease: 'power3.in' }, 0.05);
    tl.to('.cs-metric', { y: 20, opacity: 0, duration: 0.25, stagger: 0.05, ease: 'power3.in' }, 0.1);
    tl.to(modalRef.current, { y: 40, opacity: 0, scale: 0.96, duration: 0.35, ease: 'expo.in' }, 0.2);
    tl.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' }, 0.35);
  }, [onClose]);

  // Demo engine
  useEffect(() => {
    if (!project || !demoCanvasRef.current) {
      animRef.current.cleanup?.();
      return;
    }

    const canvas = demoCanvasRef.current;
    const parent = canvas.parentElement;
    if (!parent) return;

    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;

    const type = project.demo;

    if (type === 'particles' || type === 'photography' || type === 'shader') {
      // Three.js particle demo
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, canvas.width / canvas.height, 0.1, 100);
      camera.position.z = 4;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
      renderer.setSize(canvas.width, canvas.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const count = 1500;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

        const neon = new THREE.Color(0xccff00);
        const cyan = new THREE.Color(0x00ffff);
        const c = neon.clone().lerp(cyan, Math.random());
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      let animId = 0;
      const animate = () => {
        points.rotation.y += 0.003;
        points.rotation.x += 0.001;
        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      };
      animate();

      animRef.current.cleanup = () => {
        cancelAnimationFrame(animId);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
      };

    } else if (type === 'brand') {
      // Canvas 2D orbiting circles
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const labels = ['Brand', 'Identity', 'Voice', 'Vision', 'Values', 'Promise'];
      const circles = labels.map((l, i) => ({
        label: l,
        angle: (i / labels.length) * Math.PI * 2,
        radius: 60 + Math.random() * 30,
        speed: 0.005 + Math.random() * 0.003,
        size: 20 + Math.random() * 20,
      }));

      let animId = 0;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      const animate = () => {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = 'rgba(204,255,0,0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, 80, 0, Math.PI * 2);
        ctx.stroke();

        circles.forEach((c) => {
          c.angle += c.speed;
          const x = cx + Math.cos(c.angle) * c.radius;
          const y = cy + Math.sin(c.angle) * c.radius;

          ctx.beginPath();
          ctx.arc(x, y, c.size, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(204,255,0,0.4)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = 'rgba(204,255,0,0.6)';
          ctx.font = '10px "DM Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(c.label, x, y + 3);
        });

        // Center dot
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ccff00';
        ctx.fill();

        animId = requestAnimationFrame(animate);
      };
      animate();

      animRef.current.cleanup = () => {
        cancelAnimationFrame(animId);
      };

    } else if (type === 'seo') {
      // Canvas 2D animated bar chart
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const bars = [
        { label: 'Traffic', target: 280 },
        { label: 'Citations', target: 240 },
        { label: 'Authority', target: 200 },
        { label: 'Rankings', target: 320 },
        { label: 'Engagement', target: 180 },
      ];

      let progress = 0;
      let animId = 0;

      const animate = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barW = 40;
        const gap = (canvas.width - bars.length * barW) / (bars.length + 1);
        const maxH = canvas.height - 60;

        bars.forEach((bar, i) => {
          const x = gap + i * (barW + gap);
          const h = (bar.target / 350) * maxH * Math.min(progress, 1);
          const y = canvas.height - 30 - h;

          ctx.fillStyle = `rgba(204,255,0,${0.3 + (h / maxH) * 0.5})`;
          ctx.fillRect(x, y, barW, h);

          ctx.strokeStyle = 'rgba(204,255,0,0.6)';
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, barW, h);

          ctx.fillStyle = 'rgba(204,255,0,0.5)';
          ctx.font = '9px "DM Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(bar.label, x + barW / 2, canvas.height - 10);
        });

        progress += 0.015;
        animId = requestAnimationFrame(animate);
      };
      animate();

      animRef.current.cleanup = () => {
        cancelAnimationFrame(animId);
      };
    }

    return () => {
      animRef.current.cleanup?.();
      animRef.current.cleanup = null;
    };
  }, [project]);

  // Cleanup Three.js/canvas on unmount
  useEffect(() => {
    return () => {
      animRef.current.cleanup?.();
      animRef.current.cleanup = null;
      entranceTlRef.current?.kill();
    };
  }, []);

  // Resize canvas on window resize
  useEffect(() => {
    const onResize = () => {
      if (demoCanvasRef.current?.parentElement && project) {
        const parent = demoCanvasRef.current.parentElement;
        demoCanvasRef.current.width = parent.clientWidth;
        demoCanvasRef.current.height = parent.clientHeight;
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [project]);

  if (!project) return null;

  return (
    <div id="cs-overlay" className="open" ref={overlayRef} onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}>
      <div className="cs-modal" ref={modalRef}>
        <div className="cs-hdr">
          <div>
            <span className="cs-num">{project.num} — Case Study</span>
            <h2 className="cs-title">{project.title}</h2>
            <p className="cs-tagline">{project.desc}</p>
          </div>
          <button className="cs-close" onClick={handleClose}>✕ Close</button>
        </div>

        <div className="cs-body">
          {/* Demo */}
          <div className="cs-demo-wrap">
            <canvas ref={demoCanvasRef} />
            <span className="cs-demo-label">{project.demoLabel}</span>
          </div>

          {/* Problem / Solution */}
          <div className="cs-grid-2">
            <div>
              <h4 className="cs-section-title">Problem</h4>
              <p className="cs-body-text">{project.problem}</p>
            </div>
            <div>
              <h4 className="cs-section-title">Solution</h4>
              <p className="cs-body-text">{project.solution}</p>
            </div>
          </div>

          {/* Metrics */}
          <h4 className="cs-section-title">Key Metrics</h4>
          <div className="cs-grid-3">
            {project.metrics.map((m, i) => (
              <div className="cs-metric" key={i}>
                <div className="cs-metric-n">{m.n}</div>
                <div className="cs-metric-l">{m.l}</div>
                <div className="cs-metric-sub">{m.sub}</div>
              </div>
            ))}
          </div>

          {/* Steps */}
          <h4 className="cs-section-title">Process</h4>
          <div className="cs-steps">
            {project.steps.map((s, i) => (
              <div className="cs-step" key={i}>
                <span className="cs-step-n">{s.n}</span>
                <div>
                  <div className="cs-step-t">{s.t}</div>
                  <div className="cs-step-b">{s.b}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="cs-tags">
            {project.tags.map((t, i) => (
              <span className="cs-tag" key={i}>{t}</span>
            ))}
          </div>

          {/* Results */}
          <h4 className="cs-section-title">Results</h4>
          <div className="cs-results-grid">
            {project.results.map((r, i) => (
              <div className="cs-result-item" key={i}>
                <div className="cs-result-label">{r.label}</div>
                <div className="cs-result-value">{r.value}</div>
                <div className="cs-result-note">{r.note}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="cs-cta-row">
            <a className="cs-cta-primary" href={`#contact`} onClick={handleClose}>
              Start a Similar Project →
            </a>
            <button className="cs-cta-ghost" onClick={handleClose}>
              ← Back to All Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
