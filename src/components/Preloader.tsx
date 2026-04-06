import { useState, useEffect } from 'react';

export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 6 + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setPct(100);
        setTimeout(() => setDone(true), 400);
      }
      setPct(Math.min(Math.floor(current), 100));
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="preloader" className={done ? 'done' : ''}>
      <span className="pre-logo">MAT</span>
      <div className="pre-bar-wrap">
        <div className="pre-bar" style={{ width: `${pct}%` }} />
      </div>
      <span className="pre-pct">{pct}%</span>
    </div>
  );
}
