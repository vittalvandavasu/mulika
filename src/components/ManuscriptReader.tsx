import React, { useState, useMemo } from 'react';
import { AyurvedicEntry } from '../types';
import { BookOpen, ChevronLeft, ChevronRight, Search, FileText, Sparkles, Filter, ExternalLink, CheckCircle2, ShieldCheck, Share2, Copy, Check } from 'lucide-react';

interface ManuscriptReaderProps {
  entries: AyurvedicEntry[];
  onSelectHerb: (herbName: string) => void;
}

interface BookMetadata {
  id: 'mulika' | 'chitkalu' | 'medplants' | 'beauty';
  title: string;
  telugu_title: string;
  author: string;
  year_era: string;
  total_scanned_pages: number;
  available_pages: number[];
  description: string;
  category_focus: string;
}

const BOOKS: BookMetadata[] = [
  {
    id: 'mulika',
    title: 'Ayurveda Mulika Prayogavali',
    telugu_title: 'ఆయుర్వేద మూలికా ప్రయోగవళి',
    author: 'Traditional Vaidya Lineages',
    year_era: 'Classical Telugu Formulary (19th-20th C.)',
    total_scanned_pages: 144,
    available_pages: [3, 4, 5, 6, 7, 8, 9, 10, 32],
    description: 'Systematic Materia Medica arranged alphabetically by Telugu medicinal herb name. Includes single-drug therapies (Ekika Mulika Prayoga), complex decoctions, and emergency revival techniques.',
    category_focus: 'Herbal Formulations & Acute Ailments'
  },
  {
    id: 'chitkalu',
    title: 'Vaidya Rahasya Chitkalu',
    telugu_title: 'వైద్య రహస్య చిట్కాలు',
    author: 'Sri A. Ramayachari',
    year_era: 'Hereditary Clinical Compendium',
    total_scanned_pages: 64,
    available_pages: [1, 2, 3, 8, 12, 14, 19, 24],
    description: 'Practical clinical shortcuts, rapid-action home remedies, and regional folk preparations tested across multiple generations of village physicians.',
    category_focus: 'Folk Remedies & Rapid Clinical Relief'
  },
  {
    id: 'medplants',
    title: 'Aushadha Mokkallo Arogya Rahasyalu',
    telugu_title: 'ఔషధ మొక్కల్లో ఆరోగ్య రహస్యాలు',
    author: 'Dr. C. Madhusudana Sarma (B.A.M.S.)',
    year_era: 'Scholarly Botanical Monograph',
    total_scanned_pages: 158,
    available_pages: [12, 23, 45, 56, 78, 89],
    description: 'Scientific and classical synthesis of Andhra flora, with pharmacognostic descriptions, Dravyaguna energetics, and clinical dosages.',
    category_focus: 'Pharmacognosy & Dravyaguna Vigyan'
  },
  {
    id: 'beauty',
    title: 'Andaniki, Arogyaniki Adbhuta Chitkalu',
    telugu_title: 'అందానికి, ఆరోగ్యానికి అద్భుత చిట్కాలు',
    author: 'Yuvamitra',
    year_era: 'Traditional Rejuvenation & Cosmetic Formulary',
    total_scanned_pages: 80,
    available_pages: [4, 7, 15, 22, 31, 48],
    description: 'Traditional formulations for skin rejuvenation (Varnya), wound healing, hair tonics (Keshya), and daily preventive vitality (Swasthavritta).',
    category_focus: 'Rejuvenation (Rasayana) & Dermatology'
  }
];

