import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../data/portfolioData';
import { Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);

      // Section active detection
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
      const scrollPos = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveId(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveId(targetId);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 md:pb-6 px-4 transition-all duration-300 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-2 px-3 py-2 rounded-full glass-panel transition-all duration-300 ${
            isScrolled ? 'py-1.5 px-3 backdrop-blur-xl shadow-2xl scale-95 md:scale-100' : ''
          }`}
        >
          {/* Logo / Brand Indicator */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 pl-3 pr-2 text-text-primary font-serif font-bold text-sm tracking-wide group"
          >
            <span className="p-1 rounded-full bg-accent text-bg shadow-sm group-hover:rotate-12 transition-transform duration-300">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="hidden sm:inline text-text-primary">
              SV
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center relative gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-2 text-xs font-medium tracking-wider rounded-full transition-all duration-300 ${
                    isActive ? 'text-bg font-semibold' : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-accent rounded-full -z-10 transition-all duration-300" />
                  )}
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
            className="md:hidden p-2 text-text-primary hover:text-accent rounded-full bg-surface border border-border transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-bg/95 border-t border-border flex flex-col items-center justify-center gap-6 px-6 transition-all duration-300">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="text-accent text-xs tracking-widest uppercase">Navigation</span>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-2xl font-serif tracking-wide transition-colors ${
                  activeId === item.id ? 'text-accent font-bold scale-105' : 'text-text-primary/80 hover:text-text-primary'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
