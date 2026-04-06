import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const onScroll = () => setVis(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button id="back-top" className={vis ? 'vis' : ''} onClick={onClick} aria-label="Back to top">
      ↑
    </button>
  );
}
