import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, Quote, Sparkles, Image as ImageIcon, Maximize2, Tag } from 'lucide-react';
import { Chapter } from '../types/story';

interface ChapterSlideSectionProps {
  chapter: Chapter;
  isEven: boolean;
  onOpenLightbox: (image: string, title: string, quote: string) => void;
  onOpenPhotoEditorForChapter: (chapterId: number) => void;
}

export const ChapterSlideSection: React.FC<ChapterSlideSectionProps> = ({
  chapter,
  isEven,
  onOpenLightbox,
  onOpenPhotoEditorForChapter,
}) => {
  const [imgError, setImgError] = useState(false);

  // Dynamic image source handling fallback gracefully
  const currentImage = imgError ? chapter.fallbackImage : chapter.image;

  return (
    <section
      id={`chapter-${chapter.id}`}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-purple-900/30"
    >
      {/* Background ambient lighting per chapter */}
      <div className={`absolute top-1/2 ${isEven ? 'right-10' : 'left-10'} -translate-y-1/2 w-96 h-96 bg-gradient-to-br ${chapter.accentColor || 'from-pink-600 to-purple-600'} opacity-15 rounded-full blur-[100px] pointer-events-none`} />

      <div className="max-w-7xl mx-auto w-full">
        {/* Chapter Header Tag */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(236,72,153,0.4)]">
              {chapter.number}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Tag className="w-3 h-3 text-pink-400" />
              {chapter.tag}
            </span>
          </div>

          <div className="flex items-center gap-4 text-purple-300 text-xs font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-pink-400" />
              {chapter.date}
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-purple-400" />
              {chapter.location}
            </span>
          </div>
        </div>

        {/* Sliding Grid Layout: Picture & Story text slide from opposite sides */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? 'lg:grid-flow-col-dense' : ''}`}>
          
          {/* SLIDING PICTURE CARD (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 80 : -80, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-6 relative group ${isEven ? 'lg:col-start-7' : ''}`}
          >
            {/* Outer Glowing Border Frame */}
            <div className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-br from-pink-500/30 via-purple-600/30 to-fuchsia-500/20 backdrop-blur-xl border border-pink-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.6)] group-hover:shadow-[0_20px_50px_rgba(236,72,153,0.3)] transition-all duration-500">
              
              {/* Picture Container */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-purple-950/80">
                <img
                  src={currentImage}
                  alt={chapter.title}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0617] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Top Image Badges & Controls */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-purple-950/80 backdrop-blur-md border border-pink-500/30 text-pink-300 text-xs font-semibold flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    Chapter Photo #{chapter.id}
                  </span>

                  <div className="flex items-center gap-2 pointer-events-auto">
                    {/* Change Photo Button */}
                    <button
                      onClick={() => onOpenPhotoEditorForChapter(chapter.id)}
                      className="px-2.5 py-1 rounded-full bg-purple-950/90 hover:bg-pink-600 border border-pink-500/40 text-purple-200 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all shadow-md focus:outline-none"
                      title="Replace picture for this chapter"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Swap Photo</span>
                    </button>

                    {/* Expand Lightbox Button */}
                    <button
                      onClick={() => onOpenLightbox(currentImage, chapter.title, chapter.quote)}
                      className="p-1.5 rounded-full bg-purple-950/90 hover:bg-pink-600 border border-pink-500/40 text-purple-200 hover:text-white transition-all shadow-md focus:outline-none"
                      title="View Fullscreen Photo"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Bottom Quote Caption on Picture */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#150a24]/85 backdrop-blur-md border border-pink-500/20 text-xs text-purple-100 italic flex items-start gap-2">
                  <Quote className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <span>"{chapter.quote}"</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SLIDING STORY CONTENT (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className={`lg:col-span-6 flex flex-col justify-center ${isEven ? 'lg:col-start-1' : ''}`}
          >
            {/* Subtitle */}
            <p className="text-pink-400 font-medium text-sm sm:text-base tracking-wide mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400 inline-block" />
              {chapter.subtitle}
            </p>

            {/* Chapter Main Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-6 leading-tight">
              {chapter.title}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 text-purple-200/90 text-sm sm:text-base leading-relaxed mb-8">
              {chapter.story.map((paragraph, idx) => (
                <p key={idx} className="relative pl-4 border-l-2 border-pink-500/40">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Highlight Chips */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-purple-900/40">
              <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider mr-2 self-center">
                Memories:
              </span>
              {chapter.highlights.map((h, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-purple-950/70 border border-pink-500/20 text-pink-300 text-xs font-medium hover:border-pink-500/50 transition-colors"
                >
                  {h}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
