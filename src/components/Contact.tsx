import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-setup';
import { GithubIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from '@/lib/social-icons';
import { toast } from 'sonner';
import { socialLinks } from '@/lib/data';

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Github: GithubIcon,
  Twitter: TwitterIcon,
  Linkedin: LinkedinIcon,
  Instagram: InstagramIcon,
  Mail,
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    if (!form.name.trim()) newErrors.name = true;
    if (!form.email.trim() || !form.email.includes('@')) newErrors.email = true;
    if (!form.subject.trim()) newErrors.subject = true;
    if (!form.message.trim()) newErrors.message = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fill in all fields correctly.');
      return;
    }
    setSuccess(true);
    toast.success('Message sent!');
    setTimeout(() => {
      setSuccess(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      toast.error('Please enter a valid email.');
      return;
    }
    toast.success('Subscribed!');
    setNewsletterEmail('');
  };

  useGSAP(() => {
    // Header scroll animation
    gsap.from('.contact-header', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-header',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    // Form fields stagger in from left on scroll
    gsap.utils.toArray<HTMLElement>('.contact-field').forEach((field, i) => {
      gsap.from(field, {
        x: -40,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: field,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Newsletter section slides up on scroll
    gsap.from('.contact-newsletter', {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact-newsletter',
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    });

    // Social links fade in
    gsap.from('.contact-socials', {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact-socials',
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: sectionRef });

  // GSAP input focus border color transition
  const handleInputFocus = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    gsap.to(el, {
      borderColor: 'var(--brutal-yellow)',
      duration: 0.2,
      ease: 'power2.out',
    });
  }, []);

  const handleInputBlur = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    gsap.to(el, {
      borderColor: 'var(--brutal-border)',
      duration: 0.2,
      ease: 'power2.out',
    });
  }, []);

  // GSAP button hover scale bounce
  const handleBtnEnter = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    gsap.to(el, { scale: 1.04, duration: 0.2, ease: 'back.out(1.4)' });
  }, []);

  const handleBtnLeave = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    gsap.to(el, { scale: 1, duration: 0.2, ease: 'power2.out' });
  }, []);

  const handleBtnDown = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    gsap.to(el, { scale: 0.97, duration: 0.08, ease: 'power2.out' });
  }, []);

  const handleBtnUp = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    gsap.to(el, { scale: 1, duration: 0.15, ease: 'elastic.out(1, 0.3)' });
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 lg:py-40 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="contact-header text-center mb-16">
          <h2 className="section-h2 mb-4" style={{ color: 'var(--brutal-border)' }}>
            START THE CONVERSATION
          </h2>
          <p className="label-text" style={{ color: 'var(--brutal-text-muted)' }}>
            Have a project in mind? Let&apos;s build something extraordinary.
          </p>
        </div>

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mb-12 relative"
          style={{ background: 'var(--brutal-surface)', border: 'var(--border-thick)', padding: '2rem' }}
          aria-live="polite"
        >
          {/* Name */}
          <div className="contact-field">
            <label className="label-text block mb-1" htmlFor="contact-name" style={{ color: 'var(--brutal-text-muted)' }}>NAME</label>
            <input
              id="contact-name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 text-sm"
              style={{
                background: 'var(--brutal-void)',
                border: errors.name ? '2px solid var(--brutal-red)' : 'var(--border-thin)',
                color: 'var(--brutal-border)',
              }}
              onFocus={(e) => handleInputFocus(e.currentTarget)}
              onBlur={(e) => handleInputBlur(e.currentTarget)}
              aria-invalid={errors.name || undefined}
              required
            />
          </div>

          {/* Email */}
          <div className="contact-field">
            <label className="label-text block mb-1" htmlFor="contact-email" style={{ color: 'var(--brutal-text-muted)' }}>EMAIL</label>
            <input
              id="contact-email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 text-sm"
              style={{
                background: 'var(--brutal-void)',
                border: errors.email ? '2px solid var(--brutal-red)' : 'var(--border-thin)',
                color: 'var(--brutal-border)',
              }}
              onFocus={(e) => handleInputFocus(e.currentTarget)}
              onBlur={(e) => handleInputBlur(e.currentTarget)}
              aria-invalid={errors.email || undefined}
              required
            />
          </div>

          {/* Subject */}
          <div className="contact-field">
            <label className="label-text block mb-1" htmlFor="contact-subject" style={{ color: 'var(--brutal-text-muted)' }}>SUBJECT</label>
            <input
              id="contact-subject"
              type="text"
              placeholder="What's this about?"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full p-3 text-sm"
              style={{
                background: 'var(--brutal-void)',
                border: errors.subject ? '2px solid var(--brutal-red)' : 'var(--border-thin)',
                color: 'var(--brutal-border)',
              }}
              onFocus={(e) => handleInputFocus(e.currentTarget)}
              onBlur={(e) => handleInputBlur(e.currentTarget)}
              aria-invalid={errors.subject || undefined}
              required
            />
          </div>

          {/* Message */}
          <div className="contact-field">
            <label className="label-text block mb-1" htmlFor="contact-message" style={{ color: 'var(--brutal-text-muted)' }}>MESSAGE</label>
            <textarea
              id="contact-message"
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              className="w-full p-3 text-sm resize-none"
              style={{
                background: 'var(--brutal-void)',
                border: errors.message ? '2px solid var(--brutal-red)' : 'var(--border-thin)',
                color: 'var(--brutal-border)',
              }}
              onFocus={(e) => handleInputFocus(e.currentTarget)}
              onBlur={(e) => handleInputBlur(e.currentTarget)}
              aria-invalid={errors.message || undefined}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="brutal-btn text-xs px-8 py-3 w-full min-h-[44px] interactive-press"
            disabled={success}
            onMouseEnter={(e) => handleBtnEnter(e.currentTarget)}
            onMouseLeave={(e) => handleBtnLeave(e.currentTarget)}
            onMouseDown={(e) => handleBtnDown(e.currentTarget)}
            onMouseUp={(e) => handleBtnUp(e.currentTarget)}
          >
            {success ? 'MESSAGE SENT ✓' : 'SEND MESSAGE'}
          </button>

          {/* Confetti on success */}
          <AnimatePresence>
            {success && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute w-2 h-2"
                    style={{
                      background: ['var(--brutal-yellow)', 'var(--brutal-cyan)', 'var(--brutal-magenta)', 'var(--brutal-green)'][i % 4],
                      left: `${Math.random() * 100}%`,
                      bottom: 0,
                    }}
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: -200, opacity: 0, rotate: 720 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3, delay: i * 0.05 }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </form>

        {/* Newsletter */}
        <div
          className="contact-newsletter p-6 mb-12"
          style={{ background: 'var(--brutal-surface)', border: 'var(--border-thick)' }}
        >
          <h3 className="subheading-h3 mb-2" style={{ color: 'var(--brutal-border)' }}>GET STRATEGIC INSIGHTS</h3>
          <p className="text-sm mb-4" style={{ color: 'var(--brutal-text-muted)' }}>
            AI strategy, prompt engineering tips, and neo-brutalist design experiments. No spam, unsubscribe anytime.
          </p>
          <form onSubmit={handleNewsletter} className="flex gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 p-2.5 text-sm"
              style={{ background: 'var(--brutal-void)', border: 'var(--border-thin)', color: 'var(--brutal-border)' }}
              aria-label="Newsletter email"
              required
            />
            <button
              type="submit"
              className="brutal-btn text-xs px-6 py-2 min-h-[44px] interactive-press"
              onMouseEnter={(e) => handleBtnEnter(e.currentTarget)}
              onMouseLeave={(e) => handleBtnLeave(e.currentTarget)}
              onMouseDown={(e) => handleBtnDown(e.currentTarget)}
              onMouseUp={(e) => handleBtnUp(e.currentTarget)}
            >
              JOIN
            </button>
          </form>
        </div>

        {/* Social links */}
        <div className="contact-socials flex justify-center gap-3">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon] || Mail;
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 transition-all duration-150 hover:-translate-y-0.5"
                style={{ border: 'var(--border-thin)', color: 'var(--brutal-border)' }}
                aria-label={link.ariaLabel}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
