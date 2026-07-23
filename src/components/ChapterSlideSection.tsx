import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Quote, Sparkles, Image as ImageIcon, Maximize2, Tag, Upload } from 'lucide-react';
import { Chapter } from '../types/story';
import { useLongPress } from '../hooks/useLongPress';

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

  const hasCustomImage = Boolean(chapter.image && chapter.image.trim() !== '' && !imgError);
  const hasDetails = Boolean((chapter.date && chapter.date.trim()) || (chapter.location && chapter.location.trim()));
  const hasQuote = Boolean(chapter.quote && chapter.quote.trim() !== '');

  const longPressProps = useLongPress({
    onLongPress: () => {
      if (hasCustomImage) {
        onOpenLightbox(chapter.image, chapter.title || `Chapter #${chapter.id}`, chapter.quote || '');
      }
    }
  });

  return (
    <section
      id={`chapter-${chapter.id}`}
      className="relative min-h-screen flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-border"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Chapter Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-accent text-bg font-mono text-xs font-bold uppercase tracking-wider">
              {chapter.number}
            </span>
            {chapter.tag && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface border border-border text-text-muted text-xs font-semibold">
                <Tag className="w-3 h-3 text-accent" />
                {chapter.tag}
              </span>
            )}
          </div>

          {hasDetails && (
            <div className="flex items-center gap-3 text-text-muted text-xs font-medium">
              {chapter.date && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  {chapter.date}
                </span>
              )}
              {chapter.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-accent-warm" />
                  {chapter.location}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Sliding Grid Layout: Picture & Story text slide from opposite sides */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? 'lg:grid-flow-col-dense' : ''}`}>
          
          {/* SLIDING PICTURE CARD (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 60 : -60, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-6 relative group w-full ${isEven ? 'lg:col-start-7' : ''}`}
          >
            {/* Outer Border Frame */}
            <div className="relative rounded-3xl p-2 sm:p-3 bg-surface border border-border shadow-xl transition-all duration-500">
              
              {/* Picture Container */}
              <div 
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-bg flex items-center justify-center select-none cursor-pointer"
                {...longPressProps}
                onContextMenu={(e) => { if (hasCustomImage) e.preventDefault(); }}
              >
                {hasCustomImage ? (
                  <img
                    src={chapter.image}
                    alt={chapter.title || `Chapter #${chapter.id}`}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  /* Clean Elegant Upload Placeholder */
                  <div
                    onClick={() => onOpenPhotoEditorForChapter(chapter.id)}
                    className="w-full h-full flex flex-col items-center justify-center p-6 bg-surface cursor-pointer hover:border-accent/50 transition-colors text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mb-3 group-hover:scale-110 group-hover:bg-accent/20 transition-all">
                      <Upload className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-semibold text-text-primary mb-1">
                      Upload Chapter #{chapter.id} Photo
                    </span>
                    <span className="text-xs text-text-muted max-w-xs">
                      Click here to paste an image URL or add a picture for this chapter
                    </span>
                  </div>
                )}

                {/* Gradient Overlay for text readability */}
                {hasCustomImage && (
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                )}

                {/* Top Image Controls */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-surface border border-border text-accent text-[11px] sm:text-xs font-semibold flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3 text-accent" />
                    Chapter #{chapter.id}
                  </span>

                  <div className="flex items-center gap-1.5 pointer-events-auto">
                    {/* Add / Swap Photo Button */}
                    <button
                      onClick={() => onOpenPhotoEditorForChapter(chapter.id)}
                      className="px-2.5 py-1 rounded-full bg-surface hover:bg-accent hover:text-bg border border-border text-text-muted text-[11px] sm:text-xs font-semibold flex items-center gap-1 transition-all shadow-md focus:outline-none"
                      title="Add or swap picture for this chapter"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>{hasCustomImage ? 'Swap Photo' : 'Add Photo'}</span>
                    </button>

                    {hasCustomImage && (
                      <button
                        onClick={() => onOpenLightbox(chapter.image, chapter.title, chapter.quote)}
                        className="p-1.5 rounded-full bg-surface hover:bg-accent hover:text-bg border border-border text-text-muted transition-all shadow-md focus:outline-none"
                        title="View Fullscreen Photo"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Bottom Quote Caption on Picture */}
                {hasQuote && (
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-surface/95 border border-border text-xs text-text-primary italic flex items-start gap-2">
                    <Quote className="w-4 h-4 text-accent-warm shrink-0 mt-0.5" />
                    <span className="line-clamp-2 sm:line-clamp-none">"{chapter.quote}"</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* SLIDING STORY CONTENT (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className={`lg:col-span-6 flex flex-col justify-center ${isEven ? 'lg:col-start-1' : ''}`}
          >
            {/* Subtitle */}
            {chapter.subtitle && chapter.subtitle.trim() !== '' && (
              <p className="text-accent font-medium text-xs sm:text-sm tracking-wide mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent inline-block" />
                {chapter.subtitle}
              </p>
            )}

            {/* Chapter Main Title */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-text-primary tracking-tight mb-4 sm:mb-6 leading-tight break-words">
              {chapter.title || `Chapter ${chapter.id}`}
            </h2>

            {/* Paragraphs */}
            {chapter.story && chapter.story.length > 0 && chapter.story.some(p => p.trim() !== '') ? (
              <div className="space-y-3 sm:space-y-4 text-text-muted text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                {chapter.story.map((paragraph, idx) => (
                  <p key={idx} className="relative pl-3.5 border-l-2 border-accent-warm/40">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <div className="py-5 px-4 mb-6 rounded-2xl bg-surface/40 border border-dashed border-border text-text-muted text-xs sm:text-sm italic">
                Information & description blank. Use the photo editor or update details to add your custom picture story.
              </div>
            )}

            {/* Highlight Chips */}
            {chapter.highlights && chapter.highlights.length > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 border-t border-border">
                <span className="text-xs text-text-muted font-semibold uppercase tracking-wider mr-1 self-center">
                  Tags:
                </span>
                {chapter.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full bg-surface border border-border text-text-muted text-xs font-medium hover:border-accent/50 transition-colors"
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

