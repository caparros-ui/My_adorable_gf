import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../data/portfolioData';
import { Mail, Send, CheckCircle2, Github, Instagram, Linkedin, Dribbble } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);

  const handleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Github': return <Github className="w-4 h-4" />;
      case 'Instagram': return <Instagram className="w-4 h-4" />;
      case 'Linkedin': return <Linkedin className="w-4 h-4" />;
      case 'Dribbble': return <Dribbble className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative">
      <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-white/5 border border-pinkCustom/30 backdrop-blur-2xl relative overflow-hidden shadow-2xl">
        {/* Glow Ambient Corner */}
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-pinkCustom/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-purpleCustom/20 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          {/* Left Side: Info & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-pinkCustom-soft uppercase mb-3">
                <span className="w-6 h-px bg-pinkCustom-soft" />
                <span>Get In Touch</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Let's collaborate &amp; create something beautiful.
              </h2>

              <p className="text-textMuted text-base mb-8 leading-relaxed">
                Available for select creative direction projects, editorial photography, and brand design inquiries. Feel free to reach out directly.
              </p>
            </div>

            {/* Social Buttons */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-pinkCustom-soft block mb-4">
                Connect Across Platforms
              </span>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/15 text-sm font-medium text-textLight hover:bg-gradient-to-r hover:from-purpleCustom hover:to-pinkCustom hover:border-transparent hover:-translate-y-0.5 transition-all duration-300 shadow-md"
                  >
                    {handleIcon(link.icon)}
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-textMuted mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder:text-textMuted/50 focus:outline-none focus:border-pinkCustom transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-textMuted mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder:text-textMuted/50 focus:outline-none focus:border-pinkCustom transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-textMuted mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Project Inquiry / Creative Direction"
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder:text-textMuted/50 focus:outline-none focus:border-pinkCustom transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-textMuted mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell her about your vision or project..."
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder:text-textMuted/50 focus:outline-none focus:border-pinkCustom transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purpleCustom to-pinkCustom text-white font-medium text-sm tracking-wide shadow-lg hover:shadow-[0_10px_30px_-5px_rgba(236,72,153,0.8)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : isSent ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Message Sent Successfully!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
