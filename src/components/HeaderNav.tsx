import React, { useState } from 'react';
import { FileText, BookOpen, Key, Image as ImageIcon, ChevronDown } from 'lucide-react';
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
    <header className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[95vw] sm:max-w-fit px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#2B3A4A]/70 backdrop-blur-xl border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.45),0_0_20px_rgba(232,180,184,0.15)] hover:border-accent/50 transition-all duration-300 pointer-events-auto">
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
        
        {/* Chapter Quick Switch Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 hover:border-accent/50 text-text-muted hover:text-text-primary text-xs font-medium transition-all shadow-sm focus:outline-none max-w-[140px] xs:max-w-[180px] sm:max-w-[220px] backdrop-blur-md"
          >
            <BookOpen className="w-3.5 h-3.5 text-accent shrink-0" />
            <span className="hidden md:inline text-text-muted font-semibold shrink-0">
              {currentChapter.number}:
            </span>
            <span className="truncate text-text-primary text-[11px] sm:text-xs">
              {currentChapter.title}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-text-muted shrink-0 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Chapter Selector Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-60 sm:w-64 max-h-72 overflow-y-auto rounded-2xl bg-[#2B3A4A]/95 backdrop-blur-xl border border-white/20 shadow-2xl py-2 z-50">
              <div className="px-3 py-1.5 border-b border-white/10 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
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
                      ? 'bg-white/10 text-accent font-bold border-l-2 border-accent'
                      : 'text-text-muted hover:bg-white/5 hover:text-text-primary'
                  }`}
                >
                  <span className="truncate">
                    <span className="font-mono text-accent mr-1.5">#{ch.id}</span>
                    {ch.title}
                  </span>
                  <span className="text-[10px] text-text-muted font-mono ml-2 shrink-0">{ch.tag}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Ambient Music Player */}
          <AmbientAudioPlayer />

          {/* Love Notes Drawer Button */}
          <button
            onClick={onOpenLoveNotes}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 hover:border-accent/50 text-accent text-xs font-semibold transition-all hover:scale-105 shadow-sm focus:outline-none backdrop-blur-md"
            title="Open Notes"
          >
            <FileText className="w-3.5 h-3.5 text-accent" />
            <span className="hidden sm:inline">Notes</span>
          </button>

          {/* Photo Customizer Button */}
          <button
            onClick={onOpenPhotoEditor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 hover:border-accent/50 text-text-muted hover:text-text-primary text-xs font-medium transition-all hover:scale-105 focus:outline-none backdrop-blur-md"
            title="Add or Change Photos"
          >
            <ImageIcon className="w-3.5 h-3.5 text-accent" />
            <span className="hidden lg:inline">Photos</span>
          </button>

          {/* Secret Vault Lock Button */}
          <button
            onClick={onOpenVault}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent hover:bg-[#e0a3a7] text-bg font-semibold text-xs transition-all hover:scale-105 shadow-md focus:outline-none backdrop-blur-md"
            title="Secret Message Box"
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Vault</span>
          </button>
        </div>
      </div>
    </header>
  );
};


