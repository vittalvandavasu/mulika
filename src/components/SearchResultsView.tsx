import React from 'react';
import { AyurvedicEntry, SearchResult, UserSubmittedRemedy } from '../types';
import { BookOpen, ShieldAlert, Sparkles, ExternalLink, Utensils, AlertTriangle, CheckCircle2, ChevronRight, Plus, ThumbsUp } from 'lucide-react';

interface SearchResultsViewProps {
  searchResult: SearchResult | null;
  loading: boolean;
  onSelectHerb: (herbName: string) => void;
  onOpenSubmitModal?: (ailmentName?: string) => void;
  onVoteUserRemedy?: (remedyId: string) => void;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  searchResult,
  loading,
  onSelectHerb,
  onOpenSubmitModal,
  onVoteUserRemedy
}) => {
  if (loading) {
    return (
      <div className="py-16 px-4 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#15231C] border border-[#2A3B31] text-[#C5A059] mb-4 animate-pulse">
          <Sparkles className="w-6 h-6 animate-spin" />
        </div>
        <h3 className="font-serif text-xl text-[#EFECE5] mb-2">Analyzing Manuscript Shelf & Cross-Referencing...</h3>
        <p className="text-sm text-[#6B8E7B] max-w-md mx-auto">
          Scanning classical Telugu source texts for exact page citations and retrieving modern scientific pharmacological benchmarks.
        </p>
      </div>
    );
  }

  if (!searchResult) {
    return null;
  }

  const {
    query_understood_as,
    manuscript_matches,
    user_submitted_matches = [],
    no_manuscript_match,
    manuscript_summary,
    modern_crossref,
    modern_sources,
    safety_note,
    pathya_guidance
  } = searchResult;

  return (
    <div className="py-8 space-y-8 animate-fadeIn">
      {/* Query Understood As Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-[#0F1A15] border border-[#2A3B31]">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059]"></span>
          <div>
            <span className="text-[11px] uppercase tracking-wider font-mono text-[#6B8E7B]">Search Intent:</span>
            <p className="text-sm sm:text-base font-medium text-[#EFECE5]">
              {query_understood_as}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-[#6B8E7B] shrink-0">
            {manuscript_matches.length} {manuscript_matches.length === 1 ? 'citation' : 'citations'} found
          </div>
          {onOpenSubmitModal && (
            <button
              onClick={() => onOpenSubmitModal(query_understood_as)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#15231C] border border-[#C5A059]/40 text-[#C5A059] text-xs hover:bg-[#C5A059] hover:text-[#0B130E] transition-all font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit Recipe</span>
            </button>
          )}
        </div>
      </div>

      {/* Manuscript Matches Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#C5A059]" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#6B8E7B]">
              Verified Classical Manuscript Entries
            </h2>
          </div>
          <span className="text-xs text-[#4A6355] italic">
            Exact verbatim extractions with page numbers
          </span>
        </div>

        {no_manuscript_match || manuscript_matches.length === 0 ? (
          <div className="p-6 rounded-xl bg-[#15231C] border border-[#2A3B31] text-center space-y-3">
            <AlertTriangle className="w-8 h-8 text-[#C5A059] mx-auto opacity-70" />
            <h4 className="font-serif text-lg text-[#EFECE5]">No Direct Manuscript Match in Current Batches</h4>
            <p className="text-sm text-[#6B8E7B] max-w-lg mx-auto">
              This specific query is not yet cataloged in the translated pages of the current 4 batches. However, modern scientific and classical reference information is provided below.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {manuscript_matches.map((item) => (
              <div
                key={item.id}
                className="bg-[#FDFBF7] text-[#1A2620] rounded-xl overflow-hidden shadow-2xl border border-[#E0D8C8] flex flex-col justify-between group hover:border-[#C5A059] transition-all"
              >
                {/* Card Header (Parchment Tab style) */}
                <div className="bg-[#F3EFE6] px-5 py-3 border-b border-[#E0D8C8] flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#C5A059] rounded-full"></span>
                    <span className="text-[11px] font-bold uppercase tracking-tighter text-[#1A2620]">
                      {item.source_short}
                    </span>
                  </div>
                  <span className="bg-[#0B130E] text-[#EFECE5] font-mono text-[10px] font-semibold px-2.5 py-0.5 rounded-sm">
                    Page {item.page.toString().padStart(2, '0')}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Herb Title & Telugu script */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-[#1A2620] leading-tight">
                        {item.herb}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-semibold text-[#8C6B28]">{item.telugu}</span>
                        {item.botanical && (
                          <span className="text-xs italic text-gray-500 font-sans">
                            • {item.botanical.split('(')[0].replace(/---.*$/, '').trim()}
                          </span>
                        )}
                      </div>
                    </div>
                    {item.category && (
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-[#E9E4D9] text-[#4A6355]">
                        {item.category.split('&')[0].trim()}
                      </span>
                    )}
                  </div>

                  {/* Ailment Badge */}
                  <div className="inline-block px-2.5 py-1 rounded bg-[#EFECE5] text-[#2D3A33] text-xs font-semibold">
                    Ailment: <span className="font-bold text-[#1A2620]">{item.ailment}</span>
                    {item.ailment_telugu && <span className="text-gray-500 ml-1">({item.ailment_telugu})</span>}
                  </div>

                  {/* Verbatim Recipe Box */}
                  <div className="p-4 bg-[#F9F7F2] rounded-lg border-l-4 border-[#C5A059] space-y-2">
                    <p className="text-sm leading-relaxed text-[#2D3A33] font-medium italic">
                      "{item.remedy}"
                    </p>
                    {item.preparation_type && (
                      <div className="text-[11px] font-mono text-[#8C6B28] font-semibold">
                        Form: {item.preparation_type}
                      </div>
                    )}
                  </div>

                  {/* Verification Note */}
                  {item.verification_note && (
                    <div className="text-xs text-[#596B60] italic border-t border-[#E0D8C8] pt-3">
                      <span className="font-semibold not-italic text-[#2D3A33]">Manuscript Note: </span>
                      {item.verification_note}
                    </div>
                  )}
                </div>

                {/* Card Footer with source author */}
                <div className="px-6 py-3 bg-[#F3EFE6]/70 border-t border-[#E0D8C8] flex items-center justify-between text-xs text-gray-600">
                  <span className="truncate max-w-[200px] sm:max-w-xs">
                    {item.source_title} {item.source_author ? `— ${item.source_author}` : ''}
                  </span>
                  <button
                    onClick={() => onSelectHerb(item.herb)}
                    className="text-[11px] font-semibold text-[#8C6B28] hover:text-[#0B130E] flex items-center gap-1 shrink-0"
                  >
                    <span>Herb profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User-Submitted Community Remedies Section (If any match) */}
      {user_submitted_matches && user_submitted_matches.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-[#2A3B31]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-amber-300">
                Community User-Submitted Remedies ({user_submitted_matches.length})
              </h2>
            </div>
            <span className="text-xs font-mono text-amber-400/80 uppercase">Unverified by Manuscripts</span>
          </div>

          {/* Unverified Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs leading-relaxed flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <b className="text-amber-300">User-Generated Remedy Notice: </b>
              The following entries are contributed by community members and home practitioners. They are <u>not</u> verified against historical manuscript scans. Use with caution and consult a qualified Ayurvedic physician (BAMS/MD) before preparing or consuming.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {user_submitted_matches.map((rem) => (
              <div
                key={rem.id}
                className="p-5 rounded-xl bg-[#15231C] border border-amber-500/40 space-y-3 text-[#EFECE5]"
              >
                <div className="flex items-start justify-between gap-2 border-b border-[#2A3B31] pb-2.5">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono uppercase font-bold">
                      <AlertTriangle className="w-3 h-3" />
                      <span>User-Submitted</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#EFECE5] mt-1">
                      {rem.title}
                    </h3>
                  </div>
                  {onVoteUserRemedy && (
                    <button
                      onClick={() => onVoteUserRemedy(rem.id)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0F1A15] border border-[#2A3B31] text-xs text-[#C5A059] hover:bg-[#C5A059]/10"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{rem.upvotes}</span>
                    </button>
                  )}
                </div>

                <div className="text-xs text-[#6B8E7B]">
                  By <b className="text-[#EFECE5]">{rem.author_name}</b> • For <span className="text-[#C5A059]">{rem.ailment_name}</span>
                </div>

                <div className="text-xs text-[#EFECE5] bg-[#0F1A15] p-3 rounded-lg border border-[#2A3B31]">
                  <b className="text-[#C5A059] block mb-1">Preparation:</b>
                  {rem.preparation_instructions}
                </div>

                <div className="text-xs text-[#EFECE5]">
                  <b className="text-[#C5A059]">Dosage: </b>{rem.dosage_usage}
                </div>

                {rem.precautions && (
                  <div className="text-[11px] text-amber-300/80 bg-amber-950/20 p-2 rounded">
                    <b>Caution: </b>{rem.precautions}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Classical Manuscript Summary Block */}
      {manuscript_summary && (
        <div className="p-6 rounded-xl bg-[#0F1A15] border border-[#2A3B31] border-l-4 border-l-[#C5A059] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            <BookOpen className="w-4 h-4" />
            <span>Classical Synthesis</span>
          </div>
          <p className="text-sm sm:text-base text-[#EFECE5] leading-relaxed">
            {manuscript_summary}
          </p>
        </div>
      )}

      {/* Modern Cross-Reference & Scientific Evidence Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-4">
          <div className="flex items-center justify-between border-b border-[#2A3B31] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#6B8E7B]">
                Modern Scientific & Pharmacological Cross-Reference
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#C5A059] uppercase px-2 py-0.5 rounded bg-[#0F1A15] border border-[#2A3B31]">
              AYUSH & PubMed Validated
            </span>
          </div>

          <p className="text-sm sm:text-base text-[#EFECE5] leading-relaxed">
            {modern_crossref}
          </p>

          {/* Reference Links */}
          {modern_sources && modern_sources.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono uppercase text-[#6B8E7B]">Verified Public Domain & Scientific Repositories:</span>
              <div className="flex flex-wrap gap-2">
                {modern_sources.map((src, i) => (
                  <a
                    key={i}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F1A15] border border-[#2A3B31] text-xs text-[#EFECE5] hover:text-[#C5A059] hover:border-[#C5A059]/40 transition-all font-sans"
                  >
                    <span>{src.title}</span>
                    <ExternalLink className="w-3 h-3 text-[#6B8E7B]" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pathya / Dietary Guidance Block */}
        <div className="lg:col-span-4 p-6 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6B8E7B] mb-2">
              <Utensils className="w-4 h-4 text-[#C5A059]" />
              <span>Dietary Regimen (Pathyam)</span>
            </div>
            <p className="text-xs sm:text-sm text-[#EFECE5] leading-relaxed">
              {pathya_guidance || 'Favor warm, freshly prepared easily digestible foods with adequate fluids. Avoid pungent spices, deep frying, and suppressing natural bodily urges.'}
            </p>
          </div>
          <div className="p-3 rounded bg-[#0F1A15] border border-[#2A3B31] text-[11px] text-[#6B8E7B]">
            <span className="text-[#C5A059] font-bold">Rule of Thumb: </span>
            Ayurveda considers digestion (Jatharagni) the cornerstone of healing — medicine succeeds only when the diet supports bowel regularity.
          </div>
        </div>
      </div>

      {/* Safety Warning & Red Flag Disclaimer */}
      <div className="p-5 rounded-xl bg-red-950/20 border border-red-900/40 text-red-200 text-xs sm:text-sm space-y-2">
        <div className="flex items-center gap-2 font-bold text-red-300">
          <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
          <span className="uppercase tracking-wider text-xs">Medical Disclaimer & Red Flags</span>
        </div>
        <p className="leading-relaxed text-red-200/90 font-sans">
          {safety_note}
        </p>
      </div>
    </div>
  );
};
