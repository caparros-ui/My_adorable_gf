import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-6 md:px-12 border-t border-white/10 text-center text-textMuted text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <span>Made with care</span>
          <Heart className="w-3.5 h-3.5 text-pinkCustom fill-pinkCustom inline-block" />
          <span>· Sophia Vance Portfolio</span>
        </div>

        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="p-3 rounded-full bg-white/5 border border-white/15 text-white hover:bg-pinkCustom hover:border-pinkCustom transition-all duration-300 shadow-md group flex items-center gap-2 text-xs font-medium"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
