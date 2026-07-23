import React, { useState, useEffect } from 'react';
import { DEFAULT_CHAPTERS, INITIAL_LOVE_NOTES } from './data/storyData';
import { Chapter, LoveNote } from './types/story';
import { HeaderNav } from './components/HeaderNav';
import { Hero } from './components/Hero';
import { ChapterSlideSection } from './components/ChapterSlideSection';
import { DotNavigation } from './components/DotNavigation';
import { FloatingHearts } from './components/FloatingHearts';
import { LoveNotesModal } from './components/LoveNotesModal';
import { PhotoEditorModal } from './components/PhotoEditorModal';
import { SecretVaultModal } from './components/SecretVaultModal';
import { LightboxModal } from './components/LightboxModal';
import { FooterCredits } from './components/FooterCredits';

export const App: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>(() => {
    const saved = localStorage.getItem('her_us_chapters');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_CHAPTERS;
      }
    }
    return DEFAULT_CHAPTERS;
  });

  const [loveNotes, setLoveNotes] = useState<LoveNote[]>(() => {
    const saved = localStorage.getItem('her_us_love_notes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_LOVE_NOTES;
      }
    }
    return INITIAL_LOVE_NOTES;
  });

  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Modals state
  const [isLoveNotesOpen, setIsLoveNotesOpen] = useState(false);
  const [isPhotoEditorOpen, setIsPhotoEditorOpen] = useState(false);
  const [targetPhotoChapterId, setTargetPhotoChapterId] = useState<number | null>(null);
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    image: string;
    title: string;
    quote: string;
  }>({
    isOpen: false,
    image: '',
    title: '',
    quote: '',
  });

  // Save custom chapters image changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('her_us_chapters', JSON.stringify(chapters));
  }, [chapters]);

  // Save love notes to LocalStorage
  useEffect(() => {
    localStorage.setItem('her_us_love_notes', JSON.stringify(loveNotes));
  }, [loveNotes]);

  // Scroll listener to update active chapter indicator and progress %
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      // Determine active chapter based on section position
      chapters.forEach((ch) => {
        const el = document.getElementById(`chapter-${ch.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveChapter(ch.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapters]);

  // Jump to specific chapter section
  const handleSelectChapter = (chapterId: number) => {
    setActiveChapter(chapterId);
    const target = document.getElementById(`chapter-${chapterId}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateChapterImage = (chapterId: number, newUrl: string) => {
    setChapters((prev) =>
      prev.map((c) => (c.id === chapterId ? { ...c, image: newUrl } : c))
    );
  };

  const handleAddLoveNote = (newNote: LoveNote) => {
    setLoveNotes((prev) => [newNote, ...prev]);
  };

  const handleOpenPhotoEditorForChapter = (chapterId: number) => {
    setTargetPhotoChapterId(chapterId);
    setIsPhotoEditorOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0d0617] text-purple-50 font-sans selection:bg-pink-500 selection:text-white overflow-x-hidden">
      {/* Background Floating Hearts */}
      <FloatingHearts />

      {/* Navigation Header Bar */}
      <HeaderNav
        activeChapter={activeChapter}
        chapters={chapters}
        onSelectChapter={handleSelectChapter}
        onOpenLoveNotes={() => setIsLoveNotesOpen(true)}
        onOpenVault={() => setIsVaultOpen(true)}
        onOpenPhotoEditor={() => {
          setTargetPhotoChapterId(1);
          setIsPhotoEditorOpen(true);
        }}
      />

      {/* Sticky Right Side Progress Indicator */}
      <DotNavigation
        scrollProgress={scrollProgress}
        activeChapter={activeChapter}
        chapters={chapters}
        onSelectChapter={handleSelectChapter}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero onStartJourney={() => handleSelectChapter(1)} />

        {/* 10 Chapter Sections with Sliding Pictures on Scroll */}
        <div className="space-y-0">
          {chapters.map((chapter, index) => (
            <ChapterSlideSection
              key={chapter.id}
              chapter={chapter}
              isEven={index % 2 === 1}
              onOpenLightbox={(image, title, quote) =>
                setLightboxData({ isOpen: true, image, title, quote })
              }
              onOpenPhotoEditorForChapter={handleOpenPhotoEditorForChapter}
            />
          ))}
        </div>
      </main>

      {/* Modals & Lightbox Overlays */}
      <LoveNotesModal
        isOpen={isLoveNotesOpen}
        onClose={() => setIsLoveNotesOpen(false)}
        notes={loveNotes}
        onAddNote={handleAddLoveNote}
      />

      <PhotoEditorModal
        isOpen={isPhotoEditorOpen}
        onClose={() => setIsPhotoEditorOpen(false)}
        chapters={chapters}
        targetChapterId={targetPhotoChapterId}
        onUpdateChapterImage={handleUpdateChapterImage}
      />

      <SecretVaultModal
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
      />

      <LightboxModal
        isOpen={lightboxData.isOpen}
        onClose={() => setLightboxData({ ...lightboxData, isOpen: false })}
        image={lightboxData.image}
        title={lightboxData.title}
        quote={lightboxData.quote}
      />

      {/* Footer */}
      <FooterCredits />
    </div>
  );
};

export default App;
