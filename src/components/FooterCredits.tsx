import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';

export const FooterCredits: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-purple-900/40 bg-[#0a0412] text-purple-300 pt-12 pb-24 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand statement */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h4 className="font-serif text-lg font-bold text-white flex items-center gap-1.5">
              Her & Us — Our 10 Chapters
              <Sparkles className="w-4 h-4 text-pink-400" />
            </h4>
            <p className="text-xs text-purple-400">Created with endless affection & care</p>
          </div>
        </div>

        {/* Center message */}
        <div className="text-center text-xs text-purple-300/80">
          <span>"To the one who holds my heart, today and for all tomorrows."</span>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/80 hover:bg-pink-600 border border-pink-500/30 text-purple-200 hover:text-white text-xs font-semibold transition-all hover:scale-105 shadow-md focus:outline-none"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
};
