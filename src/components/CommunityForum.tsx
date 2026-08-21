import React, { useState } from 'react';
import { ReaderNote, UserSubmittedRemedy } from '../types';
import { MessageSquare, ThumbsUp, Send, ShieldAlert, Sparkles, Filter, CheckCircle2, AlertTriangle, Plus, BookOpen, Utensils } from 'lucide-react';

interface CommunityForumProps {
  notes: ReaderNote[];
  userRemedies: UserSubmittedRemedy[];
  onAddNote: (note: { author: string; herb: string; ailment: string; message: string; book_reference?: string }) => Promise<void>;
  onVoteNote: (id: string) => Promise<void>;
  onVoteUserRemedy: (id: string) => void;
  onOpenSubmitRemedyModal: () => void;
  herbOptions: string[];
}

export const CommunityForum: React.FC<CommunityForumProps> = ({
  notes,
  userRemedies,
  onAddNote,
  onVoteNote,
  onVoteUserRemedy,
  onOpenSubmitRemedyModal,
  herbOptions
}) => {
  const [activeTab, setActiveTab] = useState<'remedies' | 'notes'>('remedies');
  const [author, setAuthor] = useState('');
  const [selectedHerb, setSelectedHerb] = useState(herbOptions[0] || 'Avise');
  const [ailment, setAilment] = useState('');
  const [bookRef, setBookRef] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [filterAilment, setFilterAilment] = useState('ALL');
  const [postedSuccess, setPostedSuccess] = useState(false);

  const handleNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitting(true);
    try {
      await onAddNote({
        author: author.trim() || 'Ayurvedic Reader',
        herb: selectedHerb,
        ailment: ailment.trim() || 'General Health',
        message: message.trim(),
        book_reference: bookRef.trim() || undefined
      });
      setMessage('');
      setAilment('');
      setBookRef('');
      setPostedSuccess(true);
      setTimeout(() => setPostedSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to post note:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredRemedies = filterAilment === 'ALL'
    ? userRemedies
    : userRemedies.filter(r => r.ailment_id === filterAilment || r.ailment_name.toLowerCase().includes(filterAilment.toLowerCase()));

  return (
    <div className="py-8 space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2A3B31] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-1">
            <MessageSquare className="w-4 h-4" />
            <span>Community Knowledge Exchange</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#EFECE5]">
            User Remedies & Reader Discussions
          </h1>
          <p className="text-sm text-[#6B8E7B] mt-1 max-w-xl">
            Community-contributed folk formulations, preparation notes, and practical field observations from researchers and elders.
          </p>
        </div>

        <button
          onClick={onOpenSubmitRemedyModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C5A059] text-[#0B130E] text-xs font-bold hover:bg-[#d9a441] transition-all shrink-0 self-start md:self-auto shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Your Remedy</span>
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-3 border-b border-[#2A3B31] pb-1">
        <button
          onClick={() => setActiveTab('remedies')}
          className={`pb-3 px-2 text-sm font-medium transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'remedies'
              ? 'border-[#C5A059] text-[#C5A059] font-bold'
              : 'border-transparent text-[#6B8E7B] hover:text-[#EFECE5]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>User-Submitted Remedies ({userRemedies.length})</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Unverified
          </span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`pb-3 px-2 text-sm font-medium transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'notes'
              ? 'border-[#C5A059] text-[#C5A059] font-bold'
              : 'border-transparent text-[#6B8E7B] hover:text-[#EFECE5]'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Reader Notes & Citations ({notes.length})</span>
        </button>
      </div>

      {/* Tab 1: User-Submitted Remedies */}
      {activeTab === 'remedies' && (
        <div className="space-y-6">
          {/* Prominent Disclaimer Banner */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs leading-relaxed flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <b className="text-amber-300">Important Medical Notice on User-Submitted Formulations: </b>
              Remedies listed in this section are contributed by platform readers and practitioners. They are <u>not verified</u> against historical Telugu manuscripts. Use with caution and always consult a certified Ayurvedic practitioner (BAMS/MD) before initiating home treatments.
            </div>
          </div>

          {/* Remedies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRemedies.map(rem => (
              <div
                key={rem.id}
                className="p-6 rounded-2xl bg-[#15231C] border border-amber-500/40 shadow-xl space-y-4 text-[#EFECE5] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3 border-b border-[#2A3B31] pb-3">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono uppercase font-bold">
                        <AlertTriangle className="w-3 h-3" />
                        <span>User-Submitted (Unverified)</span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-[#EFECE5] mt-1.5">
                        {rem.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => onVoteUserRemedy(rem.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F1A15] border border-[#2A3B31] text-xs text-[#C5A059] hover:bg-[#C5A059]/10 transition-colors shrink-0"
                      title="Helpful submission"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span className="font-mono font-bold">{rem.upvotes}</span>
                    </button>
                  </div>

                  <div className="text-xs text-[#6B8E7B] flex flex-wrap items-center gap-2">
                    <span>By <b className="text-[#EFECE5]">{rem.author_name}</b> ({rem.author_role || 'Contributor'})</span>
                    <span>•</span>
                    <span className="text-[#C5A059] font-medium">For {rem.ailment_name}</span>
                    {rem.source_tradition && (
                      <>
                        <span>•</span>
                        <span className="italic text-[#6B8E7B]">{rem.source_tradition}</span>
                      </>
                    )}
                  </div>

                  {/* Ingredients */}
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B8E7B] block mb-1">
                      Ingredients & Proportions:
                    </span>
                    <ul className="space-y-1 text-xs text-[#EFECE5] bg-[#0F1A15] p-3 rounded-lg border border-[#2A3B31]">
                      {rem.ingredients.map((ing, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Preparation Instructions */}
                  <div className="text-xs leading-relaxed text-[#EFECE5]">
                    <b className="text-[#C5A059] block mb-1">Preparation Instructions:</b>
                    {rem.preparation_instructions}
                  </div>

                  {/* Dosage */}
                  <div className="text-xs text-[#EFECE5] bg-[#0F1A15] p-3 rounded-lg border border-[#2A3B31]">
                    <b className="text-[#C5A059]">Dosage & Timing: </b>
                    <span>{rem.dosage_usage}</span>
                  </div>

                  {/* Precaution */}
                  {rem.precautions && (
                    <div className="text-[11px] text-amber-300/90 bg-amber-950/20 p-2.5 rounded-lg border border-amber-900/40">
                      <b>Precaution: </b>{rem.precautions}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#2A3B31] flex items-center justify-between text-[11px] text-[#6B8E7B]">
                  <span>Herbs: {rem.herb_names.join(', ')}</span>
                  <span>{new Date(rem.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Reader Notes & Discussions */}
      {activeTab === 'notes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Post Form (Left Column) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0F1A15] border border-[#2A3B31] space-y-5 shadow-xl">
            <h2 className="font-serif text-xl font-bold text-[#EFECE5] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Leave a Manuscript Note</span>
            </h2>

            {postedSuccess && (
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Your note has been added to the public wall!</span>
              </div>
            )}

            <form onSubmit={handleNoteSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#6B8E7B] block mb-1">Your Name / Title</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Vaidya K. Sastry"
                  className="w-full bg-[#15231C] border border-[#2A3B31] text-[#EFECE5] placeholder-[#6B8E7B]/70 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-[#6B8E7B] block mb-1">Herb Focus</label>
                  <select
                    value={selectedHerb}
                    onChange={(e) => setSelectedHerb(e.target.value)}
                    className="w-full bg-[#15231C] border border-[#2A3B31] text-[#EFECE5] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C5A059]"
                  >
                    {herbOptions.map((h, i) => (
                      <option key={i} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-mono text-[#6B8E7B] block mb-1">Ailment Indication</label>
                  <input
                    type="text"
                    value={ailment}
                    onChange={(e) => setAilment(e.target.value)}
                    placeholder="e.g. Piles, Fever, Headache"
                    className="w-full bg-[#15231C] border border-[#2A3B31] text-[#EFECE5] placeholder-[#6B8E7B]/70 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[#6B8E7B] block mb-1">Manuscript / Page Reference (Optional)</label>
                <input
                  type="text"
                  value={bookRef}
                  onChange={(e) => setBookRef(e.target.value)}
                  placeholder="e.g. Ayurveda Mulika Prayogavali, Pg 3"
                  className="w-full bg-[#15231C] border border-[#2A3B31] text-[#EFECE5] placeholder-[#6B8E7B]/70 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#6B8E7B] block mb-1">Observation / Preparation Note *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a clinical observation, regional Telugu synonym, or preparation caveat..."
                  className="w-full bg-[#15231C] border border-[#2A3B31] text-[#EFECE5] placeholder-[#6B8E7B]/70 rounded-lg p-3 text-sm focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting || !message.trim()}
                className="w-full py-2.5 rounded-lg bg-[#C5A059] text-[#0B130E] font-bold text-xs hover:bg-[#d9a441] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Submitting...' : 'Post Reader Note'}</span>
              </button>
            </form>
          </div>

          {/* Notes Stream (Right Column) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#6B8E7B] uppercase">Community Discussions ({notes.length})</span>
            </div>

            {notes.map((note) => (
              <div
                key={note.id}
                className="p-5 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-3 shadow-md hover:border-[#4A6355] transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-[#EFECE5] text-base">{note.author}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0F1A15] text-[#C5A059] border border-[#2A3B31]">
                        {note.herb}
                      </span>
                    </div>
                    {note.book_reference && (
                      <span className="text-xs font-mono text-[#6B8E7B] block mt-0.5">
                        Ref: {note.book_reference}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onVoteNote(note.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0F1A15] border border-[#2A3B31] text-xs text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0B130E] transition-all"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{note.upvotes}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-[#EFECE5]/90 leading-relaxed font-sans">
                  "{note.message}"
                </p>

                <div className="flex items-center justify-between text-[11px] text-[#6B8E7B] pt-2 border-t border-[#2A3B31]">
                  <span>Indication: <b className="text-[#EFECE5]">{note.ailment}</b></span>
                  <span>{new Date(note.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
