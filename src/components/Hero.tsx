import React from 'react';
import { Sparkles, ChevronDown, Calendar, Coffee, Compass } from 'lucide-react';
import { MEMORY_STATS } from '../data/storyData';

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

      {/* Live Memory Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl w-full mb-10 sm:mb-12">
        {MEMORY_STATS.map((stat, idx) => (
          <div
            key={idx}
            className="glass-panel glass-panel-hover p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center text-center"
          >
            <div className="p-1.5 sm:p-2 rounded-full bg-accent/10 text-accent mb-1.5">
              {idx === 0 && <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />}
              {idx === 1 && <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />}
              {idx === 2 && <Compass className="w-4 h-4 sm:w-5 sm:h-5" />}
              {idx === 3 && <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />}
            </div>
            <span className="text-xl sm:text-3xl font-extrabold font-serif text-text-primary">
              {stat.value}
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-text-muted mt-0.5">{stat.label}</span>
            <span className="text-[9px] sm:text-[10px] text-text-muted/70 mt-0.5 hidden xs:block">{stat.description}</span>
          </div>
        ))}
      </div>

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

