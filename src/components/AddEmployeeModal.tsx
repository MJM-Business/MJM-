import React, { useState } from 'react';
import { Employee, BusinessUnit, LanguageItem, ExecutiveDirective } from '../types';
import { CONNECTED_BUSINESSES } from '../data/mockData';
import { 
  X, 
  UserPlus, 
  Crown, 
  Sparkles, 
  Building2, 
  Phone, 
  Mail, 
  Briefcase, 
  DollarSign, 
  Award,
  ShieldAlert
} from 'lucide-react';
import { getTranslation } from '../data/translations';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEmployee: (emp: Employee, directive: ExecutiveDirective) => void;
  currentLanguage: LanguageItem;
  isCEO: boolean;
}

export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  onAddEmployee,
  currentLanguage,
  isCEO
}) => {
  const isArabic = currentLanguage.dir === 'rtl';
  const t = getTranslation(currentLanguage.code);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('التطوير التقني والذكاء الاصطناعي');
  const [businessUnitId, setBusinessUnitId] = useState('biz_tech');
  const [rating, setRating] = useState<'A' | 'B' | 'C'>('A');
  const [status, setStatus] = useState<'active' | 'remote'>('active');
  const [salary, setSalary] = useState<number>(22000);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  if (!isCEO) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
        <div className="max-w-md w-full p-6 rounded-3xl bg-[#14120e] border border-red-500/40 text-center shadow-2xl space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/40">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black text-white">
            {isArabic ? 'صلاحية مقيدة - مطلوب ترخيص الرئيس التنفيذي' : 'Access Denied - CEO Clearance Required'}
          </h3>
          <p className="text-xs text-slate-400">
            {isArabic
              ? 'وفقاً لبروتوكول الحوكمة السيادي، لا يحق إلا للرئيس التنفيذي (CEO) حصراً إصدار قرارات التعيين وإضافة كوادر جديدة للمجموعة.'
              : 'Per corporate governance policies, adding new personnel is strictly restricted to the Executive CEO.'}
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#221c10] text-[#f1d57f] border border-[#443615] text-xs font-bold hover:bg-[#322813] transition-colors"
          >
            {t.cancel}
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !phone.trim()) {
      setError(isArabic ? 'يرجى ملء جميع الحقول الإلزامية الأساسية.' : 'Please fill all mandatory fields.');
      return;
    }

    const newEmpId = `emp_${Date.now()}`;
    const selectedBiz = CONNECTED_BUSINESSES.find(b => b.id === businessUnitId) || CONNECTED_BUSINESSES[0];

    const newEmployee: Employee = {
      id: newEmpId,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@mjmholding.com`,
      role: role.trim(),
      rating,
      status,
      department: department.trim(),
      performanceScore: rating === 'A' ? 96.5 : rating === 'B' ? 88.0 : 75.0,
      businessUnitId,
      salary,
      dateJoined: new Date().toISOString().split('T')[0],
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTqHzecR_WoQ4-hUk7kIPovgxQAgR2_OVYnT4UxRmCvfqJkGrgI64mSSP2M0k_9AdrM1Iv7PfmdBoXzOpWy8RHV3VX8LNsqirEccfbUvnex_OtIMfL_2C3NIaBsp-CqrInjZms-DvpizEzDNHuzcM1a0NURdsR0n1DO5KswvPiX-GYVfgzRrbBhs_z29mkU6gf-TDr9a5A1ontnkhiIOfZobDw_kupItcct2c0tz5s3VTwpoXOZBJJ9CTZ6eODkl-ue1INHY5png',
      performanceReport: {
        overallScore: rating === 'A' ? 96.5 : 88.0,
        kpiAchievement: rating === 'A' ? 98.0 : 89.0,
        disciplineRate: 98.5,
        projectsCompleted: 0,
        leadershipPotential: rating === 'A' ? 'High' : 'Medium',
        confidentialNotes: `تم التعيين بقرار مباشر من الرئيس التنفيذي في ${new Date().toLocaleDateString('ar-SA')}. تم تخصيص ميزانية استقطاب براتب ${salary} ريال شهرياً.`,
        salaryGrade: `Grade ${rating === 'A' ? 'G4' : 'G3'}`,
        lastReviewDate: new Date().toISOString().split('T')[0],
        eligibleForBonus: rating === 'A'
      }
    };

    // Automatically construct official Executive Order / Directive for the Team Leader!
    const newDirective: ExecutiveDirective = {
      id: `dir_hire_${Date.now()}`,
      type: 'NEW_HIRE',
      title: `Executive Decree: New Personnel Onboarded (${name.trim()})`,
      titleAr: `قرار إداري نافذ: تعيين الأستاذ/ـة (${name.trim()}) في قطاع (${selectedBiz.nameAr})`,
      message: `The CEO Executive Office has authorized the appointment of ${name.trim()} as ${role.trim()} with a monthly compensation of ${salary.toLocaleString()} SAR. Team Leaders are instructed to initiate onboarding procedures immediately.`,
      messageAr: `اعتمد مكتب الرئيس التنفيذي تعيين (${name.trim()}) بمسمى (${role.trim()}) في قسم (${department}) براتب شهري ${salary.toLocaleString()} ريال. على قائد الفريق المعني استلام التوجيه ومباشرة التمكين الإداري والتقني فورياً.`,
      employeeId: newEmpId,
      employeeName: name.trim(),
      issuedBy: 'ألكسندر ثورن (الرئيس التنفيذي - CEO)',
      issuedAt: new Date().toISOString(),
      acknowledgedByTL: false,
      businessUnitId,
      priority: 'STANDARD'
    };

    onAddEmployee(newEmployee, newDirective);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl max-h-[90vh] bg-[#111114] border border-[#d4af35]/50 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(212,175,53,0.3)] flex flex-col overflow-hidden text-slate-100"
        dir={currentLanguage.dir}
      >
        {/* Header with 3D Gold Accent */}
        <div className="p-5 border-b border-[#2d2414] bg-gradient-to-r from-[#1b170e] via-[#241d11] to-[#1b170e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#f5d77f] to-[#997415] p-[1.5px] shadow-lg shadow-[#d4af35]/30 flex items-center justify-center">
              <div className="w-full h-full bg-[#13110b] rounded-[14px] flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-[#f1d57f]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-white">
                  {isArabic ? 'إضافة موظف جديد - اعتماد الرئيس التنفيذي' : 'Add New Employee - CEO Authorization'}
                </h2>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                  <Crown className="w-3 h-3 text-amber-400" />
                  <span>CEO Only</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isArabic 
                  ? 'سيتم حفظ الموظف فورياً وإرسال تعميم رسمي آلي لصندوق بريد قائد الفريق (Team Leader Inbox).' 
                  : 'Saves staff member and dispatches automated directive to Team Leader inbox.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#1c1811] hover:bg-[#2b2315] border border-[#3d3116] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[65vh] scrollbar-thin">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <span>{isArabic ? 'اسم الموظف الثلاثي' : 'Full Name'}</span>
              <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isArabic ? 'مثال: عبدالمحسن بن طلال' : 'e.g. Tariq Al-Mansoor'}
              className="w-full bg-[#0b0a08] border border-[#3b3017] focus:border-[#d4af35] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all shadow-inner"
            />
          </div>

          {/* Phone & Email Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-[#d4af35]" />
                <span>{isArabic ? 'رقم الواتساب والتواصل' : 'Phone / WhatsApp'}</span>
                <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+966 50 000 0000"
                className="w-full bg-[#0b0a08] border border-[#3b3017] focus:border-[#d4af35] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all shadow-inner"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-[#d4af35]" />
                <span>{isArabic ? 'البريد المهني المؤسسي' : 'Corporate Email'}</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="employee@mjmholding.com"
                className="w-full bg-[#0b0a08] border border-[#3b3017] focus:border-[#d4af35] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Role & Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Briefcase className="w-3 h-3 text-[#d4af35]" />
                <span>{isArabic ? 'المسمى الوظيفي' : 'Job Title / Role'}</span>
                <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder={isArabic ? 'مثال: مهندس برمجيات ونظم 3D' : 'e.g. Lead Systems Engineer'}
                className="w-full bg-[#0b0a08] border border-[#3b3017] focus:border-[#d4af35] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all shadow-inner"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-3 h-3 text-[#d4af35]" />
                <span>{isArabic ? 'القطاع والشركة التابعة' : 'Business Subsidiary'}</span>
              </label>
              <select
                value={businessUnitId}
                onChange={(e) => setBusinessUnitId(e.target.value)}
                className="w-full bg-[#0b0a08] border border-[#3b3017] focus:border-[#d4af35] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
              >
                {CONNECTED_BUSINESSES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {isArabic ? b.nameAr : b.name} ({b.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Department, Salary, Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">
                {isArabic ? 'القسم الداخلي' : 'Department'}
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-[#0b0a08] border border-[#3b3017] focus:border-[#d4af35] rounded-xl px-2.5 py-2.5 text-xs text-white outline-none"
              >
                <option value="التطوير التقني والذكاء الاصطناعي">التقنية والذكاء الاصطناعي</option>
                <option value="العمليات وسلاسل الإمداد">العمليات واللوجستيات</option>
                <option value="التطوير والاستثمار العقاري">التطوير العقاري</option>
                <option value="إدارة الأصول والاستثمار">المالية والاستثمار</option>
                <option value="الموارد البشرية والحوكمة">الموارد البشرية</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-emerald-400" />
                <span>{isArabic ? 'الراتب المعتمد (ر.س)' : 'Monthly Salary'}</span>
              </label>
              <input
                type="number"
                min={5000}
                max={200000}
                step={500}
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full bg-[#0b0a08] border border-[#3b3017] focus:border-[#d4af35] rounded-xl px-3 py-2.5 text-xs text-white outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <Award className="w-3 h-3 text-[#d4af35]" />
                <span>{isArabic ? 'التقييم الأولي' : 'Initial Rating'}</span>
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value as 'A' | 'B' | 'C')}
                className="w-full bg-[#0b0a08] border border-[#3b3017] focus:border-[#d4af35] rounded-xl px-3 py-2.5 text-xs text-white outline-none"
              >
                <option value="A">Grade A (ممتاز / 96%+)</option>
                <option value="B">Grade B (جيد جداً / 88%+)</option>
                <option value="C">Grade C (مقبول / 75%+)</option>
              </select>
            </div>
          </div>

          {/* Work Status */}
          <div className="space-y-1 pt-1">
            <label className="text-xs font-bold text-slate-300">
              {isArabic ? 'نمط العمل المعتمد' : 'Work Location'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus('active')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  status === 'active'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                    : 'bg-[#15130d] text-slate-400 border-[#2d2413]'
                }`}
              >
                {isArabic ? '🏢 دوام حضوري بالمقر' : 'On-Site Office'}
              </button>
              <button
                type="button"
                onClick={() => setStatus('remote')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  status === 'remote'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-[#15130d] text-slate-400 border-[#2d2413]'
                }`}
              >
                {isArabic ? '🌐 عمل عن بعد (Remote)' : 'Remote / Field'}
              </button>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-[#292212] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#1b1710] hover:bg-[#282115] border border-[#3b2f15] text-slate-300 text-xs font-bold transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-b from-[#f5d77f] via-[#d4af35] to-[#997415] text-black font-black text-xs shadow-[0_4px_12px_rgba(212,175,53,0.35),inset_0_1px_0_rgba(255,255,255,0.6)] hover:brightness-105 active:translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>{isArabic ? 'اعتماد التعيين وإرسال التوجيه للـ Team Leader' : 'Authorize & Notify Team Leader'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
