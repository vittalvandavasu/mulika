import React, { useState } from 'react';
import { X, Server, Database, Cpu, Layers, ShieldCheck, Code, Globe, Terminal, FileCode, CheckCircle2, ArrowRight } from 'lucide-react';

interface SystemArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemArchitectureModal: React.FC<SystemArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'backend' | 'database' | 'ai' | 'manuscripts'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0F1A15] border border-[#2A3B31] text-[#EFECE5] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#2A3B31] flex items-center justify-between bg-[#15231C]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#EFECE5]">
                Mulika Full-Stack & Database Architecture
              </h2>
              <p className="text-xs font-mono text-[#6B8E7B]">
                Node.js • Express • React 18 • TypeScript • Google GenAI • PostgreSQL / Firestore
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#15231C] border border-[#2A3B31] text-[#6B8E7B] hover:text-[#EFECE5] hover:border-[#C5A059] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-[#2A3B31] bg-[#0B130E] px-6 gap-2 pt-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-3 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-[#C5A059] text-[#C5A059]'
                : 'border-transparent text-[#6B8E7B] hover:text-[#EFECE5]'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Full-Stack Map</span>
          </button>

          <button
            onClick={() => setActiveTab('backend')}
            className={`pb-3 px-3 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'backend'
                ? 'border-[#C5A059] text-[#C5A059]'
                : 'border-transparent text-[#6B8E7B] hover:text-[#EFECE5]'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Express API & Server</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`pb-3 px-3 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'database'
                ? 'border-[#C5A059] text-[#C5A059]'
                : 'border-transparent text-[#6B8E7B] hover:text-[#EFECE5]'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Database & Storage Schemas</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`pb-3 px-3 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'ai'
                ? 'border-[#C5A059] text-[#C5A059]'
                : 'border-transparent text-[#6B8E7B] hover:text-[#EFECE5]'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>AI Reasoning & Grounding</span>
          </button>

          <button
            onClick={() => setActiveTab('manuscripts')}
            className={`pb-3 px-3 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'manuscripts'
                ? 'border-[#C5A059] text-[#C5A059]'
                : 'border-transparent text-[#6B8E7B] hover:text-[#EFECE5]'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Manuscript Digitization Pipeline</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#EFECE5]/90">
          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-2">
                  <div className="flex items-center gap-2 text-[#C5A059] font-mono text-xs uppercase font-bold">
                    <Globe className="w-4 h-4" />
                    <span>Client (Frontend)</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#EFECE5]">React 18 + Vite</h4>
                  <ul className="text-xs text-[#6B8E7B] space-y-1">
                    <li>• TypeScript 5.x for static safety</li>
                    <li>• Tailwind CSS 4 utility design</li>
                    <li>• Lucide React icon system</li>
                    <li>• Parchment folio styling & typography</li>
                    <li>• Optimistic UI state & fast local search</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-2">
                  <div className="flex items-center gap-2 text-[#C5A059] font-mono text-xs uppercase font-bold">
                    <Server className="w-4 h-4" />
                    <span>Backend (Express Server)</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#EFECE5]">Node.js API Engine</h4>
                  <ul className="text-xs text-[#6B8E7B] space-y-1">
                    <li>• Port 3000 host binding on 0.0.0.0</li>
                    <li>• Vite dev server middleware integration</li>
                    <li>• RESTful endpoints for herbs & remedies</li>
                    <li>• User-submitted remedy ingestion</li>
                    <li>• Hybrid client-server fallback engine</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-2">
                  <div className="flex items-center gap-2 text-[#C5A059] font-mono text-xs uppercase font-bold">
                    <Cpu className="w-4 h-4" />
                    <span>AI & Intelligence</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#EFECE5]">Google GenAI SDK</h4>
                  <ul className="text-xs text-[#6B8E7B] space-y-1">
                    <li>• Gemini 3.6-Flash & 3.1-Flash-Lite pipeline</li>
                    <li>• Grounded Ayurvedic synthesis</li>
                    <li>• Pathyam & Apathyam diet generator</li>
                    <li>• AYUSH TKDL pharmacological validation</li>
                    <li>• Deterministic offline backup parser</li>
                  </ul>
                </div>
              </div>

              {/* Data Flow Diagram Box */}
              <div className="p-5 rounded-xl bg-[#0B130E] border border-[#2A3B31] space-y-3 font-mono text-xs">
                <span className="text-[#C5A059] uppercase tracking-wider font-bold block">Application Request & Data Flow Pipeline:</span>
                <div className="p-3 bg-[#15231C] rounded-lg border border-[#2A3B31] space-y-2 text-[#EFECE5]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#C5A059]">1. User Search / Query</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#6B8E7B]" />
                    <span>POST /api/search with condition or Telugu herb</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#C5A059]">2. Exact Manuscript Scan</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#6B8E7B]" />
                    <span>Scans in-memory catalog across 4 digitized Telugu codices</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#C5A059]">3. Gemini AI Synthesis</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#6B8E7B]" />
                    <span>Cross-references botanical mechanisms, dietary pathya, and safety alerts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#C5A059]">4. Consolidated Response</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#6B8E7B]" />
                    <span>Returns JSON payload with page citations, Telugu text & verified dosage</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Backend */}
          {activeTab === 'backend' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#EFECE5] flex items-center gap-2">
                <Server className="w-4 h-4 text-[#C5A059]" />
                <span>REST API Specification & Endpoints</span>
              </h3>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-[#15231C] border border-[#2A3B31] font-mono text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">GET</span>
                    <span className="text-[#EFECE5]">/api/entries</span>
                  </div>
                  <span className="text-[#6B8E7B]">Returns full list of 100+ manuscript-indexed verified formulations</span>
                </div>

                <div className="p-3 rounded-lg bg-[#15231C] border border-[#2A3B31] font-mono text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">GET</span>
                    <span className="text-[#EFECE5]">/api/herbs</span>
                  </div>
                  <span className="text-[#6B8E7B]">Returns 24 Materia Medica monographs with Dravyaguna energetics</span>
                </div>

                <div className="p-3 rounded-lg bg-[#15231C] border border-[#2A3B31] font-mono text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">GET</span>
                    <span className="text-[#EFECE5]">/api/ailments</span>
                  </div>
                  <span className="text-[#6B8E7B]">Returns clinical disease profiles with dosha etiology & red-flag signs</span>
                </div>

                <div className="p-3 rounded-lg bg-[#15231C] border border-[#2A3B31] font-mono text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-bold">POST</span>
                    <span className="text-[#EFECE5]">/api/search</span>
                  </div>
                  <span className="text-[#6B8E7B]">Hybrid manuscript filter + Gemini cross-referencing engine</span>
                </div>

                <div className="p-3 rounded-lg bg-[#15231C] border border-[#2A3B31] font-mono text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold">GET</span>
                    <span className="text-[#EFECE5]">/api/user-remedies</span>
                  </div>
                  <span className="text-[#6B8E7B]">Fetches community-submitted remedies with unverified flags</span>
                </div>

                <div className="p-3 rounded-lg bg-[#15231C] border border-[#2A3B31] font-mono text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-bold">POST</span>
                    <span className="text-[#EFECE5]">/api/user-remedies</span>
                  </div>
                  <span className="text-[#6B8E7B]">Validates and saves new user recipe with strict unverified labeling</span>
                </div>

                <div className="p-3 rounded-lg bg-[#15231C] border border-[#2A3B31] font-mono text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-bold">POST</span>
                    <span className="text-[#EFECE5]">/api/user-remedies/:id/vote</span>
                  </div>
                  <span className="text-[#6B8E7B]">Atomic increment for community remedy upvotes</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Database */}
          {activeTab === 'database' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#EFECE5] flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#C5A059]" />
                  <span>Database Schemas & Persistence Options</span>
                </h3>
                <span className="text-xs font-mono text-[#C5A059] bg-[#15231C] px-2.5 py-1 rounded border border-[#2A3B31]">
                  Cloud SQL (PostgreSQL) / Firestore Ready
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#0B130E] border border-[#2A3B31] space-y-3 font-mono text-xs">
                <span className="text-[#6B8E7B] uppercase block">Relational Schema Definition (Drizzle / PostgreSQL):</span>
                <pre className="text-emerald-400 overflow-x-auto p-3 bg-[#15231C] rounded-lg">
{`-- Manuscripts Table
CREATE TABLE manuscripts (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  telugu_title VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  total_pages INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Verified Manuscript Entries
CREATE TABLE manuscript_entries (
  id VARCHAR(64) PRIMARY KEY,
  manuscript_id VARCHAR(64) REFERENCES manuscripts(id),
  page_number INT NOT NULL,
  herb_name VARCHAR(128) NOT NULL,
  telugu_herb VARCHAR(128) NOT NULL,
  botanical_name VARCHAR(255),
  ailment_name VARCHAR(128) NOT NULL,
  ailment_telugu VARCHAR(128),
  recipe_text TEXT NOT NULL,
  preparation_type VARCHAR(64),
  category VARCHAR(64),
  safety_rating VARCHAR(64)
);

-- User Submitted Remedies (Unverified / Community)
CREATE TABLE user_remedies (
  id VARCHAR(64) PRIMARY KEY,
  author_name VARCHAR(128) NOT NULL,
  author_role VARCHAR(64),
  ailment_name VARCHAR(128) NOT NULL,
  title VARCHAR(255) NOT NULL,
  ingredients JSONB NOT NULL,
  preparation_instructions TEXT NOT NULL,
  dosage_usage TEXT NOT NULL,
  precautions TEXT,
  upvotes INT DEFAULT 1,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);`}
                </pre>
              </div>
            </div>
          )}

          {/* Tab 4: AI Reasoning */}
          {activeTab === 'ai' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#EFECE5] flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#C5A059]" />
                <span>Gemini Generative Engine & Medical Verification Prompting</span>
              </h3>

              <div className="p-4 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-3 text-xs leading-relaxed">
                <p>
                  Mulika utilizes the official <b>@google/genai</b> TypeScript SDK with dynamic multi-model orchestration. When a query is received:
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-[#0B130E] rounded-lg border border-[#2A3B31]">
                    <b className="text-[#C5A059]">1. Multi-Model Failover Sequence:</b>
                    <p className="text-[#6B8E7B] mt-0.5">
                      Attempts <code>gemini-3.6-flash</code> for sub-second structured generation → Falls back to <code>gemini-3.1-flash-lite</code> during high load → Escalates to <code>gemini-3.7-flash</code> and <code>gemini-3.1-pro-preview</code> for complex multi-herb polyherbal queries.
                    </p>
                  </div>

                  <div className="p-3 bg-[#0B130E] rounded-lg border border-[#2A3B31]">
                    <b className="text-[#C5A059]">2. Classical Grounding Injection:</b>
                    <p className="text-[#6B8E7B] mt-0.5">
                      The prompt injects verbatim extracted entries from the Telugu manuscript shelf, ensuring the model never hallucinates remedies that contradict historical texts.
                    </p>
                  </div>

                  <div className="p-3 bg-[#0B130E] rounded-lg border border-[#2A3B31]">
                    <b className="text-[#C5A059]">3. Structured JSON Enforcement:</b>
                    <p className="text-[#6B8E7B] mt-0.5">
                      Responses are enforced with JSON response schemas containing <code>query_understood_as</code>, <code>manuscript_summary</code>, <code>modern_crossref</code>, <code>modern_sources</code>, <code>pathya_guidance</code>, and <code>safety_note</code>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Manuscripts */}
          {activeTab === 'manuscripts' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#EFECE5] flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#C5A059]" />
                <span>Digitized Book Holdings & Verified Scope</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-2">
                  <b className="text-[#C5A059] font-serif text-base block">1. Ayurveda Mulika Prayogavali</b>
                  <p className="text-[#6B8E7B]"><b>Telugu:</b> ఆయుర్వేద మూలికా ప్రయోగవళి</p>
                  <p className="text-[#EFECE5]/80">Volume: 144 Pages. Digitized: Pages 3 to 10, Page 32. Covers Avise, Addasaram, Atimadhuram, Atthipatti, Anantamu, Avalu, Amudam, Uttareni, Ummetta, Usiri, and more.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-2">
                  <b className="text-[#C5A059] font-serif text-base block">2. Vaidya Rahasya Chitkalu</b>
                  <p className="text-[#6B8E7B]"><b>Author:</b> Sri A. Ramayachari (64 Pages)</p>
                  <p className="text-[#EFECE5]/80">Digitized: Pages 1, 2, 3, 8, 12, 14, 19, 24. Practical folk shortcuts for instant relief from toothache, indigestion, eye burning, and fevers.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-2">
                  <b className="text-[#C5A059] font-serif text-base block">3. Aushadha Mokkallo Arogya Rahasyalu</b>
                  <p className="text-[#6B8E7B]"><b>Author:</b> Dr. C. Madhusudana Sarma (B.A.M.S.)</p>
                  <p className="text-[#EFECE5]/80">Volume: 158 Pages. Digitized: Pages 12, 23, 45, 56, 78, 89. Comprehensive pharmacognosy, taste energetics, and clinical dosages.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#15231C] border border-[#2A3B31] space-y-2">
                  <b className="text-[#C5A059] font-serif text-base block">4. Andaniki Arogyaniki Adbhuta Chitkalu</b>
                  <p className="text-[#6B8E7B]"><b>Author:</b> Yuvamitra (80 Pages)</p>
                  <p className="text-[#EFECE5]/80">Digitized: Pages 4, 7, 15, 22, 31, 48. Rejuvenation (Rasayana), cosmetic skin tonics, wound management, and hair vitality.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#2A3B31] bg-[#15231C]/60 flex items-center justify-between text-xs text-[#6B8E7B]">
          <span>Mulika Engine • Version 2.4 Active</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#C5A059] text-[#0B130E] font-bold hover:bg-[#d9a441] transition-all"
          >
            Close Architecture Guide
          </button>
        </div>
      </div>
    </div>
  );
};
