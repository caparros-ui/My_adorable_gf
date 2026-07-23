import React from 'react';
import { Heart } from 'lucide-react';
import { Chapter } from '../types/story';

interface DotNavigationProps {
  scrollProgress: number;
  activeChapter: number;
  chapters: Chapter[];
  onSelectChapter: (id: number) => void;
}

export const DotNavigation: React.FC<DotNavigationProps> = ({
  scrollProgress,
  activeChapter,
  chapters,
  onSelectChapter,
}) => {
  return (
    <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 py-4 px-2 rounded-full bg-purple-950/40 backdrop-blur-md border border-pink-500/20 shadow-xl">
      {/* Scroll Progress Bar indicator */}
      <div className="w-1 h-12 bg-purple-900/60 rounded-full overflow-hidden mb-1">
        <div
          className="w-full bg-gradient-to-b from-pink-500 to-purple-500 transition-all duration-200"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Chapter Dots */}
      {chapters.map((ch) => {
        const isActive = ch.id === activeChapter;
        return (
          <button
            key={ch.id}
            onClick={() => onSelectChapter(ch.id)}
            className="group relative flex items-center justify-center p-1 focus:outline-none"
            title={`Chapter ${ch.id}: ${ch.title}`}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center ${
                isActive
                  ? 'bg-pink-500 scale-125 shadow-[0_0_12px_rgba(236,72,153,0.8)]'
                  : 'bg-purple-800/80 group-hover:bg-pink-400/70 group-hover:scale-110'
              }`}
            >
              {isActive && <Heart className="w-2 h-2 fill-white text-white" />}
            </div>

            {/* Hover Tooltip */}
            <div className="absolute right-full mr-3 px-3 py-1 rounded-lg bg-[#150a24]/90 border border-pink-500/30 backdrop-blur-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
              <span className="font-mono text-pink-400 mr-1.5">#{ch.id}</span>
              <span className="text-purple-100 font-medium">{ch.title}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
