import React from 'react';
import { AppScreen, User, LanguageItem } from '../types';
import { 
  BarChart3, 
  Users, 
  Sparkles, 
  Building2, 
  Building,
  Lock, 
  Mail, 
  Globe, 
  Plus, 
  LogOut, 
  ShieldCheck, 
  Crown, 
  Briefcase, 
  UserCheck, 
  ChevronLeft,
  ChevronRight,
  Layers,
  Award,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { getTranslation } from '../data/translations';

interface RightSidebarProps {
  currentScreen: AppScreen;
  setCurrentScreen: (screen: AppScreen) => void;
  currentUser: User | null;
  currentLanguage: LanguageItem;
  onOpenLanguageModal: () => void;
  onOpenAddEmployeeModal: () => void;
  onSwitchUserRole: (role: 'CEO' | 'TEAM_LEADER' | 'EMPLOYEE') => void;
  unreadDirectivesCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onLogout: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  currentScreen,
  setCurrentScreen,
  currentUser,
  currentLanguage,
  onOpenLanguageModal,
  onOpenAddEmployeeModal,
  onSwitchUserRole,
  unreadDirectivesCount,
  isOpen,
  setIsOpen,
  onLogout
}) => {
  const t = getTranslation(currentLanguage.code);
  const isArabic = currentLanguage.dir === 'rtl';
  const isCEO = currentUser?.roleType === 'CEO';
  const isTL = currentUser?.roleType === 'TEAM_LEADER';
  const isEmployee = currentUser?.roleType === 'EMPLOYEE';

  // Strict Role-Based Isolated Navigation Menu Items
  let navItems: { id: AppScreen; label: string; icon: any; badge?: string | number; color?: string }[] = [];

  if (isCEO) {
    navItems = [
      { id: 'dashboard', label: isArabic ? 'لوحة القيادة والمالية' : 'Executive Dashboard', icon: BarChart3, badge: 'Live', color: 'text-amber-400' },
      { id: 'reports', label: isArabic ? 'التقارير الشاملة وتصدير Excel/PDF' : 'Holding Reports & Audit', icon: FileSpreadsheet, badge: 'Excel/PDF', color: 'text-[#f1d57f]' },
      { id: 'businesses', label: isArabic ? 'قطاعات الأعمال القابضة' : 'Connected Businesses', icon: Building, badge: '5 Biz', color: 'text-blue-400' },
      { id: 'workforce', label: isArabic ? 'حوكمة الكوادر والرواتب' : 'Workforce & HR Governance', icon: Sparkles, color: 'text-emerald-400' },
      { id: 'directives', label: isArabic ? 'أوامر وقرارات الإدارة' : 'Directives Command', icon: Mail, badge: unreadDirectivesCount > 0 ? unreadDirectivesCount : undefined, color: 'text-[#f1d57f]' },
      { id: 'crm', label: isArabic ? 'إدارة العقود والصفقات VIP' : 'VIP Enterprise CRM', icon: Users, color: 'text-purple-400' },
      { id: 'registration', label: isArabic ? 'السجل والحسابات البنكية' : 'Corporate Banking & CR', icon: Building2, color: 'text-amber-300' },
      { id: 'landing', label: isArabic ? 'الصفحة الرئيسية' : 'Home Page', icon: Layers, color: 'text-slate-400' },
    ];
  } else if (isTL) {
    navItems = [
      { id: 'team_portal', label: isArabic ? 'بوابة قائد الفريق والعمليات' : 'Team Operations Hub', icon: Briefcase, badge: 'Active', color: 'text-blue-400' },
      { id: 'directives', label: isArabic ? 'بريد توجيهات الـ CEO' : 'CEO Directives Inbox', icon: Mail, badge: unreadDirectivesCount > 0 ? unreadDirectivesCount : undefined, color: 'text-[#f1d57f]' },
      { id: 'landing', label: isArabic ? 'الصفحة الرئيسية' : 'Home Page', icon: Layers, color: 'text-slate-400' },
    ];
  } else {
    // EMPLOYEE: Strictly isolated personal workspace only
    navItems = [
      { id: 'employee_portal', label: isArabic ? 'مساحة عمل الموظف الذاتية' : 'My Staff Workspace', icon: UserCheck, badge: 'Tasks', color: 'text-emerald-400' },
      { id: 'landing', label: isArabic ? 'الصفحة الرئيسية' : 'Home Page', icon: Layers, color: 'text-slate-400' },
    ];
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* 3D Elevated Right Sidebar - Mobile, Tablet & Desktop adaptive */}
      <aside 
        className={`fixed top-0 right-0 z-50 h-screen bg-[#0e0e11] border-l border-[#2e2615] text-slate-100 flex flex-col transition-all duration-300 shadow-[-15px_0_40px_rgba(0,0,0,0.85),inset_1px_0_1px_rgba(212,175,53,0.2)] ${
          isOpen ? 'w-80 max-w-[85vw] translate-x-0' : 'w-80 max-w-[85vw] translate-x-full lg:w-20 lg:translate-x-0'
        }`}
        dir={currentLanguage.dir}
      >
        {/* Sidebar Header & Brand 3D Crest */}
        <div className="p-3.5 sm:p-4 border-b border-[#292212] bg-gradient-to-b from-[#18150c] to-[#0e0e11] flex items-center justify-between">
          <div 
            onClick={() => {
              setCurrentScreen('dashboard');
              if (window.innerWidth < 1024) setIsOpen(false);
            }}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
          >
            {/* 3D Crest Logo */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-b from-[#f3d98a] via-[#d4af35] to-[#785b19] p-[2px] shadow-[0_6px_14px_rgba(212,175,53,0.3),inset_0_1px_1px_rgba(255,255,255,0.6)] group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-[#12110d] rounded-[14px] flex items-center justify-center shadow-inner">
                <span className="font-black text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-tr from-[#ffeaa7] via-[#f1d57f] to-[#d4af35]">
                  MJM
                </span>
              </div>
            </div>

            {isOpen && (
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm sm:text-base tracking-wide text-white group-hover:text-[#f1d57f] transition-colors truncate">
                    MJM GROUP
                  </span>
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#d4af35]/20 text-[#f1d57f] border border-[#d4af35]/40 shadow-sm shrink-0">
                    ERP 3D
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 truncate">
                  {currentLanguage.dir === 'rtl' ? 'نظام الإدارة التنفيذية الموحدة' : 'Unified Executive Platform'}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Mobile Close Button (X) */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden w-8 h-8 rounded-xl bg-[#1c1911] hover:bg-[#2c2413] border border-[#3e3215] text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-md active:scale-95"
              title="Close Menu"
              aria-label="Close Sidebar"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Expand/Collapse Toggle Button for Desktop */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hidden lg:flex w-7 h-7 rounded-xl bg-[#1c1911] hover:bg-[#2c2413] border border-[#3e3215] text-[#f1d57f] items-center justify-center transition-all shadow-md active:scale-95"
              title={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
            >
              {isOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Current Active Role Badge & Security Profile */}
        {isOpen ? (
          <div className="p-3 mx-3 my-2 rounded-2xl bg-gradient-to-r from-[#1b170c] via-[#1f190e] to-[#14120a] border border-[#3f3215] shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(212,175,53,0.3)] space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-semibold">{t.activeRole}:</span>
              <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black flex items-center gap-1 ${
                isCEO 
                  ? 'bg-amber-500/20 text-[#f5d77f] border border-amber-500/40 shadow-sm'
                  : isTL 
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}>
                {isCEO && <Crown className="w-3 h-3 text-amber-400" />}
                {isTL && <Briefcase className="w-3 h-3 text-blue-400" />}
                {isEmployee && <UserCheck className="w-3 h-3 text-emerald-400" />}
                <span>
                  {isCEO ? (isArabic ? 'الرئيس التنفيذي' : 'Executive CEO') : isTL ? (isArabic ? 'قائد الفريق' : 'Team Leader') : (isArabic ? 'موظف معتمد' : 'Verified Staff')}
                </span>
              </span>
            </div>

            {/* Authenticated User Info */}
            <div className="flex items-center gap-2 pt-1 border-t border-[#2e240f]">
              <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                isCEO ? 'bg-[#d4af35] text-black' : isTL ? 'bg-blue-500 text-white' : 'bg-emerald-500 text-black'
              }`}>
                {currentUser?.name.charAt(0)}
              </div>
              <div className="truncate flex-1">
                <div className="text-xs font-bold text-white truncate">{currentUser?.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{currentUser?.email}</div>
              </div>
            </div>

            {/* Secure Account Switching Button */}
            <button
              onClick={() => setCurrentScreen('login')}
              className="w-full py-1.5 px-2 rounded-xl text-[10px] font-bold text-[#f1d57f] bg-[#16130d] hover:bg-[#252012] border border-[#382d14] transition-all flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3 h-3 text-[#d4af35]" />
              <span>{isArabic ? 'تبديل الصلاحية أو تسجيل الخروج' : 'Switch Clearance / Sign In'}</span>
            </button>
          </div>
        ) : (
          <div className="p-2 flex justify-center">
            <button 
              onClick={() => setCurrentScreen('login')}
              className="w-10 h-10 rounded-2xl bg-[#1b170c] border border-[#3f3215] flex items-center justify-center hover:border-[#d4af35] transition-all shadow-md"
              title={`Active: ${currentUser?.roleType}. Click to change clearance or login.`}
            >
              {isCEO ? <Crown className="w-5 h-5 text-amber-400" /> : isTL ? <Briefcase className="w-5 h-5 text-blue-400" /> : <UserCheck className="w-5 h-5 text-emerald-400" />}
            </button>
          </div>
        )}

        {/* CEO Exclusive Action: Add New Employee Button */}
        <div className="px-3 py-1">
          {isOpen ? (
            <button
              onClick={() => {
                if (isCEO) {
                  onOpenAddEmployeeModal();
                }
              }}
              disabled={!isCEO}
              className={`w-full py-2.5 px-3 rounded-2xl text-xs font-black flex items-center justify-between transition-all ${
                isCEO
                  ? 'bg-gradient-to-b from-[#f5d77f] via-[#d4af35] to-[#997415] text-black shadow-[0_6px_14px_rgba(212,175,53,0.35),inset_0_1px_0_rgba(255,255,255,0.7)] hover:brightness-105 active:translate-y-0.5 cursor-pointer'
                  : 'bg-[#151412] text-slate-500 border border-[#2b2515] cursor-not-allowed opacity-65'
              }`}
              title={isCEO ? 'Add New Employee (CEO Authorized)' : 'Restricted: CEO Exclusive Clearance'}
            >
              <div className="flex items-center gap-2">
                <div className={`p-1 rounded-lg ${isCEO ? 'bg-black/20 text-black' : 'bg-[#221f18] text-slate-500'}`}>
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>{t.addEmployee}</span>
              </div>
              {!isCEO && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/40 text-amber-400/80 font-mono flex items-center gap-0.5">
                  <Lock className="w-2.5 h-2.5" />
                  <span>CEO Only</span>
                </span>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                if (isCEO) onOpenAddEmployeeModal();
              }}
              disabled={!isCEO}
              className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center transition-all ${
                isCEO
                  ? 'bg-gradient-to-b from-[#f5d77f] to-[#997415] text-black shadow-lg shadow-[#d4af35]/30'
                  : 'bg-[#151412] text-slate-600 border border-[#2b2515] cursor-not-allowed'
              }`}
              title={isCEO ? 'Add New Employee (CEO)' : 'Locked: CEO Clearance Required'}
            >
              <Plus className="w-5 h-5 stroke-[3]" />
            </button>
          )}
        </div>

        {/* Navigation Items (Tactile 3D Buttons on Right Side) */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5 scrollbar-thin">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentScreen(item.id);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={`w-full relative flex items-center rounded-2xl transition-all group ${
                  isOpen ? 'px-3.5 py-2.5 justify-between' : 'p-2.5 justify-center'
                } ${
                  isActive
                    ? 'bg-gradient-to-r from-[#2c2311] via-[#3d3115] to-[#251e0e] border border-[#d4af35] shadow-[0_8px_16px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(212,175,53,0.3)] text-white font-bold'
                    : 'bg-[#131215] hover:bg-[#1d1b1f] border border-[#221f1c] hover:border-[#3d3319] text-slate-300'
                }`}
              >
                {/* 3D Icon Box */}
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all shadow-inner ${
                    isActive
                      ? 'bg-gradient-to-b from-[#f5d77f] to-[#9b7617] text-black shadow-md shadow-[#d4af35]/30'
                      : 'bg-[#1c1a20] border border-[#2e2a22] group-hover:border-[#d4af35]/40 text-slate-300'
                  }`}>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-black' : item.color || 'text-[#f1d57f]'}`} />
                  </div>

                  {isOpen && (
                    <span className="text-xs tracking-wide">
                      {item.label}
                    </span>
                  )}
                </div>

                {/* Badges */}
                {isOpen && item.badge !== undefined && (
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    isActive
                      ? 'bg-black text-[#f1d57f] border border-[#d4af35]/40'
                      : item.id === 'directives' && unreadDirectivesCount > 0
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-[#221d11] text-[#f1d57f] border border-[#3e3215]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Sidebar Footer: Language Selector & User Profile */}
        <div className="p-3 border-t border-[#292212] bg-gradient-to-t from-[#14120a] to-[#0e0e11] space-y-2">
          {/* 100+ Languages Trigger Button */}
          <button
            onClick={onOpenLanguageModal}
            className={`w-full rounded-2xl bg-[#161513] hover:bg-[#25221b] border border-[#382f17] text-slate-200 transition-all flex items-center shadow-md active:translate-y-0.5 ${
              isOpen ? 'px-3 py-2 justify-between' : 'p-2 justify-center'
            }`}
            title="Open 100+ Global Languages Selector"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg p-0.5 rounded bg-black/40">{currentLanguage.flag}</span>
              {isOpen && (
                <div className="text-start">
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{currentLanguage.nativeName}</span>
                    <span className="text-[10px] text-slate-400">({currentLanguage.name})</span>
                  </div>
                  <div className="text-[9px] text-[#f1d57f]">100+ Languages • {currentLanguage.dir.toUpperCase()}</div>
                </div>
              )}
            </div>

            {isOpen && (
              <div className="p-1 rounded-lg bg-[#272111] text-[#f1d57f]">
                <Globe className="w-3.5 h-3.5" />
              </div>
            )}
          </button>

          {/* User Info Bar & Logout */}
          {isOpen && (
            <div className="pt-2 border-t border-[#251e10] flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <img
                  src={currentUser?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiNvii-7AQhWSAnbRIlkLLxJii5jXhhMWK3PGH66-XP__SbdNb4BYI0qqDE4AwqB49HBJYIEUF3ZGsXxl98bo2KVVInc3FscHhTacgWWvkISJ0mWe-IeMxdsBEt16tEtaX-QOCC3krs-1Vb1PpcNUTLei-fWY85HI61WKFgPARem5-FDid4nVAunVLHCUIhKlrDk8ZGULFIbaO7TZjAUpEr-oWm77r-8aGi1eyXpz1494srSZAZCyUzZsD-w0-3v1nKdCjjShDhQ'}
                  alt={currentUser?.name || 'User'}
                  className="w-8 h-8 rounded-full object-cover border border-[#d4af35] shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white truncate">{currentUser?.name}</div>
                  <div className="text-[10px] text-[#d4af35] truncate">{currentUser?.role}</div>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="p-2 rounded-xl bg-[#1b1710] hover:bg-[#2c2013] border border-[#3e2e15] text-slate-400 hover:text-red-400 transition-colors shrink-0"
                title="Secure Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
