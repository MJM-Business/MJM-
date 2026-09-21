import React, { useState } from 'react';
import { AppScreen, Language, User } from '../types';
import { 
  Sparkles, 
  Layers, 
  Users, 
  Building2, 
  Lock, 
  Globe, 
  Plus, 
  BarChart3, 
  CheckCircle2,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

interface NavigationHeaderProps {
  currentScreen: AppScreen;
  setCurrentScreen: (screen: AppScreen) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenNewEntryModal: () => void;
  isAuthenticated: boolean;
  currentUser: User | null;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onLogout: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentScreen,
  setCurrentScreen,
  language,
  setLanguage,
  onOpenNewEntryModal,
  isAuthenticated,
  currentUser,
  onOpenAuth,
  onLogout
}) => {
  const isArabic = language === 'ar';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems: { id: AppScreen; label: string; icon: any; badge?: string }[] = [
    { id: 'landing', label: isArabic ? 'الرئيسية' : 'Home', icon: Layers },
    { id: 'dashboard', label: isArabic ? 'لوحة القيادة' : 'Dashboard', icon: BarChart3, badge: 'Live' },
    { id: 'crm', label: isArabic ? 'إدارة العملاء' : 'CRM & Clients', icon: Users },
    { id: 'workforce', label: isArabic ? 'فريق العمل' : 'Workforce', icon: Sparkles },
    { id: 'registration', label: isArabic ? 'التسجيل التجاري' : 'Registration', icon: Building2 },
    { id: 'login', label: isArabic ? 'المصادقة 2FA' : '2FA Gateway', icon: Lock },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2d2616] bg-[#0d0d0d]/95 backdrop-blur-md">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-[#211a07] via-[#3d3010] to-[#211a07] text-[#d4af35] text-[11px] py-1 px-4 text-center border-b border-[#3e3215] flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-semibold">
          {isArabic 
            ? 'نظام MJM المطور 2025 • المصادقة المشفرة ببروتوكول scrypt وربط واتساب مباشر مفعل'
            : 'MJM Super ERP 2025 • scrypt Encrypted Auth & Live WhatsApp Gateway'}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setCurrentScreen('landing')} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af35] via-[#a88220] to-[#614912] p-[1.5px] shadow-lg shadow-[#d4af35]/20">
              <div className="w-full h-full bg-[#111111] rounded-[10px] flex items-center justify-center">
                <span className="font-black text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-tr from-[#f6e58d] to-[#d4af35]">
                  MJM
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-wide text-slate-100 group-hover:text-[#d4af35] transition-colors">
                  MJM
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#d4af35]/15 text-[#d4af35] border border-[#d4af35]/30">
                  ERP
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                {isArabic ? 'منصة الأعمال الذكية الفاخرة' : 'Luxury Smart Platform'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Screens Pills */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#141414] p-1 rounded-xl border border-[#2d2616]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => setCurrentScreen(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#d4af35] to-[#b8860b] text-black font-bold shadow-md shadow-[#d4af35]/20' 
                      : 'text-slate-300 hover:text-white hover:bg-[#202020]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-[#d4af35]'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                      isActive ? 'bg-black text-[#d4af35]' : 'bg-[#d4af35]/20 text-[#d4af35]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2">
            
            {/* Quick Add / New Action */}
            <button
              id="header-quick-action-btn"
              onClick={onOpenNewEntryModal}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1f1b11] border border-[#524116] hover:border-[#d4af35] text-[#f1d57f] hover:text-white transition-all shadow-sm group"
            >
              <Plus className="w-3.5 h-3.5 text-[#d4af35] group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden sm:inline">{isArabic ? 'إجراء سريع +' : 'New Entry +'}</span>
            </button>

            {/* Language Switcher */}
            <button
              id="lang-toggle-btn"
              onClick={() => setLanguage(isArabic ? 'en' : 'ar')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#141414] hover:bg-[#222222] border border-[#2b2518] text-slate-300 hover:text-white transition-all"
              title={isArabic ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-[#d4af35]" />
              <span className="text-[11px] font-bold">{isArabic ? 'EN' : 'عربي'}</span>
            </button>

            {/* User Account / Auth Trigger */}
            {isAuthenticated && currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl bg-[#161616] border border-[#332814] hover:border-[#d4af35] transition-all"
                >
                  <div className="relative">
                    <img
                      src={currentUser.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiNvii-7AQhWSAnbRIlkLLxJii5jXhhMWK3PGH66-XP__SbdNb4BYI0qqDE4AwqB49HBJYIEUF3ZGsXxl98bo2KVVInc3FscHhTacgWWvkISJ0mWe-IeMxdsBEt16tEtaX-QOCC3krs-1Vb1PpcNUTLei-fWY85HI61WKFgPARem5-FDid4nVAunVLHCUIhKlrDk8ZGULFIbaO7TZjAUpEr-oWm77r-8aGi1eyXpz1494srSZAZCyUzZsD-w0-3v1nKdCjjShDhQ'}
                      alt="User Avatar"
                      className="w-7 h-7 rounded-lg object-cover border border-[#d4af35]"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#121212]"></span>
                  </div>
                  <div className="hidden sm:block text-start">
                    <div className="text-xs font-bold text-slate-100 flex items-center gap-1">
                      <span className="truncate max-w-[100px]">{currentUser.name.split(' ')[0]}</span>
                      <CheckCircle2 className="w-3 h-3 text-[#d4af35]" />
                    </div>
                    <div className="text-[10px] text-[#d4af35] font-mono truncate max-w-[100px]">
                      {currentUser.role}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* User Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 sm:right-auto sm:left-0 mt-2 w-64 bg-[#141414] border border-[#3e3215] rounded-2xl p-3 shadow-2xl z-50 animate-fadeIn space-y-3">
                    <div className="border-b border-[#292011] pb-2.5">
                      <p className="font-bold text-xs text-white truncate">{currentUser.name}</p>
                      <p className="text-[11px] font-mono text-slate-400 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-[#d4af35]/15 text-[#d4af35] border border-[#d4af35]/30 text-[10px] font-bold">
                        {currentUser.role}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <button
                        onClick={() => {
                          setCurrentScreen('dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-start p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#202020] flex items-center gap-2"
                      >
                        <BarChart3 className="w-4 h-4 text-[#d4af35]" />
                        <span>{isArabic ? 'لوحة القيادة التنفيذية' : 'Executive Dashboard'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentScreen('registration');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-start p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#202020] flex items-center gap-2"
                      >
                        <Building2 className="w-4 h-4 text-[#d4af35]" />
                        <span>{isArabic ? 'الملف التجاري والحسابات' : 'Business Profile & Banks'}</span>
                      </button>

                      <button
                        onClick={() => {
                          onLogout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-start p-2 rounded-xl text-rose-400 hover:bg-rose-950/30 flex items-center gap-2 border-t border-[#292011] pt-2 mt-1"
                      >
                        <LogOut className="w-4 h-4 text-rose-400" />
                        <span>{isArabic ? 'تسجيل الخروج الآمن' : 'Sign Out'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-[#f1d57f] bg-[#1c170d] border border-[#443615] hover:border-[#d4af35] transition-all"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#d4af35]" />
                  <span>{isArabic ? 'دخول' : 'Sign In'}</span>
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#d4af35] to-[#b8860b] hover:opacity-90 shadow-md shadow-[#d4af35]/20 transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5 text-black" />
                  <span>{isArabic ? 'إنشاء حساب' : 'Sign Up'}</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#151515] border border-[#2d2516] text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Expandable Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#221c11] space-y-2 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentScreen(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive 
                        ? 'bg-[#d4af35] text-black font-bold shadow-md' 
                        : 'bg-[#181818] text-slate-300 border border-[#2b2518]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#d4af35]'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Auth actions on mobile */}
            {!isAuthenticated && (
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    onOpenAuth('login');
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-[#f1d57f] bg-[#1a160c] border border-[#3d3013]"
                >
                  {isArabic ? 'تسجيل الدخول' : 'Sign In'}
                </button>
                <button
                  onClick={() => {
                    onOpenAuth('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-black bg-[#d4af35]"
                >
                  {isArabic ? 'إنشاء حساب جديد' : 'Sign Up'}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </header>
  );
};
