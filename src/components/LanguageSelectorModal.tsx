import React, { useState } from 'react';
import { ALL_LANGUAGES } from '../data/languages';
import { LanguageItem } from '../types';
import { Search, X, Globe, Check, Sparkles } from 'lucide-react';
import { getTranslation } from '../data/translations';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageItem;
  onSelectLanguage: (lang: LanguageItem) => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const t = getTranslation(currentLanguage.code);

  if (!isOpen) return null;

  const filteredLanguages = ALL_LANGUAGES.filter((l) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      l.name.toLowerCase().includes(q) ||
      l.nativeName.toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q)
    );
  });

  const featuredCodes = ['ar', 'ur', 'en', 'hi', 'fa', 'bn', 'tr', 'fr', 'es', 'de', 'zh', 'ru'];
  const featuredLanguages = ALL_LANGUAGES.filter((l) => featuredCodes.includes(l.code));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] bg-[#111113] border border-[#d4af35]/40 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(212,175,53,0.3)] flex flex-col overflow-hidden text-slate-100"
        dir={currentLanguage.dir}
      >
        {/* Modal Header with 3D depth */}
        <div className="p-5 border-b border-[#2b2413] bg-gradient-to-r from-[#17140c] via-[#1f1a0e] to-[#17140c] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#d4af35] to-[#735311] p-[1.5px] shadow-lg shadow-[#d4af35]/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#14120a] rounded-[14px] flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#f1d57f]" />
              </div>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>100+ Global Languages</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#d4af35]/20 text-[#f1d57f] border border-[#d4af35]/30">
                  {ALL_LANGUAGES.length} Languages Available
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {currentLanguage.dir === 'rtl' 
                  ? 'اختر لغة المنصة وسينتقل اتجاه الواجهة (RTL / LTR) والقوائم تلقائياً' 
                  : 'Select system language. Interface orientation (RTL / LTR) switches automatically.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#1b1912] hover:bg-[#282315] border border-[#3b3117] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#231d10] bg-[#141312]">
          <div className="relative">
            <Search className={`w-4 h-4 text-[#d4af35] absolute top-1/2 -translate-y-1/2 ${
              currentLanguage.dir === 'rtl' ? 'right-3.5' : 'left-3.5'
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchLanguage || 'Search from 100+ languages...'}
              className={`w-full bg-[#0b0a08] border border-[#3b3017] focus:border-[#d4af35] rounded-2xl py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all shadow-inner ${
                currentLanguage.dir === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'
              }`}
            />
          </div>

          {/* Quick Select Popular Tags */}
          {!searchQuery && (
            <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              <span className="text-[11px] text-slate-400 font-semibold shrink-0 me-1">
                Featured:
              </span>
              {featuredLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onSelectLanguage(lang);
                    onClose();
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    currentLanguage.code === lang.code
                      ? 'bg-[#d4af35] text-black font-bold shadow-md shadow-[#d4af35]/30'
                      : 'bg-[#1e1b13] hover:bg-[#2e2714] text-slate-300 border border-[#3a2f14]'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Languages Scroll List */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[50vh]">
          {filteredLanguages.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-slate-500 text-xs">
              No matching languages found for "{searchQuery}".
            </div>
          ) : (
            filteredLanguages.map((lang) => {
              const isSelected = currentLanguage.code === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    onSelectLanguage(lang);
                    onClose();
                  }}
                  className={`p-3 rounded-2xl border text-start flex items-center justify-between transition-all group ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#2a220f] to-[#1c180e] border-[#d4af35] shadow-lg shadow-[#d4af35]/15'
                      : 'bg-[#151412] hover:bg-[#1f1c14] border-[#292212] hover:border-[#4d3d19]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl shrink-0 p-1.5 rounded-xl bg-[#1b1912] border border-[#342a15]">
                      {lang.flag}
                    </span>
                    <div>
                      <div className="font-bold text-xs text-white group-hover:text-[#f1d57f] flex items-center gap-1.5">
                        <span>{lang.nativeName}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({lang.name})</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5 flex items-center gap-2">
                        <span className="uppercase">{lang.code}</span>
                        <span>•</span>
                        <span className="text-[#a68228] uppercase">{lang.dir.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#d4af35] text-black flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-[#251e10] bg-[#14120c] flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af35]" />
            <span>Instant RTL/LTR layout sync for all 100+ languages</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#221c0e] hover:bg-[#312711] text-[#f1d57f] border border-[#443615] font-bold text-xs transition-colors"
          >
            {t.cancel || 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
