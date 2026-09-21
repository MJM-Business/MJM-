import React, { useState } from 'react';
import { User, Language } from '../types';
import { authClient, DEFAULT_ADMIN_USER } from '../lib/authClient';
import { 
  Lock, 
  Mail, 
  User as UserIcon, 
  Building, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  X,
  KeyRound
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
  language: Language;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  language,
  initialMode = 'login'
}) => {
  if (!isOpen) return null;

  const isArabic = language === 'ar';
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  
  // Login fields
  const [loginEmail, setLoginEmail] = useState('businessmjm76@gmail.com');
  const [loginPassword, setLoginPassword] = useState('Password123!');
  const [showLoginPass, setShowLoginPass] = useState(false);

  // Signup fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupRole, setSignupRole] = useState('الرئيس التنفيذي');
  const [signupCompany, setSignupCompany] = useState('مجموعة أعمال فاخرة');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignupPass, setShowSignupPass] = useState(false);

  // Status
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-slate-700' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score, label: isArabic ? 'ضعيفة' : 'Weak', color: 'bg-rose-500' };
    if (score <= 3) return { score, label: isArabic ? 'متوسطة' : 'Moderate', color: 'bg-amber-500' };
    return { score, label: isArabic ? 'قوية وآمنة' : 'Strong & Secure', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(signupPassword);

  const handlePreFillDemo = () => {
    setLoginEmail('businessmjm76@gmail.com');
    setLoginPassword('Password123!');
    setErrorMessage(null);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await authClient.login(loginEmail, loginPassword);
      onSuccess(res.user);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'فشل التحقق من الحساب وكلمة المرور.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (signupPassword !== confirmPassword) {
      setErrorMessage(isArabic ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.');
      return;
    }

    if (signupPassword.length < 6) {
      setErrorMessage(isArabic ? 'يجب ألا تقل كلمة المرور عن 6 خانات.' : 'Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await authClient.signup(
        signupEmail,
        signupPassword,
        signupName,
        signupRole,
        signupCompany
      );
      onSuccess(res.user);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'فشل إنشاء الحساب الجديد.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-md my-auto bg-[#121212] border border-[#3e3215] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#202020] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#d4af35] to-[#876612] p-0.5 shadow-lg shadow-[#d4af35]/20">
            <div className="w-full h-full bg-[#101010] rounded-[14px] flex items-center justify-center">
              <span className="font-black text-lg text-[#f1d57f]">MJM</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {mode === 'login' 
                ? (isArabic ? 'تسجيل الدخول للمنظومة' : 'Sign in to MJM Platform')
                : (isArabic ? 'إنشاء حساب تنفيذي جديد' : 'Create Executive Account')}
            </h2>
            <p className="text-xs text-[#d4af35]">
              {isArabic ? 'تشفير سيادي للبيانات • حماية الهوية والعمليات' : 'Sovereign Encryption • Identity Protection'}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 bg-[#0a0a0a] p-1 rounded-2xl border border-[#261f12] text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMessage(null); }}
            className={`py-2 rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-[#d4af35] text-black font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isArabic ? 'تسجيل الدخول' : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMessage(null); }}
            className={`py-2 rounded-xl transition-all ${
              mode === 'signup'
                ? 'bg-[#d4af35] text-black font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isArabic ? 'إنشاء حساب جديد' : 'Sign Up'}
          </button>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-600/40 text-rose-300 text-xs flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            
            {/* Quick Demo Pre-fill button */}
            <div className="flex items-center justify-between bg-[#19150d] p-2.5 rounded-xl border border-[#3e3215]">
              <span className="text-[11px] text-slate-300">
                {isArabic ? 'الحساب التجريبي المعتمد:' : 'Default Admin:'}
              </span>
              <button
                type="button"
                onClick={handlePreFillDemo}
                className="text-[11px] font-bold text-[#f1d57f] hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-[#d4af35]" />
                <span>businessmjm76@gmail.com</span>
              </button>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isArabic ? 'البريد الإلكتروني المعتمد *' : 'Work Email *'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-3 pl-3 pr-9 text-white outline-none"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute top-3.5 right-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-300 font-semibold">
                  {isArabic ? 'كلمة المرور المشفرة *' : 'Password *'}
                </label>
                <span className="text-[10px] text-slate-500">
                  {isArabic ? 'تشفير scrypt الآمن' : 'scrypt encrypted'}
                </span>
              </div>
              <div className="relative">
                <input
                  type={showLoginPass ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-3 pl-10 pr-9 text-white outline-none"
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute top-3.5 right-3 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowLoginPass(!showLoginPass)}
                  className="absolute top-3.5 left-3 text-slate-400 hover:text-white"
                >
                  {showLoginPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-bold text-black bg-gradient-to-r from-[#d4af35] via-[#f7e49c] to-[#b8860b] hover:opacity-95 shadow-lg shadow-[#d4af35]/25 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {isLoading ? (
                <span className="animate-spin text-sm">⏳</span>
              ) : (
                <>
                  <span>{isArabic ? 'تسجيل الدخول المشفر' : 'Sign In Now'}</span>
                  <Arrow className="w-4 h-4 text-black" />
                </>
              )}
            </button>
          </form>
        )}

        {/* SIGNUP FORM */}
        {mode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isArabic ? 'الاسم الكامل *' : 'Full Name *'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder={isArabic ? 'مثال: فيصل المحمدي' : 'John Doe'}
                  className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-2.5 pl-3 pr-9 text-white outline-none"
                />
                <UserIcon className="w-4 h-4 text-slate-500 absolute top-3 right-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isArabic ? 'البريد الإلكتروني للعمل *' : 'Corporate Email *'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="faisal@enterprise.com"
                  className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-2.5 pl-3 pr-9 text-white outline-none"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute top-3 right-3 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {isArabic ? 'المسمى الوظيفي' : 'Role'}
                </label>
                <input
                  type="text"
                  value={signupRole}
                  onChange={(e) => setSignupRole(e.target.value)}
                  placeholder="المدير المالي"
                  className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-2 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {isArabic ? 'اسم المنشأة' : 'Company'}
                </label>
                <input
                  type="text"
                  value={signupCompany}
                  onChange={(e) => setSignupCompany(e.target.value)}
                  placeholder="شركة العالمية"
                  className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-2 text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isArabic ? 'كلمة المرور المشفرة *' : 'Password *'}
              </label>
              <div className="relative">
                <input
                  type={showSignupPass ? 'text' : 'password'}
                  required
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder={isArabic ? '٦ خانات على الأقل' : 'Min 6 characters'}
                  className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-2.5 pl-10 pr-9 text-white outline-none"
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute top-3 right-3 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowSignupPass(!showSignupPass)}
                  className="absolute top-3 left-3 text-slate-400 hover:text-white"
                >
                  {showSignupPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {signupPassword && (
                <div className="mt-1.5 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">{isArabic ? 'قوة كلمة المرور:' : 'Strength:'}</span>
                    <span className="font-bold text-[#f1d57f]">{strength.label}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#202020] rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${strength.color} transition-all duration-300`} 
                      style={{ width: `${(strength.score / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {isArabic ? 'تأكيد كلمة المرور *' : 'Confirm Password *'}
              </label>
              <input
                type={showSignupPass ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-2.5 text-white outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-bold text-black bg-gradient-to-r from-[#d4af35] via-[#f7e49c] to-[#b8860b] hover:opacity-95 shadow-lg shadow-[#d4af35]/25 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span className="animate-spin text-sm">⏳</span>
              ) : (
                <>
                  <span>{isArabic ? 'إنشاء وتوثيق الحساب' : 'Create Account'}</span>
                  <CheckCircle2 className="w-4 h-4 text-black" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Security verification footnote */}
        <div className="pt-3 border-t border-[#20190c] text-center">
          <div className="inline-flex items-center gap-1.5 text-[10px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isArabic ? 'تخزين مشفر ببروتوكول scrypt ومفتاح تشفير 256 بت' : 'Salted scrypt hashing with 256-bit keys'}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
