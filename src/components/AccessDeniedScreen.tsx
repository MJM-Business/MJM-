import React from 'react';
import { User, AppScreen, LanguageItem } from '../types';
import { ShieldAlert, Lock, ArrowLeft, ArrowRight, LogOut, CheckCircle2, UserCheck, Briefcase, Crown } from 'lucide-react';

interface AccessDeniedScreenProps {
  currentUser: User;
  attemptedScreen: AppScreen;
  onNavigateToAllowed: () => void;
  onLogout: () => void;
  currentLanguage: LanguageItem;
}

export const AccessDeniedScreen: React.FC<AccessDeniedScreenProps> = ({
  currentUser,
  attemptedScreen,
  onNavigateToAllowed,
  onLogout,
  currentLanguage
}) => {
  const isArabic = currentLanguage.dir === 'rtl';
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  const getScreenName = (screen: AppScreen) => {
    switch (screen) {
      case 'dashboard':
        return isArabic ? 'لوحة القيادة المالية والتقارير التنفيذية (CEO Dashboard)' : 'Executive Financial Dashboard';
      case 'businesses':
        return isArabic ? 'منظومة قطاعات الأعمال القابضة والمقاصة' : 'Connected Businesses Ecosystem';
      case 'workforce':
        return isArabic ? 'حوكمة الكوادر وملفات الرواتب والتعيين والفصل' : 'Workforce HR & Executive Dossiers';
      case 'directives':
        return isArabic ? 'صندوق إصدار وتعميم القرارات الإدارية' : 'Executive Directives Command';
      case 'crm':
        return isArabic ? 'إدارة العقود والصفقات السيادية (VIP CRM)' : 'VIP Enterprise CRM';
      case 'registration':
        return isArabic ? 'السجل التجاري والحسابات البنكية الرسمية' : 'Corporate Registration & Bank Accounts';
      case 'team_portal':
        return isArabic ? 'بوابة إدارة فرق العمل والمناوبات (Team Leader Portal)' : 'Team Leader Portal';
      case 'employee_portal':
        return isArabic ? 'مساحة عمل الموظف المعتمد (Staff Workspace)' : 'Employee Workspace';
      default:
        return screen;
    }
  };

  const getRoleBadge = () => {
    if (currentUser.roleType === 'CEO') {
      return {
        label: isArabic ? 'الرئيس التنفيذي (CEO)' : 'Executive CEO',
        icon: Crown,
        color: 'text-[#f1d57f] border-[#d4af35]/40 bg-[#282010]'
      };
    }
    if (currentUser.roleType === 'TEAM_LEADER') {
      return {
        label: isArabic ? 'قائد الفريق (Team Leader)' : 'Team Leader',
        icon: Briefcase,
        color: 'text-blue-300 border-blue-500/40 bg-blue-950/40'
      };
    }
    return {
      label: isArabic ? 'موظف معتمد (Staff Member)' : 'Staff Member',
      icon: UserCheck,
      color: 'text-emerald-300 border-emerald-500/40 bg-emerald-950/40'
    };
  };

  const roleInfo = getRoleBadge();
  const RoleIcon = roleInfo.icon;

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center p-4 sm:p-6" dir={currentLanguage.dir}>
      <div className="max-w-xl w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#181313] via-[#120f0f] to-[#0c0a0a] border border-red-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(239,68,68,0.2)] text-center space-y-6">
        
        {/* Warning Icon Box */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-br from-red-500/20 via-red-900/30 to-black border border-red-500/50 flex items-center justify-center shadow-lg shadow-red-950/60 animate-pulse">
          <ShieldAlert className="w-8 h-8 sm:w-10 sm:h-10 text-red-400" />
        </div>

        {/* Security Clearance Alert Text */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider font-mono">
            <Lock className="w-3.5 h-3.5" />
            <span>{isArabic ? 'تصريح أمني غير كافٍ • الوصول مقيد' : 'Access Restricted • Clearance Insufficient'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            {isArabic ? 'غير مصرح لك بالدخول إلى هذه الشاشة' : 'Restricted Access: Insufficient Clearance'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
            {isArabic ? (
              <>
                شاشة <span className="text-[#f1d57f] font-bold">"{getScreenName(attemptedScreen)}"</span> تتطلب صلاحية تنفيذية أعلى وليست متاحة لمستوى حسابك الحالي.
              </>
            ) : (
              <>
                The requested module <span className="text-[#f1d57f] font-bold">"{getScreenName(attemptedScreen)}"</span> is strictly isolated and requires higher clearance permissions.
              </>
            )}
          </p>
        </div>

        {/* User Identity Details */}
        <div className="p-4 rounded-2xl bg-[#141010] border border-[#2d1c1c] text-start space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">{isArabic ? 'الحساب النشط حالياً:' : 'Active User Session:'}</span>
            <span className="font-bold text-white">{currentUser.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">{isArabic ? 'مستوى الصلاحية المعتمد:' : 'Verified Clearance Level:'}</span>
            <span className={`px-2.5 py-0.5 rounded-lg border text-[11px] font-bold flex items-center gap-1.5 ${roleInfo.color}`}>
              <RoleIcon className="w-3.5 h-3.5" />
              <span>{roleInfo.label}</span>
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-[#291717] pt-2 text-[11px]">
            <span className="text-slate-400">{isArabic ? 'السياسة المطبقة:' : 'Security Policy:'}</span>
            <span className="text-amber-400 font-mono">Strict Role-Based Access Control (RBAC)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onNavigateToAllowed}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-black bg-gradient-to-b from-[#f5d77f] via-[#d4af35] to-[#9e791a] hover:brightness-105 shadow-md flex items-center justify-center gap-2 text-xs transition-all active:scale-95"
          >
            <span>
              {currentUser.roleType === 'TEAM_LEADER'
                ? (isArabic ? 'العودة لبوابة قائد الفريق' : 'Return to Team Leader Portal')
                : (isArabic ? 'العودة لمساحة عمل الموظف' : 'Return to Employee Workspace')}
            </span>
            <Arrow className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onLogout}
            className="w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-slate-300 bg-[#1e1717] hover:bg-[#2c1f1f] border border-[#3e2525] hover:text-white flex items-center justify-center gap-2 text-xs transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isArabic ? 'تسجيل الخروج والتبديل لحساب آخر' : 'Sign Out & Switch Account'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
