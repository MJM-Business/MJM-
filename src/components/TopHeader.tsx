import React, { useState } from 'react';
import { BusinessUnit, User, LanguageItem } from '../types';
import { CONNECTED_BUSINESSES } from '../data/mockData';
import { 
  Building2, 
  ChevronDown, 
  Crown, 
  Briefcase, 
  UserCheck, 
  Bell, 
  Globe, 
  PanelRight, 
  ShieldCheck, 
  Sparkles,
  Plus
} from 'lucide-react';
import { getTranslation } from '../data/translations';

interface TopHeaderProps {
  activeBusiness: BusinessUnit;
  setActiveBusiness: (biz: BusinessUnit) => void;
  currentUser: User | null;
  currentLanguage: LanguageItem;
  onOpenLanguageModal: () => void;
  onOpenAddEmployeeModal: () => void;
  unreadDirectivesCount: number;
  onOpenDirectives: () => void;
  onToggleSidebar: () => void;
  onSwitchUserRole: (role: 'CEO' | 'TEAM_LEADER' | 'EMPLOYEE') => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeBusiness,
  setActiveBusiness,
  currentUser,
  currentLanguage,
  onOpenLanguageModal,
  onOpenAddEmployeeModal,
  unreadDirectivesCount,
  onOpenDirectives,
  onToggleSidebar,
  onSwitchUserRole
}) => {
  const [bizDropdownOpen, setBizDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const t = getTranslation(currentLanguage.code);
  const isCEO = currentUser?.roleType === 'CEO';
  const isTL = currentUser?.roleType === 'TEAM_LEADER';
  const isEmployee = currentUser?.roleType === 'EMPLOYEE';
  const isArabic = currentLanguage.dir === 'rtl';

  return (
    <header className="sticky top-0 z-30 w-full bg-[#0d0d10]/95 backdrop-blur-md border-b border-[#2a2314] px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4 shadow-lg shadow-black/40">
      
      {/* Left Area: Connected Businesses Dropdown Selector */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* Business Subsidiary Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setBizDropdownOpen(!bizDropdownOpen)}
            className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-[#171510] to-[#211b10] border border-[#3f3216] hover:border-[#d4af35] text-slate-100 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(212,175,53,0.2)]"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#d4af35] to-[#7f631b] flex items-center justify-center text-black font-black text-xs shadow-sm shrink-0">
              <Building2 className="w-3.5 h-3.5" />
            </div>

            <div className="text-start min-w-0">
              <div className="text-[9px] sm:text-[10px] text-slate-400 font-semibold leading-tight hidden xs:block">
                {isArabic ? 'القطاع النشط' : 'Active Business'}
              </div>
              <div className="text-[11px] sm:text-xs font-black text-[#f1d57f] truncate max-w-[100px] xs:max-w-[130px] sm:max-w-[180px] md:max-w-none">
                {isArabic ? activeBusiness.nameAr : activeBusiness.name}
              </div>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ms-0.5 sm:ms-1 shrink-0" />
          </button>

          {/* Business Dropdown Menu */}
          {bizDropdownOpen && (
            <div className={`absolute top-full mt-2 w-72 max-w-[90vw] rounded-2xl bg-[#14120f] border border-[#d4af35]/40 shadow-2xl p-2 z-50 animate-fadeIn ${
              isArabic ? 'right-0' : 'left-0'
            }`}>
              <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1.5 border-b border-[#2b2210] mb-1">
                {t.connectedSubsidiaries} ({CONNECTED_BUSINESSES.length})
              </div>
              {CONNECTED_BUSINESSES.map((biz) => {
                const isSelected = activeBusiness.id === biz.id;
                return (
                  <button
                    key={biz.id}
                    onClick={() => {
                      setActiveBusiness(biz);
                      setBizDropdownOpen(false);
                    }}
                    className={`w-full p-2 rounded-xl text-start flex items-center justify-between text-xs transition-all ${
                      isSelected
                        ? 'bg-[#2a220f] text-[#f1d57f] font-bold border border-[#d4af35]/50'
                        : 'hover:bg-[#1e1a12] text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">
                        {isArabic ? biz.nameAr : biz.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {biz.code} • {biz.staffCount} Staff
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#d4af35] animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Live Sovereign Status Ticker (Desktop/Laptop) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-[#13120d] border border-[#2b2212] text-[11px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-slate-300">
            {isArabic ? 'بوابة MJM الموحدة • تشفير سيادي مباشر' : 'MJM Unified ERP • Live Sovereign Link'}
          </span>
        </div>
      </div>

      {/* Right Area: CEO Action, Role Switcher, Directives Bell, 100+ Langs, Right Sidebar Trigger */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        
        {/* CEO Quick Add Employee Button */}
        {isCEO && (
          <button
            onClick={onOpenAddEmployeeModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-black bg-gradient-to-b from-[#f5d77f] to-[#b8860b] shadow-[0_4px_10px_rgba(212,175,53,0.3),inset_0_1px_0_rgba(255,255,255,0.6)] hover:brightness-105 active:translate-y-0.5 transition-all"
            title="Add New Employee (CEO Authorized)"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>{t.addEmployee}</span>
          </button>
        )}

        {/* Directives / Executive Inbox Bell with unread counter */}
        <button
          onClick={onOpenDirectives}
          className="relative p-2 rounded-xl bg-[#17140f] hover:bg-[#252014] border border-[#3b2f15] text-[#f1d57f] transition-all shadow-md active:scale-95"
          title={t.directives}
        >
          <Bell className="w-4 h-4" />
          {unreadDirectivesCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-[#0d0d10] animate-bounce">
              {unreadDirectivesCount}
            </span>
          )}
        </button>

        {/* Language Modal Trigger (100+ Languages) */}
        <button
          onClick={onOpenLanguageModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#171510] hover:bg-[#262013] border border-[#3b2e14] text-slate-200 transition-all text-xs shadow-md active:scale-95"
          title="Switch Language (100+ Languages Available)"
        >
          <span className="text-base leading-none">{currentLanguage.flag}</span>
          <span className="font-bold text-xs hidden sm:inline">{currentLanguage.nativeName}</span>
          <span className="text-[10px] text-[#d4af35] font-mono hidden md:inline">({currentLanguage.dir.toUpperCase()})</span>
        </button>

        {/* Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#19150d] border border-[#3e3215] hover:border-[#d4af35] text-xs transition-all shadow-md"
            title="Switch User Role & Authority"
          >
            {isCEO ? (
              <Crown className="w-3.5 h-3.5 text-amber-400" />
            ) : isTL ? (
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            ) : (
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            )}
            <span className="font-bold text-white hidden sm:inline">
              {isCEO ? (isArabic ? 'الرئيس التنفيذي' : 'CEO') : isTL ? (isArabic ? 'قائد الفريق' : 'Team Leader') : (isArabic ? 'موظف معتمد' : 'Employee')}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {roleDropdownOpen && (
            <div className={`absolute top-full mt-2 w-56 rounded-2xl bg-[#14120e] border border-[#d4af35]/40 shadow-2xl p-2 z-50 animate-fadeIn ${
              isArabic ? 'left-0' : 'right-0'
            }`}>
              <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1 border-b border-[#2b2210] mb-1">
                {t.switchRole}
              </div>

              <button
                onClick={() => {
                  onSwitchUserRole('CEO');
                  setRoleDropdownOpen(false);
                }}
                className="w-full p-2 rounded-xl text-start flex items-center gap-2 hover:bg-[#252012] text-xs font-bold text-amber-400 transition-colors"
              >
                <Crown className="w-4 h-4 text-amber-400" />
                <div>
                  <div>Executive CEO (Full Authority)</div>
                  <div className="text-[9px] text-slate-400 font-normal">Add/Dismiss/Reward/Reports</div>
                </div>
              </button>

              <button
                onClick={() => {
                  onSwitchUserRole('TEAM_LEADER');
                  setRoleDropdownOpen(false);
                }}
                className="w-full p-2 rounded-xl text-start flex items-center gap-2 hover:bg-[#252012] text-xs font-bold text-blue-400 transition-colors"
              >
                <Briefcase className="w-4 h-4 text-blue-400" />
                <div>
                  <div>Team Leader (Receives Directives)</div>
                  <div className="text-[9px] text-slate-400 font-normal">Direct Orders Inbox & Team View</div>
                </div>
              </button>

              <button
                onClick={() => {
                  onSwitchUserRole('EMPLOYEE');
                  setRoleDropdownOpen(false);
                }}
                className="w-full p-2 rounded-xl text-start flex items-center gap-2 hover:bg-[#252012] text-xs font-bold text-emerald-400 transition-colors"
              >
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <div>
                  <div>Staff Employee (Contributor)</div>
                  <div className="text-[9px] text-slate-400 font-normal">Restricted Staff Portal</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Right Sidebar Menu Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl bg-gradient-to-b from-[#241e12] to-[#16130b] hover:from-[#352c1a] hover:to-[#211c10] border border-[#d4af35]/50 text-[#f1d57f] flex items-center justify-center transition-all shadow-[0_4px_10px_rgba(212,175,53,0.25)] active:scale-95"
          title="Open Right-Side Menu"
        >
          <PanelRight className="w-4 h-4" />
        </button>

      </div>
    </header>
  );
};
