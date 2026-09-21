import React, { useState, useRef } from 'react';
import { User, UserRole, Employee } from '../types';
import { authClient } from '../lib/authClient';
import { 
  Camera, 
  UserCheck, 
  Building2, 
  Landmark, 
  Plus, 
  X, 
  Send, 
  Globe, 
  User as UserIcon, 
  Users, 
  Wallet, 
  Shield, 
  Scale, 
  CheckCircle2, 
  AlertCircle,
  Home,
  LogIn,
  Eye,
  EyeOff
} from 'lucide-react';

interface BankAccountRow {
  id: string;
  bankName: string;
  iban: string;
  cif: string;
}

interface SignUpScreenProps {
  language: string;
  onNavigateToLogin: (prefillEmail?: string, prefillRole?: UserRole) => void;
  onNavigateToHome: () => void;
  onUserRegistered: (newUser: User, newEmployee: Employee) => void;
  onToggleLanguage?: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  language,
  onNavigateToLogin,
  onNavigateToHome,
  onUserRegistered,
  onToggleLanguage
}) => {
  const isArabic = language === 'ar' || language === 'ur';
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [crName, setCrName] = useState('');
  const [crNumber, setCrNumber] = useState('');
  const [idType, setIdType] = useState('هوية وطنية');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shopName, setShopName] = useState('');
  const [shopLocation, setShopLocation] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Team & Finance Data
  const [employeesCount, setEmployeesCount] = useState('15');
  const [currentBalance, setCurrentBalance] = useState('0.00');

  // Bank Accounts
  const [bankAccounts, setBankAccounts] = useState<BankAccountRow[]>([
    {
      id: 'bank-1',
      bankName: 'مصرف الراجحي',
      iban: '',
      cif: ''
    }
  ]);

  // Profile Image
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // UI States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successSubmitted, setSuccessSubmitted] = useState(false);

  const handleAddBankAccount = () => {
    const newAcc: BankAccountRow = {
      id: `bank-${Date.now()}`,
      bankName: 'البنك الأهلي السعودي (SNB)',
      iban: '',
      cif: ''
    };
    setBankAccounts([...bankAccounts, newAcc]);
  };

  const handleRemoveBankAccount = (id: string) => {
    if (bankAccounts.length === 1) {
      setBankAccounts([{ id: `bank-${Date.now()}`, bankName: '', iban: '', cif: '' }]);
      return;
    }
    setBankAccounts(bankAccounts.filter(b => b.id !== id));
  };

  const handleBankChange = (id: string, field: keyof BankAccountRow, value: string) => {
    setBankAccounts(bankAccounts.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const handleAvatarFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim()) {
      setErrorMsg(isArabic ? 'يرجى إدخال الاسم الكامل كما في الهوية' : 'Please enter your full name');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg(isArabic ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please provide a valid email address');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg(isArabic ? 'يرجى إدخال كلمة مرور من 6 خانات على الأقل لتمكين الدخول' : 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    const normalizedEmail = email.trim().toLowerCase();
    const roleTitle = 'قيد المراجعة الإدارية (Commercial Registrant)';
    const assignedRoleType: UserRole = 'EMPLOYEE';

    const newUser: User = {
      id: `user_${Date.now()}`,
      email: normalizedEmail,
      name: fullName.trim(),
      role: roleTitle,
      roleType: assignedRoleType,
      company: crName.trim() || shopName.trim() || 'منشأة تجارية مستقلة',
      avatar: avatarPreview || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      createdAt: new Date().toISOString()
    };

    const newEmployee: Employee = {
      id: `emp-${Date.now()}`,
      name: fullName.trim(),
      phone: phone.trim() || '+966 50 000 0000',
      email: normalizedEmail,
      role: roleTitle,
      rating: 'A',
      status: 'active',
      department: 'التسجيل التجاري والامتثال',
      performanceScore: 90,
      businessUnitId: 'biz_tech',
      salary: 16000,
      dateJoined: new Date().toISOString().split('T')[0],
      avatar: newUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      performanceReport: {
        overallScore: 90.0,
        kpiAchievement: 92.0,
        disciplineRate: 98.0,
        projectsCompleted: 1,
        leadershipPotential: 'Medium',
        confidentialNotes: isArabic 
          ? `تم تقديم وتأكيد بيانات الملف التجاري (${crName || fullName}) بنجاح. في انتظار تخصيص الصلاحيات التشغيلية من قبل الرئيس التنفيذي.`
          : `Commercial registration submitted for (${crName || fullName}). Awaiting CEO role allotment.`,
        salaryGrade: 'Standard C1',
        lastReviewDate: new Date().toISOString().split('T')[0],
        eligibleForBonus: true
      }
    };

    try {
      await authClient.signup(
        normalizedEmail,
        password,
        fullName.trim(),
        roleTitle,
        newUser.company
      );
    } catch {
      // client-side persistence fallback
    }

    try {
      const existingCustom = localStorage.getItem('mjm_custom_users');
      let customUsers: User[] = existingCustom ? JSON.parse(existingCustom) : [];
      customUsers = customUsers.filter(u => u.email.toLowerCase() !== normalizedEmail);
      customUsers.push(newUser);
      localStorage.setItem('mjm_custom_users', JSON.stringify(customUsers));

      // Store credentials & commercial record data
      localStorage.setItem(`mjm_user_creds_${normalizedEmail}`, JSON.stringify({
        password,
        roleType: assignedRoleType,
        commercialData: {
          fullName,
          crName,
          crNumber,
          idType,
          idNumber,
          phone,
          shopName,
          shopLocation,
          employeesCount,
          currentBalance,
          bankAccounts
        }
      }));
    } catch (e) {
      console.warn('Storage error', e);
    }

    onUserRegistered(newUser, newEmployee);
    setIsLoading(false);
    setSuccessSubmitted(true);
  };

  return (
    <div 
      dir={isArabic ? 'rtl' : 'ltr'}
      className="min-h-screen w-full bg-[#080706] text-slate-100 flex flex-col justify-between font-sans selection:bg-[#d4af35] selection:text-black"
    >
      {/* Top Header Bar matching screenshot */}
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between">
        {/* Left Side: Circular User Avatar & EN/AR Pill */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={onNavigateToHome}
            title={isArabic ? 'الصفحة الرئيسية' : 'Home'}
            className="w-10 h-10 rounded-full border border-[#2b2416] bg-[#120f09] hover:bg-[#1f190e] hover:border-[#d4af35] flex items-center justify-center text-[#e5c158] transition-all cursor-pointer shadow-sm"
          >
            <UserIcon className="w-5 h-5 text-[#d4af35]" />
          </button>

          <button
            type="button"
            onClick={onToggleLanguage}
            className="px-3.5 py-1.5 rounded-full border border-[#2b2416] bg-[#120f09] hover:bg-[#1f190e] hover:border-[#d4af35] text-xs font-bold text-[#e5c158] flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Globe className="w-3.5 h-3.5 text-[#d4af35]" />
            <span>EN/AR</span>
          </button>
        </div>

        {/* Right Side: MJM SMART BUSINESS Branding & Logo Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <div className="text-sm sm:text-base font-black tracking-widest text-[#d4af35]">
              MJM
            </div>
            <div className="text-[9px] sm:text-[10px] tracking-wider text-[#9d7e2e] font-bold uppercase">
              SMART BUSINESS
            </div>
          </div>

          <div 
            onClick={onNavigateToHome}
            className="w-10 h-10 rounded-xl bg-[#14110b] border border-[#3b2e15] flex items-center justify-center text-xs text-[#d4af35] font-bold shadow-inner cursor-pointer hover:border-[#f1d57f] transition-colors"
          >
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#f1d57f]">img</span>
          </div>
        </div>
      </header>

      {/* Main Container Card matching screenshot */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 flex-1 flex flex-col justify-center">
        
        {/* Navigation Breadcrumb Shortcut */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3 px-1">
          <button
            onClick={onNavigateToHome}
            className="flex items-center gap-1 text-slate-400 hover:text-[#f1d57f] transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-[#d4af35]" />
            <span>{isArabic ? 'العودة للمنظومة' : 'Back to Home'}</span>
          </button>

          <div className="flex items-center gap-1.5">
            <span>{isArabic ? 'لديك حساب مسجل؟' : 'Already registered?'}</span>
            <button
              onClick={() => onNavigateToLogin()}
              className="text-[#f1d57f] hover:underline font-bold"
            >
              {isArabic ? 'تسجيل الدخول' : 'Sign In'}
            </button>
          </div>
        </div>

        <div className="w-full rounded-3xl bg-[#0c0a07] border border-[#261f14] shadow-[0_25px_80px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(212,175,53,0.2)] p-6 sm:p-10 relative overflow-hidden">
          
          {/* Top Form Header */}
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#f8e29a] via-[#d4af35] to-[#997316] tracking-tight">
              {isArabic ? 'إكمال بيانات الملف التجاري' : 'Complete Commercial Profile'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
              {isArabic 
                ? 'يرجى تقديم المعلومات التفصيلية لتفعيل حسابك في منظومة MJM الذكية'
                : 'Please provide detailed information to activate your account in the MJM Smart Platform'}
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* ===================================================== */}
            {/* SECTION 1: المعلومات الأساسية (Basic Information)    */}
            {/* ===================================================== */}
            <div className="space-y-6">
              
              {/* Section Header with Horizontal Divider Line */}
              <div className="flex items-center gap-3">
                <div className="h-px bg-[#261f14] flex-1"></div>
                <div className="flex items-center gap-2 text-[#d4af35] font-bold text-sm sm:text-base shrink-0">
                  <span>{isArabic ? 'المعلومات الأساسية' : 'Basic Information'}</span>
                  <UserCheck className="w-4 h-4 text-[#d4af35]" />
                </div>
              </div>

              {/* Profile Avatar Upload matching screenshot (Dashed Circle) */}
              <div className="flex flex-col items-center justify-center">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleAvatarFileSelect} 
                  accept="image/*" 
                  className="hidden" 
                />
                
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border-2 border-dashed border-[#8c7430] hover:border-[#f1d57f] bg-[#120f09]/80 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 group relative overflow-hidden shadow-md shadow-black"
                  title={isArabic ? 'انقر لرفع صورتك الشخصية' : 'Click to upload photo'}
                >
                  {avatarPreview ? (
                    <img 
                      src={avatarPreview} 
                      alt="Avatar" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <>
                      <Camera className="w-6 h-6 text-[#d4af35] group-hover:text-[#f1d57f] transition-colors mb-1" />
                      <span className="text-[10px] text-[#c9a744] font-medium group-hover:text-[#f1d57f]">
                        {isArabic ? 'الصورة الشخصية' : 'Photo'}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Row 1: الاسم الكامل & اسم السجل التجاري */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    {isArabic ? 'الاسم الكامل' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isArabic ? 'أدخل اسمك كما في الهوية' : 'Enter your name as in ID'}
                    className="w-full px-4 py-3 rounded-xl bg-[#090705] border border-[#282115] text-white text-xs sm:text-sm placeholder-slate-600 focus:outline-none focus:border-[#d4af35] focus:ring-1 focus:ring-[#d4af35] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    {isArabic ? 'اسم السجل التجاري' : 'Commercial Record Name'}
                  </label>
                  <input
                    type="text"
                    value={crName}
                    onChange={(e) => setCrName(e.target.value)}
                    placeholder={isArabic ? 'أدخل اسم السجل التجاري كما هو موثق' : 'Enter registered commercial name'}
                    className="w-full px-4 py-3 rounded-xl bg-[#090705] border border-[#282115] text-white text-xs sm:text-sm placeholder-slate-600 focus:outline-none focus:border-[#d4af35] focus:ring-1 focus:ring-[#d4af35] transition-all"
                  />
                </div>
              </div>

              {/* Row 2: رقم السجل التجاري & نوع الهوية & رقم الهوية */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    {isArabic ? 'رقم السجل التجاري' : 'CR Number'}
                  </label>
                  <input
                    type="text"
                    value={crNumber}
                    onChange={(e) => setCrNumber(e.target.value)}
                    placeholder="10XXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-[#090705] border border-[#282115] text-white text-xs sm:text-sm placeholder-slate-600 focus:outline-none focus:border-[#d4af35] focus:ring-1 focus:ring-[#d4af35] transition-all font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    {isArabic ? 'نوع الهوية' : 'ID Type'}
                  </label>
                  <select
                    value={idType}
                    onChange={(e) => setIdType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#090705] border border-[#282115] text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af35] focus:ring-1 focus:ring-[#d4af35] transition-all"
                  >
                    <option value="هوية وطنية">{isArabic ? 'هوية وطنية' : 'National ID'}</option>
                    <option value="إقامة">{isArabic ? 'إقامة' : 'Iqama'}</option>
                    <option value="جواز سفر">{isArabic ? 'جواز سفر' : 'Passport'}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    {isArabic ? 'رقم الهوية' : 'ID Number'}
                  </label>
                  <input
                    type="text"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    placeholder="1XXXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-[#090705] border border-[#282115] text-white text-xs sm:text-sm placeholder-slate-600 focus:outline-none focus:border-[#d4af35] focus:ring-1 focus:ring-[#d4af35] transition-all font-mono"
                  />
                </div>
              </div>

              {/* Row 3: البريد الإلكتروني & رقم الهاتف (واتساب) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mjm.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#090705] border border-[#282115] text-white text-xs sm:text-sm placeholder-slate-600 focus:outline-none focus:border-[#d4af35] focus:ring-1 focus:ring-[#d4af35] transition-all text-left"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    {isArabic ? 'رقم الهاتف (واتساب)' : 'Phone Number (WhatsApp)'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+966 XXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-[#090705] border border-[#282115] text-white text-xs sm:text-sm placeholder-slate-600 focus:outline-none focus:border-[#d4af35] focus:ring-1 focus:ring-[#d4af35] transition-all text-left font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Row 4: القسم (يحدد لاحقاً من الإدارة) & اسم المحل */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    {isArabic ? 'القسم (يحدد لاحقاً من الإدارة)' : 'Department (Assigned by Admin)'}
                  </label>
                  <input
                    type="text"
                    disabled
                    value={isArabic ? 'قيد المراجعة الإدارية' : 'Pending Administrative Review'}
                    className="w-full px-4 py-3 rounded-xl bg-[#110f0b] border border-[#2b2214] text-amber-300/80 text-xs sm:text-sm cursor-not-allowed select-none font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    {isArabic ? 'اسم المحل' : 'Shop / Store Name'}
                  </label>
                  <input
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder={isArabic ? 'أدخل اسم المحل التجاري' : 'Enter shop / commercial outlet name'}
                    className="w-full px-4 py-3 rounded-xl bg-[#090705] border border-[#282115] text-white text-xs sm:text-sm placeholder-slate-600 focus:outline-none focus:border-[#d4af35] focus:ring-1 focus:ring-[#d4af35] transition-all"
                  />
                </div>
              </div>

              {/* Row 5: موقع المحل & كلمة المرور للحساب */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    {isArabic ? 'موقع المحل' : 'Shop Location'}
                  </label>
                  <input
                    type="text"
                    value={shopLocation}
                    onChange={(e) => setShopLocation(e.target.value)}
                    placeholder={isArabic ? 'أدخل موقع المحل (المدينة/الحي)' : 'Enter shop location (City/District)'}
                    className="w-full px-4 py-3 rounded-xl bg-[#090705] border border-[#282115] text-white text-xs sm:text-sm placeholder-slate-600 focus:outline-none focus:border-[#d4af35] focus:ring-1 focus:ring-[#d4af35] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    {isArabic ? 'كلمة المرور لتسجيل الدخول' : 'Password for Login'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl bg-[#090705] border border-[#282115] text-white text-xs sm:text-sm placeholder-slate-600 focus:outline-none focus:border-[#d4af35] focus:ring-1 focus:ring-[#d4af35] transition-all text-left"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute ${isArabic ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1`}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ===================================================== */}
            {/* SECTION 2: بيانات الفريق والتمويل (Team & Finance Data) */}
            {/* ===================================================== */}
            <div className="space-y-4 pt-2">
              
              {/* Section Header with Horizontal Line */}
              <div className="flex items-center gap-3">
                <div className="h-px bg-[#261f14] flex-1"></div>
                <div className="flex items-center gap-2 text-[#d4af35] font-bold text-sm sm:text-base shrink-0">
                  <span>{isArabic ? 'بيانات الفريق والتمويل' : 'Team and Financial Data'}</span>
                  <Building2 className="w-4 h-4 text-[#d4af35]" />
                </div>
              </div>

              {/* Row: عدد الموظفين & الأرصدة الحالية */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    {isArabic ? 'عدد الموظفين تحت الإدارة' : 'Employees under Management'}
                  </label>
                  <div className="relative">
                    <div className={`absolute ${isArabic ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none`}>
                      <Users className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={employeesCount}
                      onChange={(e) => setEmployeesCount(e.target.value)}
                      placeholder={isArabic ? 'مثال: 15' : 'e.g. 15'}
                      className={`w-full ${isArabic ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 rounded-xl bg-[#090705] border border-[#282115] text-white text-xs sm:text-sm placeholder-slate-600 focus:outline-none focus:border-[#d4af35] focus:ring-1 focus:ring-[#d4af35] transition-all`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    {isArabic ? 'الرصيد/الأرصدة الحالية (SAR)' : 'Current Balances (SAR)'}
                  </label>
                  <div className="relative">
                    <div className={`absolute ${isArabic ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none`}>
                      <Wallet className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={currentBalance}
                      onChange={(e) => setCurrentBalance(e.target.value)}
                      placeholder="0.00"
                      className={`w-full ${isArabic ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 rounded-xl bg-[#090705] border border-[#282115] text-white text-xs sm:text-sm placeholder-slate-600 focus:outline-none focus:border-[#d4af35] focus:ring-1 focus:ring-[#d4af35] transition-all font-mono`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ===================================================== */}
            {/* SECTION 3: الحسابات البنكية (Bank Accounts)         */}
            {/* ===================================================== */}
            <div className="space-y-4 pt-2">
              
              {/* Section Header with Add Bank Button */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleAddBankAccount}
                  className="px-3.5 py-1.5 rounded-xl border border-[#4a3915] bg-[#141009] hover:bg-[#221a0f] text-xs font-bold text-[#f1d57f] flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:border-[#d4af35]"
                >
                  <Plus className="w-3.5 h-3.5 text-[#d4af35]" />
                  <span>{isArabic ? 'إضافة حساب' : 'Add Account'}</span>
                </button>

                <div className="flex items-center gap-2 text-[#d4af35] font-bold text-sm sm:text-base">
                  <span>{isArabic ? 'الحسابات البنكية' : 'Bank Accounts'}</span>
                  <Landmark className="w-4 h-4 text-[#d4af35]" />
                </div>
              </div>

              {/* Dynamic Bank Account Rows */}
              <div className="space-y-3">
                {bankAccounts.map((account) => (
                  <div 
                    key={account.id}
                    className="p-4 rounded-2xl bg-[#090705] border border-[#282115] relative shadow-inner group hover:border-[#3d3119] transition-all"
                  >
                    {/* Red Delete Button on corner */}
                    <button
                      type="button"
                      onClick={() => handleRemoveBankAccount(account.id)}
                      className={`w-5 h-5 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 hover:text-white hover:bg-red-900 flex items-center justify-center absolute top-3 ${isArabic ? 'left-3' : 'right-3'} transition-colors cursor-pointer`}
                      title={isArabic ? 'حذف الحساب' : 'Delete account'}
                    >
                      <X className="w-3 h-3" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold text-slate-400">
                          {isArabic ? 'اسم البنك' : 'Bank Name'}
                        </label>
                        <select
                          value={account.bankName}
                          onChange={(e) => handleBankChange(account.id, 'bankName', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#110f0b] border border-[#241c10] text-white text-xs focus:outline-none focus:border-[#d4af35]"
                        >
                          <option value="مصرف الراجحي">مصرف الراجحي</option>
                          <option value="البنك الأهلي السعودي (SNB)">البنك الأهلي السعودي (SNB)</option>
                          <option value="بنك الرياض">بنك الرياض</option>
                          <option value="مصرف الإنماء">مصرف الإنماء</option>
                          <option value="بنك البلاد">بنك البلاد</option>
                          <option value="البنك العربي الوطني (ANB)">البنك العربي الوطني (ANB)</option>
                          <option value="بنك الجزيرة">بنك الجزيرة</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold text-slate-400">
                          {isArabic ? 'رقم الـ IBAN' : 'IBAN Number'}
                        </label>
                        <input
                          type="text"
                          value={account.iban}
                          onChange={(e) => handleBankChange(account.id, 'iban', e.target.value)}
                          placeholder="SA00 0000..."
                          className="w-full px-3 py-2 rounded-xl bg-[#110f0b] border border-[#241c10] text-white text-xs font-mono placeholder-slate-600 focus:outline-none focus:border-[#d4af35]"
                          dir="ltr"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold text-slate-400">
                          {isArabic ? 'رقم العميل (CIF)' : 'Customer CIF'}
                        </label>
                        <input
                          type="text"
                          value={account.cif}
                          onChange={(e) => handleBankChange(account.id, 'cif', e.target.value)}
                          placeholder="12345678"
                          className="w-full px-3 py-2 rounded-xl bg-[#110f0b] border border-[#241c10] text-white text-xs font-mono placeholder-slate-600 focus:outline-none focus:border-[#d4af35]"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-500 text-center pt-1">
                {isArabic 
                  ? 'يمكنك إضافة أكثر من حساب بنكي لاستلام وتسوية المبالغ المالية.'
                  : 'You can add more than one bank account for financial settlement.'}
              </p>
            </div>

            {/* ===================================================== */}
            {/* SUBMIT BUTTON matching screenshot                   */}
            {/* ===================================================== */}
            <div className="pt-4 space-y-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d9aa35] via-[#e8be48] to-[#c79824] hover:brightness-105 active:scale-[0.99] text-black font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(212,175,53,0.35)] transition-all cursor-pointer disabled:opacity-60"
              >
                <Send className={`w-5 h-5 text-black fill-black/20 ${isArabic ? 'rotate-180' : ''}`} />
                <span>
                  {isLoading 
                    ? (isArabic ? 'جارٍ تسجيل الحساب...' : 'Registering Account...')
                    : (isArabic ? 'تأكيد وإرسال البيانات' : 'Confirm & Submit Data')}
                </span>
              </button>

              <p className="text-[11px] text-slate-500 text-center">
                {isArabic 
                  ? 'بمجرد الإرسال، ستتم مراجعة بياناتك من قبل قسم الامتثال والتدقيق.'
                  : 'Upon submission, your details will be reviewed by the compliance and auditing department.'}
              </p>
            </div>

          </form>

        </div>
      </main>

      {/* Footer matching screenshot */}
      <footer className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 border-t border-[#1a160e]/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © 2024 MJM Smart Business Platform. {isArabic ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
        </div>

        <div className="flex items-center gap-6">
          <button 
            type="button"
            className="flex items-center gap-1.5 hover:text-[#d4af35] transition-colors cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <span>{isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
          </button>

          <button 
            type="button"
            className="flex items-center gap-1.5 hover:text-[#d4af35] transition-colors cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5 text-slate-400" />
            <span>{isArabic ? 'شروط الاستخدام' : 'Terms of Service'}</span>
          </button>
        </div>
      </footer>

      {/* SUCCESS CONFIRMATION MODAL */}
      {successSubmitted && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#13100a] border border-[#d4af35] rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl shadow-black animate-scaleUp">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#d4af35] via-[#f7e49c] to-[#967115] p-0.5 mx-auto flex items-center justify-center shadow-lg shadow-[#d4af35]/40">
              <div className="w-full h-full bg-[#120f09] rounded-[14px] flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-[#f1d57f]" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-white">
                {isArabic ? 'تم استلام وتأكيد بيانات الملف التجاري بنجاح!' : 'Commercial Profile Registered!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {isArabic
                  ? `أهلاً بك يا ${fullName}! تم تسجيل حسابك التجاري وإدراجه في منظومة MJM بنجاح. يمكنك الآن تسجيل الدخول مباشرة باستخدام بريدك الإلكتروني وكلمة المرور.`
                  : `Welcome ${fullName}! Your commercial account has been registered into MJM Platform. You can now log in immediately with your email and password.`}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#1b160e] border border-[#3e3215] text-xs text-left space-y-1 font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="text-[#f1d57f] font-bold">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="text-amber-400">قيد المراجعة الإدارية (Pending Approval)</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateToLogin(email, 'EMPLOYEE')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f5d77f] via-[#d4af35] to-[#997415] text-black font-black text-sm flex items-center justify-center gap-2 hover:brightness-105 transition-all shadow-lg shadow-[#d4af35]/30 cursor-pointer"
            >
              <LogIn className="w-4 h-4 stroke-[3]" />
              <span>{isArabic ? 'الانتقال لتسجيل الدخول الآن' : 'Go to Login Now'}</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
