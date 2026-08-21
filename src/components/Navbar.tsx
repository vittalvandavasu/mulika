import React from 'react';
import { BookOpen, Search, Leaf, Stethoscope, BookMarked, MessageSquare, Layers, ScrollText, Sparkles, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  totalEntriesCount: number;
  onOpenArchitectureModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, totalEntriesCount, onOpenArchitectureModal }) => {
  const navItems = [
    { id: 'search', label: 'Search', icon: Search, badge: null },
    { id: 'codex', label: 'Codex Reader', icon: ScrollText, badge: '4 Texts' },
    { id: 'herbs', label: 'Herb Index', icon: Leaf, badge: '24' },
    { id: 'ailments', label: 'Ailments', icon: Stethoscope, badge: null },
    { id: 'glossary', label: 'Lexicon & Tools', icon: BookMarked, badge: null },
    { id: 'community', label: 'Community', icon: MessageSquare, badge: null },
    { id: 'sources', label: 'Sources', icon: BookOpen, badge: null },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B130E]/95 backdrop-blur-lg border-b border-[#24352B] shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo & Title */}
          <div 
            onClick={() => setActiveTab('search')} 
            className="flex items-center gap-3.5 cursor-pointer group select-none py-1"
          >
            {/* Logo Emblem */}
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#997929] p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[#0F1A15] rounded-[10px] flex items-center justify-center text-[#D4AF37]">
                  <Leaf className="w-5 h-5 transition-transform group-hover:rotate-12 duration-300" />
                </div>
              </div>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37]"></span>
              </span>
            </div>

            {/* Brand Names */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#EFECE5] group-hover:text-[#D4AF37] transition-colors">
                  Mulika
                </span>
                <span className="text-xs font-semibold text-[#D4AF37] font-serif tracking-normal">
                  మూలిక
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-[#7D9F8D] uppercase font-mono hidden sm:block">
                Classical Telugu Ayurvedic Codex
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#121E18] p-1.5 rounded-xl border border-[#24352B]/80 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38F2E] text-[#0B130E] shadow-md font-bold'
                      : 'text-[#8EA89A] hover:text-[#EFECE5] hover:bg-[#182820]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0B130E]' : 'text-[#8EA89A]'}`} />
                  <span>{item.label}</span>
                  {item.badge && !isActive && (
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-[#182820] text-[#D4AF37] border border-[#24352B]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Group: Architecture Modal & Verified Counter */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onOpenArchitectureModal && (
              <button
                onClick={onOpenArchitectureModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14231B] border border-[#D4AF37]/30 text-xs text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B130E] hover:border-[#D4AF37] transition-all font-mono font-medium shadow-sm active:scale-95"
                title="View Full Stack Architecture & Database Specs"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Stack & DB</span>
              </button>
            )}

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#121E18] border border-[#24352B] text-xs text-[#7D9F8D]">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="font-mono text-[11px]">
                <strong className="text-[#EFECE5]">{totalEntriesCount}</strong> Formulations
              </span>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 gap-1.5 border-t border-[#24352B]/80 scrollbar-none items-center -mx-4 px-4 sm:mx-0 sm:px-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#0B130E] shadow'
                    : 'text-[#8EA89A] bg-[#121E18] border border-[#24352B]/60 hover:text-[#EFECE5]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
