import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Bell } from 'lucide-react';
import { toast } from 'sonner';
import { EASE_SPRING, DURATION, STAGGER } from '@/lib/motion';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [newsletter, setNewsletter] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      toast.success('Message sent successfully!', {
        description: `Thanks ${form.name}, I'll get back to you soon.`,
        style: {
          background: 'var(--brutal-surface)',
          border: '2px solid var(--brutal-green)',
          color: 'var(--brutal-border)',
        },
      });
      setForm({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 1000);
  };

  const handleNewsletter = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletter.trim()) return;

    toast.success('Subscribed!', {
      description: 'You\'ll receive updates on new projects and writings.',
      style: {
        background: 'var(--brutal-surface)',
        border: '2px solid var(--brutal-yellow)',
        color: 'var(--brutal-border)',
      },
    });
    setNewsletter('');
  };

  const inputStyle = {
    background: 'var(--brutal-surface)',
    border: 'var(--border-thin)',
    color: 'var(--brutal-border)',
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 lg:py-40 px-6 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: DURATION.enter, ease: EASE_SPRING }}
        >
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: 'var(--brutal-yellow)' }}
          >
            // CONTACT
          </p>
          <h2
            className="font-black uppercase tracking-tight mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--brutal-border)',
            }}
          >
            LET&apos;S BUILD
          </h2>
          <p
            className="text-base max-w-2xl mb-16"
            style={{ color: 'var(--brutal-text-muted)', lineHeight: 1.7 }}
          >
            Have a project in mind? Want to collaborate? Or just want to say
            hello? Drop me a message.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact form */}
          <motion.form
            className="lg:col-span-3 brutal-card p-6 md:p-8"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.enter, ease: EASE_SPRING }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold tracking-[0.1em] uppercase mb-2"
                  style={{ color: 'var(--brutal-text-muted)' }}
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={inputStyle}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold tracking-[0.1em] uppercase mb-2"
                  style={{ color: 'var(--brutal-text-muted)' }}
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={inputStyle}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="contact-subject"
                className="block text-xs font-semibold tracking-[0.1em] uppercase mb-2"
                style={{ color: 'var(--brutal-text-muted)' }}
              >
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 text-sm outline-none"
                style={inputStyle}
                placeholder="Project inquiry"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="contact-message"
                className="block text-xs font-semibold tracking-[0.1em] uppercase mb-2"
                style={{ color: 'var(--brutal-text-muted)' }}
              >
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 text-sm outline-none resize-none"
                style={inputStyle}
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-wide uppercase cursor-pointer transition-all duration-150 hover:translate-y-[2px] disabled:opacity-50 min-h-[44px] interactive-press"
              style={{
                background: 'var(--brutal-yellow)',
                color: 'var(--brutal-void)',
                border: 'var(--border-thick)',
              }}
            >
              <Send size={14} />
              {submitting ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </motion.form>

          {/* Newsletter + info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.enter, delay: STAGGER.items, ease: EASE_SPRING }}
          >
            <div
              className="brutal-card p-6"
              style={{ borderLeft: '4px solid var(--brutal-yellow)' }}
            >
              <h3
                className="font-bold text-sm tracking-[0.1em] uppercase mb-2"
                style={{ color: 'var(--brutal-yellow)' }}
              >
                <Bell size={14} className="inline mr-2" />
                STAY UPDATED
              </h3>
              <p
                className="text-xs leading-relaxed mb-4"
                style={{ color: 'var(--brutal-text-muted)' }}
              >
                Get notified about new projects, blog posts, and creative
                experiments. No spam, just signal.
              </p>
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletter}
                  onChange={(e) => setNewsletter(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 text-xs outline-none"
                  style={inputStyle}
                />
                <button
                  type="submit"
                  className="px-3 py-2 text-xs font-bold tracking-wide cursor-pointer transition-all duration-150 hover:translate-y-[2px] min-h-[44px] interactive-press"
                  style={{
                    background: 'var(--brutal-yellow)',
                    color: 'var(--brutal-void)',
                    border: 'var(--border-thin)',
                  }}
                >
                  SUB
                </button>
              </form>
            </div>

            <div className="brutal-card p-6">
              <h3
                className="font-bold text-sm tracking-[0.1em] uppercase mb-3"
                style={{ color: 'var(--brutal-cyan)' }}
              >
                RESPONSE TIME
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: 'var(--brutal-text-muted)' }}
              >
                I typically respond within 24 hours during business days. For
                urgent inquiries, mention it in the subject line.
              </p>
            </div>

            <div className="brutal-card p-6">
              <h3
                className="font-bold text-sm tracking-[0.1em] uppercase mb-3"
                style={{ color: 'var(--brutal-green)' }}
              >
                CURRENT STATUS
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-2 h-2 inline-block"
                  style={{
                    background: 'var(--brutal-green)',
                    animation: 'pulse-bar 2s ease-in-out infinite',
                  }}
                />
                <span
                  className="text-xs font-semibold"
                  style={{ color: 'var(--brutal-green)' }}
                >
                  Open to new projects
                </span>
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: 'var(--brutal-text-muted)' }}
              >
                Currently accepting freelance and collaboration opportunities
                for Q1 2026.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
