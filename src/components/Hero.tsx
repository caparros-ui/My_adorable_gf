import React from 'react';
import { Heart, Sparkles, ChevronDown, Calendar, Coffee, Compass } from 'lucide-react';
import { MEMORY_STATS } from '../data/storyData';

interface HeroProps {
  onStartJourney: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartJourney }) => {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-28 sm:pt-32 pb-16 overflow-hidden max-w-full">
      {/* Ambient background glow spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-gradient-to-tr from-pink-600/30 via-purple-600/30 to-fuchsia-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-pink-500/20 rounded-full blur-[80px] pointer-events-none" />

      {/* Floating Sparkles Badge */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:py-2 rounded-full bg-purple-950/80 border border-pink-500/30 backdrop-blur-md text-pink-300 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(236,72,153,0.3)] mb-6 animate-bounce max-w-[95%]">
        <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0" />
        <span className="truncate">Dedicated to My Favorite Person</span>
        <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400 shrink-0" />
      </div>

      {/* Main Title */}
      <h1 className="max-w-5xl text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-extrabold tracking-tight leading-none mb-4 sm:mb-6">
        <span className="block text-purple-100">Every Chapter of</span>
        <span className="block bg-gradient-to-r from-pink-400 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent glow-pink-text mt-1.5 sm:mt-2">
          Her & Us
        </span>
      </h1>

      {/* Subtitle */}
      <p className="max-w-2xl text-purple-200/90 text-sm sm:text-lg md:text-xl font-light leading-relaxed mb-8 sm:mb-10 px-2">
        A scrollable journey through 10 beautiful chapters of our favorite moments, late-night whispers, unexpected adventures, and infinite promises.
      </p>

      {/* Live Memory Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl w-full mb-10 sm:mb-12">
        {MEMORY_STATS.map((stat, idx) => (
          <div
            key={idx}
            className="glass-panel glass-panel-hover p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center border border-pink-500/20 text-center"
          >
            <div className="p-1.5 sm:p-2 rounded-full bg-pink-500/10 text-pink-400 mb-1.5">
              {idx === 0 && <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />}
              {idx === 1 && <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />}
              {idx === 2 && <Compass className="w-4 h-4 sm:w-5 sm:h-5" />}
              {idx === 3 && <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-pink-400" />}
            </div>
            <span className="text-xl sm:text-3xl font-extrabold font-serif bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              {stat.value}
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-purple-200 mt-0.5">{stat.label}</span>
            <span className="text-[9px] sm:text-[10px] text-purple-300/70 mt-0.5 hidden xs:block">{stat.description}</span>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={onStartJourney}
          className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-fuchsia-600 text-white font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:shadow-[0_0_45px_rgba(236,72,153,0.8)] hover:scale-105 transition-all focus:outline-none"
        >
          <span>Begin Reading Our Story</span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Scroll indicator hint */}
      <div className="mt-12 sm:mt-16 flex flex-col items-center gap-1.5 text-purple-300/60 text-[10px] sm:text-xs tracking-widest uppercase animate-pulse">
        <span>Scroll down to slide through pictures</span>
        <ChevronDown className="w-3.5 h-3.5 text-pink-400" />
      </div>
    </section>
  );
};
