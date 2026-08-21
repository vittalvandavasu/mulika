import React from 'react';
import { Leaf, ShieldAlert } from 'lucide-react';

interface FooterProps {
  totalVerifiedPages: number;
  totalCatalogPages: number;
}

export const Footer: React.FC<FooterProps> = ({
  totalVerifiedPages = 18,
  totalCatalogPages = 144
}) => {
  const percentage = Math.round((totalVerifiedPages / totalCatalogPages) * 100);

  return (
    <footer className="mt-16 bg-[#0B130E] border-t border-[#2A3B31]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Main row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C5A059] flex items-center justify-center text-[#0B130E]">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-[#C5A059]">Mulika • మూలిక</span>
              <p className="text-[11px] uppercase tracking-wider text-[#6B8E7B] font-mono">
                Authentic Ayurvedic Manuscript Index
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-48 h-2 bg-[#15231C] rounded-full overflow-hidden border border-[#2A3B31]">
                <div
                  className="h-full bg-[#C5A059] rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="font-mono font-bold text-[#6B8E7B]">
                {totalVerifiedPages} of {totalCatalogPages} Pages ({percentage}%)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#4A6355]">
            <span>Telugu OCR + Human Eye Verified</span>
            <span>•</span>
            <span>v1.2-Live</span>
          </div>
        </div>

        {/* Medical disclaimer note */}
        <div className="pt-4 border-t border-[#2A3B31]/60 text-center text-xs text-[#6B8E7B] max-w-4xl mx-auto leading-relaxed">
          <p>
            <b className="text-[#EFECE5]">Medical Disclaimer: </b>
            Mulika is an academic and cultural preservation platform indexing historical Telugu Ayurvedic medical texts. All formulations, preparation notes, and pharmacological cross-references are provided strictly for educational and historical study. They are not intended to diagnose, treat, cure, or prevent any disease. Always seek the advice of a qualified and registered Ayurvedic physician (BAMS/MD) or healthcare provider.
          </p>
        </div>
      </div>
    </footer>
  );
};
