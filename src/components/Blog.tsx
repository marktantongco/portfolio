import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-setup';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { BLOG_POSTS } from '@/lib/data';

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.blog-heading', {
        scrollTrigger: { trigger: '.blog-heading', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
      });

      gsap.from('.blog-featured', {
        scrollTrigger: { trigger: '.blog-dual', start: 'top 85%' },
        opacity: 0, x: -30, duration: 0.7, ease: 'power2.out',
      });

      gsap.from('.blog-card-sm', {
        scrollTrigger: { trigger: '.blog-dual', start: 'top 85%' },
        opacity: 0, x: 30, duration: 0.7, stagger: 0.15, ease: 'power2.out',
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  const featured = BLOG_POSTS.find((p) => p.featured);
  const small = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <section id="blog" ref={sectionRef}>
      <div className="blog-hdr">
        <h2 className="blog-heading">Thoughts</h2>
        <p className="blog-sub">
          Writing about AI, design engineering, and the intersection of creativity and technology.
        </p>
      </div>

      <div className="blog-dual">
        {featured && (
          <a className="blog-featured" href="#">
            <span className="blog-date">{featured.date}</span>
            <span className="blog-cat">{featured.category}</span>
            <h3 className="blog-title-lg">{featured.title}</h3>
            <p className="blog-excerpt">{featured.excerpt}</p>
            <div className="blog-footer-row">
              <span className="blog-read">Read Article</span>
              <span className="blog-read-time">{featured.readTime}</span>
            </div>
          </a>
        )}

        <div className="blog-stack">
          {small.map((post, i) => (
            <a className="blog-card-sm" href="#" key={i}>
              <span className="blog-date">{post.date}</span>
              <span className="blog-cat">{post.category}</span>
              <h3 className="blog-title-sm">{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <div className="blog-footer-row">
                <span className="blog-read">Read Article</span>
                <span className="blog-read-time">{post.readTime}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
