import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const blobRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const time = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = () => blobRef.current?.classList.add('hov');
    const onOut = () => blobRef.current?.classList.remove('hov');

    document.addEventListener('mousemove', onMove);

    const hoverables = document.querySelectorAll(
      'a, button, .proj-card, .sk-pill, .id-tag, .blog-card-sm, .blog-featured, .test-card, .service-card'
    );
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', onOver);
      el.addEventListener('mouseleave', onOut);
    });

    const loop = () => {
      time.current += 0.03;
      const lerp = 0.15;
      pos.current.x += (target.current.x - pos.current.x) * lerp;
      pos.current.y += (target.current.y - pos.current.y) * lerp;

      const cx = pos.current.x;
      const cy = pos.current.y;
      const t = time.current;

      // 8-point blob with noise
      const pts = 8;
      const r = 18;
      let d = '';
      for (let i = 0; i < pts; i++) {
        const angle = (i / pts) * Math.PI * 2;
        const noise = Math.sin(t * 2 + i * 1.3) * 4 + Math.cos(t * 1.5 + i * 0.8) * 3;
        const px = cx + Math.cos(angle) * (r + noise);
        const py = cy + Math.sin(angle) * (r + noise);
        const cpx1 = cx + Math.cos(angle - Math.PI / pts) * (r + noise + 6 + Math.sin(t + i) * 3);
        const cpy1 = cy + Math.sin(angle - Math.PI / pts) * (r + noise + 6 + Math.sin(t + i) * 3);
        const cpx2 = cx + Math.cos(angle + Math.PI / pts) * (r + noise + 6 + Math.cos(t + i) * 3);
        const cpy2 = cy + Math.sin(angle + Math.PI / pts) * (r + noise + 6 + Math.cos(t + i) * 3);

        if (i === 0) {
          d += `M ${px} ${py} C ${cpx2} ${cpy2}, ${cpx1} ${cpy1}, `;
        } else {
          d += `${px} ${py} C ${cpx2} ${cpy2}, ${cpx1} ${cpy1}, `;
        }
      }
      d += 'Z';

      const path = blobRef.current?.querySelector('.blob-path') as SVGPathElement;
      if (path) path.setAttribute('d', d);

      if (blobRef.current) {
        blobRef.current.style.left = `${cx}px`;
        blobRef.current.style.top = `${cy}px`;
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${cx}px`;
        dotRef.current.style.top = `${cy}px`;
      }

      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', onMove);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onOver);
        el.removeEventListener('mouseleave', onOut);
      });
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div id="cursor-blob" ref={blobRef}>
        <svg viewBox="-25 -25 50 50">
          <path className="blob-path" fill="rgba(204,255,0,0.12)" stroke="rgba(204,255,0,0.5)" strokeWidth="1" d="" />
        </svg>
      </div>
      <div id="cursor-dot" ref={dotRef} />
    </>
  );
}
