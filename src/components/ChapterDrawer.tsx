import React from 'react';
import { Chapter } from '../types/tracingArt';

interface ChapterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: Chapter[];
  activeChapter: number;
  onSelectChapter: (chapterId: number) => void;
}

export const ChapterDrawer: React.FC<ChapterDrawerProps> = ({
  isOpen,
  onClose,
  chapters,
  activeChapter,
  onSelectChapter,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Drawer Panel */}
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 h-full p-8 flex flex-col justify-between overflow-y-auto border-r border-neutral-200 dark:border-neutral-800 shadow-2xl animate-slideRight">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-6 mb-8">
            <div>
              <span className="text-xs font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase block">
                Getty Provenance Index
              </span>
              <h2 className="text-xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                Chapter Selection
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chapter List */}
          <div className="space-y-4">
            {chapters.map((ch) => {
              const isActive = ch.id === activeChapter;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    onSelectChapter(ch.id);
                    onClose();
                  }}
                  className={`w-full text-left p-5 rounded-xl border transition-all flex flex-col justify-between group ${
                    isActive
                      ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-50 dark:bg-neutral-800/80 shadow-sm'
                      : 'border-neutral-200 dark:border-neutral-800/60 hover:border-neutral-400 dark:hover:border-neutral-700 bg-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold tracking-wider text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
                      CHAPTER 0{ch.id}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                      {ch.startYear} – {ch.endYear}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-semibold text-neutral-900 dark:text-neutral-100 mb-1 group-hover:translate-x-1 transition-transform">
                    {ch.title}
                  </h3>
                  <p className="text-xs font-sans text-neutral-500 dark:text-neutral-400 line-clamp-2">
                    {ch.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800/40 text-xs font-mono">
                    <span className="text-neutral-400">{ch.subtitle}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold group-hover:underline">
                      {isActive ? 'Currently Viewing' : 'Explore Chapter →'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-500 dark:text-neutral-400 space-y-2">
          <p>© 2026 J. Paul Getty Trust</p>
          <p>Linked Open Data Architecture (LOD)</p>
        </div>
      </div>

      {/* Outside click overlay */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
