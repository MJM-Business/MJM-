import React, { useState } from 'react';
import { BankAccount, Language } from '../types';
import { INITIAL_BANK_ACCOUNTS } from '../data/mockData';
import { 
  Building2, 
  CreditCard, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Upload, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  Lock
} from 'lucide-react';

interface RegistrationScreenProps {
  language: Language;
}

export const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ language }) => {
  const isArabic = language === 'ar';

  const [representativeName, setRepresentativeName] = useState('أحمد المحمدي');
  const [roleTitle, setRoleTitle] = useState('المدير التنفيذي المفوض');
  const [nationalId, setNationalId] = useState('1087654321');
  const [companyName, setCompanyName] = useState('شركة ريادة المستقبل العالمية للتجارة ش.م.م');
  const [crNumber, setCrNumber] = useState('1010892341');
  const [taxNumber, setTaxNumber] = useState('310294857200003');

  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(INITIAL_BANK_ACCOUNTS);
  const [newBankName, setNewBankName] = useState('inma');
  const [newIban, setNewIban] = useState('');
  const [newCif, setNewCif] = useState('');
  const [isAddingBank, setIsAddingBank] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    'السجل_التجاري_المعتمد_2025.pdf',
    'شهادة_التسجيل_الضريبي_ZATCA.pdf'
  ]);

  const handleAddBank = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIban.trim()) return;

    const newAcc: BankAccount = {
      id: `bank-${Date.now()}`,
      bankName: newBankName,
      iban: newIban.toUpperCase(),
      cif: newCif || '99887766'
    };

    setBankAccounts([...bankAccounts, newAcc]);
    setNewIban('');
    setNewCif('');
    setIsAddingBank(false);
  };

  const handleRemoveBank = (id: string) => {
    setBankAccounts(bankAccounts.filter((b) => b.id !== id));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="w-full bg-[#0b0b0b] text-slate-100 min-h-screen py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">

        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121212] p-4 sm:p-6 rounded-2xl border border-[#2b2313] shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#d4af35]" />
              <h1 className="text-lg sm:text-2xl font-black text-white">
                {isArabic ? 'إكمال بيانات الملف التجاري والتسجيل الشامل' : 'Corporate Business Registration'}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              {isArabic 
                ? 'منظومة توثيق الكيانات التجارية الفاخرة، ربط الحسابات البنكية، والامتثال للنظام المحاسبي.'
                : 'Enterprise registration and automated banking integration portal.'}
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4" />
            <span>{isArabic ? 'التحقق السيادي نشط' : 'Sovereign Verified'}</span>
          </div>
        </div>

        {/* Success Banner */}
        {isSubmitted && (
          <div className="p-4 rounded-2xl bg-[#161a0f] border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between shadow-xl animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500 text-black">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">
                  {isArabic ? 'تم حفظ وتوثيق بيانات المنشأة بنجاح!' : 'Business Data Verified & Saved!'}
                </h4>
                <p className="text-slate-300">
                  {isArabic 
                    ? 'تم ربط الحسابات البنكية وتفعيل مسارات السداد والفوترة الآلية عبر نظام MJM ERP.'
                    : 'Bank accounts synced and auto-billing pipeline activated.'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              إغلاق
            </button>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6">

          {/* Section 1: Authorized Representative Profile */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#131313] border border-[#2b2212] space-y-4 sm:space-y-6 shadow-xl">
            <div className="flex items-center gap-3 sm:gap-4 border-b border-[#241d0f] pb-4">
              <div className="relative shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_d0Oag9GwHy-vYnLQbM-g0EQeTVAkjeqjCTMnhJgD64YacR-VcGmMskoXOsZnS3Phg_Nt7qxFrFDRtzlEnci691Go8tlHIs_aPZWpwJNtLKv-yOva_s3h-PqEYHgEjs6Inrad4V9YgxFAkd9BxSfKFVwL62vFnH4hH2t4Dgbyjdq_ERN3O2qrCFH9We6yWrVbSeB6ErBf2jkFR2_neLs1P3AVhc3LjYMBen4fq39z3F30DU4WZZefTT3AAF94e2gSyKNvNzRDbA"
                  alt="Representative"
                  className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-[#d4af35]"
                />
                <span className="absolute -bottom-1 -right-1 p-1 bg-[#d4af35] rounded-full text-black">
                  <Sparkles className="w-3 h-3" />
                </span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {isArabic ? 'بيانات الممثل النظامي والكيان' : 'Authorized Representative & Entity'}
                </h3>
                <p className="text-xs text-slate-400">
                  {isArabic ? 'الشخص المفوض بإدارة الحساب والصلاحيات المالية' : 'Authorized signee for financial and ERP controls'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">الاسم الكامل للممثل *</label>
                <input
                  type="text"
                  required
                  value={representativeName}
                  onChange={(e) => setRepresentativeName(e.target.value)}
                  className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">المسمى الوظيفي والصفة</label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">رقم الهوية الوطنية / الإقامة</label>
                <div className="relative">
                  <input
                    type="text"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-3 text-white outline-none font-mono"
                  />
                  <span className="absolute left-3 top-3 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    نفاذ موثق
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">اسم الكيان التجاري الرسمي</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">رقم السجل التجاري (CR)</label>
                <input
                  type="text"
                  value={crNumber}
                  onChange={(e) => setCrNumber(e.target.value)}
                  className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-3 text-white outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">الرقم الضريبي (VAT / ZATCA)</label>
                <input
                  type="text"
                  value={taxNumber}
                  onChange={(e) => setTaxNumber(e.target.value)}
                  className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-3 text-white outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Authorized Bank Accounts */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#131313] border border-[#2b2212] space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#241d0f] pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#d4af35]" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {isArabic ? 'الحسابات البنكية المعتمدة' : 'Verified Bank Accounts'}
                </h3>
              </div>

              <button
                type="button"
                id="add-bank-btn"
                onClick={() => setIsAddingBank(!isAddingBank)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#f1d57f] bg-[#1e190e] border border-[#443615] hover:border-[#d4af35] transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-[#d4af35]" />
                <span>{isArabic ? 'إضافة حساب بنكي' : 'Add Bank Account'}</span>
              </button>
            </div>

            {/* Dynamic Add Bank Form */}
            {isAddingBank && (
              <div className="p-3 sm:p-4 rounded-xl bg-[#18140b] border border-[#d4af35]/40 space-y-3 animate-fadeIn">
                <h4 className="text-xs font-bold text-white">إضافة بيانات بنك جديد</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1">اسم البنك</label>
                    <select
                      value={newBankName}
                      onChange={(e) => setNewBankName(e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#362b14] rounded-lg p-2 text-white outline-none"
                    >
                      <option value="rajhi">مصرف الراجحي</option>
                      <option value="ahli">البنك الأهلي السعودي (SNB)</option>
                      <option value="inma">مصرف الإنماء</option>
                      <option value="riyad">بنك الرياض</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">رقم الآيبان الدولي (IBAN) *</label>
                    <input
                      type="text"
                      placeholder="SA00 0000 0000 0000 0000 0000"
                      value={newIban}
                      onChange={(e) => setNewIban(e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#362b14] rounded-lg p-2 text-white font-mono outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">رقم العميل البنكي (CIF)</label>
                    <input
                      type="text"
                      placeholder="مثال: 99887766"
                      value={newCif}
                      onChange={(e) => setNewCif(e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#362b14] rounded-lg p-2 text-white font-mono outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingBank(false)}
                    className="px-3 py-1.5 rounded-lg bg-[#222222] text-slate-300 text-xs"
                  >
                    إلغاء
                  </button>
                  <button
                    type="button"
                    onClick={handleAddBank}
                    className="px-4 py-1.5 rounded-lg font-bold text-black bg-[#d4af35] text-xs"
                  >
                    تأكيد الإضافة
                  </button>
                </div>
              </div>
            )}

            {/* List of Accounts */}
            <div className="space-y-2.5">
              {bankAccounts.map((acc) => (
                <div
                  key={acc.id}
                  className="p-3.5 rounded-xl bg-[#171717] border border-[#2d2414] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#d4af35]/40 transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">
                        {acc.bankName === 'rajhi' ? 'مصرف الراجحي' : 
                         acc.bankName === 'ahli' ? 'البنك الأهلي السعودي (SNB)' : 
                         acc.bankName === 'inma' ? 'مصرف الإنماء' : 'بنك الرياض'}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        معتمد
                      </span>
                    </div>
                    <div className="text-xs font-mono text-[#f1d57f] tracking-wider break-all">
                      {acc.iban}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      رقم العميل الموحد (CIF): <span className="font-mono text-slate-300">{acc.cif}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveBank(acc.id)}
                    className="p-2 rounded-lg bg-[#221717] hover:bg-[#381a1a] text-rose-400 transition-colors self-end sm:self-center"
                    title="حذف الحساب"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Document Attachments */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#131313] border border-[#2b2212] space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#241d0f] pb-3">
              <h3 className="text-sm sm:text-base font-bold text-white">
                {isArabic ? 'ملفات الإثبات والتوثيق السيادي' : 'Compliance & Legal Documents'}
              </h3>
            </div>

            <div className="border-2 border-dashed border-[#3d3117] hover:border-[#d4af35] rounded-2xl p-6 text-center transition-colors cursor-pointer bg-[#0e0e0e]">
              <Upload className="w-8 h-8 text-[#d4af35] mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-200">
                {isArabic ? 'اسحب المستندات هنا أو انقر للتصفح' : 'Drag documents or click to browse'}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                PDF, PNG, JPG (الحد الأقصى 15MB)
              </p>
            </div>

            {/* Uploaded Files Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {uploadedFiles.map((file, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1c180e] border border-[#3e3215] text-xs text-[#f1d57f]">
                  <FileText className="w-3.5 h-3.5 text-[#d4af35]" />
                  <span>{file}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end pt-4">
            <button
              type="submit"
              id="registration-submit-btn"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-black bg-gradient-to-r from-[#d4af35] via-[#f5de95] to-[#b8860b] hover:opacity-95 shadow-lg shadow-[#d4af35]/25 transition-all text-sm flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-black" />
              <span>{isArabic ? 'حفظ وتوثيق البيانات التجارية المتقدمة' : 'Save & Certify Business Profile'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
