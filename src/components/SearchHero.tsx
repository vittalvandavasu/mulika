import React from 'react';
import { Search, Sparkles, Filter, BookOpen, X, ArrowRight, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

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
    { label: 'Piles / Hemorrhoids (Arshas)', q: 'I have piles, what can I do ayurvedically for this?' },
    { label: 'Headache & Migraine', q: 'Headache and temporal migraine relief' },
    { label: 'Chill Fever & Malaria', q: 'Chali Jwaram (chill fever) traditional remedies' },
    { label: 'Ginger for Phlegm & Cough', q: 'Ginger (Allam) remedies for cold and phlegm' },
    { label: 'Ashoka for Cramps', q: 'Ashoka bark for menstrual pain and weakness' },
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
    <section className="pt-12 pb-10 border-b border-[#24352B] bg-gradient-to-b from-[#0B130E] via-[#0D1812] to-[#0B130E] relative overflow-hidden">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#D4AF37]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Kicker Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#13221A] border border-[#D4AF37]/30 text-xs font-mono tracking-wider uppercase text-[#D4AF37] mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>4 Classical Telugu Codices · Digitized & AI-Cross-Referenced</span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#EFECE5] leading-[1.18] mb-6">
          Four classical herbals,<br className="hidden sm:inline" />
          one <span className="italic text-[#D4AF37] underline decoration-[#D4AF37]/30 underline-offset-8">searchable</span> shelf.
        </h1>

        <p className="text-base sm:text-lg text-[#8EA89A] max-w-2xl mx-auto leading-relaxed mb-8 font-sans">
          Search by medicinal plant, symptom, or natural language clinical question. Every remedy is anchored to authenticated Telugu palm-leaf & printed folios with verbatim recipes and modern scientific validation.
        </p>

        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5 p-2 rounded-2xl bg-[#13221A] border border-[#2A3B31] shadow-2xl focus-within:border-[#D4AF37] focus-within:ring-2 focus-within:ring-[#D4AF37]/20 transition-all">
            <div className="flex items-center flex-1 px-3 gap-3">
              <Search className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <input
                id="search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask e.g. 'I have piles what can I do ayurvedically' or 'Ginger for headache'..."
                className="w-full bg-transparent text-[#EFECE5] placeholder-[#6B8E7B] text-sm sm:text-base py-2.5 focus:outline-none font-sans"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 rounded-md text-[#6B8E7B] hover:text-[#EFECE5] hover:bg-[#1A2C22] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F2E] text-[#0B130E] font-bold text-sm sm:text-base hover:brightness-110 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-[#0B130E] border-t-transparent animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <span>Search Codex</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Suggestion Query Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="text-xs text-[#7D9F8D] font-mono mr-1">Frequent Queries:</span>
          {sampleQueries.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuery(chip.q);
                onSearch(chip.q);
              }}
              className="text-xs px-3 py-1.5 rounded-full bg-[#13221A] border border-[#24352B] text-[#DCE7E1] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:bg-[#182B20] transition-all font-sans"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 p-3.5 rounded-xl bg-[#0F1A15] border border-[#24352B] text-xs text-[#7D9F8D]">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-mono uppercase tracking-wider text-[11px] text-[#7D9F8D]">Book:</span>
          </div>
          <select
            value={bookFilter}
            onChange={(e) => setBookFilter(e.target.value)}
            className="bg-[#14231B] border border-[#24352B] text-[#EFECE5] px-3 py-1.5 rounded-lg focus:outline-none focus:border-[#D4AF37] text-xs"
          >
            <option value="ALL">All 4 Manuscripts & Books</option>
            <option value="mulika">Ayurveda Mulika Prayogavali (Classical Formulary)</option>
            <option value="chitkalu">Vaidya Rahasya Chitkalu (Sri A. Ramayachari)</option>
            <option value="medplants">Aushadha Mokkallo (Dr. C. Madhusudana Sarma)</option>
            <option value="beauty">Adbhuta Chitkalu (Yuvamitra)</option>
          </select>

          <span className="text-[#24352B] hidden sm:inline">|</span>

          <div className="flex items-center gap-1.5">
            <span className="font-mono uppercase tracking-wider text-[11px] text-[#7D9F8D]">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#14231B] border border-[#24352B] text-[#EFECE5] px-3 py-1.5 rounded-lg focus:outline-none focus:border-[#D4AF37] text-xs"
            >
              <option value="ALL">All Clinical Categories</option>
              <option value="Digestive & Piles">Digestive & Piles (Arshas)</option>
              <option value="Headache & Neuro">Headache & Neuro</option>
              <option value="Fevers & Immunity">Fevers & Immunity (Jwara)</option>
              <option value="Respiratory & Cough">Respiratory & Cough (Kasa/Swasa)</option>
              <option value="Joints & Pain">Joints & Pain (Amavata)</option>
              <option value="Women's Health">Women's Health (Stree Roga)</option>
              <option value="Skin & Wounds">Skin & Rejuvenation (Varnya)</option>
              <option value="Urinary & Renal">Urinary & Renal (Mutrakricchra)</option>
            </select>
          </div>
        </div>

        {/* Quick Corpus Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-[#24352B]/60 text-left">
          <div className="p-3 bg-[#121E18] rounded-xl border border-[#24352B] flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <div>
              <span className="text-[10px] font-mono text-[#7D9F8D] block uppercase">Manuscripts</span>
              <strong className="text-xs text-[#EFECE5]">4 Telugu Treatises</strong>
            </div>
          </div>

          <div className="p-3 bg-[#121E18] rounded-xl border border-[#24352B] flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <div>
              <span className="text-[10px] font-mono text-[#7D9F8D] block uppercase">Extractions</span>
              <strong className="text-xs text-[#EFECE5]">100+ Formulations</strong>
            </div>
          </div>

          <div className="p-3 bg-[#121E18] rounded-xl border border-[#24352B] flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <div>
              <span className="text-[10px] font-mono text-[#7D9F8D] block uppercase">Materia Medica</span>
              <strong className="text-xs text-[#EFECE5]">24 Plant Species</strong>
            </div>
          </div>

          <div className="p-3 bg-[#121E18] rounded-xl border border-[#24352B] flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[10px] font-mono text-[#7D9F8D] block uppercase">Validation</span>
              <strong className="text-xs text-[#EFECE5]">AYUSH & Science</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
