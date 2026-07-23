import React from 'react';
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
    <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 py-4 px-2 rounded-full bg-surface border border-border shadow-lg">
      {/* Scroll Progress Bar indicator */}
      <div className="w-1 h-12 bg-bg rounded-full overflow-hidden mb-1">
        <div
          className="w-full bg-accent transition-all duration-200"
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
                  ? 'bg-accent scale-125 shadow-sm'
                  : 'bg-text-muted/40 group-hover:bg-accent/70 group-hover:scale-110'
              }`}
            >
              {isActive && <span className="w-1 h-1 rounded-full bg-bg" />}
            </div>

            {/* Hover Tooltip */}
            <div className="absolute right-full mr-3 px-3 py-1 rounded-lg bg-surface border border-border text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
              <span className="font-mono text-accent mr-1.5">#{ch.id}</span>
              <span className="text-text-primary font-medium">{ch.title}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

