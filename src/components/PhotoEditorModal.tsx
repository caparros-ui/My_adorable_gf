import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, Check, Upload, Link as LinkIcon, RotateCcw, Sparkles } from 'lucide-react';
import { Chapter } from '../types/story';

interface PhotoEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: Chapter[];
  targetChapterId: number | null;
  onUpdateChapterImage: (chapterId: number, newImageUrl: string) => void;
}

export const PhotoEditorModal: React.FC<PhotoEditorModalProps> = ({
  isOpen,
  onClose,
  chapters,
  targetChapterId,
  onUpdateChapterImage,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<number>(targetChapterId || 1);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [previewError, setPreviewError] = useState<boolean>(false);

  useEffect(() => {
    if (targetChapterId) {
      setSelectedChapterId(targetChapterId);
    }
  }, [targetChapterId]);

  const activeChapter = chapters.find((c) => c.id === selectedChapterId) || chapters[0];

  useEffect(() => {
    if (activeChapter) {
      setInputUrl(activeChapter.image);
      setPreviewError(false);
    }
  }, [selectedChapterId, activeChapter]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const urlStr = event.target.result as string;
          setInputUrl(urlStr);
          setPreviewError(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onUpdateChapterImage(selectedChapterId, inputUrl.trim());
      onClose();
    }
  };

  const handleResetToFallback = () => {
    onUpdateChapterImage(selectedChapterId, activeChapter.fallbackImage);
    setInputUrl(activeChapter.fallbackImage);
    setPreviewError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/90 animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl bg-surface border border-border shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-full bg-accent/10 text-accent">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-text-primary flex items-center gap-1.5">
                Customize Chapter Pictures
                <Sparkles className="w-4 h-4 text-accent inline" />
              </h3>
              <p className="text-xs text-text-muted">Replace photos for any of the 10 chapters easily</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-bg hover:bg-accent hover:text-bg text-text-muted transition-colors border border-border"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* Chapter Selector Tabs */}
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
              Select Chapter to Edit
            </label>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setSelectedChapterId(ch.id)}
                  className={`py-2 text-xs font-bold font-mono rounded-xl transition-all ${
                    ch.id === selectedChapterId
                      ? 'bg-accent text-bg shadow-sm scale-105'
                      : 'bg-bg hover:bg-surface text-text-muted border border-border'
                  }`}
                >
                  #{ch.id}
                </button>
              ))}
            </div>
          </div>

          {/* Current Chapter Info */}
          <div className="p-3 rounded-2xl bg-bg border border-border flex items-center justify-between text-xs">
            <span className="font-semibold text-accent">
              {activeChapter.number}: {activeChapter.title}
            </span>
            <span className="text-text-muted font-mono">{activeChapter.tag}</span>
          </div>

          {/* Image Preview */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-bg border border-border group">
            {inputUrl && !previewError ? (
              <img
                src={inputUrl}
                alt="Preview"
                onError={() => setPreviewError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-text-muted text-xs p-4 text-center">
                <ImageIcon className="w-8 h-8 text-accent mb-2 opacity-60" />
                <span>No image loaded or invalid URL</span>
              </div>
            )}
            <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-surface text-[10px] text-accent font-mono border border-border">
              Live Preview
            </div>
          </div>

          {/* Image URL Input */}
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1 flex items-center gap-1">
              <LinkIcon className="w-3.5 h-3.5 text-accent" />
              Image URL Link
            </label>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => {
                setInputUrl(e.target.value);
                setPreviewError(false);
              }}
              placeholder="Paste https:// image link here..."
              className="w-full p-3 rounded-xl bg-bg border border-border text-text-primary text-xs font-mono focus:outline-none focus:border-accent placeholder-text-muted/60"
            />
          </div>

          {/* Upload File Button */}
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1 flex items-center gap-1">
              <Upload className="w-3.5 h-3.5 text-accent" />
              Or Upload Image File From Your Device
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="block w-full text-xs text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-surface file:text-accent hover:file:bg-accent hover:file:text-bg cursor-pointer"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-border gap-3">
            <button
              type="button"
              onClick={handleResetToFallback}
              className="px-4 py-2.5 rounded-xl bg-bg hover:bg-surface text-text-muted text-xs font-semibold flex items-center gap-1.5 transition-colors border border-border"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Default
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-accent hover:bg-[#e0a3a7] text-bg text-xs font-bold flex items-center gap-2 shadow-md transition-all hover:scale-105"
            >
              <Check className="w-4 h-4" />
              Apply Photo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
