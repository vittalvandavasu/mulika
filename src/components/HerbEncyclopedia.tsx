import React, { useState } from 'react';
import { HerbMonograph, AyurvedicEntry, UserSubmittedRemedy } from '../types';
import { Search, Leaf, Sparkles, BookOpen, ShieldAlert, X, ChevronRight, CheckCircle2, AlertTriangle, ThumbsUp, Tag } from 'lucide-react';

interface HerbEncyclopediaProps {
  herbs: HerbMonograph[];
  entries: AyurvedicEntry[];
  userRemedies?: UserSubmittedRemedy[];
  onSelectHerbForSearch: (herbName: string) => void;
  onSelectAilment?: (ailmentId: string) => void;
  onVoteUserRemedy?: (remedyId: string) => void;
}

export const HerbEncyclopedia: React.FC<HerbEncyclopediaProps> = ({
  herbs,
  entries,
  userRemedies = [],
  onSelectHerbForSearch,
  onSelectAilment,
  onVoteUserRemedy
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHerb, setSelectedHerb] = useState<HerbMonograph | null>(null);

  const filteredHerbs = herbs.filter(h =>
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.telugu.includes(searchTerm) ||
    h.botanical.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.sanskrit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (h.common_names && h.common_names.some(cn => cn.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const herbRemedies = selectedHerb
    ? entries.filter(e => {
        const root = selectedHerb.name.split(' ')[0].toLowerCase();
        return e.herb.toLowerCase().includes(root) ||
          (selectedHerb.telugu && e.telugu && e.telugu.includes(selectedHerb.telugu)) ||
          (selectedHerb.botanical && e.botanical && e.botanical.toLowerCase().includes(selectedHerb.botanical.toLowerCase().split(' ')[0]));
      })
    : [];

  const herbUserRemedies = selectedHerb
    ? userRemedies.filter(rem => {
        const root = selectedHerb.name.split(' ')[0].toLowerCase();
        return rem.herb_names.some(hn => hn.toLowerCase().includes(root)) ||
          rem.ingredients.some(ing => ing.toLowerCase().includes(root)) ||
          rem.title.toLowerCase().includes(root);
      })
    : [];

  return (
    <div className="py-8 space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2A3B31] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-1">
            <Leaf className="w-4 h-4" />
            <span>Ayurvedic Dravyaguna Botanical Index</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#EFECE5]">
            Herb Index & Materia Medica ({herbs.length} Plants)
          </h1>
          <p className="text-sm text-[#6B8E7B] mt-1 max-w-2xl">
            Transcribed profiles from digitized Telugu manuscripts detailing botanical classifications, classical energetics (Rasa, Virya, Vipaka), associated ailments, and recipe citations.
          </p>
        </div>

        {/* Filter / Search Bar */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search plant, botanical, Sanskrit, Telugu..."
            className="w-full bg-[#15231C] border border-[#2A3B31] text-[#EFECE5] placeholder-[#6B8E7B]/70 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#C5A059]"
          />
          <Search className="w-4 h-4 text-[#6B8E7B] absolute left-3 top-1/2 -translate-y-1/2" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B8E7B] hover:text-[#EFECE5]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Herbs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredHerbs.map((herb) => (
          <div
            key={herb.id}
            onClick={() => setSelectedHerb(herb)}
            className="p-5 rounded-xl bg-[#15231C] border border-[#2A3B31] hover:border-[#C5A059] cursor-pointer transition-all flex flex-col justify-between group shadow-lg hover:-translate-y-1"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-serif text-xl font-bold text-[#EFECE5] group-hover:text-[#C5A059] transition-colors leading-snug">
                  {herb.name}
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#0F1A15] border border-[#2A3B31] text-[#C5A059] shrink-0">
                  {herb.remedy_count} remedies
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[#C5A059] font-serif">{herb.telugu}</span>
                <span className="text-xs text-[#6B8E7B] font-mono">({herb.sanskrit})</span>
              </div>

              <p className="text-xs italic text-[#4A6355] font-serif truncate">
                {herb.botanical}
              </p>

              <p className="text-xs text-[#6B8E7B] line-clamp-2 leading-relaxed">
                {herb.description}
              </p>

              {/* Associated Ailments preview chips */}
              {herb.associated_ailments && herb.associated_ailments.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {herb.associated_ailments.slice(0, 3).map((ailId, i) => (
                    <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0F1A15] text-[#6B8E7B] border border-[#2A3B31]">
                      #{ailId}
                    </span>
                  ))}
                  {herb.associated_ailments.length > 3 && (
                    <span className="text-[10px] text-[#6B8E7B] self-center">
                      +{herb.associated_ailments.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-[#2A3B31] flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-[#6B8E7B]">
                {herb.virya} • {herb.rasa.split(',')[0]}
              </span>
              <span className="text-[#C5A059] font-medium group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                <span>Monograph</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredHerbs.length === 0 && (
        <div className="text-center py-12 text-[#6B8E7B]">
          No herbs found matching "{searchTerm}".
        </div>
      )}

      {/* Monograph Detail Modal */}
      {selectedHerb && (
        <div className="fixed inset-0 z-50 bg-[#0B130E]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0F1A15] border border-[#2A3B31] text-[#EFECE5] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleUp">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#0F1A15] p-6 border-b border-[#2A3B31] flex items-start justify-between z-10">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A059]">
                  <span>{selectedHerb.family}</span>
                  <span>•</span>
                  <span>{selectedHerb.sanskrit}</span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-[#EFECE5] mt-1">
                  {selectedHerb.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-bold text-[#C5A059] font-serif">{selectedHerb.telugu}</span>
                  <span className="text-sm italic text-[#6B8E7B] font-serif">{selectedHerb.botanical}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedHerb(null)}
                className="p-2 rounded-lg bg-[#15231C] text-[#6B8E7B] hover:text-[#EFECE5] hover:bg-[#2A3B31] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Botanical Description */}
              <p className="text-sm sm:text-base text-[#EFECE5] leading-relaxed">
                {selectedHerb.description}
              </p>

              {/* Classical Ayurvedic Energetics Matrix (Dravyaguna) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#15231C] border border-[#2A3B31]">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#6B8E7B] tracking-wider block">Rasa (Taste)</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#EFECE5]">{selectedHerb.rasa}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#6B8E7B] tracking-wider block">Virya (Potency)</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#C5A059]">{selectedHerb.virya}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#6B8E7B] tracking-wider block">Vipaka (Post-Digestive)</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#EFECE5]">{selectedHerb.vipaka}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#6B8E7B] tracking-wider block">Dosha Balance</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#6B8E7B]">{selectedHerb.dosha_effect}</span>
                </div>
              </div>

              {/* Associated Ailments Section with Links */}
              {selectedHerb.associated_ailments && selectedHerb.associated_ailments.length > 0 && (
                <div className="p-4 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                    <Tag className="w-4 h-4" />
                    <span>Linked Ailments & Classical Applications</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedHerb.associated_ailments.map((ailmentId, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (onSelectAilment) {
                            setSelectedHerb(null);
                            onSelectAilment(ailmentId);
                          }
                        }}
                        className="px-3 py-1 rounded-lg bg-[#0F1A15] border border-[#2A3B31] text-xs font-mono text-[#EFECE5] hover:border-[#C5A059] hover:text-[#C5A059] transition-colors flex items-center gap-1.5"
                      >
                        <span>{ailmentId.replace(/-/g, ' ')}</span>
                        <ChevronRight className="w-3 h-3 text-[#6B8E7B]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Parts Used & Traditional Uses */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#6B8E7B]">
                  Classical Clinical Indications & Formulations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedHerb.traditional_uses.map((use, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#EFECE5] p-2.5 rounded bg-[#15231C] border border-[#2A3B31]">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{use}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modern Scientific Evidence */}
              <div className="p-4 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                  <Sparkles className="w-4 h-4" />
                  <span>Modern Pharmacological Evidence & Active Phytochemicals</span>
                </div>
                <p className="text-xs sm:text-sm text-[#EFECE5] leading-relaxed">
                  {selectedHerb.modern_evidence}
                </p>
              </div>

              {/* Contraindications */}
              {selectedHerb.contraindications.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-200 text-xs sm:text-sm space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-400">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Contraindications & Clinical Cautions</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-amber-200/90">
                    {selectedHerb.contraindications.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Linked Verified Manuscript Citations */}
              {herbRemedies.length > 0 && (
                <div className="space-y-3 border-t border-[#2A3B31] pt-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#C5A059]" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#EFECE5]">
                      Verified Manuscript Recipes on Record ({herbRemedies.length})
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {herbRemedies.map((remedy) => (
                      <div
                        key={remedy.id}
                        className="p-3.5 rounded-lg bg-[#15231C] border border-[#2A3B31] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#EFECE5]">{remedy.ailment}</span>
                            <span className="text-[#C5A059] font-mono text-[11px]">({remedy.source_short}, Page {remedy.page})</span>
                          </div>
                          <p className="text-[#6B8E7B] italic">"{remedy.remedy}"</p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedHerb(null);
                            onSelectHerbForSearch(remedy.herb + ' for ' + remedy.ailment);
                          }}
                          className="px-3 py-1.5 rounded bg-[#0F1A15] border border-[#2A3B31] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0B130E] transition-all font-semibold shrink-0"
                        >
                          Run Cross-Ref
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Linked Community Remedies */}
              {herbUserRemedies.length > 0 && (
                <div className="space-y-3 border-t border-[#2A3B31] pt-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-amber-300">
                      Community Remedies Using {selectedHerb.name} (Unverified)
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {herbUserRemedies.map((rem) => (
                      <div
                        key={rem.id}
                        className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs space-y-1.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-[#EFECE5]">{rem.title}</span>
                          {onVoteUserRemedy && (
                            <button
                              onClick={() => onVoteUserRemedy(rem.id)}
                              className="text-[11px] text-[#C5A059] flex items-center gap-1 hover:underline"
                            >
                              <ThumbsUp className="w-3 h-3" /> {rem.upvotes}
                            </button>
                          )}
                        </div>
                        <p className="text-[#6B8E7B]">{rem.preparation_instructions}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#15231C] border-t border-[#2A3B31] flex justify-end gap-3">
              <button
                onClick={() => setSelectedHerb(null)}
                className="px-4 py-2 rounded-lg bg-[#0F1A15] border border-[#2A3B31] text-xs font-semibold text-[#EFECE5] hover:bg-[#2A3B31]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const herbName = selectedHerb.name;
                  setSelectedHerb(null);
                  onSelectHerbForSearch(herbName);
                }}
                className="px-5 py-2 rounded-lg bg-[#C5A059] text-[#0B130E] text-xs font-bold hover:bg-[#d9a441] transition-all"
              >
                Search all {selectedHerb.name} remedies
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
