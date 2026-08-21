import React from 'react';
import { Search, Sparkles, Filter, BookOpen } from 'lucide-react';

interface SearchHeroProps {
  query: string;
  setQuery: (q: string) => void;
  onSearch: (q: string) => void;
  loading: boolean;
  bookFilter: string;
  setBookFilter: (b: string) => void;
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
}

export const SearchHero: React.FC<SearchHeroProps> = ({
  query,
  setQuery,
  onSearch,
  loading,
  bookFilter,
  setBookFilter,
  categoryFilter,
  setCategoryFilter
}) => {
  const sampleQueries = [
    { label: 'Piles / Hemorrhoids', q: 'I have piles, what can I do ayurvedically for this?' },
    { label: 'Headache & Migraine', q: 'Headache and temporal migraine relief' },
    { label: 'Chill Fever & Malaria', q: 'Chali Jwaram (chill fever) traditional remedies' },
    { label: 'Ginger for Cold', q: 'Ginger (Allam) remedies for cold and phlegm' },
    { label: 'Ashoka for Menstrual Cramps', q: 'Ashoka bark for menstrual pain and weakness' },
    { label: 'Nalleru for Bones & Piles', q: 'Nalleru (Asthisamharaka) uses for bones and piles' },
    { label: 'Jaundice / Liver Care', q: 'Ayurvedic remedies for jaundice (Kaamerlu)' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <section className="pt-10 pb-8 border-b border-[#2A3B31] bg-[#0B130E]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15231C] border border-[#2A3B31] text-xs font-mono tracking-wider uppercase text-[#C5A059] mb-5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>4 Telugu Ayurvedic Texts · Digitized & Searchable</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#EFECE5] leading-[1.15] mb-5">
          Four classical herbals,<br className="hidden sm:inline" />
          one <span className="italic text-[#C5A059]">searchable</span> shelf.
        </h1>

        <p className="text-base sm:text-lg text-[#6B8E7B] max-w-2xl mx-auto leading-relaxed mb-8 font-sans">
          Search by herb, ailment, or phrase your symptoms in natural language. Every remedy is cited with its exact book and page number — and cross-referenced with modern pharmacological research.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5 p-1.5 rounded-xl bg-[#15231C] border border-[#2A3B31] shadow-2xl focus-within:border-[#C5A059] transition-all">
            <div className="flex items-center flex-1 px-3 gap-3">
              <Search className="w-5 h-5 text-[#C5A059] shrink-0" />
              <input
                id="search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask e.g. 'I have piles what can I do ayurvedically' or 'Ginger for headache'..."
                className="w-full bg-transparent text-[#EFECE5] placeholder-[#6B8E7B]/70 text-base py-2.5 focus:outline-none font-sans"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-7 py-3 rounded-lg bg-[#C5A059] text-[#0B130E] font-bold text-sm sm:text-base hover:bg-[#d9a441] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-[#0B130E] border-t-transparent animate-spin" />
                  <span>Cross-referencing...</span>
                </>
              ) : (
                <span>Search</span>
              )}
            </button>
          </div>
        </form>

        {/* Query Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="text-xs text-[#6B8E7B] font-mono mr-1">Try asking:</span>
          {sampleQueries.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuery(chip.q);
                onSearch(chip.q);
              }}
              className="text-xs px-3 py-1.5 rounded-full bg-[#15231C] border border-[#2A3B31] text-[#EFECE5] hover:text-[#C5A059] hover:border-[#C5A059]/40 transition-all font-sans"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 p-3 rounded-lg bg-[#0F1A15] border border-[#2A3B31] text-xs text-[#6B8E7B]">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="font-mono uppercase tracking-wider text-[11px] text-[#6B8E7B]">Filter by Book:</span>
          </div>
          <select
            value={bookFilter}
            onChange={(e) => setBookFilter(e.target.value)}
            className="bg-[#15231C] border border-[#2A3B31] text-[#EFECE5] px-2.5 py-1 rounded focus:outline-none focus:border-[#C5A059]"
          >
            <option value="ALL">All 4 Manuscripts & Books</option>
            <option value="mulika">Ayurveda Mulika Prayogavali (Pages 3-10+)</option>
            <option value="chitkalu">Vaidya Rahasya Chitkalu (Sri A. Ramayachari)</option>
            <option value="medplants">Aushadha Mokkallo (Dr. C. Madhusudana Sarma)</option>
            <option value="beauty">Adbhuta Chitkalu (Yuvamitra)</option>
          </select>

          <span className="text-[#2A3B31] hidden sm:inline">|</span>

          <div className="flex items-center gap-1.5">
            <span className="font-mono uppercase tracking-wider text-[11px] text-[#6B8E7B]">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#15231C] border border-[#2A3B31] text-[#EFECE5] px-2.5 py-1 rounded focus:outline-none focus:border-[#C5A059]"
            >
              <option value="ALL">All Categories</option>
              <option value="Digestive & Piles">Digestive & Piles (Arshas)</option>
              <option value="Headache & Neuro">Headache & Neuro</option>
              <option value="Fevers & Immunity">Fevers & Immunity (Jwara)</option>
              <option value="Respiratory & Cough">Respiratory & Cough</option>
              <option value="Joints & Pain">Joints & Pain (Amavata)</option>
              <option value="Women's Health">Women's Health</option>
              <option value="Skin & Wounds">Skin & Wounds</option>
              <option value="Urinary & Renal">Urinary & Renal (Ashmari)</option>
            </select>
          </div>
        </div>

        {/* Digitization & Methodology Context Note */}
        <div className="mt-5 text-left p-3.5 rounded-lg bg-[#15231C] border-l-2 border-[#C5A059] text-xs text-[#6B8E7B] flex items-start gap-2.5">
          <BookOpen className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
          <div>
            <span className="text-[#EFECE5] font-semibold">Digital Corpus Status: </span>
            Search actively indexes <b className="text-[#EFECE5]">62 verified remedies</b> across 4 Telugu publications, with OCR transcriptions verified by eye against high-resolution scans. Queries outside the digitized batches will be researched using modern scientific sources while flagging current status.
          </div>
        </div>
      </div>
    </section>
  );
};

