import React from 'react';
import { BookOpen, Search, Leaf, Stethoscope, BookMarked, MessageSquare, Layers, ScrollText } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  totalEntriesCount: number;
  onOpenArchitectureModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, totalEntriesCount, onOpenArchitectureModal }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0F1A15]/95 backdrop-blur-md border-b border-[#2A3B31]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('search')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-[#C5A059] rounded-full flex items-center justify-center text-[#0B130E] group-hover:scale-105 transition-all">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <h1 className="text-2xl font-serif tracking-tight text-[#C5A059]">
                  Mulika • మూలిక
                </h1>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-[#6B8E7B] font-mono">
                Authentic Ayurvedic Manuscript Index
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'search'
                  ? 'bg-[#15231C] text-[#C5A059] border border-[#2A3B31] shadow-sm'
                  : 'text-[#6B8E7B] hover:text-[#EFECE5] hover:bg-[#15231C]/60'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>

            <button
              onClick={() => setActiveTab('codex')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'codex'
                  ? 'bg-[#15231C] text-[#C5A059] border border-[#2A3B31] shadow-sm'
                  : 'text-[#6B8E7B] hover:text-[#EFECE5] hover:bg-[#15231C]/60'
              }`}
            >
              <ScrollText className="w-4 h-4" />
              <span>Codex Reader</span>
            </button>

            <button
              onClick={() => setActiveTab('herbs')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'herbs'
                  ? 'bg-[#15231C] text-[#C5A059] border border-[#2A3B31] shadow-sm'
                  : 'text-[#6B8E7B] hover:text-[#EFECE5] hover:bg-[#15231C]/60'
              }`}
            >
              <Leaf className="w-4 h-4" />
              <span>Herb Index</span>
            </button>

            <button
              onClick={() => setActiveTab('ailments')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'ailments'
                  ? 'bg-[#15231C] text-[#C5A059] border border-[#2A3B31] shadow-sm'
                  : 'text-[#6B8E7B] hover:text-[#EFECE5] hover:bg-[#15231C]/60'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Ailments</span>
            </button>

            <button
              onClick={() => setActiveTab('glossary')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'glossary'
                  ? 'bg-[#15231C] text-[#C5A059] border border-[#2A3B31] shadow-sm'
                  : 'text-[#6B8E7B] hover:text-[#EFECE5] hover:bg-[#15231C]/60'
              }`}
            >
              <BookMarked className="w-4 h-4" />
              <span>Glossary & Tools</span>
            </button>

            <button
              onClick={() => setActiveTab('community')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'community'
                  ? 'bg-[#15231C] text-[#C5A059] border border-[#2A3B31] shadow-sm'
                  : 'text-[#6B8E7B] hover:text-[#EFECE5] hover:bg-[#15231C]/60'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Community</span>
            </button>

            <button
              onClick={() => setActiveTab('sources')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'sources'
                  ? 'bg-[#15231C] text-[#C5A059] border border-[#2A3B31] shadow-sm'
                  : 'text-[#6B8E7B] hover:text-[#EFECE5] hover:bg-[#15231C]/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Sources</span>
            </button>
          </nav>

          {/* Architecture & Metrics Badges */}
          <div className="flex items-center gap-2.5">
            {onOpenArchitectureModal && (
              <button
                onClick={onOpenArchitectureModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15231C] border border-[#C5A059]/40 text-xs text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0B130E] transition-all font-mono font-semibold"
                title="View Full Stack Architecture & Database Specs"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Stack & DB</span>
              </button>
            )}

            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#15231C] border border-[#2A3B31] text-xs text-[#6B8E7B]">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
              <span><b className="text-[#EFECE5]">{totalEntriesCount}</b> verified remedies</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-2 border-t border-[#2A3B31] scrollbar-none">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-3 py-1.5 rounded text-xs whitespace-nowrap ${
              activeTab === 'search' ? 'bg-[#C5A059] text-[#0B130E] font-semibold' : 'text-[#6B8E7B] bg-[#15231C]'
            }`}
          >
            Search
          </button>
          <button
            onClick={() => setActiveTab('codex')}
            className={`px-3 py-1.5 rounded text-xs whitespace-nowrap ${
              activeTab === 'codex' ? 'bg-[#C5A059] text-[#0B130E] font-semibold' : 'text-[#6B8E7B] bg-[#15231C]'
            }`}
          >
            Codex
          </button>
          <button
            onClick={() => setActiveTab('herbs')}
            className={`px-3 py-1.5 rounded text-xs whitespace-nowrap ${
              activeTab === 'herbs' ? 'bg-[#C5A059] text-[#0B130E] font-semibold' : 'text-[#6B8E7B] bg-[#15231C]'
            }`}
          >
            Herbs
          </button>
          <button
            onClick={() => setActiveTab('ailments')}
            className={`px-3 py-1.5 rounded text-xs whitespace-nowrap ${
              activeTab === 'ailments' ? 'bg-[#C5A059] text-[#0B130E] font-semibold' : 'text-[#6B8E7B] bg-[#15231C]'
            }`}
          >
            Ailments
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-3 py-1.5 rounded text-xs whitespace-nowrap ${
              activeTab === 'glossary' ? 'bg-[#C5A059] text-[#0B130E] font-semibold' : 'text-[#6B8E7B] bg-[#15231C]'
            }`}
          >
            Glossary & Tools
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`px-3 py-1.5 rounded text-xs whitespace-nowrap ${
              activeTab === 'community' ? 'bg-[#C5A059] text-[#0B130E] font-semibold' : 'text-[#6B8E7B] bg-[#15231C]'
            }`}
          >
            Community
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-3 py-1.5 rounded text-xs whitespace-nowrap ${
              activeTab === 'sources' ? 'bg-[#C5A059] text-[#0B130E] font-semibold' : 'text-[#6B8E7B] bg-[#15231C]'
            }`}
          >
            Manuscripts
          </button>
        </div>
      </div>
    </header>
  );
};

