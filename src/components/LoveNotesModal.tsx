import React, { useState } from 'react';
import { X, Heart, Sparkles, Plus, Send, RefreshCw, Bookmark } from 'lucide-react';
import { LoveNote } from '../types/story';

interface LoveNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: LoveNote[];
  onAddNote: (note: LoveNote) => void;
}

export const LoveNotesModal: React.FC<LoveNotesModalProps> = ({
  isOpen,
  onClose,
  notes,
  onAddNote,
}) => {
  const [activeTab, setActiveTab] = useState<'draw' | 'all' | 'create'>('draw');
  const [currentRandomIndex, setCurrentRandomIndex] = useState(0);
  const [newText, setNewText] = useState('');
  const [newAuthor, setNewAuthor] = useState('Me');

  if (!isOpen) return null;

  const currentRandomNote = notes[currentRandomIndex % notes.length];

  const handleNextRandom = () => {
    setCurrentRandomIndex((prev) => (prev + 1) % notes.length);
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const created: LoveNote = {
      id: `custom-${Date.now()}`,
      text: newText.trim(),
      author: newAuthor.trim() || 'Me',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isCustom: true,
    };

    onAddNote(created);
    setNewText('');
    setActiveTab('all');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d0617]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#150a24] border border-pink-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-900/50 bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-pink-950/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-full bg-pink-500/20 text-pink-400">
              <Heart className="w-5 h-5 fill-pink-400" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-1.5">
                Love Notes for Her
                <Sparkles className="w-4 h-4 text-pink-400 inline animate-pulse" />
              </h3>
              <p className="text-xs text-purple-300">Little messages left just for you</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-purple-900/40 hover:bg-purple-800 text-purple-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-purple-900/40 bg-purple-950/50 p-1.5">
          <button
            onClick={() => setActiveTab('draw')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'draw'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            Draw a Note
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            All Notes ({notes.length})
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'create'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            Write Note
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'draw' && (
            <div className="flex flex-col items-center text-center py-4">
              {/* Card envelope view */}
              <div className="w-full p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-pink-950/60 via-purple-950/60 to-purple-900/40 border border-pink-500/40 shadow-[0_10px_30px_rgba(236,72,153,0.2)] mb-6 relative">
                <Heart className="w-8 h-8 text-pink-400/40 fill-pink-400/20 absolute top-4 right-4" />
                <p className="font-serif text-lg sm:text-xl text-pink-100 italic leading-relaxed mb-6">
                  "{currentRandomNote.text}"
                </p>
                <div className="flex items-center justify-between text-xs text-purple-300 pt-4 border-t border-pink-500/20">
                  <span className="font-semibold text-pink-300">— {currentRandomNote.author}</span>
                  <span className="font-mono text-purple-400">{currentRandomNote.date}</span>
                </div>
              </div>

              <button
                onClick={handleNextRandom}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
              >
                <RefreshCw className="w-4 h-4 animate-spin-slow" />
                Draw Another Sweet Note
              </button>
            </div>
          )}

          {activeTab === 'all' && (
            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-2xl bg-purple-950/50 border border-pink-500/20 hover:border-pink-500/40 transition-colors"
                >
                  <p className="text-sm text-purple-100 italic mb-2">"{note.text}"</p>
                  <div className="flex items-center justify-between text-xs text-purple-400">
                    <span className="font-semibold text-pink-300">— {note.author}</span>
                    <span>{note.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'create' && (
            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-purple-300 mb-1">
                  Your Love Note Message
                </label>
                <textarea
                  rows={4}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Write something sweet for her..."
                  className="w-full p-3 rounded-xl bg-purple-950/80 border border-pink-500/30 text-white text-sm focus:outline-none focus:border-pink-500 placeholder-purple-400/60"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-purple-300 mb-1">
                  Signed By
                </label>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Your Favorite Person"
                  className="w-full p-3 rounded-xl bg-purple-950/80 border border-pink-500/30 text-white text-sm focus:outline-none focus:border-pink-500 placeholder-purple-400/60"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Send className="w-4 h-4" />
                Save Love Note
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
