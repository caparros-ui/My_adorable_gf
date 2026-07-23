import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-6 md:px-12 border-t border-border text-center text-text-muted text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <span>Interactive Chapter Gallery</span>
          <Sparkles className="w-3.5 h-3.5 text-accent inline-block" />
        </div>

        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="p-3 rounded-full bg-surface border border-border text-text-primary hover:bg-accent hover:text-bg transition-all duration-300 shadow-md group flex items-center gap-2 text-xs font-medium"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
