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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d0617]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#150a24] border border-pink-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-900/50 bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-purple-950/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-full bg-purple-500/20 text-pink-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-1.5">
                Customize Chapter Pictures
                <Sparkles className="w-4 h-4 text-pink-400 inline" />
              </h3>
              <p className="text-xs text-purple-300">Replace photos for any of the 10 chapters easily</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-purple-900/40 hover:bg-purple-800 text-purple-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* Chapter Selector Tabs */}
          <div>
            <label className="block text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">
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
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md scale-105'
                      : 'bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-900/50'
                  }`}
                >
                  #{ch.id}
                </button>
              ))}
            </div>
          </div>

          {/* Current Chapter Info */}
          <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-900/50 flex items-center justify-between text-xs">
            <span className="font-semibold text-pink-300">
              {activeChapter.number}: {activeChapter.title}
            </span>
            <span className="text-purple-400 font-mono">{activeChapter.tag}</span>
          </div>

          {/* Image Preview */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-purple-950/80 border border-pink-500/20 group">
            {inputUrl && !previewError ? (
              <img
                src={inputUrl}
                alt="Preview"
                onError={() => setPreviewError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-purple-400 text-xs p-4 text-center">
                <ImageIcon className="w-8 h-8 text-pink-400 mb-2 opacity-60" />
                <span>No image loaded or invalid URL</span>
              </div>
            )}
            <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-purple-950/90 text-[10px] text-pink-300 font-mono border border-pink-500/20">
              Live Preview
            </div>
          </div>

          {/* Image URL Input */}
          <div>
            <label className="block text-xs font-semibold text-purple-300 mb-1 flex items-center gap-1">
              <LinkIcon className="w-3.5 h-3.5 text-pink-400" />
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
              className="w-full p-3 rounded-xl bg-purple-950/80 border border-pink-500/30 text-white text-xs font-mono focus:outline-none focus:border-pink-500 placeholder-purple-400/60"
            />
          </div>

          {/* Upload File Button */}
          <div>
            <label className="block text-xs font-semibold text-purple-300 mb-1 flex items-center gap-1">
              <Upload className="w-3.5 h-3.5 text-pink-400" />
              Or Upload Image File From Your Device
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="block w-full text-xs text-purple-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pink-950/60 file:text-pink-300 hover:file:bg-pink-900/80 cursor-pointer"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-purple-900/40 gap-3">
            <button
              type="button"
              onClick={handleResetToFallback}
              className="px-4 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-purple-900/50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Default
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all hover:scale-105"
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
