import React from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';

interface HeroProps {
  onStartJourney: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartJourney }) => {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-28 sm:pt-32 pb-16 overflow-hidden max-w-full">
      {/* Floating Sparkles Badge */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:py-2 rounded-full bg-surface border border-border text-accent text-xs sm:text-sm font-semibold tracking-wide mb-6 animate-bounce max-w-[95%]">
        <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
        <span className="truncate">Interactive Chapter Gallery</span>
      </div>

      {/* Main Title */}
      <h1 className="max-w-5xl text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-extrabold tracking-tight leading-none mb-4 sm:mb-6">
        <span className="block text-text-primary">Photo Story</span>
        <span className="block text-accent mt-1.5 sm:mt-2">
          10 Chapters
        </span>
      </h1>

      {/* Subtitle */}
      <p className="max-w-2xl text-text-muted text-sm sm:text-lg md:text-xl font-light leading-relaxed mb-8 sm:mb-10 px-2">
        A floating glassmorphic gallery template. Upload your own pictures and add custom descriptions for each chapter below.
      </p>



      {/* Action Button */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={onStartJourney}
          className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-accent hover:bg-[#e0a3a7] text-bg font-bold text-sm sm:text-base transition-all focus:outline-none"
        >
          <span>Explore Chapters</span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Scroll indicator hint */}
      <div className="mt-12 sm:mt-16 flex flex-col items-center gap-1.5 text-text-muted/60 text-[10px] sm:text-xs tracking-widest uppercase animate-pulse">
        <span>Scroll down to view pictures</span>
        <ChevronDown className="w-3.5 h-3.5 text-accent" />
      </div>
    </section>
  );
};

