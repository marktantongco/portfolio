import { useState, useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap-setup';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SERVICES, SOCIAL_LINKS } from '@/lib/data';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-heading', {
        scrollTrigger: { trigger: '.contact-heading', start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
      });

      gsap.from('.contact-sub', {
        scrollTrigger: { trigger: '.contact-sub', start: 'top 85%' },
        opacity: 0, y: 20, duration: 0.6, delay: 0.2, ease: 'power2.out',
      });

      gsap.from('.contact-form-wrap', {
        scrollTrigger: { trigger: '.contact-form-wrap', start: 'top 85%' },
        opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  const validate = () => {
    const errs: Record<string, boolean> = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.email.trim()) errs.email = true;
    if (!form.message.trim()) errs.message = true;
    setErrors(errs);

    // Shake on error fields
    Object.keys(errs).forEach((key) => {
      const el = formRef.current?.querySelector(`[name="${key}"]`) as HTMLElement;
      if (el) {
        gsap.to(el, {
          x: '-=8',
          duration: 0.08,
          repeat: 5,
          yoyo: true,
          ease: 'power2.out',
        });
      }
    });

    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    // Simulate brief delay for UX
    setTimeout(() => {
      // Construct mailto link
      const subject = encodeURIComponent(`Project Inquiry: ${form.service || 'General'}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\n\n${form.message}`
      );
      window.location.href = `mailto:hello@markanthony.dev?subject=${subject}&body=${body}`;

      // Show success
      setSubmitting(false);
      setSubmitted(true);
      if (successRef.current) {
        successRef.current.style.display = 'block';
        gsap.from(successRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
        });
      }

      // Checkmark animation
      if (checkRef.current) {
        gsap.fromTo(checkRef.current,
          { scale: 0, rotation: -180 },
          { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2)', delay: 0.2 }
        );
      }

      if (formRef.current) {
        gsap.to(formRef.current, { opacity: 0.3, duration: 0.3 });
      }
    }, 600);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  return (
    <section id="contact" ref={sectionRef}>
      <h2 className="contact-heading">
        Let's Build Something <span className="acc">Dangerous</span>
      </h2>
      <p className="contact-sub">
        I don't do safe. I build systems that move needles, challenge conventions, and leave a mark.
        If that resonates — let's talk.
      </p>
      <a className="contact-email" href="mailto:hello@markanthony.dev">hello@markanthony.dev</a>

      <div className="social-row">
        {SOCIAL_LINKS.map((s, i) => (
          <a className="social-link" key={i} href={s.href} target="_blank" rel="noopener noreferrer">
            {s.label}
          </a>
        ))}
      </div>

      <div className="contact-form-wrap">
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Name *</label>
              <input
                className="form-input"
                id="contact-name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={errors.name ? 'true' : 'false'}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">Email *</label>
              <input
                className="form-input"
                id="contact-email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contact-service">Service</label>
            <select
              className="form-select"
              id="contact-service"
              name="service"
              value={form.service}
              onChange={handleChange}
            >
              <option value="">Select a service</option>
              {SERVICES.map((s, i) => (
                <option key={i} value={s.title}>{s.title}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contact-message">Message *</label>
            <textarea
              className="form-textarea"
              id="contact-message"
              name="message"
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={errors.message ? 'true' : 'false'}
            />
          </div>

          <button className="form-submit" type="submit" disabled={submitting}>
            {submitting ? 'SENDING...' : 'Send Message'}
          </button>
          <p className="form-note">* Required fields. Opens your email client.</p>
        </form>

        <div className="form-success" ref={successRef}>
          <div className="form-success-icon" ref={checkRef}>✓</div>
          <div className="form-success-title">Message Ready</div>
          <div className="form-success-sub">
            Your email client should have opened. If not, send your inquiry to hello@markanthony.dev
          </div>
        </div>
      </div>
    </section>
  );
}
