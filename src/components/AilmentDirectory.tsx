import React, { useState, useMemo } from 'react';
import { AilmentInfo, AyurvedicEntry, HerbMonograph, UserSubmittedRemedy } from '../types';
import {
  Stethoscope,
  Utensils,
  Search,
  ChevronRight,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  BookOpen,
  Sparkles,
  Leaf,
  Plus,
  ThumbsUp,
  AlertTriangle,
  FileText,
  ArrowLeft
} from 'lucide-react';

interface AilmentDirectoryProps {
  ailments: AilmentInfo[];
  herbs: HerbMonograph[];
  manuscriptEntries: AyurvedicEntry[];
  userRemedies: UserSubmittedRemedy[];
  onSelectHerb: (herbId: string) => void;
  onOpenSubmitModal: (ailmentId?: string, ailmentName?: string) => void;
  onVoteUserRemedy: (remedyId: string) => void;
}

export const AilmentDirectory: React.FC<AilmentDirectoryProps> = ({
  ailments,
  herbs,
  manuscriptEntries,
  userRemedies,
  onSelectHerb,
  onOpenSubmitModal,
  onVoteUserRemedy
}) => {
  const [selectedAilmentId, setSelectedAilmentId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const selectedAilment = useMemo(() => {
    return ailments.find(a => a.id === selectedAilmentId) || null;
  }, [ailments, selectedAilmentId]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(ailments.map(a => a.category));
    return ['ALL', ...Array.from(set)];
  }, [ailments]);

  // Filtered ailments
  const filteredAilments = useMemo(() => {
    return ailments.filter(ailment => {
      const matchesCat = categoryFilter === 'ALL' || ailment.category === categoryFilter;
      const matchesSearch = !searchQuery.trim() ||
        ailment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ailment.telugu_name.includes(searchQuery) ||
        ailment.classical_term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ailment.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [ailments, categoryFilter, searchQuery]);

  // Associated herbs for selected ailment
  const associatedHerbs = useMemo(() => {
    if (!selectedAilment) return [];
    return herbs.filter(h =>
      (h.associated_ailments && h.associated_ailments.includes(selectedAilment.id)) ||
      h.description.toLowerCase().includes(selectedAilment.id) ||
      h.traditional_uses.some(u => u.toLowerCase().includes(selectedAilment.name.toLowerCase()) || u.toLowerCase().includes(selectedAilment.id))
    );
  }, [selectedAilment, herbs]);

  // Verified manuscript entries for selected ailment
  const associatedManuscripts = useMemo(() => {
    if (!selectedAilment) return [];
    const term = selectedAilment.id.toLowerCase();
    return manuscriptEntries.filter(entry => {
      const text = `${entry.ailment} ${entry.ailment_telugu || ''} ${entry.category} ${entry.remedy}`.toLowerCase();
      if (term === 'piles' && (text.includes('pile') || text.includes('arshas') || text.includes('moola') || entry.category === 'Digestive & Piles')) return true;
      if (term === 'headache' && (text.includes('headache') || text.includes('shira') || text.includes('migraine') || entry.category === 'Headache & Neuro')) return true;
      if (term === 'fever' && (text.includes('fever') || text.includes('jwara') || text.includes('chali') || entry.category === 'Fevers & Immunity')) return true;
      if (term === 'respiratory' && (text.includes('cough') || text.includes('cold') || text.includes('asthma') || text.includes('kasa') || entry.category === 'Respiratory & Cough')) return true;
      if (term === 'joints' && (text.includes('joint') || text.includes('arthritis') || text.includes('amavata') || entry.category === 'Joints & Pain')) return true;
      if (term === 'jaundice' && (text.includes('jaundice') || text.includes('kamala') || text.includes('liver') || text.includes('kaamerlu'))) return true;
      if (term === 'women-health' && (text.includes('women') || text.includes('menstru') || text.includes('uter') || entry.category === 'Women\'s Health')) return true;
      if (term === 'skin-wounds' && (text.includes('skin') || text.includes('wound') || text.includes('eczema') || text.includes('vrana') || entry.category === 'Skin & Wounds')) return true;
      if (term === 'urinary-calculi' && (text.includes('urinary') || text.includes('stone') || text.includes('ashmari') || entry.category === 'Urinary & Renal')) return true;
      if (term === 'digestive-agni' && (text.includes('indigestion') || text.includes('acidity') || text.includes('gas') || text.includes('ajeerna') || entry.category === 'Digestive & Piles')) return true;
      if (term === 'hair-scalp' && (text.includes('hair') || text.includes('dandruff') || text.includes('khalitya'))) return true;
      if (term === 'dental-oral' && (text.includes('tooth') || text.includes('teeth') || text.includes('oral') || text.includes('mouth') || text.includes('danta'))) return true;
      return text.includes(selectedAilment.name.toLowerCase());
    });
  }, [selectedAilment, manuscriptEntries]);

  // User submitted remedies for selected ailment
  const associatedUserRemedies = useMemo(() => {
    if (!selectedAilment) return [];
    return userRemedies.filter(rem =>
      rem.ailment_id === selectedAilment.id ||
      rem.ailment_name.toLowerCase().includes(selectedAilment.name.toLowerCase()) ||
      rem.ailment_name.toLowerCase().includes(selectedAilment.id)
    );
  }, [selectedAilment, userRemedies]);

  return (
    <div className="py-8 space-y-8 animate-fadeIn">
      {/* If an ailment is selected, show the rich deep-dive page */}
      {selectedAilment ? (
        <div className="space-y-8">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedAilmentId(null)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#15231C] border border-[#2A3B31] text-xs font-mono text-[#6B8E7B] hover:text-[#EFECE5] hover:border-[#C5A059] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Ailments</span>
            </button>

            <button
              onClick={() => onOpenSubmitModal(selectedAilment.id, selectedAilment.name)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C5A059] text-[#0B130E] text-xs font-bold hover:bg-[#d9a441] transition-all shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit Remedy for {selectedAilment.name}</span>
            </button>
          </div>

          {/* Ailment Header Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#15231C] border border-[#2A3B31] shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-[#0F1A15] border border-[#2A3B31] text-xs font-mono text-[#C5A059] uppercase tracking-wider">
                  {selectedAilment.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0F1A15] border border-[#2A3B31] text-xs font-mono text-[#6B8E7B]">
                  Classical: {selectedAilment.classical_term}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0F1A15] border border-[#2A3B31] text-xs font-mono text-[#6B8E7B]">
                  {associatedManuscripts.length} Verified Manuscript Recipes
                </span>
              </div>

              <div>
                <h1 className="font-serif text-3xl sm:text-5xl text-[#EFECE5]">
                  {selectedAilment.name}
                </h1>
                <p className="text-lg font-medium text-[#C5A059] mt-1 font-serif">
                  {selectedAilment.telugu_name}
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#6B8E7B] leading-relaxed max-w-4xl font-sans">
                {selectedAilment.description}
              </p>

              <div className="inline-flex items-center gap-2 p-3 rounded-lg bg-[#0F1A15] border border-[#2A3B31] text-xs text-[#EFECE5]">
                <span className="font-bold text-[#C5A059]">Dosha Pathology (Nidana):</span>
                <span>{selectedAilment.dosha_involvement}</span>
              </div>
            </div>
          </div>

          {/* Section: Associated Herbs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-[#C5A059]" />
                <h2 className="font-serif text-2xl text-[#EFECE5]">
                  Associated Ayurvedic Herbs ({associatedHerbs.length})
                </h2>
              </div>
              <span className="text-xs text-[#6B8E7B]">Click any herb for full monograph</span>
            </div>

            {associatedHerbs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {associatedHerbs.map(herb => (
                  <button
                    key={herb.id}
                    onClick={() => onSelectHerb(herb.id)}
                    className="p-4 rounded-xl bg-[#15231C] border border-[#2A3B31] hover:border-[#C5A059] text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="font-serif text-lg font-bold text-[#EFECE5] group-hover:text-[#C5A059] transition-colors">
                          {herb.name}
                        </h3>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#0F1A15] text-[#C5A059] border border-[#2A3B31]">
                          {herb.telugu}
                        </span>
                      </div>
                      <p className="text-xs italic text-[#6B8E7B] mt-0.5 font-serif">
                        {herb.botanical}
                      </p>
                      <p className="text-xs text-[#EFECE5]/80 mt-2 line-clamp-2">
                        {herb.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#2A3B31] flex items-center justify-between text-[11px] text-[#6B8E7B]">
                      <span>Virya: <b className="text-[#EFECE5]">{herb.virya}</b></span>
                      <span className="text-[#C5A059] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Monograph <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-[#15231C] border border-[#2A3B31] text-xs text-[#6B8E7B]">
                Herbal formulas for this condition utilize complex multi-ingredient classical compounds (churnas, tailas, rasayanas). Check the manuscript citations below.
              </div>
            )}
          </div>

          {/* Section: Verified Manuscript Remedies */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#C5A059]" />
              <div>
                <h2 className="font-serif text-2xl text-[#EFECE5]">
                  Verified Historical Manuscript Remedies ({associatedManuscripts.length})
                </h2>
                <p className="text-xs text-[#6B8E7B]">Page-cited formulations directly transcribed from classical Telugu texts</p>
              </div>
            </div>

            {associatedManuscripts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {associatedManuscripts.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-5 rounded-xl bg-[#FDFBF7] text-[#1A2620] border-l-4 border-l-[#C5A059] border border-[#E0D8C8] shadow-md space-y-3 relative"
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-3 border-b border-[#E0D8C8] pb-2.5">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#EDE6D6] text-[11px] font-mono font-bold text-[#8C6D23]">
                          <span>{entry.source_short}</span>
                          <span>•</span>
                          <span>Page {entry.page}</span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-[#1A2620] mt-1">
                          {entry.herb} <span className="text-[#8C6D23] font-normal">({entry.telugu})</span>
                        </h3>
                      </div>

                      {entry.preparation_type && (
                        <span className="text-[11px] px-2 py-1 rounded bg-[#E4DCB8] text-[#544317] font-mono">
                          {entry.preparation_type}
                        </span>
                      )}
                    </div>

                    {/* Ailment Focus */}
                    <div className="text-xs font-mono text-[#5A6E63]">
                      <span className="font-bold text-[#1A2620]">Indication: </span>
                      <span>{entry.ailment}</span>
                      {entry.ailment_telugu && <span className="ml-1 text-[#8C6D23]">({entry.ailment_telugu})</span>}
                    </div>

                    {/* Verbatim Classical Recipe */}
                    <div className="p-3 rounded-lg bg-[#F4EFE6] border border-[#E0D8C8] text-xs leading-relaxed text-[#2B3B32]">
                      <span className="font-bold text-[#1A2620] block mb-1">📜 Manuscript Recipe:</span>
                      {entry.remedy}
                    </div>

                    {/* Telugu transcription snippet if available */}
                    {entry.remedy_telugu && (
                      <div className="text-xs text-[#5A6E63] italic border-l-2 border-[#C5A059] pl-2">
                        {entry.remedy_telugu}
                      </div>
                    )}

                    {/* Verification and Safety footer */}
                    <div className="pt-2 border-t border-[#E0D8C8] flex flex-wrap items-center justify-between text-[11px] text-[#5A6E63] gap-2">
                      <span className="flex items-center gap-1 text-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified from scan Page {entry.page}
                      </span>
                      {entry.safety_rating && (
                        <span className="font-mono text-[#8C6D23]">
                          Rating: {entry.safety_rating}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-[#15231C] border border-[#2A3B31] text-xs text-[#6B8E7B]">
                No direct single-herb entry transcribed for this condition in the initial 4-batch digitized sample. Check broader categories or community submissions.
              </div>
            )}
          </div>

          {/* Section: Community Submitted Remedies */}
          <div className="space-y-4 pt-4 border-t border-[#2A3B31]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <div>
                  <h2 className="font-serif text-2xl text-[#EFECE5]">
                    Community Submitted Remedies ({associatedUserRemedies.length})
                  </h2>
                  <p className="text-xs text-amber-400/90">Reader-contributed traditional recipes — unverified by historical manuscripts</p>
                </div>
              </div>

              <button
                onClick={() => onOpenSubmitModal(selectedAilment.id, selectedAilment.name)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#15231C] border border-amber-500/40 text-amber-300 text-xs hover:bg-amber-950/40 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Your Remedy</span>
              </button>
            </div>

            {/* Prominent Community Disclaimer Banner */}
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs leading-relaxed flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <b className="text-amber-300">Important Community Notice: </b>
                The recipes in this section are submitted by platform users and practitioners. They have <u>not</u> been verified against classical manuscripts. Use with caution and always consult a certified Ayurvedic practitioner (BAMS/MD) before initiating home treatments.
              </div>
            </div>

            {associatedUserRemedies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {associatedUserRemedies.map(rem => (
                  <div
                    key={rem.id}
                    className="p-5 rounded-xl bg-[#15231C] border border-amber-500/40 shadow-lg space-y-3.5 text-[#EFECE5]"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 border-b border-[#2A3B31] pb-2.5">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono uppercase tracking-wider font-bold">
                          <AlertTriangle className="w-3 h-3" />
                          <span>User-Submitted (Unverified)</span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-[#EFECE5] mt-1.5">
                          {rem.title}
                        </h3>
                      </div>

                      <button
                        onClick={() => onVoteUserRemedy(rem.id)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0F1A15] border border-[#2A3B31] text-xs text-[#C5A059] hover:bg-[#C5A059]/10 transition-colors"
                        title="Helpful submission"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span className="font-mono">{rem.upvotes}</span>
                      </button>
                    </div>

                    {/* Author and lineage */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B8E7B]">
                      <span>By <b className="text-[#EFECE5]">{rem.author_name}</b> ({rem.author_role || 'Contributor'})</span>
                      {rem.source_tradition && (
                        <>
                          <span>•</span>
                          <span className="italic text-[#C5A059]">{rem.source_tradition}</span>
                        </>
                      )}
                    </div>

                    {/* Ingredients list */}
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B8E7B] block mb-1">
                        Ingredients:
                      </span>
                      <ul className="space-y-1 text-xs text-[#EFECE5] bg-[#0F1A15] p-2.5 rounded-lg border border-[#2A3B31]">
                        {rem.ingredients.map((ing, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Instructions */}
                    <div className="text-xs text-[#EFECE5] leading-relaxed">
                      <b className="text-[#C5A059] block mb-0.5">Preparation:</b>
                      {rem.preparation_instructions}
                    </div>

                    {/* Dosage */}
                    <div className="text-xs text-[#EFECE5] bg-[#0F1A15] p-2.5 rounded-lg border border-[#2A3B31]">
                      <b className="text-[#C5A059]">Dosage & Timing: </b>
                      <span>{rem.dosage_usage}</span>
                    </div>

                    {/* Precautions */}
                    {rem.precautions && (
                      <div className="text-[11px] text-amber-300/80 bg-amber-950/20 p-2 rounded border border-amber-900/40">
                        <b>Precaution: </b>{rem.precautions}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-[#15231C] border border-[#2A3B31] text-center space-y-3">
                <p className="text-xs text-[#6B8E7B]">
                  No user remedies have been submitted yet for {selectedAilment.name}.
                </p>
                <button
                  onClick={() => onOpenSubmitModal(selectedAilment.id, selectedAilment.name)}
                  className="px-4 py-2 rounded-lg bg-[#C5A059] text-[#0B130E] text-xs font-bold hover:bg-[#d9a441] transition-all"
                >
                  Be the first to submit a recipe
                </button>
              </div>
            )}
          </div>

          {/* Section: Pathya / Apathya and Red Flags */}
          <div className="space-y-6 pt-4 border-t border-[#2A3B31]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6B8E7B]">
              <Utensils className="w-4 h-4 text-[#C5A059]" />
              <span>Dietary Protocol (Pathya & Apathya)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Pathyam */}
              <div className="p-5 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Pathyam (Recommended Foods & Practices)</span>
                </div>
                <ul className="space-y-2 text-xs text-[#EFECE5]">
                  {selectedAilment.pathya_apathya.recommended.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#C5A059] font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apathyam */}
              <div className="p-5 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-red-300 uppercase">
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span>Apathyam (Foods & Behaviors to Avoid)</span>
                </div>
                <ul className="space-y-2 text-xs text-[#EFECE5]">
                  {selectedAilment.pathya_apathya.avoid.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Red Flag Symptoms */}
            <div className="p-5 rounded-xl bg-red-950/30 border border-red-800/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-300">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>Emergency Red-Flag Symptoms (Seek Immediate Medical Care)</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-red-200/90">
                {selectedAilment.red_flags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">⚠️</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* Overview Grid View of All Ailments */
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-[#2A3B31] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-1">
                <Stethoscope className="w-4 h-4" />
                <span>Classical Clinical Directory</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#EFECE5]">
                Ailment Index & Treatment Directory
              </h1>
              <p className="text-sm text-[#6B8E7B] mt-1 max-w-2xl">
                Browse classical conditions, associated medicinal herbs, and verified Telugu recipes. Click on any ailment for an in-depth breakdown.
              </p>
            </div>

            <button
              onClick={() => onOpenSubmitModal()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C5A059] text-[#0B130E] text-xs font-bold hover:bg-[#d9a441] transition-all shrink-0 self-start md:self-auto shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Community Remedy</span>
            </button>
          </div>

          {/* Search & Category Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 rounded-xl bg-[#15231C] border border-[#2A3B31]">
            <div className="flex items-center flex-1 px-3 py-1.5 rounded-lg bg-[#0F1A15] border border-[#2A3B31] gap-2">
              <Search className="w-4 h-4 text-[#C5A059] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ailments by English or Telugu name (e.g., Piles, Headache, Fever, కామెర్లు)..."
                className="w-full bg-transparent text-sm text-[#EFECE5] placeholder-[#6B8E7B]/70 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-[#6B8E7B] uppercase hidden sm:inline">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-lg bg-[#0F1A15] border border-[#2A3B31] text-xs text-[#EFECE5] focus:outline-none focus:border-[#C5A059]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'ALL' ? 'All Categories' : cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Ailments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAilments.map((ailment) => (
              <div
                key={ailment.id}
                onClick={() => setSelectedAilmentId(ailment.id)}
                className="p-6 rounded-xl bg-[#15231C] border border-[#2A3B31] hover:border-[#C5A059] transition-all flex flex-col justify-between group shadow-lg cursor-pointer hover:-translate-y-0.5"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[#EFECE5] group-hover:text-[#C5A059] transition-colors leading-tight">
                        {ailment.name}
                      </h2>
                      <div className="text-sm font-semibold text-[#C5A059] mt-0.5 font-serif">
                        {ailment.telugu_name}
                      </div>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#0F1A15] border border-[#2A3B31] text-[#6B8E7B] shrink-0">
                      {ailment.category}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-[#6B8E7B]">
                    <span className="text-[#4A6355]">Classical Term: </span>
                    <span className="text-[#EFECE5]">{ailment.classical_term}</span>
                  </div>

                  <p className="text-xs text-[#EFECE5]/80 leading-relaxed line-clamp-3">
                    {ailment.description}
                  </p>

                  <div className="p-2.5 rounded-lg bg-[#0F1A15] border border-[#2A3B31] text-[11px] text-[#6B8E7B]">
                    <span className="font-bold text-[#C5A059]">Dosha: </span>
                    <span>{ailment.dosha_involvement}</span>
                  </div>
                </div>

                {/* Footer action */}
                <div className="mt-5 pt-4 border-t border-[#2A3B31] flex items-center justify-between text-xs text-[#C5A059] font-semibold group-hover:text-[#d9a441]">
                  <span>Explore herbs & recipes</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
