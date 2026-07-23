import React from 'react';
import { Heart, Sparkles, ChevronDown, Calendar, Coffee, Compass, Stars } from 'lucide-react';
import { MEMORY_STATS } from '../data/storyData';

interface HeroProps {
  onStartJourney: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartJourney }) => {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Ambient background glow spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-pink-600/30 via-purple-600/30 to-fuchsia-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-pink-500/20 rounded-full blur-[90px] pointer-events-none" />

      {/* Floating Sparkles Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/80 border border-pink-500/30 backdrop-blur-md text-pink-300 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(236,72,153,0.3)] mb-6 animate-bounce">
        <Sparkles className="w-4 h-4 text-pink-400" />
        <span>Dedicated to My Favorite Person in the Universe</span>
        <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
      </div>

      {/* Main Title */}
      <h1 className="max-w-5xl text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-extrabold tracking-tight leading-none mb-6">
        <span className="block text-purple-100">Every Chapter of</span>
        <span className="block bg-gradient-to-r from-pink-400 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent glow-pink-text mt-2">
          Her & Us
        </span>
      </h1>

      {/* Subtitle */}
      <p className="max-w-2xl text-purple-200/90 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-10">
        A scrollable journey through 10 beautiful chapters of our favorite moments, late-night whispers, unexpected adventures, and infinite promises.
      </p>

      {/* Live Memory Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl w-full mb-12">
        {MEMORY_STATS.map((stat, idx) => (
          <div
            key={idx}
            className="glass-panel glass-panel-hover p-4 rounded-2xl flex flex-col items-center justify-center border border-pink-500/20 text-center"
          >
            <div className="p-2 rounded-full bg-pink-500/10 text-pink-400 mb-2">
              {idx === 0 && <Calendar className="w-5 h-5" />}
              {idx === 1 && <Coffee className="w-5 h-5" />}
              {idx === 2 && <Compass className="w-5 h-5" />}
              {idx === 3 && <Heart className="w-5 h-5 fill-pink-400" />}
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold font-serif bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              {stat.value}
            </span>
            <span className="text-xs font-semibold text-purple-200 mt-1">{stat.label}</span>
            <span className="text-[10px] text-purple-300/70 mt-0.5">{stat.description}</span>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={onStartJourney}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-fuchsia-600 text-white font-bold text-base shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:shadow-[0_0_45px_rgba(236,72,153,0.8)] hover:scale-105 transition-all focus:outline-none"
        >
          <span>Begin Reading Our Story</span>
          <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Scroll indicator hint */}
      <div className="mt-16 flex flex-col items-center gap-2 text-purple-300/60 text-xs tracking-widest uppercase animate-pulse">
        <span>Scroll down to slide through pictures</span>
        <ChevronDown className="w-4 h-4 text-pink-400" />
      </div>
    </section>
  );
};
