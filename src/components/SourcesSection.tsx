import React from 'react';
import { BookOpen, ShieldCheck, CheckCircle2, AlertTriangle, Layers, FileText, Sparkles } from 'lucide-react';

interface SourcesSectionProps {
  onOpenArchitectureModal?: () => void;
  onNavigateToCodex?: () => void;
}

export const SourcesSection: React.FC<SourcesSectionProps> = ({ onOpenArchitectureModal, onNavigateToCodex }) => {
  const sources = [
    {
      id: 'mulika',
      title: 'Ayurveda Mulika Prayogavali',
      telugu_title: 'ఆయుర్వేద మూలికా ప్రయోగవళి',
      author: 'Classical Compilation',
      status: 'Batch 01 Digitized (Pages 3-10, 32)',
      total_pages: '144 pages total',
      verified_count: '25+ Verified Remedies',
      description: 'Comprehensive historical formulary featuring herb-wise preparations for common to chronic disorders, including fever, piles, jaundice, and respiratory conditions.'
    },
    {
      id: 'chitkalu',
      title: 'Vaidya Rahasya Chitkalu',
      telugu_title: 'వైద్య రహస్య చిట్కాలు',
      author: 'Sri A. Ramayachari',
      status: 'Verified Sample Digitized',
      total_pages: '64 pages total',
      verified_count: '15+ Verified Remedies',
      description: 'Practical clinical shortcuts and traditional folk recipes compiled from hereditary vaidya lineages in Andhra & Telangana.'
    },
    {
      id: 'medplants',
      title: 'Aushadha Mokkallo Arogya Rahasyalu',
      telugu_title: 'ఔషధ మొక్కల్లో ఆరోగ్య రహస్యాలు',
      author: 'Dr. C. Madhusudana Sarma (B.A.M.S.)',
      status: 'Verified Sample Digitized',
      total_pages: '158 pages total',
      verified_count: '12+ Verified Monographs',
      description: 'Scholarly examination of medicinal flora, detailing parts used, taste energetics, and clinical applications.'
    },
    {
      id: 'beauty',
      title: 'Andaniki, Arogyaniki Adbhuta Chitkalu',
      telugu_title: 'అందానికి, ఆరోగ్యానికి అద్భుత చిట్కాలు',
      author: 'Yuvamitra',
      status: 'Verified Sample Digitized',
      total_pages: '80 pages total',
      verified_count: '10+ Verified Remedies',
      description: 'Traditional formulations for skin rejuvenation, wound healing, hair tonics, and daily preventive vitality.'
    }
  ];

  return (
    <div className="py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[#2A3B31] pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Manuscript Digitization & Source Corpus</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#EFECE5]">
          Active Source Library & Digitization Metrics
        </h2>
        <p className="text-sm text-[#6B8E7B] mt-1 max-w-xl">
          Transcriptions are cross-checked by eye against high-resolution manuscript scans before indexing.
        </p>
      </div>

      {/* 4 Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sources.map((src) => (
          <div
            key={src.id}
            className="p-6 rounded-2xl bg-[#15231C] border border-[#2A3B31] space-y-4 shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] block">
                  {src.status}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#EFECE5] mt-1">
                  {src.title}
                </h3>
                <p className="text-sm font-semibold text-[#C5A059]">{src.telugu_title}</p>
                <p className="text-xs text-[#6B8E7B] font-mono mt-0.5">Author/Compiler: {src.author}</p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#0F1A15] border border-[#2A3B31] text-[#EFECE5]">
                {src.verified_count}
              </span>
            </div>

            <p className="text-xs text-[#EFECE5]/80 leading-relaxed">
              {src.description}
            </p>

            <div className="p-3 rounded-lg bg-[#0F1A15] border border-[#2A3B31] flex items-center justify-between text-xs text-[#6B8E7B]">
              <span>Shelf Status: <b className="text-[#EFECE5]">Active</b></span>
              <span>{src.total_pages}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Digitization & Safety Protocol Banner */}
      <div className="p-6 rounded-2xl bg-[#0F1A15] border border-[#2A3B31] space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A059]">
          <ShieldCheck className="w-4 h-4" />
          <span>Editorial & Safety Protocol Guidelines</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#6B8E7B]">
          <div className="p-4 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-2">
            <div className="font-bold text-[#EFECE5] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Human-Verified OCR Only</span>
            </div>
            <p className="leading-relaxed">
              Per our digitization playbook, raw Telugu OCR is flagged as unreliable until human-reviewed against physical scans. Only human-reviewed entries are searchable.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-2">
            <div className="font-bold text-[#EFECE5] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Rasashastra Heavy-Metal Quarantine</span>
            </div>
            <p className="leading-relaxed">
              Herbo-mineral and heavy-metal (Bhasma/Kajjali) formulations are flagged and quarantined from casual home remedies to prevent unsupervised toxicity.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-2">
            <div className="font-bold text-[#EFECE5] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Modern Open Science Cross-Ref</span>
            </div>
            <p className="leading-relaxed">
              Classical formulations are paired with open scientific research (AYUSH, PubMed, WHO) to elucidate modern bio-mechanisms and safety contraindications.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Hub Actions */}
      <div className="p-6 rounded-2xl bg-[#15231C] border border-[#2A3B31] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-serif text-lg font-bold text-[#EFECE5]">
            Explore Digitized Folios & Technical Architecture
          </h4>
          <p className="text-xs text-[#6B8E7B]">
            Browse side-by-side manuscript extractions page-by-page or inspect our Node.js, Express, PostgreSQL/Firestore and Gemini AI stack.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {onNavigateToCodex && (
            <button
              onClick={onNavigateToCodex}
              className="px-4 py-2 rounded-lg bg-[#0F1A15] border border-[#2A3B31] text-xs font-semibold text-[#EFECE5] hover:text-[#C5A059] hover:border-[#C5A059] transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#C5A059]" />
              <span>Browse Codex Pages</span>
            </button>
          )}

          {onOpenArchitectureModal && (
            <button
              onClick={onOpenArchitectureModal}
              className="px-4 py-2 rounded-lg bg-[#C5A059] text-[#0B130E] text-xs font-bold hover:bg-[#d9a441] transition-all flex items-center gap-2 shadow"
            >
              <Layers className="w-4 h-4" />
              <span>System Stack & DB Guide</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