export const ManuscriptReader: React.FC<ManuscriptReaderProps> = ({ entries, onSelectHerb }) => {
  const [selectedBookId, setSelectedBookId] = useState<'mulika' | 'chitkalu' | 'medplants' | 'beauty'>('mulika');
  const [activePage, setActivePage] = useState<number>(3);
  const [pageSearchQuery, setPageSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'parallel' | 'cards' | 'audit'>('parallel');
  const [copiedCitation, setCopiedCitation] = useState<boolean>(false);

  const currentBook = useMemo(() => {
    return BOOKS.find(b => b.id === selectedBookId) || BOOKS[0];
  }, [selectedBookId]);

  // When book changes, switch active page to first available page of that book
  const handleBookChange = (bookId: 'mulika' | 'chitkalu' | 'medplants' | 'beauty') => {
    setSelectedBookId(bookId);
    const targetBook = BOOKS.find(b => b.id === bookId);
    if (targetBook && targetBook.available_pages.length > 0) {
      setActivePage(targetBook.available_pages[0]);
    }
  };

  // Get all entries for the selected book
  const bookEntries = useMemo(() => {
    return entries.filter(e => e.source_id === selectedBookId);
  }, [entries, selectedBookId]);

  // Get all entries on the current page
  const currentPageEntries = useMemo(() => {
    return bookEntries.filter(e => e.page === activePage);
  }, [bookEntries, activePage]);

  // Filtered entries for search inside book
  const filteredBookEntries = useMemo(() => {
    if (!pageSearchQuery.trim()) return bookEntries;
    const q = pageSearchQuery.toLowerCase();
    return bookEntries.filter(e =>
      e.herb.toLowerCase().includes(q) ||
      e.telugu.includes(q) ||
      e.ailment.toLowerCase().includes(q) ||
      e.remedy.toLowerCase().includes(q) ||
      (e.ailment_telugu && e.ailment_telugu.includes(q))
    );
  }, [bookEntries, pageSearchQuery]);

  // Handle previous and next page navigation
  const handlePrevPage = () => {
    const pages = currentBook.available_pages;
    const currentIndex = pages.indexOf(activePage);
    if (currentIndex > 0) {
      setActivePage(pages[currentIndex - 1]);
    }
  };

  const handleNextPage = () => {
    const pages = currentBook.available_pages;
    const currentIndex = pages.indexOf(activePage);
    if (currentIndex < pages.length - 1) {
      setActivePage(pages[currentIndex + 1]);
    }
  };

  const handleCopyCitation = () => {
    const citation = `Source: ${currentBook.title} (${currentBook.telugu_title}), Page ${activePage}. Verified from digitized Telugu manuscript holdings. Indexed remedies: ${currentPageEntries.map(e => `${e.herb} for ${e.ailment}`).join('; ')}.`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 3000);
  };

  return (
    <div className="py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2A3B31] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Interactive Manuscript Codex & Page-by-Page Explorer</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#EFECE5]">
            Classical Telugu Manuscripts Shelf
          </h1>
          <p className="text-sm text-[#6B8E7B] mt-1 max-w-2xl">
            Browse high-fidelity digitized pages from authenticated palm-leaf and printed Telugu medical treatises with side-by-side Telugu script, transliteration, and exact page citations.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-[#15231C] border border-[#2A3B31] rounded-xl self-start md:self-auto">
          <button
            onClick={() => setViewMode('parallel')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'parallel'
                ? 'bg-[#C5A059] text-[#0B130E] shadow'
                : 'text-[#6B8E7B] hover:text-[#EFECE5]'
            }`}
          >
            Parallel Codex
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'cards'
                ? 'bg-[#C5A059] text-[#0B130E] shadow'
                : 'text-[#6B8E7B] hover:text-[#EFECE5]'
            }`}
          >
            Clinical Cards
          </button>
          <button
            onClick={() => setViewMode('audit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'audit'
                ? 'bg-[#C5A059] text-[#0B130E] shadow'
                : 'text-[#6B8E7B] hover:text-[#EFECE5]'
            }`}
          >
            Digitization Audit Log
          </button>
        </div>
      </div>

      {/* Book Shelf Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {BOOKS.map((book) => {
          const isSelected = book.id === selectedBookId;
          const bookEntriesCount = entries.filter(e => e.source_id === book.id).length;

          return (
            <button
              key={book.id}
              onClick={() => handleBookChange(book.id)}
              className={`text-left p-5 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#15231C] border-[#C5A059] shadow-xl ring-1 ring-[#C5A059]/50'
                  : 'bg-[#0F1A15] border-[#2A3B31] hover:border-[#4A6355] text-[#6B8E7B]'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                    isSelected ? 'bg-[#C5A059] text-[#0B130E] font-bold' : 'bg-[#15231C] text-[#6B8E7B]'
                  }`}>
                    {book.total_scanned_pages} Pages Cataloged
                  </span>
                  <span className="text-[11px] font-mono text-[#C5A059]">
                    {bookEntriesCount} entries
                  </span>
                </div>
                <h3 className={`font-serif text-lg font-bold leading-snug ${isSelected ? 'text-[#EFECE5]' : 'text-[#A0B2A6]'}`}>
                  {book.title}
                </h3>
                <p className="text-xs font-semibold text-[#C5A059]">{book.telugu_title}</p>
                <p className="text-[11px] text-[#6B8E7B] line-clamp-2">
                  {book.category_focus}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#2A3B31] flex items-center justify-between text-[10px] font-mono text-[#6B8E7B]">
                <span>{book.available_pages.length} Pages Digitized</span>
                <span className="text-[#C5A059]">Browse Codex →</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Page Viewer Section */}
      {viewMode !== 'audit' && (
        <div className="space-y-6">
          {/* Page Bar Controller */}
          <div className="p-4 rounded-2xl bg-[#0F1A15] border border-[#2A3B31] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            {/* Page Jumper */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handlePrevPage}
                disabled={currentBook.available_pages.indexOf(activePage) === 0}
                className="p-2 rounded-lg bg-[#15231C] border border-[#2A3B31] text-[#EFECE5] hover:bg-[#C5A059] hover:text-[#0B130E] disabled:opacity-30 disabled:hover:bg-[#15231C] disabled:hover:text-[#EFECE5] transition-all"
                title="Previous Digitized Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#6B8E7B] uppercase">Page:</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentBook.available_pages.map((p) => (
                    <button
                      key={p}
                      onClick={() => setActivePage(p)}
                      className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition-all ${
                        activePage === p
                          ? 'bg-[#C5A059] text-[#0B130E] shadow'
                          : 'bg-[#15231C] border border-[#2A3B31] text-[#6B8E7B] hover:text-[#EFECE5]'
                      }`}
                    >
                      Pg {p.toString().padStart(2, '0')}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentBook.available_pages.indexOf(activePage) === currentBook.available_pages.length - 1}
                className="p-2 rounded-lg bg-[#15231C] border border-[#2A3B31] text-[#EFECE5] hover:bg-[#C5A059] hover:text-[#0B130E] disabled:opacity-30 disabled:hover:bg-[#15231C] disabled:hover:text-[#EFECE5] transition-all"
                title="Next Digitized Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick In-Book Search & Citation Tools */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#6B8E7B] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={pageSearchQuery}
                  onChange={(e) => setPageSearchQuery(e.target.value)}
                  placeholder={`Search inside ${currentBook.title.split(' ')[0]}...`}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#15231C] border border-[#2A3B31] text-xs text-[#EFECE5] placeholder-[#6B8E7B] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <button
                onClick={handleCopyCitation}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15231C] border border-[#2A3B31] text-xs text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0B130E] transition-all shrink-0 font-medium"
                title="Copy academic manuscript citation"
              >
                {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCitation ? 'Citation Copied' : 'Cite Page'}</span>
              </button>
            </div>
          </div>

          {/* Parallel Codex View (Parchment Folio + English Synthesis) */}
          {viewMode === 'parallel' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Historical Parchment Folio Transcription */}
              <div className="lg:col-span-6 bg-[#FBF8EE] text-[#1A2620] rounded-2xl p-6 sm:p-8 border border-[#DFD5BE] shadow-2xl space-y-6 relative overflow-hidden">
                {/* Parchment Watermark & Header */}
                <div className="border-b border-[#D5C9AE] pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#7C5A20] block font-bold">
                      AUTHENTIC TELUGU MANUSCRIPT EXTRACTION
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#1A2620]">
                      {currentBook.telugu_title}
                    </h3>
                    <p className="text-xs text-[#5E513D]">{currentBook.title} — {currentBook.author}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-[#1A2620] text-[#FBF8EE] font-mono text-xs px-3 py-1 rounded font-bold">
                      పుట {activePage} (Page {activePage})
                    </span>
                  </div>
                </div>

                {/* Page Telugu Content Stream */}
                <div className="space-y-6 text-sm leading-relaxed">
                  {currentPageEntries.length === 0 ? (
                    <div className="py-12 text-center text-[#7C5A20] italic font-serif">
                      No direct recipes indexed for Page {activePage} in the current transcription batch.
                    </div>
                  ) : (
                    currentPageEntries.map((entry, idx) => (
                      <div key={entry.id} className="p-4 bg-[#F2EBD9] rounded-xl border border-[#D5C9AE] space-y-2.5">
                        <div className="flex items-center justify-between border-b border-[#DFD5BE] pb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#7C5A20] text-[#FBF8EE] font-mono text-[10px] flex items-center justify-center font-bold">
                              {idx + 1}
                            </span>
                            <span className="font-serif font-bold text-lg text-[#1A2620]">
                              {entry.telugu} ({entry.herb})
                            </span>
                          </div>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#E4D9C2] text-[#5E513D] font-bold">
                            {entry.ailment_telugu || entry.ailment}
                          </span>
                        </div>

                        {/* Telugu Verbatim Formula / Recipe Description */}
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C5A20] block">
                            ప్రయోగ విధానం (Formulation & Preparation):
                          </span>
                          <p className="text-[#1A2620] font-serif leading-relaxed italic text-sm">
                            "{entry.remedy}"
                          </p>
                        </div>

                        {/* Energetic form */}
                        <div className="flex items-center justify-between text-xs text-[#5E513D] pt-1">
                          <span><b>స్వరూపం (Form):</b> {entry.preparation_type || 'Churna/Kashaya'}</span>
                          <span><b>భద్రత:</b> {entry.safety_rating}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Folio Footer Note */}
                <div className="pt-4 border-t border-[#D5C9AE] flex items-center justify-between text-[11px] text-[#7C5A20]">
                  <span>Transcribed from Public Domain Palm-Leaf / Archival Print</span>
                  <span>Batch Citation ID: #{selectedBookId}-p{activePage}</span>
                </div>
              </div>

              {/* Right Column: English Translation, Botanical Breakdown & Clinical Analysis */}
              <div className="lg:col-span-6 space-y-6">
                <div className="p-6 rounded-2xl bg-[#15231C] border border-[#2A3B31] space-y-5 shadow-xl">
                  <div className="flex items-center justify-between border-b border-[#2A3B31] pb-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                      <Sparkles className="w-4 h-4" />
                      <span>Scientific & Clinical English Apparatus</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0F1A15] border border-[#2A3B31] text-[#6B8E7B]">
                      {currentPageEntries.length} Formulations on Page
                    </span>
                  </div>

                  {currentPageEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-5 rounded-xl bg-[#0F1A15] border border-[#2A3B31] space-y-3 hover:border-[#4A6355] transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-serif text-lg font-bold text-[#EFECE5]">
                            {entry.herb} <span className="text-sm font-normal text-[#C5A059]">({entry.telugu})</span>
                          </h4>
                          {entry.botanical && (
                            <p className="text-xs text-[#6B8E7B] italic font-sans">{entry.botanical}</p>
                          )}
                        </div>

                        <button
                          onClick={() => onSelectHerb(entry.herb)}
                          className="text-xs px-2.5 py-1 rounded bg-[#15231C] text-[#C5A059] border border-[#2A3B31] hover:bg-[#C5A059] hover:text-[#0B130E] transition-all font-medium"
                        >
                          Herb Dossier →
                        </button>
                      </div>

                      <div className="text-xs text-[#EFECE5] bg-[#15231C] p-3 rounded-lg border border-[#2A3B31] space-y-1">
                        <span className="font-semibold text-[#C5A059] block">Target Indication: {entry.ailment}</span>
                        <p className="text-[#EFECE5]/90 leading-relaxed">{entry.remedy}</p>
                      </div>

                      {entry.verification_note && (
                        <div className="text-[11px] text-[#6B8E7B] flex items-start gap-1.5 pt-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                          <span><b>Manuscript Annotation:</b> {entry.verification_note}</span>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Summary & Dosage Notice */}
                  <div className="p-4 rounded-xl bg-[#0B130E] border border-[#2A3B31] text-xs text-[#6B8E7B] space-y-2">
                    <div className="flex items-center gap-1.5 text-[#C5A059] font-bold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Formulation Preparation Standards</span>
                    </div>
                    <p className="leading-relaxed">
                      All classical swarasas (fresh juices) must be prepared from cleaned, de-stemmed fresh plant parts. For kashayams (decoctions), the standard manuscript reduction ratio is 16 parts fresh water boiled down to 4 parts unless specified otherwise.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cards View: Grid of all recipes in current book */}
          {viewMode === 'cards' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#6B8E7B] uppercase">
                  Showing {filteredBookEntries.length} Verified Formulations across all digitized pages of {currentBook.title}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBookEntries.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-[#15231C] border border-[#2A3B31] space-y-4 shadow-xl flex flex-col justify-between hover:border-[#C5A059] transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-[#2A3B31] pb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0F1A15] text-[#C5A059] border border-[#2A3B31] font-bold">
                          Page {item.page.toString().padStart(2, '0')}
                        </span>
                        <span className="text-[11px] font-mono text-[#6B8E7B]">
                          {item.category}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif text-xl font-bold text-[#EFECE5]">
                          {item.herb}
                        </h3>
                        <span className="text-xs font-semibold text-[#C5A059]">{item.telugu}</span>
                        {item.botanical && (
                          <p className="text-[11px] text-[#6B8E7B] italic">{item.botanical.split('(')[0]}</p>
                        )}
                      </div>

                      <div className="p-3 bg-[#0F1A15] rounded-lg border border-[#2A3B31] text-xs space-y-1">
                        <span className="font-bold text-[#EFECE5] block">Ailment: {item.ailment}</span>
                        <p className="text-[#EFECE5]/80 italic">"{item.remedy}"</p>
                      </div>

                      {item.verification_note && (
                        <p className="text-[11px] text-[#6B8E7B] italic">
                          <b>Note:</b> {item.verification_note}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#2A3B31] flex items-center justify-between text-xs">
                      <span className="text-[#6B8E7B] font-mono">{item.preparation_type || 'Classical'}</span>
                      <button
                        onClick={() => onSelectHerb(item.herb)}
                        className="text-[#C5A059] font-medium hover:underline"
                      >
                        Herb Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Digitization Audit Log View */}
      {viewMode === 'audit' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#0F1A15] border border-[#2A3B31] space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#EFECE5] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
              <span>Full Manuscript Digitization & Verification Protocol</span>
            </h3>
            <p className="text-sm text-[#6B8E7B] leading-relaxed max-w-3xl">
              Every single entry in the Mulika repository undergoes a four-stage digital transcription protocol: High-Resolution Optical Capture → Verbatim Telugu OCR Transliteration → Vaidya Editorial Verification → Modern Botanical Taxon & AYUSH TKDL Cross-Referencing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BOOKS.map((b) => {
              const entriesInBook = entries.filter(e => e.source_id === b.id);
              return (
                <div key={b.id} className="p-6 rounded-2xl bg-[#15231C] border border-[#2A3B31] space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-serif text-xl font-bold text-[#EFECE5]">{b.title}</h4>
                      <p className="text-xs text-[#C5A059] font-semibold">{b.telugu_title} • {b.author}</p>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#0F1A15] text-[#EFECE5] border border-[#2A3B31]">
                      {entriesInBook.length} Active Records
                    </span>
                  </div>

                  <div className="p-3 bg-[#0F1A15] rounded-xl border border-[#2A3B31] text-xs space-y-2">
                    <div className="flex justify-between text-[#6B8E7B]">
                      <span>Total Book Volume:</span>
                      <b className="text-[#EFECE5]">{b.total_scanned_pages} Pages</b>
                    </div>
                    <div className="flex justify-between text-[#6B8E7B]">
                      <span>Digitized Batch Pages:</span>
                      <b className="text-[#C5A059]">Pages {b.available_pages.join(', ')}</b>
                    </div>
                    <div className="flex justify-between text-[#6B8E7B]">
                      <span>Catalog Era:</span>
                      <span className="text-[#EFECE5]">{b.year_era}</span>
                    </div>
                  </div>

                  <div className="text-xs text-[#6B8E7B]">
                    <span className="font-semibold text-[#EFECE5] block mb-1">Indexed Medicinal Species:</span>
                    <p className="line-clamp-2">
                      {Array.from(new Set(entriesInBook.map(e => e.herb))).join(', ')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
