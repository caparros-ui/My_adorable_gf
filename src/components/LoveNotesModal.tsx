import React, { useState } from 'react';
import { X, Sparkles, Send, RefreshCw, FileText } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/90 animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-surface border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-full bg-accent/10 text-accent">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-text-primary flex items-center gap-1.5">
                Notes & Messages
                <Sparkles className="w-4 h-4 text-accent inline animate-pulse" />
              </h3>
              <p className="text-xs text-text-muted">Personalized messages and notes</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-bg hover:bg-accent hover:text-bg text-text-muted transition-colors border border-border"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border bg-bg p-1.5">
          <button
            onClick={() => setActiveTab('draw')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'draw'
                ? 'bg-accent text-bg shadow-sm'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            Read Note
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'all'
                ? 'bg-accent text-bg shadow-sm'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            All Notes ({notes.length})
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'create'
                ? 'bg-accent text-bg shadow-sm'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            Write Note
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'draw' && (
            <div className="flex flex-col items-center text-center py-4">
              {currentRandomNote ? (
                <div className="w-full p-6 sm:p-8 rounded-2xl bg-bg border border-border mb-6 relative">
                  <Sparkles className="w-6 h-6 text-accent/30 absolute top-4 right-4" />
                  <p className="font-serif text-lg sm:text-xl text-text-primary italic leading-relaxed mb-6">
                    "{currentRandomNote.text}"
                  </p>
                  <div className="flex items-center justify-between text-xs text-text-muted pt-4 border-t border-border">
                    <span className="font-semibold text-accent">— {currentRandomNote.author}</span>
                    <span className="font-mono text-text-muted">{currentRandomNote.date}</span>
                  </div>
                </div>
              ) : (
                <div className="w-full p-8 rounded-2xl bg-bg border border-border mb-6 text-text-muted text-sm italic">
                  No notes saved yet. Click "Write Note" to add one!
                </div>
              )}

              {notes.length > 0 && (
                <button
                  onClick={handleNextRandom}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent hover:bg-[#e0a3a7] text-bg font-bold text-sm shadow-md transition-all hover:scale-105"
                >
                  <RefreshCw className="w-4 h-4 animate-spin-slow" />
                  Read Next Note
                </button>
              )}
            </div>
          )}

          {activeTab === 'all' && (
            <div className="space-y-4">
              {notes.length === 0 ? (
                <div className="p-6 rounded-2xl bg-bg border border-border text-center text-text-muted text-sm italic">
                  No notes available yet. Write your first note!
                </div>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 rounded-2xl bg-bg border border-border hover:border-accent/40 transition-colors"
                  >
                    <p className="text-sm text-text-primary italic mb-2">"{note.text}"</p>
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span className="font-semibold text-accent">— {note.author}</span>
                      <span>{note.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'create' && (
            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1">
                  Message Content
                </label>
                <textarea
                  rows={4}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Write a message or note..."
                  className="w-full p-3 rounded-xl bg-bg border border-border text-text-primary text-sm focus:outline-none focus:border-accent placeholder-text-muted/60"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1">
                  Signed By
                </label>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Author name"
                  className="w-full p-3 rounded-xl bg-bg border border-border text-text-primary text-sm focus:outline-none focus:border-accent placeholder-text-muted/60"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-accent hover:bg-[#e0a3a7] text-bg font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Send className="w-4 h-4" />
                Save Note
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

