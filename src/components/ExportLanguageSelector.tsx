import React from 'react';
import { Globe } from 'lucide-react';

export type ExportLanguage = 'ar' | 'en' | 'ur';

interface ExportLanguageSelectorProps {
  currentLang: ExportLanguage;
  onChange: (lang: ExportLanguage) => void;
  className?: string;
  isRtl?: boolean;
}

export const ExportLanguageSelector: React.FC<ExportLanguageSelectorProps> = ({
  currentLang,
  onChange,
  className = '',
  isRtl = false
}) => {
  const languages: { code: ExportLanguage; label: string; flag: string; nativeName: string }[] = [
    { code: 'ar', label: 'العربية', flag: '🇸🇦', nativeName: 'Arabic' },
    { code: 'en', label: 'English', flag: '🇬🇧', nativeName: 'English' },
    { code: 'ur', label: 'اردو', flag: '🇵🇰', nativeName: 'Urdu' }
  ];

  return (
    <div className={`flex items-center gap-1 p-1 bg-[#13110d] rounded-2xl border border-[#d4af35]/40 shadow-inner ${className}`}>
      <div className="flex items-center gap-1.5 px-2.5 py-1 text-slate-400">
        <Globe className="w-3.5 h-3.5 text-[#f1d57f]" />
        <span className="text-[10px] font-bold tracking-wider uppercase hidden sm:inline text-slate-300">
          {currentLang === 'ar' ? 'لغة التصدير' : currentLang === 'ur' ? 'برآمدی زبان' : 'Export Lang'}:
        </span>
      </div>

      <div className="flex items-center gap-1">
        {languages.map((lang) => {
          const isActive = currentLang === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onChange(lang.code)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#f5d77f] to-[#d4af35] text-black shadow-[0_2px_8px_rgba(212,175,53,0.35)] scale-100 font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-[#221c12] active:scale-95'
              }`}
              title={`Switch report export language to ${lang.nativeName}`}
            >
              <span className="text-xs leading-none">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
