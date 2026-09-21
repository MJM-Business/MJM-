import React, { useState, useRef, useEffect } from 'react';
import { AppScreen, UserRole, LanguageItem } from '../types';
import { ALL_LANGUAGES } from '../data/languages';
import { getLandingContent } from '../data/landingTranslations';
import { 
  Briefcase, 
  Plane, 
  FolderLock, 
  Cpu, 
  Bot, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  Check,
  Search,
  Layers,
  Play,
  X
} from 'lucide-react';

interface LandingScreenProps {
  onNavigate: (screen: AppScreen) => void;
  language: string;
  currentLanguage?: LanguageItem;
  onSelectRole?: (role: UserRole) => void;
  onOpenLanguageModal?: () => void;
  onSelectLanguage?: (lang: LanguageItem) => void;
  onToggleLanguage?: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ 
  onNavigate, 
  language, 
  currentLanguage,
  onSelectRole,
  onOpenLanguageModal,
  onSelectLanguage,
  onToggleLanguage
}) => {
  const currentLangItem = currentLanguage || ALL_LANGUAGES.find(l => l.code === language) || ALL_LANGUAGES[0];
  const isRTL = currentLangItem.dir === 'rtl';
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const content = getLandingContent(language);

  // State for interactive features
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [aiQuery, setAiQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAiAnswering, setIsAiAnswering] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [demoVideoOpen, setDemoVideoOpen] = useState(false);

  // Language Dropdown state
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [langSearch, setLangSearch] = useState('');
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLangs = ALL_LANGUAGES.filter(l => 
    l.name.toLowerCase().includes(langSearch.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(langSearch.toLowerCase()) ||
    l.code.toLowerCase().includes(langSearch.toLowerCase())
  );

  const handleSelectLang = (lang: LanguageItem) => {
    setIsLangDropdownOpen(false);
    setLangSearch('');
    if (onSelectLanguage) {
      onSelectLanguage(lang);
    } else {
      onOpenLanguageModal?.();
    }
  };

  const handleAskAi = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiQuery.trim()) return;

    setIsAiAnswering(true);
    setTimeout(() => {
      setAiAnswer(
        isRTL
          ? `${content.aiAnswerPrefix}: تحليلاً لاستفسارك عن "${aiQuery}" — توفر منظومة MJM معالجة أوتوماتيكية بنسبة 99.4% مع تقارير تدقيق سيادية مشفرة تضمن خفض زمن التشغيل بنسبة 45% وتوافق تام مع المعايير الحكومية والمالية.`
          : `${content.aiAnswerPrefix}: Regarding "${aiQuery}" — MJM provides 99.4% automated processing with sovereign encrypted audit reports, ensuring a 45% reduction in operational turnaround.`
      );
      setIsAiAnswering(false);
    }, 600);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSent(true);
      setTimeout(() => setNewsletterSent(false), 4000);
      setNewsletterEmail('');
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      dir={currentLangItem.dir}
      className="w-full min-h-screen bg-[#070605] text-[#e8eaed] font-sans selection:bg-[#d4af35] selection:text-black overflow-x-hidden"
    >
      
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR                                                             */}
      {/* ========================================================================= */}
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between sticky top-0 z-40 bg-[#070605]/95 backdrop-blur-md border-b border-[#1f1a10]">
        
        {/* Left Side: "ابدأ الآن" CTA & 100+ Global Languages Switcher Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('signup')}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#e5be47] via-[#d4af35] to-[#ba9324] hover:brightness-110 active:scale-95 text-black font-extrabold text-xs sm:text-sm shadow-md shadow-[#d4af35]/25 transition-all cursor-pointer"
          >
            {content.getStarted}
          </button>

          {/* 100+ Language Switcher Interactive Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="px-3.5 py-1.5 rounded-full border border-[#4d3d19] bg-gradient-to-r from-[#17130c] via-[#221b0f] to-[#17130c] hover:border-[#d4af35] hover:shadow-[0_0_15px_rgba(212,175,53,0.3)] text-xs font-bold text-[#f5db8b] flex items-center gap-1.5 transition-all cursor-pointer group"
              aria-expanded={isLangDropdownOpen}
              title="100+ Global Languages - Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#d4af35] group-hover:rotate-12 transition-transform" />
              <span className="text-sm leading-none">{currentLangItem.flag}</span>
              <span className="tracking-wide text-xs font-bold max-w-[90px] sm:max-w-none truncate">
                {currentLangItem.nativeName}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#d4af35] transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Floating 100+ Languages Popover */}
            {isLangDropdownOpen && (
              <div 
                className="absolute top-full mt-2 w-80 sm:w-96 max-h-[480px] bg-[#0d0b07] border border-[#d4af35]/60 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(212,175,53,0.2)] z-50 flex flex-col overflow-hidden backdrop-blur-2xl animate-fadeIn"
                style={{
                  [isRTL ? 'right' : 'left']: 0,
                }}
              >
                {/* Header */}
                <div className="p-3.5 border-b border-[#2a2211] bg-gradient-to-r from-[#1c160c] via-[#261d0f] to-[#1c160c] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#d4af35]" />
                    <span className="text-xs font-bold text-white tracking-wide">
                      {isRTL ? 'اختر لغة النظام' : 'Select System Language'}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#d4af35]/20 text-[#f5db8b] border border-[#d4af35]/40 font-mono font-bold">
                      100+
                    </span>
                  </div>
                  <button 
                    onClick={() => setIsLangDropdownOpen(false)}
                    className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Instant Search Bar */}
                <div className="p-2.5 border-b border-[#211a0f] bg-[#14100a]">
                  <div className="relative">
                    <Search className={`w-3.5 h-3.5 text-[#d4af35] absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <input 
                      type="text"
                      value={langSearch}
                      onChange={(e) => setLangSearch(e.target.value)}
                      placeholder={isRTL ? 'ابحث عن لغة (Urdu, Hindi, French, বাংলা...)' : 'Search language (Urdu, Hindi, French, Bengali...)'}
                      className={`w-full bg-[#090805] border border-[#382c12] focus:border-[#d4af35] rounded-xl py-1.5 text-xs text-white placeholder-slate-500 outline-none transition-all ${isRTL ? 'pr-8 pl-3' : 'pl-8 pr-3'}`}
                      autoFocus
                    />
                  </div>
                </div>

                {/* Featured / Most Requested Languages Strip */}
                {!langSearch && (
                  <div className="p-2.5 border-b border-[#211a0f] bg-[#0e0c08]">
                    <div className="text-[10px] text-[#e5c158] font-semibold mb-1.5 px-1 flex items-center justify-between">
                      <span>{isRTL ? 'اللغات الشائعة والمطلوبة:' : 'Featured & Requested:'}</span>
                      <span className="text-[9px] text-slate-400">{isRTL ? 'تحويل فوري' : 'Instant Switch'}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { code: 'ur', name: 'اردو (Urdu)', flag: '🇵🇰' },
                        { code: 'ar', name: 'العربية (Arabic)', flag: '🇸🇦' },
                        { code: 'en', name: 'English', flag: '🇬🇧' },
                        { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
                        { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇧🇩' },
                        { code: 'fr', name: 'Français (French)', flag: '🇫🇷' },
                      ].map(f => {
                        const isSelected = language === f.code;
                        const langObj = ALL_LANGUAGES.find(l => l.code === f.code) || ALL_LANGUAGES[0];
                        return (
                          <button
                            key={f.code}
                            onClick={() => handleSelectLang(langObj)}
                            className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all border cursor-pointer ${
                              isSelected 
                                ? 'bg-[#d4af35]/30 border-[#d4af35] text-[#fff2c6] shadow-sm'
                                : 'bg-[#18130a] border-[#2e230e] hover:border-[#d4af35]/60 text-slate-200 hover:text-white'
                            }`}
                          >
                            <span>{f.flag}</span>
                            <span className="truncate">{f.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Scrollable list of 100+ Languages */}
                <div className="flex-1 overflow-y-auto max-h-56 p-1.5 space-y-1 divide-y divide-[#1f180c]/40">
                  {filteredLangs.map((l) => {
                    const isSelected = language === l.code;
                    return (
                      <button
                        key={l.code}
                        onClick={() => handleSelectLang(l)}
                        className={`w-full px-2.5 py-2 rounded-xl flex items-center justify-between transition-colors text-xs text-left cursor-pointer ${
                          isSelected 
                            ? 'bg-[#d4af35]/20 text-[#f5db8b] font-bold border border-[#d4af35]/40' 
                            : 'hover:bg-[#1a140b] text-slate-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{l.flag}</span>
                          <div className="flex flex-col text-left">
                            <span className="font-bold text-slate-100">{l.nativeName}</span>
                            <span className="text-[10px] text-slate-400">{l.name}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#141008] border border-[#2a210d] text-slate-400 uppercase">
                            {l.dir}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[#d4af35]" />}
                        </div>
                      </button>
                    );
                  })}
                  {filteredLangs.length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-500">
                      {isRTL ? 'لم يتم العثور على لغة مطابقة' : 'No matching language found'}
                    </div>
                  )}
                </div>

                {/* Bottom Full Modal Trigger */}
                <div className="p-2 border-t border-[#231b0e] bg-[#120e08]">
                  <button
                    onClick={() => {
                      setIsLangDropdownOpen(false);
                      onOpenLanguageModal?.();
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-[#1b150c] hover:bg-[#251d10] border border-[#3d2f13] text-[11px] font-semibold text-[#e5c158] hover:text-[#fff2c6] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af35]" />
                    <span>{isRTL ? 'عرض نافذة البحث الشاملة (100+ لغة)' : 'Open Full 100+ Languages Modal'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-xs sm:text-sm text-slate-300 font-medium">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-[#d4af35] transition-colors cursor-pointer"
          >
            {content.home}
          </button>
          <button 
            onClick={() => scrollToSection('solutions')}
            className="hover:text-[#d4af35] transition-colors cursor-pointer"
          >
            {content.features}
          </button>
          <button 
            onClick={() => scrollToSection('ai-section')}
            className="hover:text-[#d4af35] transition-colors cursor-pointer"
          >
            {content.ai}
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')}
            className="hover:text-[#d4af35] transition-colors cursor-pointer"
          >
            {content.reviews}
          </button>
          <button 
            onClick={() => scrollToSection('faq-section')}
            className="hover:text-[#d4af35] transition-colors cursor-pointer"
          >
            {content.faq}
          </button>
          <button 
            onClick={() => onNavigate('login')}
            className="hover:text-[#d4af35] text-amber-200/90 font-bold transition-colors cursor-pointer"
          >
            {content.signIn}
          </button>
        </div>

        {/* Right Side: MJM Brand Logo in Luxury Serif */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <span className="text-2xl sm:text-3xl font-serif font-black tracking-wider text-[#d4af35] group-hover:text-[#f3d57a] transition-colors drop-shadow-[0_2px_10px_rgba(212,175,53,0.3)]">
            MJM
          </span>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-20 lg:pt-16 lg:pb-28">
        
        {/* Soft Golden Ambient Glow Background */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#d4af35]/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#c59828]/5 rounded-full blur-[160px] pointer-events-none"></div>

        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10 [direction:ltr]">
          
          {/* Visual Column (Executive Tablet 3D Mockup) - Physical LEFT side on Desktop */}
          <div className="w-full lg:col-span-6 flex justify-center relative select-none">
            
            {/* Ambient Golden Halo behind the 3D tablet */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#d4af35]/25 via-[#f5db8b]/10 to-transparent rounded-[40px] blur-3xl opacity-60 pointer-events-none transform rotate-3 scale-95"></div>

            {/* Tablet 3D Perspective Stage Container */}
            <div 
              className="relative w-full max-w-[540px] group"
              style={{ perspective: '1400px' }}
            >
              
              {/* 3D Angled Tablet Body with realistic depth and hover response (tilted inward towards center) */}
              <div 
                className="relative rounded-[32px] p-[3px] bg-gradient-to-b from-[#5a461d] via-[#241c0f] to-[#120e08] shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(212,175,53,0.18),inset_0_1px_2px_rgba(255,240,180,0.4)] transition-all duration-700 ease-out group-hover:[transform:rotateX(2deg)_rotateY(2deg)_translateY(-6px)]"
                style={{
                  transform: 'rotateX(5deg) rotateY(7deg) rotateZ(0.5deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Outer Metallic Bezel Shadow & Chamfer */}
                <div className="rounded-[29px] bg-[#16120b] p-3 sm:p-4 border border-[#3d3016] relative shadow-inner">
                  
                  {/* Subtle Top Bezel Camera Dot */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0a0805] border border-[#2e230f] flex items-center justify-center pointer-events-none">
                    <div className="w-1 h-1 rounded-full bg-[#1e293b]/80"></div>
                  </div>

                  {/* Tablet Glass Screen */}
                  <div className="rounded-[22px] bg-gradient-to-b from-[#0e0c08] via-[#090805] to-[#0d0a06] p-3.5 sm:p-4 border border-[#2c2211] relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.9)]">
                    
                    {/* Glossy Diagonal Glass Glare Reflection */}
                    <div className="absolute -top-16 -left-20 w-[140%] h-48 bg-gradient-to-b from-white/[0.07] via-white/[0.015] to-transparent transform -rotate-12 pointer-events-none"></div>

                    {/* Clean Executive Header */}
                    <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-[#221a0f] text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#d4af35] shadow-[0_0_8px_rgba(212,175,53,0.8)] animate-pulse"></div>
                        <span className="font-bold text-[#f7e49c] tracking-wide text-xs">
                          {content.executiveOperations}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1c160c] border border-[#3e3016] text-[10px] text-[#e5c158] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          {content.encryptedLive}
                        </span>
                      </div>
                    </div>

                    {/* Tablet Visual Interface */}
                    <div className="space-y-3.5">
                      
                      {/* Main Charts Row */}
                      <div className="grid grid-cols-12 gap-3 items-stretch">
                        
                        {/* Vertical Golden Glowing Bar Chart */}
                        <div className="col-span-8 bg-[#120e09]/90 backdrop-blur-sm rounded-xl p-3 border border-[#292012] flex flex-col justify-between">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] text-slate-300 font-medium">
                              {content.workflowFlow}
                            </span>
                            <span className="text-xs font-black text-[#f3d57a] font-mono tracking-tight">
                              98.6%
                            </span>
                          </div>
                          
                          {/* Bars with luminous gold gradient & glow */}
                          <div className="h-28 flex items-end justify-between gap-1.5 sm:gap-2 px-1 pb-1">
                            {[42, 60, 48, 88, 98, 76, 92, 70, 95].map((height, i) => (
                              <div key={i} className="flex-1 flex flex-col items-center gap-1 group/bar">
                                <div 
                                  style={{ height: `${height}%` }}
                                  className="w-full rounded-t-md bg-gradient-to-t from-[#6a4f12] via-[#d4af35] to-[#fff1be] shadow-[0_0_10px_rgba(212,175,53,0.5)] transition-all duration-300 group-hover/bar:brightness-125"
                                ></div>
                                <span className="text-[8px] text-slate-400 font-mono font-medium">W{i+1}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Speedometer Radial Gauge */}
                        <div className="col-span-4 bg-[#120e09]/90 backdrop-blur-sm rounded-xl p-3 border border-[#292012] flex flex-col items-center justify-center text-center">
                          <div className="text-[10px] text-slate-300 font-medium mb-1.5">
                            {content.kpiIndex}
                          </div>
                          
                          {/* Radial Speedometer Dial */}
                          <div className="relative w-18 h-18 sm:w-20 sm:h-20 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                              <path
                                className="text-[#20180e]"
                                strokeWidth="3.2"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path
                                className="text-[#d4af35]"
                                strokeDasharray="88, 100"
                                strokeWidth="3.2"
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="none"
                                style={{ filter: 'drop-shadow(0 0 6px rgba(212,175,53,0.7))' }}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-sm font-black text-[#fbf0c8] font-mono tracking-tight">98.4%</span>
                              <span className="text-[7px] text-emerald-400 font-black tracking-wider">OPTIMAL</span>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Bottom Status Metric Tiles */}
                      <div className="grid grid-cols-3 gap-2.5 text-center">
                        <div className="p-2.5 rounded-xl bg-[#130f0a] border border-[#261e11] shadow-sm">
                          <div className="text-[10px] text-slate-400 mb-0.5">{content.transactions}</div>
                          <div className="text-xs sm:text-sm font-black text-white font-mono">1.8M/s</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#130f0a] border border-[#261e11] shadow-sm">
                          <div className="text-[10px] text-slate-400 mb-0.5">{content.automation}</div>
                          <div className="text-xs sm:text-sm font-black text-[#f1d57f] font-mono">99.8%</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#130f0a] border border-[#261e11] shadow-sm">
                          <div className="text-[10px] text-slate-400 mb-0.5">{content.security}</div>
                          <div className="text-xs sm:text-sm font-black text-emerald-400 font-mono">AES-256</div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>

              {/* 3D Floating Productivity Badge */}
              <div 
                className="absolute -bottom-6 -right-2 sm:-right-5 p-3.5 sm:p-4 rounded-2xl bg-[#14100a]/95 backdrop-blur-md border border-[#4d3d19] shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,53,0.18)] flex items-center gap-3.5 z-30 max-w-[270px] transition-transform duration-500 group-hover:translate-y-[-4px]"
                style={{
                  transform: 'translateZ(30px)',
                }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#d4af35] via-[#f7e6a7] to-[#997415] p-0.5 shadow-lg shadow-[#d4af35]/40 shrink-0 flex items-center justify-center">
                  <div className="w-full h-full bg-[#0d0b07] rounded-full flex flex-col items-center justify-center">
                    <span className="text-xs font-black text-[#f1d57f] leading-none">+45%</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-black text-[#f1d57f] mb-0.5">
                    {content.productivity}
                  </div>
                  <p className="text-[10px] text-slate-300 leading-tight">
                    {content.productivityDesc}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Content Column - Physical RIGHT side on Desktop */}
          <div 
            dir={currentLangItem.dir}
            className="w-full lg:col-span-6 space-y-6"
          >
            
            {/* Top Sovereign Portal Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3e3215] bg-[#141009]/80 text-[#e5c158] text-xs font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#d4af35]"></span>
              <span>{content.sovereignPortals}</span>
            </div>

            {/* Big Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                {content.platformTitle}
              </h1>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#f7e6a7] via-[#d4af35] to-[#b3881c] tracking-tight leading-tight drop-shadow-[0_2px_15px_rgba(212,175,53,0.3)]">
                {content.smartBusiness}
              </h2>
            </div>

            {/* Subtitle Paragraph */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              {content.heroDesc}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('signup')}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-[#e5be47] via-[#d4af35] to-[#b89122] hover:brightness-110 active:scale-95 text-black font-extrabold text-sm sm:text-base shadow-[0_8px_25px_rgba(212,175,53,0.35)] transition-all cursor-pointer"
              >
                {content.startJourney}
              </button>

              <button
                onClick={() => setDemoVideoOpen(true)}
                className="px-6 py-3 rounded-full border border-[#3e3215] bg-[#110e09] hover:bg-[#1a140d] hover:border-[#d4af35] text-slate-200 hover:text-white font-bold text-sm sm:text-base transition-all cursor-pointer flex items-center gap-2"
              >
                <Play className="w-4 h-4 text-[#d4af35] fill-[#d4af35]" />
                <span>{content.watchDemo}</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION: Solutions Built for Excellence (4 Cards Grid)                 */}
      {/* ========================================================================= */}
      <section id="solutions" className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-16">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-12">
          <div className="text-xs font-bold text-[#d4af35] uppercase tracking-wider">
            {content.integratedPortals}
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {content.solutionsTitle}
          </h2>
          <div className="w-12 h-1 bg-[#d4af35] mx-auto rounded-full mt-2"></div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-[#0f0c08] border border-[#261e11] hover:border-[#d4af35]/60 transition-all hover:-translate-y-1 group shadow-lg shadow-black/60 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#1a140b] border border-[#3d3016] text-[#e5c158] flex items-center justify-center group-hover:border-[#d4af35] group-hover:bg-[#261d0f] transition-colors">
              <Briefcase className="w-6 h-6 text-[#d4af35]" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-white group-hover:text-[#f3d57a] transition-colors">
              {content.card1Title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {content.card1Desc}
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-[#0f0c08] border border-[#261e11] hover:border-[#d4af35]/60 transition-all hover:-translate-y-1 group shadow-lg shadow-black/60 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#1a140b] border border-[#3d3016] text-[#e5c158] flex items-center justify-center group-hover:border-[#d4af35] group-hover:bg-[#261d0f] transition-colors">
              <Plane className="w-6 h-6 text-[#d4af35]" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-white group-hover:text-[#f3d57a] transition-colors">
              {content.card2Title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {content.card2Desc}
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-[#0f0c08] border border-[#261e11] hover:border-[#d4af35]/60 transition-all hover:-translate-y-1 group shadow-lg shadow-black/60 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#1a140b] border border-[#3d3016] text-[#e5c158] flex items-center justify-center group-hover:border-[#d4af35] group-hover:bg-[#261d0f] transition-colors">
              <FolderLock className="w-6 h-6 text-[#d4af35]" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-white group-hover:text-[#f3d57a] transition-colors">
              {content.card3Title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {content.card3Desc}
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-[#0f0c08] border border-[#261e11] hover:border-[#d4af35]/60 transition-all hover:-translate-y-1 group shadow-lg shadow-black/60 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#1a140b] border border-[#3d3016] text-[#e5c158] flex items-center justify-center group-hover:border-[#d4af35] group-hover:bg-[#261d0f] transition-colors">
              <Cpu className="w-6 h-6 text-[#d4af35]" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-white group-hover:text-[#f3d57a] transition-colors">
              {content.card4Title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {content.card4Desc}
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION: AI Showcase                                                   */}
      {/* ========================================================================= */}
      <section id="ai-section" className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Content Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="text-xs font-bold text-[#d4af35] uppercase tracking-wider">
              {content.advancedTech}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {content.aiSectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {content.aiSectionDesc}
            </p>
            <div>
              <button 
                onClick={() => scrollToSection('faq-section')}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#d4af35] hover:text-[#f3d57a] transition-colors cursor-pointer group"
              >
                <span>{content.discoverMoreAi}</span>
                <Arrow className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </button>
            </div>
          </div>

          {/* Cards & Progress Showcase */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Top 2 Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: Assistant */}
              <div className="p-5 rounded-2xl bg-[#0d0a07] border border-[#261f12] space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1b150c] border border-[#3e3016] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-[#d4af35]" />
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {content.smartAssistant}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {content.smartAssistantDesc}
                </p>
              </div>

              {/* Card 2: Performance */}
              <div className="p-5 rounded-2xl bg-[#0d0a07] border border-[#261f12] space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1b150c] border border-[#3e3016] flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-[#d4af35]" />
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {content.performanceTracking}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {content.performanceTrackingDesc}
                </p>
              </div>

            </div>

            {/* Bottom Card: Analytics */}
            <div className="p-5 rounded-2xl bg-[#0d0a07] border border-[#261f12] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">
                  {content.dailyAiAnalytics}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1b150c] border border-[#4a3915] text-[10px] text-[#f1d57f] font-mono">
                  {content.live}
                </span>
              </div>

              {/* 3 Progress Bars */}
              <div className="space-y-2.5">
                <div className="space-y-1">
                  <div className="w-full h-2 rounded-full bg-[#18130a] overflow-hidden">
                    <div className="w-[94%] h-full rounded-full bg-gradient-to-r from-[#8c6c19] to-[#d4af35]"></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="w-full h-2 rounded-full bg-[#18130a] overflow-hidden">
                    <div className="w-[78%] h-full rounded-full bg-gradient-to-r from-[#8c6c19] to-[#d4af35]"></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="w-full h-2 rounded-full bg-[#18130a] overflow-hidden">
                    <div className="w-[88%] h-full rounded-full bg-gradient-to-r from-[#8c6c19] to-[#d4af35]"></div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SECTION: Security & Speed                                              */}
      {/* ========================================================================= */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: SECURE */}
          <div className="p-7 sm:p-8 rounded-3xl bg-[#0b0906] border border-[#261f13] relative overflow-hidden group hover:border-[#3d3016] transition-all shadow-xl shadow-black space-y-6">
            <div className="absolute top-4 left-6 text-3xl sm:text-4xl font-black italic tracking-widest text-[#1a150d] select-none font-mono pointer-events-none">
              SECURE
            </div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-[#1b150b] border border-[#3e3016] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#d4af35]" />
              </div>
              <h3 className="text-xl font-black text-white">
                {content.secureTitle}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed relative z-10">
              {content.secureDesc}
            </p>

            <div className="flex items-center gap-2 pt-2 relative z-10">
              <span className="px-3 py-1 rounded-lg bg-[#141009] border border-[#342711] text-[11px] font-mono text-[#e5c158]">
                AES-256
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#141009] border border-[#342711] text-[11px] font-mono text-[#e5c158]">
                TLS 1.3
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#141009] border border-[#342711] text-[11px] font-mono text-[#e5c158]">
                GDPR
              </span>
            </div>
          </div>

          {/* Card 2: FAST */}
          <div className="p-7 sm:p-8 rounded-3xl bg-[#0b0906] border border-[#261f13] relative overflow-hidden group hover:border-[#3d3016] transition-all shadow-xl shadow-black space-y-6">
            <div className="absolute top-4 left-6 text-3xl sm:text-4xl font-black italic tracking-widest text-[#1a150d] select-none font-mono pointer-events-none">
              FAST
            </div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-[#1b150b] border border-[#3e3016] flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#d4af35]" />
              </div>
              <h3 className="text-xl font-black text-white">
                {content.fastTitle}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed relative z-10">
              {content.fastDesc}
            </p>

            <div className="pt-2 relative z-10 space-y-1.5">
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>{content.responseLatency}</span>
                <span className="text-[#d4af35] font-bold">{content.latencyValue}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#181309] overflow-hidden">
                <div className="w-[85%] h-full rounded-full bg-gradient-to-r from-[#7a5c13] to-[#d4af35]"></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SECTION: Testimonials                                                  */}
      {/* ========================================================================= */}
      <section id="testimonials" className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-16">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-12">
          <div className="text-xs font-bold text-[#d4af35] uppercase tracking-wider">
            {content.clientTrust}
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {content.testimonialsTitle}
          </h2>
          <div className="w-12 h-1 bg-[#d4af35] mx-auto rounded-full mt-2"></div>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Review 1 */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0c0906] border border-[#241c10] hover:border-[#3d3016] transition-all shadow-lg shadow-black space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d4af35] text-[#d4af35]" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                {content.rev1Text}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-[#1e170c]">
              <div className="w-9 h-9 rounded-full bg-[#18130a] border border-[#3a2d13] flex items-center justify-center text-[#d4af35]">
                <Layers className="w-4 h-4 text-[#d4af35]" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">
                  {content.rev1Author}
                </div>
                <div className="text-[10px] text-slate-400">
                  {content.rev1Role}
                </div>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0c0906] border border-[#241c10] hover:border-[#3d3016] transition-all shadow-lg shadow-black space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d4af35] text-[#d4af35]" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                {content.rev2Text}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-[#1e170c]">
              <div className="w-9 h-9 rounded-full bg-[#18130a] border border-[#3a2d13] flex items-center justify-center text-[#d4af35]">
                <Layers className="w-4 h-4 text-[#d4af35]" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">
                  {content.rev2Author}
                </div>
                <div className="text-[10px] text-slate-400">
                  {content.rev2Role}
                </div>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0c0906] border border-[#241c10] hover:border-[#3d3016] transition-all shadow-lg shadow-black space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d4af35] text-[#d4af35]" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                {content.rev3Text}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-[#1e170c]">
              <div className="w-9 h-9 rounded-full bg-[#18130a] border border-[#3a2d13] flex items-center justify-center text-[#d4af35]">
                <Layers className="w-4 h-4 text-[#d4af35]" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">
                  {content.rev3Author}
                </div>
                <div className="text-[10px] text-slate-400">
                  {content.rev3Role}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SECTION: FAQ with AI Query Widget                                      */}
      {/* ========================================================================= */}
      <section id="faq-section" className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-16 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="text-xs font-bold text-[#d4af35] uppercase tracking-wider">
            {content.faqBadge}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {content.faqTitle}
          </h2>
          <div className="w-12 h-1 bg-[#d4af35] mx-auto rounded-full mt-2"></div>
        </div>

        {/* Ask AI Widget */}
        <form 
          onSubmit={handleAskAi}
          className="p-4 sm:p-5 rounded-3xl bg-[#0c0906] border border-[#2e2311] shadow-2xl space-y-3"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-[#e5c158]">
            <Bot className="w-4 h-4 text-[#d4af35]" />
            <span>{content.askAiTitle}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <input 
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder={content.askAiPlaceholder}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#141009] border border-[#382b13] focus:border-[#d4af35] outline-none text-xs sm:text-sm text-white placeholder-slate-500 transition-all"
            />
            <button
              type="submit"
              disabled={isAiAnswering || !aiQuery.trim()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e5be47] to-[#d4af35] text-black font-extrabold text-xs sm:text-sm hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer shadow-md flex items-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAiAnswering ? '...' : content.askAiButton}</span>
            </button>
          </div>

          {/* AI Response Card */}
          {aiAnswer && (
            <div className="mt-3 p-4 rounded-2xl bg-[#141009] border border-[#d4af35]/50 text-xs sm:text-sm text-slate-200 shadow-xl space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between text-[#f1d57f] font-bold text-xs">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#d4af35]" />
                  {content.instantAiResponse}
                </span>
                <button onClick={() => setAiAnswer(null)} className="text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="leading-relaxed text-slate-300">{aiAnswer}</p>
            </div>
          )}
        </form>

        {/* 4 Accordion FAQs */}
        <div className="space-y-3">
          {content.faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-[#0c0906] border border-[#241c10] hover:border-[#3b2e15] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left rtl:text-right cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-200">
                    {faq.q}
                  </span>
                  <div className="p-1 rounded-lg text-[#d4af35] shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-[#1c160c] pt-3 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 8. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-8 border-t border-[#1c160c]">
        
        {/* 4 Columns Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand & Social */}
          <div className="space-y-4">
            <span className="text-2xl sm:text-3xl font-serif font-black tracking-wider text-[#d4af35] drop-shadow-[0_2px_10px_rgba(212,175,53,0.3)]">
              MJM
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              {content.footerAbout}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a 
                href="#twitter" 
                title="X (Twitter)"
                className="w-8 h-8 rounded-lg bg-[#141009] border border-[#342711] hover:border-[#d4af35] flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                <span className="text-xs font-bold font-mono">𝕏</span>
              </a>
              <a 
                href="#linkedin" 
                title="LinkedIn"
                className="w-8 h-8 rounded-lg bg-[#141009] border border-[#342711] hover:border-[#d4af35] flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                <span className="text-xs font-bold font-mono">in</span>
              </a>
              <a 
                href="#instagram" 
                title="Instagram"
                className="w-8 h-8 rounded-lg bg-[#141009] border border-[#342711] hover:border-[#d4af35] flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                <span className="text-xs font-bold font-mono">ig</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">
              {content.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#d4af35] transition-colors cursor-pointer">
                  {content.linkAbout}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('solutions')} className="hover:text-[#d4af35] transition-colors cursor-pointer">
                  {content.linkServices}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-[#d4af35] transition-colors cursor-pointer">
                  {content.linkDashboard}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('signup')} className="hover:text-[#d4af35] transition-colors cursor-pointer">
                  {content.linkRegister}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Technical Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">
              {content.supportTitle}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollToSection('faq-section')} className="hover:text-[#d4af35] transition-colors cursor-pointer">
                  {content.linkHelp}
                </button>
              </li>
              <li>
                <a href="mailto:businessmjm76@gmail.com" className="hover:text-[#d4af35] transition-colors">
                  {content.linkContact}
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-[#d4af35] transition-colors">
                  {content.linkPrivacy}
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-[#d4af35] transition-colors">
                  {content.linkTerms}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">
              {content.newsletterTitle}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {content.newsletterDesc}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex items-center gap-1.5">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={content.newsletterPlaceholder}
                  className="w-full px-3 py-2 rounded-xl bg-[#0d0a07] border border-[#342711] text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#d4af35]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#e5be47] to-[#d4af35] text-black font-extrabold text-xs shrink-0 hover:brightness-110 cursor-pointer shadow-sm"
                >
                  {content.newsletterButton}
                </button>
              </div>
              {newsletterSent && (
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{content.newsletterSuccess}</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-[#1c160c] pt-6 text-center text-xs text-slate-500">
          <p>© 2024 MJM Smart Business Platform. {content.copyright}</p>
        </div>

      </footer>

      {/* Interactive Watch Demo Modal */}
      {demoVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0c0906] border border-[#d4af35]/50 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#241c10] pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Play className="w-4 h-4 text-[#d4af35]" />
                <span>{content.watchDemo}</span>
              </div>
              <button 
                onClick={() => setDemoVideoOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1a140b] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Visual Demo Player Preview */}
            <div className="aspect-video w-full rounded-2xl bg-[#141009] border border-[#2e2311] flex flex-col items-center justify-center text-center p-6 space-y-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af35]/10 to-transparent"></div>
              <div className="w-16 h-16 rounded-full bg-[#d4af35] flex items-center justify-center shadow-lg shadow-[#d4af35]/30 relative z-10">
                <Play className="w-8 h-8 text-black fill-black translate-x-0.5" />
              </div>
              <div className="relative z-10 space-y-1">
                <h4 className="text-sm font-bold text-white">MJM Autonomous ERP Operational Tour</h4>
                <p className="text-xs text-slate-400">High-speed walkthrough of live freight telemetry, automated payroll and executive decrees.</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setDemoVideoOpen(false);
                  onNavigate('login');
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#e5be47] to-[#d4af35] text-black font-extrabold text-xs shadow-md hover:brightness-110 transition-all cursor-pointer"
              >
                {content.startJourney}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
