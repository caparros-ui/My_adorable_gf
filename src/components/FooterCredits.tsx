import React from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';

export const FooterCredits: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-border bg-bg text-text-muted pt-12 pb-24 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand statement */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent text-bg flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-bg" />
          </div>
          <div>
            <h4 className="font-serif text-lg font-bold text-text-primary flex items-center gap-1.5">
              Chapter Story Gallery
            </h4>
            <p className="text-xs text-text-muted">Interactive photo gallery & story template</p>
          </div>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface hover:bg-accent hover:text-bg border border-border text-text-muted hover:text-bg text-xs font-semibold transition-all hover:scale-105 shadow-md focus:outline-none"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
};
