import React, { useState } from 'react';
import { Employee, LanguageItem, User, ExecutiveDirective, BusinessUnit } from '../types';
import { TOP_PERFORMERS } from '../data/mockData';
import { exportToPdf, translateValue, ExportLanguage } from '../utils/exportUtils';
import { ExportLanguageSelector } from './ExportLanguageSelector';
import { 
  Award, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Phone, 
  Plus, 
  Crown, 
  Lock, 
  Eye, 
  UserMinus, 
  FileText, 
  X, 
  Building2, 
  Briefcase, 
  Check, 
  DollarSign,
  AlertCircle,
  Download,
  Printer
} from 'lucide-react';
import { getTranslation } from '../data/translations';

interface WorkforceScreenProps {
  employees: Employee[];
  onUpdateEmployees: (emps: Employee[]) => void;
  onOpenAddEmployeeModal: () => void;
  currentUser: User | null;
  currentLanguage: LanguageItem;
  onDispatchDirective: (directive: ExecutiveDirective) => void;
  activeBusiness: BusinessUnit;
}

export const WorkforceScreen: React.FC<WorkforceScreenProps> = ({
  employees,
  onUpdateEmployees,
  onOpenAddEmployeeModal,
  currentUser,
  currentLanguage,
  onDispatchDirective,
  activeBusiness
}) => {
  const isArabic = currentLanguage.dir === 'rtl';
  const t = getTranslation(currentLanguage.code);
  const isCEO = currentUser?.roleType === 'CEO';
  const isTL = currentUser?.roleType === 'TEAM_LEADER';

  const [selectedDept, setSelectedDept] = useState('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [viewingReportEmp, setViewingReportEmp] = useState<Employee | null>(null);
  const [dismissConfirmEmp, setDismissConfirmEmp] = useState<Employee | null>(null);
  const [roleAllotEmp, setRoleAllotEmp] = useState<Employee | null>(null);
  const [allottedRoleType, setAllottedRoleType] = useState<'CEO' | 'TEAM_LEADER' | 'EMPLOYEE'>('EMPLOYEE');
  const [allottedRoleTitle, setAllottedRoleTitle] = useState<string>('');
  const [exportLang, setExportLang] = useState<ExportLanguage>(
    currentLanguage.code === 'ur' ? 'ur' : currentLanguage.code === 'ar' ? 'ar' : 'en'
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenRoleAllot = (emp: Employee) => {
    setRoleAllotEmp(emp);
    if (emp.role.toLowerCase().includes('ceo') || emp.role.includes('رئيس تنفيذي')) {
      setAllottedRoleType('CEO');
    } else if (emp.role.toLowerCase().includes('leader') || emp.role.toLowerCase().includes('قائد') || emp.role.toLowerCase().includes('مدير') || emp.role.toLowerCase().includes('مشرف')) {
      setAllottedRoleType('TEAM_LEADER');
    } else {
      setAllottedRoleType('EMPLOYEE');
    }
    setAllottedRoleTitle(emp.role);
  };

  const handleSaveRoleAllotment = () => {
    if (!roleAllotEmp || !isCEO) return;
    const finalRoleTitle = allottedRoleTitle.trim() || (allottedRoleType === 'CEO' ? 'الرئيس التنفيذي (CEO)' : allottedRoleType === 'TEAM_LEADER' ? 'قائد فريق معتمد (Team Leader)' : 'موظف تشغيلي (Staff Member)');
    
    const updated = employees.map(e => {
      if (e.id === roleAllotEmp.id) {
        return {
          ...e,
          role: finalRoleTitle
        };
      }
      return e;
    });
    onUpdateEmployees(updated);

    // Update local storage so next login reflects new role
    try {
      const customUsersRaw = localStorage.getItem('mjm_custom_users');
      if (customUsersRaw) {
        const usersList: any[] = JSON.parse(customUsersRaw);
        const updatedUsers = usersList.map(u => {
          if ((roleAllotEmp.email && u.email?.toLowerCase() === roleAllotEmp.email.toLowerCase()) || u.name?.toLowerCase() === roleAllotEmp.name.toLowerCase()) {
            return {
              ...u,
              role: finalRoleTitle,
              roleType: allottedRoleType
            };
          }
          return u;
        });
        localStorage.setItem('mjm_custom_users', JSON.stringify(updatedUsers));
      }
    } catch (e) {
      // ignore
    }

    // Dispatch Executive Directive
    const directive: ExecutiveDirective = {
      id: `dir_allot_${Date.now()}`,
      type: 'PROMOTION',
      title: `Executive Role Allotment: ${roleAllotEmp.name}`,
      titleAr: `قرار تعيين وتخصيص رتبة: تخصيص رتبة [${finalRoleTitle}] للأستاذ/ـة ${roleAllotEmp.name}`,
      message: `CEO has officially allotted the role of ${finalRoleTitle} (${allottedRoleType}) to ${roleAllotEmp.name}. System clearance updated.`,
      messageAr: `بموجب الصلاحيات السيادية للرئيس التنفيذي، تقرر تعيين وتخصيص رتبة [${finalRoleTitle}] للأستاذ/ـة (${roleAllotEmp.name}). تم تحديث صلاحيات الحساب والدخول لمنظومة ERP فورياً.`,
      employeeId: roleAllotEmp.id,
      employeeName: roleAllotEmp.name,
      issuedBy: 'ألكسندر ثورن (الرئيس التنفيذي - CEO)',
      issuedAt: new Date().toISOString(),
      acknowledgedByTL: false,
      businessUnitId: roleAllotEmp.businessUnitId,
      priority: 'CONFIDENTIAL'
    };
    onDispatchDirective(directive);

    showToast(
      isArabic
        ? `تم تخصيص الرتبة (${finalRoleTitle}) بنجاح للأستاذ/ـة ${roleAllotEmp.name} وتحديث صلاحيات الدخول!`
        : `Role (${finalRoleTitle}) officially allotted to ${roleAllotEmp.name}!`
    );
    setRoleAllotEmp(null);
  };

  // Filter employees by department and optionally active business
  const filteredEmployees = employees.filter((emp) => {
    if (activeBusiness.id !== 'biz_all' && emp.businessUnitId && emp.businessUnitId !== activeBusiness.id) {
      return false;
    }
    if (selectedDept === 'all') return true;
    return emp.department.includes(selectedDept) || emp.department === selectedDept;
  });

  // CEO Action: Promote Employee
  const handlePromote = (emp: Employee) => {
    if (!isCEO) return;

    const updated = employees.map(e => {
      if (e.id === emp.id) {
        const newSalary = e.salary ? Math.round(e.salary * 1.18) : 26000;
        return {
          ...e,
          rating: 'A' as const,
          salary: newSalary,
          role: e.role.includes('رئيس') || e.role.includes('Lead') ? e.role : `رئيس قسم / ${e.role}`
        };
      }
      return e;
    });

    onUpdateEmployees(updated);

    // Dispatch Executive Order to Team Leader automatically!
    const directive: ExecutiveDirective = {
      id: `dir_promo_${Date.now()}`,
      type: 'PROMOTION',
      title: `Executive Promotion Order: ${emp.name}`,
      titleAr: `قرار إداري نافذ: ترقية الأستاذ/ـة ${emp.name} واعتماد زيادة الراتب بنسبة 18%`,
      message: `The CEO Executive Office has officially promoted ${emp.name} with an immediate merit salary adjustment. Team Leaders are required to implement and acknowledge this order.`,
      messageAr: `اعتمد مكتب الرئيس التنفيذي ترقية الموظف/ـة (${emp.name}) وترقية سلم الرواتب بنسبة 18% تقديراً للأداء القيادي الاستثنائي. يرجى من قائد الفريق استلام التوجيه ومباشرة التحديث فورياً.`,
      employeeId: emp.id,
      employeeName: emp.name,
      issuedBy: 'ألكسندر ثورن (الرئيس التنفيذي - CEO)',
      issuedAt: new Date().toISOString(),
      acknowledgedByTL: false,
      businessUnitId: emp.businessUnitId,
      priority: 'CONFIDENTIAL'
    };

    onDispatchDirective(directive);

    showToast(
      isArabic
        ? `تمت ترقية ${emp.name} وإرسال قرار إداري فوري لصندوق بريد الـ Team Leader!`
        : `Promoted ${emp.name} and dispatched decree to Team Leader inbox!`
    );
  };

  // CEO Action: Reward Employee
  const handleReward = (emp: Employee) => {
    if (!isCEO) return;

    const bonusAmount = emp.salary ? Math.round(emp.salary * 0.5) : 10000;

    // Dispatch Executive Order to Team Leader automatically!
    const directive: ExecutiveDirective = {
      id: `dir_reward_${Date.now()}`,
      type: 'REWARD',
      title: `Discretionary Performance Bonus: ${emp.name}`,
      titleAr: `مكافأة تميز استثنائية: صرف مكافأة للأستاذ/ـة ${emp.name} بمبلغ ${bonusAmount.toLocaleString()} ريال`,
      message: `The CEO has authorized a performance incentive bonus of ${bonusAmount.toLocaleString()} SAR for ${emp.name}. Finance and Team Leader notified.`,
      messageAr: `بناءً على الصلاحيات الحصرية للرئيس التنفيذي، اعتمد سيادته صرف مكافأة تميز بمبلغ ${bonusAmount.toLocaleString()} ريال للأستاذ/ـة (${emp.name}). تم إشعار قائد الفريق وقسم المالية لصرفها مع أقرب مسير.`,
      employeeId: emp.id,
      employeeName: emp.name,
      issuedBy: 'ألكسندر ثورن (الرئيس التنفيذي - CEO)',
      issuedAt: new Date().toISOString(),
      acknowledgedByTL: false,
      businessUnitId: emp.businessUnitId,
      priority: 'STANDARD'
    };

    onDispatchDirective(directive);

    showToast(
      isArabic
        ? `تم اعتماد مكافأة تميز لـ ${emp.name} وإشعار قائد الفريق بالقرار فورياً!`
        : `Awarded bonus to ${emp.name} & notified Team Leader!`
    );
  };

  // CEO Action: Confirm Dismissal / Termination
  const handleDismissConfirm = () => {
    if (!isCEO || !dismissConfirmEmp) return;

    const emp = dismissConfirmEmp;
    const updated = employees.map(e => {
      if (e.id === emp.id) {
        return {
          ...e,
          status: 'dismissed' as const
        };
      }
      return e;
    });

    onUpdateEmployees(updated);

    // Dispatch Executive Termination Order to Team Leader automatically!
    const directive: ExecutiveDirective = {
      id: `dir_dismiss_${Date.now()}`,
      type: 'DISMISSAL',
      title: `Executive Decree: Employment Termination (${emp.name})`,
      titleAr: `قرار إداري عاجل ونافذ: إنهاء خدمة وفصل (${emp.name}) وسحب الصلاحيات`,
      message: `By order of the CEO, employment for ${emp.name} has been formally terminated. Team Leaders must revoke system clearance, recover company assets, and complete handovers immediately.`,
      messageAr: `بموجب القرار السيادي الصادر من مكتب الرئيس التنفيذي، تقرر إنهاء خدمة الموظف/ـة (${emp.name}) وسحب كافة التراخيص والعهد الرقمية والميدانية فوراً. على قائد الفريق اتخاذ الإجراءات النظامية وتأكيد الاستلام.`,
      employeeId: emp.id,
      employeeName: emp.name,
      issuedBy: 'ألكسندر ثورن (الرئيس التنفيذي - CEO)',
      issuedAt: new Date().toISOString(),
      acknowledgedByTL: false,
      businessUnitId: emp.businessUnitId,
      priority: 'URGENT'
    };

    onDispatchDirective(directive);

    showToast(
      isArabic
        ? `تم إنهاء خدمة ${emp.name} بقرار رئاسي وإرسال أمر عاجل لقائد الفريق لتسليم المهام!`
        : `Terminated ${emp.name} by CEO decree. Urgent directive dispatched to Team Leader!`
    );

    setDismissConfirmEmp(null);
  };

  return (
    <div className="w-full bg-[#0b0b0e] text-slate-100 min-h-screen py-4 sm:py-8 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

        {/* Dynamic Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 left-4 right-4 sm:right-auto sm:left-6 z-50 p-4 rounded-2xl bg-[#1c180e] border border-[#d4af35] text-slate-100 text-xs shadow-2xl flex items-center gap-3 animate-slideUp max-w-md">
            <Sparkles className="w-4 h-4 text-[#d4af35] shrink-0" />
            <span className="font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* 3D Header Section */}
        <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-[#17140e] via-[#211a0f] to-[#17140e] border border-[#d4af35]/40 shadow-[0_20px_45px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(212,175,53,0.3)] flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-[#f5d77f] to-[#997415] p-[1px] shadow-md shadow-[#d4af35]/30 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              </div>
              <h1 className="text-lg sm:text-2xl font-black text-white">
                {isArabic ? 'إدارة الكوادر وحوكمة الأداء (Workforce & HR)' : 'Workforce Governance & Performance Matrix'}
              </h1>
              {isCEO ? (
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500/20 text-[#f1d57f] border border-amber-500/40 flex items-center gap-1">
                  <Crown className="w-3 h-3 text-amber-400" />
                  <span>CEO Full Clearance</span>
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  <span>{currentUser?.roleType} View</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 max-w-3xl">
              {isArabic 
                ? 'منظومة تقييم الكفاءات ومؤشرات الأداء. الصلاحيات التنفيذية (التعيين، الترقية، المكافأة، وإنهاء الخدمة) محصورة حصراً بالرئيس التنفيذي، مع إرسال توجيهات آلية فورية لقادة الفرق.' 
                : 'Intelligent workforce governance matrix. Strategic personnel actions (Hiring, Promotions, Rewards, Dismissals, and Confidential Reports) are strictly restricted to the Executive CEO.'}
            </p>
          </div>

          {/* CEO Add Employee Button vs Restricted Badge */}
          {isCEO ? (
            <button
              onClick={onOpenAddEmployeeModal}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs font-black text-black bg-gradient-to-b from-[#f5d77f] via-[#d4af35] to-[#997415] shadow-[0_6px_16px_rgba(212,175,53,0.35),inset_0_1px_0_rgba(255,255,255,0.7)] hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 self-start md:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>{t.addEmployee}</span>
            </button>
          ) : (
            <div className="px-4 py-2 rounded-2xl bg-[#14120f] border border-[#302613] text-slate-400 text-xs flex items-center gap-2 shrink-0">
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <div className="text-start">
                <div className="font-bold text-slate-300 text-[11px]">{t.ceoOnly}</div>
                <div className="text-[9px] text-slate-500">Add/Promote/Dismiss locked</div>
              </div>
            </div>
          )}
        </div>

        {/* 4 Summary Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-2xl bg-[#121114] border border-[#2d2414] shadow-lg flex items-center justify-between">
            <div>
              <div className="text-[11px] sm:text-xs text-slate-400">{t.totalStaff}</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-1 font-mono">{filteredEmployees.length}</div>
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
              Active
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-[#121114] border border-[#2d2414] shadow-lg flex items-center justify-between">
            <div>
              <div className="text-[11px] sm:text-xs text-slate-400">{isArabic ? 'معدل الانضباط' : 'Attendance'}</div>
              <div className="text-xl sm:text-2xl font-black text-[#f1d57f] mt-1 font-mono">98.5%</div>
            </div>
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af35] shrink-0" />
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-[#121114] border border-[#2d2414] shadow-lg flex items-center justify-between">
            <div>
              <div className="text-[11px] sm:text-xs text-slate-400">{isArabic ? 'عن بعد' : 'Remote'}</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-1 font-mono">
                {filteredEmployees.filter(e => e.status === 'remote').length}
              </div>
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded bg-[#201a0e] text-[#d4af35] border border-[#3e3215] shrink-0">
              GPS Sync
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-[#121114] border border-[#2d2414] shadow-lg flex items-center justify-between">
            <div>
              <div className="text-[11px] sm:text-xs text-slate-400">{isArabic ? 'متوسط الأداء' : 'Avg Score'}</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-1 font-mono">95.2%</div>
            </div>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
          </div>
        </div>

        {/* Main Grid: Directory Table + Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Directory & Weekly Trend (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Employee Directory Table */}
            <div className="rounded-3xl bg-[#121114] border border-[#2d2414] overflow-hidden shadow-2xl p-4 sm:p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {isArabic ? 'سجل الكوادر والإجراءات التنفيذية' : 'Personnel Registry & Executive Controls'}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#221c0f] text-[#f1d57f] border border-[#3f3216]">
                    {filteredEmployees.length} Staff
                  </span>
                </div>

                {/* Department Filter */}
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="bg-[#18150e] border border-[#382c14] rounded-xl py-1.5 px-3 text-xs text-slate-200 outline-none self-start sm:self-auto"
                >
                  <option value="all">{isArabic ? 'كافة الأقسام والقطاعات' : 'All Departments'}</option>
                  <option value="التقني">{isArabic ? 'التقنية والذكاء الاصطناعي' : 'AI & Systems'}</option>
                  <option value="العمليات">{isArabic ? 'العمليات واللوجستيات' : 'Logistics'}</option>
                  <option value="العقاري">{isArabic ? 'التطوير العقاري' : 'Real Estate'}</option>
                  <option value="الأصول">{isArabic ? 'المالية وإدارة الأصول' : 'Finance'}</option>
                </select>
              </div>

              <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                <table className="w-full min-w-[620px] text-start text-xs text-slate-300">
                  <thead className="text-[11px] uppercase text-slate-400 bg-[#17140e] border-b border-[#2d2414]">
                    <tr>
                      <th className="py-3 px-3 text-start">{isArabic ? 'الموظف والتواصل' : 'Employee'}</th>
                      <th className="py-3 px-3 text-start">{isArabic ? 'المسمى الوظيفي' : 'Role'}</th>
                      <th className="py-3 px-3 text-start">{t.rating}</th>
                      <th className="py-3 px-3 text-start">{t.status}</th>
                      <th className="py-3 px-3 text-start">
                        {isCEO ? (
                          <span className="text-[#f1d57f] font-bold flex items-center gap-1">
                            <Crown className="w-3 h-3 text-amber-400" />
                            <span>{isArabic ? 'صلاحيات الرئيس التنفيذي' : 'CEO Controls'}</span>
                          </span>
                        ) : (
                          <span>{t.actions}</span>
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e190f]">
                    {filteredEmployees.map((emp) => {
                      const isDismissed = emp.status === 'dismissed';

                      return (
                        <tr key={emp.id} className={`hover:bg-[#181611] transition-colors ${isDismissed ? 'opacity-50' : ''}`}>
                          
                          {/* Avatar & Name */}
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={emp.avatar}
                                alt={emp.name}
                                className="w-9 h-9 rounded-full object-cover border border-[#d4af35]/50 shrink-0"
                              />
                              <div>
                                <div className="font-bold text-white text-xs flex items-center gap-1">
                                  <span>{emp.name}</span>
                                  {isDismissed && (
                                    <span className="text-[9px] px-1 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                                      فصل
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                                  <Phone className="w-2.5 h-2.5 text-[#d4af35]" />
                                  <span>{emp.phone}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Role */}
                          <td className="py-3.5 px-3">
                            <div className="font-medium text-slate-200">{emp.role}</div>
                            <div className="text-[10px] text-[#a88220]">{emp.department}</div>
                          </td>

                          {/* Rating */}
                          <td className="py-3.5 px-3">
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-black ${
                              emp.rating === 'A'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            }`}>
                              {emp.rating}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-3">
                            {isDismissed ? (
                              <span className="inline-flex items-center gap-1 text-[11px] text-red-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                <span>{isArabic ? 'تم إنهاء الخدمة' : 'Dismissed'}</span>
                              </span>
                            ) : emp.status === 'active' ? (
                              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                <span>{isArabic ? 'نشط بالمقر' : 'On-Site'}</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] text-[#f1d57f]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af35]"></span>
                                <span>{isArabic ? 'عمل عن بُعد' : 'Remote'}</span>
                              </span>
                            )}
                          </td>

                          {/* CEO Actions vs Restricted */}
                          <td className="py-3.5 px-3">
                            {isCEO ? (
                              <div className="flex items-center gap-1.5">
                                {/* Performance Report Button (CEO ONLY) */}
                                <button
                                  onClick={() => setViewingReportEmp(emp)}
                                  className="px-2 py-1 rounded-lg bg-[#201a0e] hover:bg-[#2e2412] text-[#f1d57f] border border-[#3e3014] transition-all text-[11px] font-bold flex items-center gap-1"
                                  title="عرض تقرير الأداء السري (صلاحية CEO)"
                                >
                                  <FileText className="w-3 h-3 text-[#d4af35]" />
                                  <span className="hidden sm:inline">{isArabic ? 'التقرير' : 'KPI'}</span>
                                </button>

                                {/* Allot Role Button (CEO Exclusive) */}
                                {!isDismissed && (
                                  <button
                                    onClick={() => handleOpenRoleAllot(emp)}
                                    className="px-2 py-1 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 transition-all text-[11px] font-bold flex items-center gap-1"
                                    title="تخصيص وتعديل رتبة الموظف (صلاحية CEO)"
                                  >
                                    <ShieldCheck className="w-3 h-3 text-blue-400" />
                                    <span className="hidden sm:inline">{isArabic ? 'تخصيص رتبة' : 'Allot Role'}</span>
                                  </button>
                                )}

                                {/* Promote Button */}
                                {!isDismissed && (
                                  <button
                                    onClick={() => handlePromote(emp)}
                                    className="px-2 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-all text-[11px] font-bold flex items-center gap-1"
                                    title="ترقية الموظف وإرسال توجيه لقائد الفريق"
                                  >
                                    <Sparkles className="w-3 h-3" />
                                    <span className="hidden sm:inline">{t.promote}</span>
                                  </button>
                                )}

                                {/* Reward Button */}
                                {!isDismissed && (
                                  <button
                                    onClick={() => handleReward(emp)}
                                    className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-[#f1d57f] border border-amber-500/40 transition-all text-[11px] font-bold flex items-center gap-1"
                                    title="صرف مكافأة تميز وإشعار قائد الفريق"
                                  >
                                    <Award className="w-3 h-3" />
                                    <span className="hidden sm:inline">{t.reward}</span>
                                  </button>
                                )}

                                {/* Dismiss Button */}
                                {!isDismissed && (
                                  <button
                                    onClick={() => setDismissConfirmEmp(emp)}
                                    className="px-2 py-1 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 transition-all text-[11px] font-bold flex items-center gap-1"
                                    title="فصل الموظف وإصدار أمر عاجل للـ Team Leader"
                                  >
                                    <UserMinus className="w-3 h-3" />
                                    <span className="hidden sm:inline">{t.dismiss}</span>
                                  </button>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                                <Lock className="w-3 h-3 text-amber-500/70" />
                                <span>{isArabic ? 'خاص بالرئيس التنفيذي' : 'CEO Clearance Required'}</span>
                              </div>
                            )}
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Weekly Productivity Trend */}
            <div className="p-5 rounded-3xl bg-[#121114] border border-[#2d2414] shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {isArabic ? 'معدل الإنتاجية الأسبوعية' : 'Weekly Productivity Rate'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isArabic ? 'متوسط إنجاز المهام وفق مؤشرات الأداء' : 'Average task throughput per day'}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-400">+5.4% نمو</span>
              </div>

              {/* Days Bar with 3D Gradients */}
              <div className="grid grid-cols-6 gap-2 pt-2 text-center text-xs">
                {[
                  { day: isArabic ? 'الأحد' : 'Sun', score: 92 },
                  { day: isArabic ? 'الإثنين' : 'Mon', score: 95 },
                  { day: isArabic ? 'الثلاثاء' : 'Tue', score: 98 },
                  { day: isArabic ? 'الأربعاء' : 'Wed', score: 94 },
                  { day: isArabic ? 'الخميس' : 'Thu', score: 96 },
                  { day: isArabic ? 'السبت' : 'Sat', score: 89 }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5 group">
                    <div className="h-28 bg-[#18150f] rounded-2xl flex items-end justify-center p-1.5 border border-[#2f2413] shadow-inner">
                      <div 
                        style={{ height: `${item.score - 50}%` }}
                        className="w-full bg-gradient-to-t from-[#826416] to-[#d4af35] rounded-xl group-hover:brightness-125 transition-all shadow-md shadow-[#d4af35]/20"
                      ></div>
                    </div>
                    <div className="text-[11px] font-bold text-slate-300">{item.day}</div>
                    <div className="text-[10px] text-[#f1d57f] font-mono">{item.score}%</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Top Performers Leaderboard (1 Col) */}
          <div className="space-y-6">

            {/* Elite Performers */}
            <div className="p-5 rounded-3xl bg-[#121114] border border-[#2d2414] shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[#d4af35]/20 text-[#d4af35] border border-[#d4af35]/30">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    {isArabic ? 'لوحة الشرف - الموظفون المتميزون' : 'Top Performers Leaderboard'}
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                {TOP_PERFORMERS.map((perf) => (
                  <div
                    key={perf.rank}
                    className="p-3 rounded-2xl bg-[#17140e] border border-[#2f2514] flex items-center justify-between hover:border-[#d4af35]/50 transition-colors shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={perf.avatar}
                          alt={perf.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#d4af35]"
                        />
                        <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${
                          perf.rank === 1 ? 'bg-[#d4af35] text-black' : 'bg-[#222222] text-[#f1d57f] border border-[#d4af35]/40'
                        }`}>
                          {perf.rank}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs">{perf.name}</div>
                        <div className="text-[10px] text-slate-400">{perf.role}</div>
                      </div>
                    </div>

                    <div className="text-end">
                      <div className="font-mono font-bold text-[#f1d57f] text-xs">{perf.score}</div>
                      <div className="text-[9px] text-emerald-400 font-bold">Grade A</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CEO Confidential Clearance Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#1b170c] via-[#14120a] to-[#12110e] border border-[#3e3115] shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-black text-[#f1d57f]">
                  {isArabic ? 'حوكمة الصلاحيات التنفيذية (RBAC)' : 'Role Clearance Governance'}
                </h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                {isArabic
                  ? 'يتمتع الرئيس التنفيذي بالوصول الكامل لكافة شاشات المنظومة وتقارير الرواتب والأداء والتعيين والفصل، بينما يتلقى قادة الفرق إشعارات فورية في بريد التوجيهات.'
                  : 'The Executive CEO possesses unilateral authority for onboarding, dismissal, promotions, and reviewing confidential dossiers.'}
              </p>
            </div>

          </div>

        </div>

        {/* CEO Confidential Performance Report Modal */}
        {viewingReportEmp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-lg p-6 rounded-3xl bg-[#121114] border border-[#d4af35] shadow-2xl space-y-5 text-slate-100">
              <div className="flex items-center justify-between pb-3 border-b border-[#2d2311]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-[#f1d57f] border border-amber-500/40 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-black text-white">
                        {isArabic ? 'تقرير الأداء والتقييم السري' : 'Confidential Performance Dossier'}
                      </h3>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 font-mono">
                        CEO EYES ONLY
                      </span>
                    </div>
                    <p className="text-xs text-[#a88225] font-semibold">{viewingReportEmp.name} • {viewingReportEmp.role}</p>
                  </div>
                </div>

                <button
                  onClick={() => setViewingReportEmp(null)}
                  className="w-8 h-8 rounded-xl bg-[#1c1811] hover:bg-[#2a2215] text-slate-400 hover:text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* KPI Score Cards */}
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-3 rounded-2xl bg-[#17140e] border border-[#302613]">
                  <div className="text-[10px] text-slate-400">{isArabic ? 'التقييم الشامل' : 'Overall KPI'}</div>
                  <div className="text-lg font-black text-[#f1d57f] font-mono mt-0.5">
                    {viewingReportEmp.performanceReport?.overallScore || viewingReportEmp.performanceScore}%
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#17140e] border border-[#302613]">
                  <div className="text-[10px] text-slate-400">{isArabic ? 'نسبة الإنجاز' : 'Achievement'}</div>
                  <div className="text-lg font-black text-emerald-400 font-mono mt-0.5">
                    {viewingReportEmp.performanceReport?.kpiAchievement || 96}%
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#17140e] border border-[#302613]">
                  <div className="text-[10px] text-slate-400">{isArabic ? 'الراتب الشهري' : 'Monthly Salary'}</div>
                  <div className="text-xs font-black text-white font-mono mt-1">
                    {(viewingReportEmp.salary || 22000).toLocaleString()} SAR
                  </div>
                </div>
              </div>

              {/* Confidential Notes */}
              <div className="p-3.5 rounded-2xl bg-[#0e0d0a] border border-[#241c0e] space-y-1">
                <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-[#d4af35]" />
                  <span>{isArabic ? 'ملاحظات التقييم السرية (محصورة للرئيس التنفيذي):' : 'Executive Assessment Notes:'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {viewingReportEmp.performanceReport?.confidentialNotes || 'مستوى كفاءة عالي مع التزام تام بالسياسات الإدارية الموحدة وتجاوز مستهدفات الربع المالي.'}
                </p>
              </div>

              {/* Action Buttons & Export in Modal */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#261f10]">
                <div className="flex items-center gap-2">
                  <div className="text-[10px] text-slate-500 font-mono">
                    Review: {viewingReportEmp.performanceReport?.lastReviewDate || '2025-01-15'}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <ExportLanguageSelector 
                      currentLang={exportLang} 
                      onChange={setExportLang} 
                    />

                    {/* Export Dossier to PDF Button */}
                    <button
                      onClick={() => {
                        const emp = viewingReportEmp;
                        let title = `Confidential Performance Dossier - ${emp.name}`;
                        let subtitle = `Role: ${emp.role} | Dept: ${emp.department} | Clearance: CEO Confidential`;
                        let cols = [
                          { header: 'Metric / Evaluation Field', dataKey: 'field' },
                          { header: 'Detail / Value', dataKey: 'value' },
                          { header: 'Status / Note', dataKey: 'status' }
                        ];
                        let rows: Record<string, any>[] = [];
                        let summaryMetrics = [
                          { label: 'Overall KPI', value: `${emp.performanceReport?.overallScore || emp.performanceScore}%` },
                          { label: 'Achievement', value: `${emp.performanceReport?.kpiAchievement || 96}%` },
                          { label: 'Discipline', value: `${emp.performanceReport?.disciplineRate || 98}%` },
                          { label: 'Salary', value: `${(emp.salary || 22000).toLocaleString()} SAR` }
                        ];

                        if (exportLang === 'ar') {
                          title = `ملف تقرير الأداء السري - ${emp.name}`;
                          subtitle = `المسمى الوظيفي: ${translateValue(emp.role, 'ar')} | القسم: ${emp.department} | تصريح: سري للغاية - للرئيس التنفيذي`;
                          cols = [
                            { header: 'معيار ومجال التقييم', dataKey: 'field' },
                            { header: 'التفاصيل / القيمة المعتمدة', dataKey: 'value' },
                            { header: 'الحالة / الملاحظة', dataKey: 'status' }
                          ];
                          rows = [
                            { field: 'اسم الموظف الكامل', value: emp.name, status: 'موظف معتمد وموثق' },
                            { field: 'المسمى الوظيفي والرتبة', value: emp.role, status: emp.rating === 'A' ? 'الفئة الأولى (أ+)' : 'الفئة الثانية (ب)' },
                            { field: 'الشركة التابعة والقطاع', value: emp.department, status: 'قطاع نشط' },
                            { field: 'البريد الإلكتروني المعتمد', value: emp.email || 'corporate@mjmholding.com', status: 'اتصال داخلي مشفر' },
                            { field: 'رقم الهاتف المباشر', value: emp.phone, status: 'موثق لدى الموارد البشرية' },
                            { field: 'الراتب الشهري المعتمد', value: `${(emp.salary || 22000).toLocaleString()} ر.س`, status: 'حزمة تنفيذية' },
                            { field: 'المؤشر العام للأداء (KPI)', value: `${emp.performanceReport?.overallScore || emp.performanceScore}%`, status: 'تقييم شامل' },
                            { field: 'نسبة تحقيق المستهدفات', value: `${emp.performanceReport?.kpiAchievement || 96}%`, status: 'مستهدف محقق' },
                            { field: 'معدل الحضور والانضباط', value: `${emp.performanceReport?.disciplineRate || 98}%`, status: 'مثالي' },
                            { field: 'الجاهزية القيادية والترقية', value: emp.performanceReport?.leadershipPotential || 'مرتفعة جداً', status: 'مؤهل للترقية' },
                            { field: 'ملاحظات الرئيس التنفيذي السرية', value: emp.performanceReport?.confidentialNotes || 'مستوى كفاءة قيادي عالي مع التزام كامل بالسياسات الإدارية الموحدة.', status: 'اطلاع الرئيس التنفيذي فقط' }
                          ];
                          summaryMetrics = [
                            { label: 'المؤشر العام', value: `${emp.performanceReport?.overallScore || emp.performanceScore}%` },
                            { label: 'المستهدفات', value: `${emp.performanceReport?.kpiAchievement || 96}%` },
                            { label: 'الانضباط', value: `${emp.performanceReport?.disciplineRate || 98}%` },
                            { label: 'الراتب', value: `${(emp.salary || 22000).toLocaleString()} ر.س` }
                          ];
                        } else if (exportLang === 'ur') {
                          title = `خفیہ کارکردگی رپورٹ و دستاویز - ${translateValue(emp.name, 'ur')}`;
                          subtitle = `عہدہ: ${translateValue(emp.role, 'ur')} | شعبہ: ${translateValue(emp.department, 'ur')} | سیکیورٹی کلیئرنس: صرف سی ای او`;
                          cols = [
                            { header: 'کارکردگی کا پیمانہ', dataKey: 'field' },
                            { header: 'تفصیلات / مقدار', dataKey: 'value' },
                            { header: 'حیثیت / نوٹس', dataKey: 'status' }
                          ];
                          rows = [
                            { field: 'ملازم کا مکمل نام', value: translateValue(emp.name, 'ur'), status: 'تصدیق شدہ عملہ' },
                            { field: 'عہدہ و منصب', value: translateValue(emp.role, 'ur'), status: emp.rating === 'A' ? 'اعلیٰ گریڈ اے' : 'گریڈ بی' },
                            { field: 'ذیلی شعبہ / ڈویژن', value: translateValue(emp.department, 'ur'), status: 'فعال شعبہ' },
                            { field: 'باضابطہ ای میل', value: emp.email || 'corporate@mjmholding.com', status: 'محفوظ مواصلات' },
                            { field: 'رابطہ نمبر', value: emp.phone, status: 'ایچ آر تصدیق شدہ' },
                            { field: 'ماہانہ منظور شدہ تنخواہ', value: `${(emp.salary || 22000).toLocaleString()} ریال`, status: 'ایگزیکٹو پے' },
                            { field: 'مجموعی کے پی آئی اسکور', value: `${emp.performanceReport?.overallScore || emp.performanceScore}%`, status: 'جائزہ شدہ' },
                            { field: 'تکمیل شدہ اہداف کا تناسب', value: `${emp.performanceReport?.kpiAchievement || 96}%`, status: 'اہداف مکمل' },
                            { field: 'حاضری و نظم و ضبط', value: `${emp.performanceReport?.disciplineRate || 98}%`, status: 'مثالی' },
                            { field: 'قیادت اور ترقی کی صلاحیت', value: emp.performanceReport?.leadershipPotential || 'اعلیٰ', status: 'ترقی کے اہل' },
                            { field: 'سی ای او کے خصوصی خفیہ نوٹس', value: emp.performanceReport?.confidentialNotes || 'بہترین کارکردگی اور بروقت ایگزیکٹو ڈلیوری۔', status: 'صرف سی ای او ملاحظہ' }
                          ];
                          summaryMetrics = [
                            { label: 'مجموعی کے پی آئی', value: `${emp.performanceReport?.overallScore || emp.performanceScore}%` },
                            { label: 'اہداف کی تکمیل', value: `${emp.performanceReport?.kpiAchievement || 96}%` },
                            { label: 'نظم و ضبط', value: `${emp.performanceReport?.disciplineRate || 98}%` },
                            { label: 'ماہانہ تنخواہ', value: `${(emp.salary || 22000).toLocaleString()} ریال` }
                          ];
                        } else {
                          rows = [
                            { field: 'Employee Full Name', value: emp.name, status: 'Verified Personnel' },
                            { field: 'Corporate Role & Title', value: emp.role, status: emp.rating === 'A' ? 'Top Tier A' : 'Tier B' },
                            { field: 'Subsidiary & Department', value: emp.department, status: 'Active Division' },
                            { field: 'Official Contact Email', value: emp.email || 'corporate@mjmholding.com', status: 'Secure Internal' },
                            { field: 'Direct Phone / Mobile', value: emp.phone, status: 'HR Verified' },
                            { field: 'Monthly Approved Salary', value: `${(emp.salary || 22000).toLocaleString()} SAR`, status: 'Executive Band' },
                            { field: 'Overall KPI Performance Score', value: `${emp.performanceReport?.overallScore || emp.performanceScore}%`, status: 'Evaluated' },
                            { field: 'Quarterly Task Achievement Rate', value: `${emp.performanceReport?.kpiAchievement || 96}%`, status: 'Targets Met' },
                            { field: 'Discipline & Attendance Rating', value: `${emp.performanceReport?.disciplineRate || 98}%`, status: 'Exemplary' },
                            { field: 'Leadership & Expansion Potential', value: emp.performanceReport?.leadershipPotential || 'High', status: 'Promotable' },
                            { field: 'Executive Confidential Notes', value: emp.performanceReport?.confidentialNotes || 'High performance with outstanding executive delivery.', status: 'CEO Eyes Only' }
                          ];
                        }

                        exportToPdf(
                          title,
                          subtitle,
                          cols,
                          rows,
                          `Performance_Dossier_${emp.name.replace(/\s+/g, '_')}_${exportLang.toUpperCase()}_${Date.now()}`,
                          summaryMetrics,
                          exportLang
                        );

                        showToast(
                          exportLang === 'ar' 
                            ? `تم تصدير ملف تقرير أداء (${emp.name}) باللغة العربية (PDF) بنجاح!` 
                            : exportLang === 'ur'
                            ? `ملازم (${translateValue(emp.name, 'ur')}) کا کارکردگی ریکارڈ اردو میں PDF / پرنٹ فارمیٹ میں تیار کر دیا گیا ہے`
                            : `Performance report for (${emp.name}) exported to PDF (English)!`
                        );
                      }}
                      className="px-2.5 py-1 rounded-xl bg-[#1c1810] hover:bg-[#2a2213] text-[#f1d57f] border border-[#d4af35]/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                      title="Export employee performance dossier to PDF"
                    >
                      <Download className="w-3.5 h-3.5 text-[#d4af35]" />
                      <span>{exportLang === 'ar' ? 'تصدير PDF' : exportLang === 'ur' ? 'پی ڈی ایف برآمد' : 'Export PDF'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      handlePromote(viewingReportEmp);
                      setViewingReportEmp(null);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all"
                  >
                    {t.promote}
                  </button>
                  <button
                    onClick={() => {
                      handleReward(viewingReportEmp);
                      setViewingReportEmp(null);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-b from-[#f5d77f] to-[#b8860b] text-black text-xs font-black transition-all"
                  >
                    {t.reward}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CEO Dismissal Confirmation Dialog */}
        {dismissConfirmEmp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-md p-6 rounded-3xl bg-[#141111] border border-red-500/50 shadow-2xl space-y-4 text-slate-100 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center">
                <AlertCircle className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-black text-white">
                  {isArabic ? 'تأكيد إصدار قرار إنهاء الخدمة والفصل' : 'Confirm Executive Termination Order'}
                </h3>
                <p className="text-xs text-slate-400">
                  {isArabic 
                    ? `هل أنت متأكد من إنهاء خدمة الموظف/ـة (${dismissConfirmEmp.name})؟ سيتم إصدار أمر إداري عاجل ونافذ فورياً لصندوق بريد قائد الفريق (Team Leader) لسحب الصلاحيات والعهد.`
                    : `Are you sure you want to terminate ${dismissConfirmEmp.name}? An immediate decree will be dispatched to the Team Leader inbox.`}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setDismissConfirmEmp(null)}
                  className="px-5 py-2 rounded-xl bg-[#201c18] hover:bg-[#2c2621] text-slate-300 text-xs font-bold transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleDismissConfirm}
                  className="px-5 py-2 rounded-xl bg-gradient-to-b from-red-500 to-red-700 text-white font-black text-xs shadow-lg shadow-red-500/30 hover:brightness-110 active:translate-y-0.5 transition-all"
                >
                  {isArabic ? 'تأكيد الفصل وتعميم القرار' : 'Confirm & Dispatch Decree'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CEO Exclusive Role Allotment Modal */}
        {roleAllotEmp && isCEO && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#13100a] border border-[#d4af35] rounded-3xl p-6 shadow-2xl shadow-black space-y-5 animate-slideUp">
              <div className="flex items-center justify-between pb-3 border-b border-[#2d2415]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">
                      {isArabic ? 'تخصيص وتعيين الرتبة (صلاحية CEO)' : 'CEO Role & Clearance Allotment'}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {roleAllotEmp.name} ({roleAllotEmp.email || roleAllotEmp.department})
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setRoleAllotEmp(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {isArabic ? 'مستوى الصلاحية والوصول للنظام' : 'Access Level & Role Type'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setAllottedRoleType('EMPLOYEE')}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                        allottedRoleType === 'EMPLOYEE'
                          ? 'bg-[#241c0e] border-[#d4af35] text-[#f1d57f] shadow-md shadow-[#d4af35]/20'
                          : 'bg-[#181510] border-[#2f2415] text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-[10px] text-slate-500 mb-0.5">Staff</div>
                      <span>{isArabic ? 'موظف تشغيلي' : 'Employee'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAllottedRoleType('TEAM_LEADER')}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                        allottedRoleType === 'TEAM_LEADER'
                          ? 'bg-[#241c0e] border-[#d4af35] text-[#f1d57f] shadow-md shadow-[#d4af35]/20'
                          : 'bg-[#181510] border-[#2f2415] text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-[10px] text-amber-500 mb-0.5">Manager</div>
                      <span>{isArabic ? 'قائد فريق' : 'Team Leader'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAllottedRoleType('CEO')}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                        allottedRoleType === 'CEO'
                          ? 'bg-[#241c0e] border-[#d4af35] text-[#f1d57f] shadow-md shadow-[#d4af35]/20'
                          : 'bg-[#181510] border-[#2f2415] text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-[10px] text-emerald-400 mb-0.5">Executive</div>
                      <span>{isArabic ? 'رئيس تنفيذي' : 'CEO'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {isArabic ? 'المسمى الوظيفي المخصص' : 'Custom Job Title'}
                  </label>
                  <input
                    type="text"
                    value={allottedRoleTitle}
                    onChange={(e) => setAllottedRoleTitle(e.target.value)}
                    placeholder={
                      allottedRoleType === 'CEO'
                        ? (isArabic ? 'مثال: الرئيس التنفيذي للعمليات' : 'e.g., Chief Operating Officer')
                        : allottedRoleType === 'TEAM_LEADER'
                        ? (isArabic ? 'مثال: قائد فريق التحليل المالي' : 'e.g., Financial Lead')
                        : (isArabic ? 'مثال: أخصائي عمليات أول' : 'e.g., Operations Specialist')
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#17140f] border border-[#3e3118] text-white text-xs focus:border-[#d4af35] focus:outline-none"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    {isArabic 
                      ? 'عند تسجيل الدخول القادم لهذا المستخدم، سيتم توجيهه لواجهة وبوابة الصلاحيات المحددة هنا.' 
                      : 'Next time this user logs in, the portal will grant access based on this allotted role.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRoleAllotEmp(null)}
                  className="px-4 py-2 rounded-xl bg-[#201c18] hover:bg-[#2c2621] text-slate-300 text-xs font-bold transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  type="button"
                  onClick={handleSaveRoleAllotment}
                  className="px-5 py-2 rounded-xl bg-gradient-to-b from-[#f5d77f] via-[#d4af35] to-[#997415] text-black font-black text-xs shadow-lg shadow-[#d4af35]/30 hover:brightness-105 active:translate-y-0.5 transition-all flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{isArabic ? 'اعتماد التخصيص وإشعار الموظف' : 'Save Allotment'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
