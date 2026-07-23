import React, { useState } from 'react';
import { Heart, Sparkles, BookOpen, Key, Image as ImageIcon, ChevronDown } from 'lucide-react';
import { Chapter } from '../types/story';
import { AmbientAudioPlayer } from './AmbientAudioPlayer';

interface HeaderNavProps {
  activeChapter: number;
  chapters: Chapter[];
  onSelectChapter: (id: number) => void;
  onOpenLoveNotes: () => void;
  onOpenVault: () => void;
  onOpenPhotoEditor: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeChapter,
  chapters,
  onSelectChapter,
  onOpenLoveNotes,
  onOpenVault,
  onOpenPhotoEditor,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentChapter = chapters.find((c) => c.id === activeChapter) || chapters[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-[#0d0617]/70 backdrop-blur-xl border-b border-pink-500/20 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <a
          href="#top"
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-[0_0_15px_rgba(236,72,153,0.5)] group-hover:scale-110 transition-transform">
            <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-serif text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-400 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent">
              Her & Us
              <Sparkles className="w-4 h-4 text-pink-400 inline-block animate-spin-slow" />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-purple-300 font-semibold">
              Our Story Chapters
            </p>
          </div>
        </a>

        {/* Chapter Quick Switch Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 hover:border-pink-500/50 text-purple-200 text-xs sm:text-sm font-medium transition-all shadow-sm focus:outline-none"
          >
            <BookOpen className="w-4 h-4 text-pink-400" />
            <span className="hidden sm:inline text-purple-300 font-semibold">
              {currentChapter.number}:
            </span>
            <span className="max-w-[120px] sm:max-w-[180px] truncate text-pink-200">
              {currentChapter.title}
            </span>
            <ChevronDown className={`w-4 h-4 text-purple-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Chapter Selector Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute top-full right-0 sm:left-0 mt-2 w-64 max-h-80 overflow-y-auto rounded-2xl bg-[#150a24]/95 border border-pink-500/30 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-2 z-50">
              <div className="px-3 py-1.5 border-b border-purple-900/50 text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
                Jump to Chapter
              </div>
              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    onSelectChapter(ch.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                    ch.id === activeChapter
                      ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 font-bold border-l-2 border-pink-500'
                      : 'text-purple-200 hover:bg-purple-900/40 hover:text-pink-200'
                  }`}
                >
                  <span className="truncate">
                    <span className="font-mono text-pink-400 mr-2">{ch.number.replace('CHAPTER ', '#')}</span>
                    {ch.title}
                  </span>
                  <span className="text-[10px] text-purple-400 font-mono ml-2 shrink-0">{ch.tag}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ambient Music Player */}
          <AmbientAudioPlayer />

          {/* Love Notes Drawer Button */}
          <button
            onClick={onOpenLoveNotes}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-950/40 hover:bg-pink-900/60 border border-pink-500/30 text-pink-300 text-xs font-semibold transition-all hover:scale-105 shadow-sm focus:outline-none"
            title="Open Love Notes"
          >
            <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
            <span className="hidden md:inline">Love Notes</span>
          </button>

          {/* Photo Customizer Button */}
          <button
            onClick={onOpenPhotoEditor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-200 text-xs font-medium transition-all hover:scale-105 focus:outline-none"
            title="Change Chapter Pictures"
          >
            <ImageIcon className="w-3.5 h-3.5 text-purple-300" />
            <span className="hidden lg:inline">Photos</span>
          </button>

          {/* Secret Vault Lock Button */}
          <button
            onClick={onOpenVault}
            className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white shadow-[0_0_12px_rgba(236,72,153,0.4)] transition-all hover:scale-110 focus:outline-none"
            title="Secret Surprise Box"
          >
            <Key className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
