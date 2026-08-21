import React, { useState } from 'react';
import { GlossaryTerm, MeasurementUnit, AntidoteEntry, ShodhanamEntry } from '../types';
import { BookMarked, Calculator, ShieldCheck, Flame, Search, ArrowRightLeft, Check, Sparkles } from 'lucide-react';

interface GlossaryAndToolsProps {
  terms: GlossaryTerm[];
  measurements: MeasurementUnit[];
  antidotes: AntidoteEntry[];
  shodhanam: ShodhanamEntry[];
}

export const GlossaryAndTools: React.FC<GlossaryAndToolsProps> = ({
  terms,
  measurements,
  antidotes,
  shodhanam
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'glossary' | 'calculator' | 'antidotes' | 'shodhanam'>('glossary');
  const [searchTerm, setSearchTerm] = useState('');

  // Unit Converter State
  const [calcValue, setCalcValue] = useState<number>(1);
  const [selectedUnit, setSelectedUnit] = useState<string>('Tulam');

  const unitRatesInGrams: Record<string, number> = {
    'Gunja / Ratti': 0.125,
    'Tulam (Tola)': 12.0,
    'Palam': 48.0,
    'Gidda (Liquid)': 75.0, // ml
    'Seru': 280.0,
    'Veesha': 1400.0,
    'Kunkudu Seed Bolus': 2.0,
    'Teaspoon (Chencha)': 5.0
  };

  const currentGrams = (calcValue || 0) * (unitRatesInGrams[selectedUnit] || 1);

  const filteredTerms = terms.filter(t =>
    t.telugu.includes(searchTerm) ||
    t.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.english_medical.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[#2A3B31] pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-1">
          <BookMarked className="w-4 h-4" />
          <span>Manuscript Reference Appendices</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#EFECE5]">
          Glossary, Traditional Measures & Safety Protocols
        </h2>
        <p className="text-sm text-[#6B8E7B] mt-1 max-w-xl">
          Historical medical dictionary (Roga Sabdartha Deepika), traditional weights & measures converter, toxicological antidotes (Virugudu), and herbal purification methods (Shodhanam).
        </p>

        {/* Sub-tab switcher */}
        <div className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={() => setActiveSubTab('glossary')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'glossary'
                ? 'bg-[#C5A059] text-[#0B130E] shadow'
                : 'bg-[#15231C] text-[#6B8E7B] hover:text-[#EFECE5] border border-[#2A3B31]'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Telugu-English Medical Lexicon ({terms.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('calculator')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'calculator'
                ? 'bg-[#C5A059] text-[#0B130E] shadow'
                : 'bg-[#15231C] text-[#6B8E7B] hover:text-[#EFECE5] border border-[#2A3B31]'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Traditional Measures Converter</span>
          </button>

          <button
            onClick={() => setActiveSubTab('antidotes')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'antidotes'
                ? 'bg-[#C5A059] text-[#0B130E] shadow'
                : 'bg-[#15231C] text-[#6B8E7B] hover:text-[#EFECE5] border border-[#2A3B31]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Antidote Table (విరుగుడు)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('shodhanam')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'shodhanam'
                ? 'bg-[#C5A059] text-[#0B130E] shadow'
                : 'bg-[#15231C] text-[#6B8E7B] hover:text-[#EFECE5] border border-[#2A3B31]'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Purification Protocols (శుద్ధి)</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Medical Lexicon */}
      {activeSubTab === 'glossary' && (
        <div className="space-y-6">
          <div className="w-full sm:w-80 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search terms e.g. Arshas, Piles, Amavata..."
              className="w-full bg-[#15231C] border border-[#2A3B31] text-[#EFECE5] placeholder-[#6B8E7B]/70 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#C5A059]"
            />
            <Search className="w-4 h-4 text-[#6B8E7B] absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerms.map((term, i) => (
              <div key={i} className="p-5 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#EFECE5]">
                      {term.telugu}
                    </h4>
                    <p className="text-xs font-mono text-[#C5A059]">{term.transliteration}</p>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#0F1A15] border border-[#2A3B31] text-[#6B8E7B]">
                    {term.category}
                  </span>
                </div>

                <div className="text-xs font-bold text-[#6B8E7B]">
                  Modern Medical: <span className="text-[#EFECE5]">{term.english_medical}</span>
                </div>

                <p className="text-xs text-[#6B8E7B] leading-relaxed">
                  {term.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Traditional Measurement Converter */}
      {activeSubTab === 'calculator' && (
        <div className="space-y-6 max-w-4xl">
          {/* Interactive Calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weight Converter */}
            <div className="p-6 rounded-2xl bg-[#15231C] border border-[#2A3B31] space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                <Calculator className="w-4 h-4" />
                <span>Classical Weight & Volume Converter</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-[#6B8E7B] block mb-1.5">Quantity</label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.5"
                    value={calcValue}
                    onChange={(e) => setCalcValue(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#0F1A15] border border-[#2A3B31] text-[#EFECE5] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#6B8E7B] block mb-1.5">Traditional Unit</label>
                  <select
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value)}
                    className="w-full bg-[#0F1A15] border border-[#2A3B31] text-[#EFECE5] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#C5A059]"
                  >
                    {Object.keys(unitRatesInGrams).map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>

                <div className="p-3 rounded-lg bg-[#0F1A15] border border-[#C5A059]/40 text-center">
                  <span className="text-[10px] font-mono uppercase text-[#6B8E7B] block">Metric Equivalent</span>
                  <span className="text-xl font-serif font-bold text-[#C5A059]">
                    {currentGrams >= 1000 ? `${(currentGrams / 1000).toFixed(2)} kg` : `${currentGrams.toFixed(2)} grams`}
                    {selectedUnit.includes('Liquid') && ` / ${currentGrams.toFixed(0)} ml`}
                  </span>
                </div>
              </div>
            </div>

            {/* Kwatha (Decoction) Water Reduction Calculator */}
            <div className="p-6 rounded-2xl bg-[#15231C] border border-[#2A3B31] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                  <Flame className="w-4 h-4" />
                  <span>Kashayam (Decoction) Ratio Calculator</span>
                </div>
                <p className="text-xs text-[#6B8E7B]">
                  Classical Sharangadhara Samhita ratio: 1 part coarse herb churna (Bharad) to 16 parts fresh water, simmered uncovered on mild heat until 1/4th remains.
                </p>

                <div className="p-3.5 bg-[#0F1A15] rounded-xl border border-[#2A3B31] space-y-2 text-xs">
                  <div className="flex justify-between text-[#6B8E7B]">
                    <span>Herb Churna:</span>
                    <b className="text-[#EFECE5]">12 grams (1 Tulam)</b>
                  </div>
                  <div className="flex justify-between text-[#6B8E7B]">
                    <span>Water to Add (16x):</span>
                    <b className="text-[#C5A059]">192 ml (approx. 1 glass)</b>
                  </div>
                  <div className="flex justify-between text-[#6B8E7B]">
                    <span>Boil Down To (1/4th):</span>
                    <b className="text-emerald-400">48 ml (1 Palam single dose)</b>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-[#6B8E7B] italic border-t border-[#2A3B31] pt-3">
                <b>Vessel Note:</b> Use unglazed earthen or stainless steel pot. Never prepare Kashayam in aluminum or brass without tin lining.
              </div>
            </div>
          </div>

          {/* Reference Table */}
          <div className="overflow-x-auto rounded-xl border border-[#2A3B31]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0F1A15] text-[#6B8E7B] font-mono uppercase border-b border-[#2A3B31]">
                <tr>
                  <th className="p-3.5">Telugu Unit</th>
                  <th className="p-3.5">Transliteration</th>
                  <th className="p-3.5">Metric Equivalent</th>
                  <th className="p-3.5">Classical Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A3B31] bg-[#15231C]">
                {measurements.map((m, idx) => (
                  <tr key={idx} className="hover:bg-[#1A2E24] transition-colors">
                    <td className="p-3.5 font-bold text-[#EFECE5]">{m.telugu_name}</td>
                    <td className="p-3.5 font-mono text-[#C5A059]">{m.transliteration}</td>
                    <td className="p-3.5 text-[#EFECE5] font-semibold">{m.metric_equivalent}</td>
                    <td className="p-3.5 text-[#6B8E7B]">{m.explanation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Antidotes Matrix (Virugudu) */}
      {activeSubTab === 'antidotes' && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[#15231C] border-l-4 border-[#C5A059] text-xs text-[#6B8E7B]">
            Transcribed from manuscript appendix (విషములకు విరుగుడు). Traditional antidotes intended to counteract toxic plant ingestions or dietary incompatibilities.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {antidotes.map((ant, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-red-400">Toxic / Aggravating Substance:</span>
                    <h4 className="font-serif text-lg font-bold text-[#EFECE5]">{ant.substance}</h4>
                    <span className="text-xs text-[#C5A059] font-semibold">{ant.telugu_substance}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#0F1A15] border border-[#2A3B31]">
                  <span className="text-[10px] uppercase font-mono text-[#6B8E7B] block mb-1">Classical Antidote (విరుగుడు):</span>
                  <div className="text-sm font-semibold text-[#C5A059]">{ant.antidote}</div>
                  <div className="text-xs text-[#6B8E7B]">{ant.telugu_antidote}</div>
                </div>

                <p className="text-xs text-[#6B8E7B] leading-relaxed">
                  {ant.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Shodhanam (Purification Protocols) */}
      {activeSubTab === 'shodhanam' && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[#15231C] border-l-4 border-[#C5A059] text-xs text-[#6B8E7B]">
            Classical purification techniques (శుద్ధి విధానము) ensuring herbs and seeds are biologically softened and detoxified prior to formulation.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shodhanam.map((sh, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-[#EFECE5]">{sh.item}</h4>
                  <span className="text-sm font-bold text-[#C5A059]">{sh.telugu_item}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono text-[#6B8E7B]">Shodhana Method (శుద్ధి విధానం):</span>
                  <p className="text-xs text-[#EFECE5] bg-[#0F1A15] p-3 rounded border border-[#2A3B31] leading-relaxed">
                    {sh.method}
                  </p>
                </div>

                <div className="text-xs text-[#6B8E7B]">
                  <span className="font-semibold text-[#C5A059]">Therapeutic Purpose: </span>
                  {sh.purpose}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
