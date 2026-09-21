import React, { useState, useRef, useEffect } from 'react';
import { User, UserRole, Employee } from '../types';
import { PRESET_USERS } from '../data/mockData';
import { 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  Info, 
  MessageSquare,
  Sparkles,
  HelpCircle,
  PhoneCall,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (user: User) => void;
  language: string;
  onNavigateToSignUp?: () => void;
  onNavigateToHome?: () => void;
  initialEmail?: string;
  initialRole?: UserRole;
  onSetLanguage?: (langCode: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ 
  onLoginSuccess, 
  language,
  onNavigateToSignUp,
  onNavigateToHome,
  initialEmail,
  initialRole,
  onSetLanguage
}) => {
  const isArabic = language === 'ar' || language === 'ur';

  const [identifier, setIdentifier] = useState(initialEmail || 'businessmjm76@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  
  // 4-digit WhatsApp OTP state (as explicitly requested & shown in screenshot 124.png)
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoModal, setInfoModal] = useState<string | null>(null);

  useEffect(() => {
    if (initialEmail) {
      setIdentifier(initialEmail);
    }
  }, [initialEmail]);

  // Countdown timer for resend code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Handle 4-digit OTP change with auto-jump
  const handleOtpChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const digitsOnly = rawVal.replace(/\D/g, '');

    if (!digitsOnly) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }

    // Handle multiple digits (pasting / autofill)
    if (digitsOnly.length > 1) {
      const newOtp = [...otp];
      const digitArr = digitsOnly.split('');
      let lastIndex = index;
      for (let i = 0; i < digitArr.length && (index + i) < 4; i++) {
        newOtp[index + i] = digitArr[i];
        lastIndex = index + i;
      }
      setOtp(newOtp);
      const targetFocus = Math.min(lastIndex + 1, 3);
      setTimeout(() => {
        inputRefs.current[targetFocus]?.focus();
        inputRefs.current[targetFocus]?.select();
      }, 0);
      return;
    }

    // Single digit entry
    const char = digitsOnly.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);

    // Auto advance to next box
    if (index < 3) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
        inputRefs.current[index + 1]?.select();
      }, 0);
    }
  };

  // Handle backspace and arrow keys
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        e.preventDefault();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'ArrowLeft') {
      if (isArabic) {
        if (index < 3) inputRefs.current[index + 1]?.focus();
      } else {
        if (index > 0) inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowRight') {
      if (isArabic) {
        if (index > 0) inputRefs.current[index - 1]?.focus();
      } else {
        if (index < 3) inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle paste in 4-digit OTP
  const handleOtpPaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (!pasted) return;

    const newOtp = [...otp];
    for (let i = 0; i < pasted.length && (index + i) < 4; i++) {
      newOtp[index + i] = pasted[i];
    }
    setOtp(newOtp);

    const targetIndex = Math.min(index + pasted.length, 3);
    setTimeout(() => {
      inputRefs.current[targetIndex]?.focus();
    }, 0);
  };

  // Resend code trigger
  const handleResendCode = () => {
    if (countdown > 0 && !resendSuccess) {
      // Auto fill demo code for quick testing convenience
      setOtp(['8', '3', '9', '2']);
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 3000);
      return;
    }
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setCountdown(60);
      setResendSuccess(true);
      setOtp(['7', '4', '1', '9']);
      setTimeout(() => setResendSuccess(false), 3000);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const emailTrimmed = identifier.trim().toLowerCase();

    if (!emailTrimmed) {
      setErrorMsg(isArabic ? 'يرجى إدخال البريد الإلكتروني أو اسم المستخدم' : 'Please enter email or username');
      return;
    }

    // 1. Check custom registered users from localStorage (saved during Sign-Up)
    let customUser: User | null = null;
    try {
      const stored = localStorage.getItem('mjm_custom_users');
      if (stored) {
        const list: User[] = JSON.parse(stored);
        customUser = list.find(u => 
          u.email.toLowerCase() === emailTrimmed || 
          u.name.toLowerCase() === emailTrimmed
        ) || null;
      }
    } catch (e) {
      console.warn('Storage read warning', e);
    }

    // 2. Check if this employee exists in workforce list
    let workforceEmp: Employee | null = null;
    try {
      const storedWf = localStorage.getItem('mjm_workforce_data');
      if (storedWf) {
        const emps: Employee[] = JSON.parse(storedWf);
        workforceEmp = emps.find(emp => 
          (emp.email && emp.email.toLowerCase() === emailTrimmed) ||
          emp.name.toLowerCase() === emailTrimmed
        ) || null;
      }
    } catch (e) {
      console.warn('Workforce read warning', e);
    }

    if (workforceEmp) {
      const empRole = (workforceEmp.role || '').toLowerCase();
      let effectiveRoleType: UserRole = 'EMPLOYEE';
      if (empRole.includes('ceo') || empRole.includes('رئيس تنفيذي')) {
        effectiveRoleType = 'CEO';
      } else if (empRole.includes('leader') || empRole.includes('قائد') || empRole.includes('رئيس قسم')) {
        effectiveRoleType = 'TEAM_LEADER';
      } else if (customUser?.roleType) {
        effectiveRoleType = customUser.roleType;
      }

      const activeUser: User = {
        id: customUser?.id || workforceEmp.id,
        email: emailTrimmed.includes('@') ? emailTrimmed : `${emailTrimmed}@mjm.com`,
        name: workforceEmp.name,
        role: workforceEmp.role,
        roleType: effectiveRoleType,
        company: customUser?.company || 'مجموعة MJM القابضة',
        avatar: workforceEmp.avatar || customUser?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiNvii-7AQhWSAnbRIlkLLxJii5jXhhMWK3PGH66-XP__SbdNb4BYI0qqDE4AwqB49HBJYIEUF3ZGsXxl98bo2KVVInc3FscHhTacgWWvkISJ0mWe-IeMxdsBEt16tEtaX-QOCC3krs-1Vb1PpcNUTLei-fWY85HI61WKFgPARem5-FDid4nVAunVLHCUIhKlrDk8ZGULFIbaO7TZjAUpEr-oWm77r-8aGi1eyXpz1494srSZAZCyUzZsD-w0-3v1nKdCjjShDhQ',
        createdAt: customUser?.createdAt || new Date().toISOString()
      };
      onLoginSuccess(activeUser);
      return;
    }

    if (customUser) {
      onLoginSuccess(customUser);
      return;
    }
    
    // 3. Find matching preset user or fallback to CEO
    const matchedPreset = PRESET_USERS.find(u => 
      u.email.toLowerCase() === emailTrimmed || 
      u.name.toLowerCase() === emailTrimmed
    ) || PRESET_USERS[0];
    
    onLoginSuccess(matchedPreset);
  };

  return (
    <div 
      dir={isArabic ? 'rtl' : 'ltr'}
      className="w-full min-h-screen bg-[#070605] text-[#e8eaed] font-sans selection:bg-[#d4af35] selection:text-black flex flex-col justify-between relative overflow-x-hidden"
    >
      {/* Background ambient lighting - delicate vertical golden streaks on sides as in 124.png */}
      <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-[#d4af35]/5 via-[#d4af35]/2 to-transparent pointer-events-none blur-3xl"></div>
      <div className="absolute top-0 left-0 w-80 h-full bg-gradient-to-r from-[#d4af35]/5 via-[#d4af35]/2 to-transparent pointer-events-none blur-3xl"></div>

      {/* ========================================================================= */}
      {/* 1. TOP HEADER (Matching screenshot 124.png)                               */}
      {/* ========================================================================= */}
      <header className="w-full px-6 sm:px-12 py-6 flex items-center justify-between z-20">
        
        {/* Top Left: Language Selector Pill Buttons [العربية] [English] */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSetLanguage && onSetLanguage('ar')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isArabic 
                ? 'bg-[#d4af35] text-black shadow-md shadow-[#d4af35]/20 font-black' 
                : 'bg-[#15120a] text-slate-300 hover:text-white border border-[#2b2212]'
            }`}
          >
            العربية
          </button>
          
          <button
            type="button"
            onClick={() => onSetLanguage && onSetLanguage('en')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              !isArabic 
                ? 'bg-[#d4af35] text-black shadow-md shadow-[#d4af35]/20 font-black' 
                : 'bg-[#0f0d09] text-[#d4af35] hover:text-white border border-[#3e3215]'
            }`}
          >
            English
          </button>
        </div>

        {/* Top Right: "MJM SMART BUSINESS" brand + Golden Badge Icon */}
        <div 
          onClick={onNavigateToHome}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="text-right leading-tight">
            <div className="text-xs sm:text-sm font-black tracking-wider text-white">
              MJM SMART
            </div>
            <div className="text-xs sm:text-sm font-black tracking-wider text-white">
              BUSINESS
            </div>
          </div>

          {/* Golden Badge Logo Mark matching 124.png */}
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#f7e6a7] via-[#d4af35] to-[#b3881c] p-0.5 shadow-md shadow-[#d4af35]/30 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#110e08] rounded-[4px] flex items-center justify-center">
              <span className="text-[9px] font-black text-[#f1d57f]">M</span>
            </div>
          </div>
        </div>

      </header>

      {/* ========================================================================= */}
      {/* 2. CENTER LOGIN CARD (Matching screenshot 124.png)                        */}
      {/* ========================================================================= */}
      <div className="flex-1 flex items-center justify-center px-4 py-4 z-10">
        
        <div className="w-full max-w-[500px] rounded-3xl bg-[#0c0a07] border border-[#2e2412] shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(212,175,53,0.08)] p-7 sm:p-9 space-y-6">
          
          {/* Title & Subtitle */}
          <div className="text-center space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {isArabic ? 'تسجيل الدخول' : 'Sign In'}
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-[#d4af35]">
              {isArabic ? 'منصة MJM للأعمال الذكية الفاخرة' : 'MJM Luxury Smart Business Platform'}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Field 1: البريد الإلكتروني أو اسم المستخدم */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                {isArabic ? 'البريد الإلكتروني أو اسم المستخدم' : 'Email or Username'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={isArabic ? 'أدخل بيانات الاعتماد الخاصة بك' : 'Enter your credentials'}
                  className="w-full bg-[#110e0a] border border-[#271f13] focus:border-[#d4af35] rounded-xl py-3 px-4 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
                <div className={`absolute top-3.5 ${isArabic ? 'left-3.5' : 'right-3.5'} text-slate-500 pointer-events-none`}>
                  <UserIcon className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Field 2: كلمة المرور */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                {isArabic ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#110e0a] border border-[#271f13] focus:border-[#d4af35] rounded-xl py-3 px-10 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
                
                {/* Lock icon */}
                <div className={`absolute top-3.5 ${isArabic ? 'left-3.5' : 'right-3.5'} text-slate-500 pointer-events-none`}>
                  <Lock className="w-4 h-4" />
                </div>

                {/* Eye toggle icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute top-3.5 ${isArabic ? 'right-3.5' : 'left-3.5'} text-slate-400 hover:text-white transition-colors`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Notice / Alert Box (Matching screenshot 124.png) */}
            <div className="rounded-xl bg-[#16120a] border border-[#332712] p-3 sm:p-3.5 flex items-start gap-2.5 text-right">
              <div className="text-[#d4af35] shrink-0 mt-0.5">
                <Info className="w-4 h-4" />
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                {isArabic 
                  ? 'تنبيه: تتطلب عملية تفعيل الحساب الموافقة المسبقة من قبل الإدارة لضمان أمن المنصة.'
                  : 'Notice: Account activation requires prior administrative authorization to ensure platform security.'}
              </p>
            </div>

            {/* Submit Button: "دخول للمنصة" (Solid Gold matching 124.png) */}
            <button
              type="submit"
              id="login-submit-btn"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#e5be47] via-[#d4af35] to-[#c59828] hover:brightness-110 active:scale-[0.99] text-black font-extrabold text-sm sm:text-base shadow-md shadow-[#d4af35]/25 transition-all cursor-pointer"
            >
              {isArabic ? 'دخول للمنصة' : 'Enter Platform'}
            </button>

            {/* ================================================================= */}
            {/* 3. WHATSAPP 2FA (4 DIGITS as explicitly requested & in 124.png)    */}
            {/* ================================================================= */}
            <div className="pt-4 space-y-3.5 text-center">
              
              {/* WhatsApp Heading in Green */}
              <div className="flex items-center justify-center gap-2 text-[#25D366]">
                <MessageSquare className="w-4 h-4 fill-[#25D366]/20" />
                <span className="text-xs sm:text-sm font-black">
                  {isArabic ? 'التحقق عبر واتساب' : 'WhatsApp Verification'}
                </span>
              </div>

              {/* Subtitle text */}
              <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs mx-auto">
                {isArabic
                  ? 'لقد أرسلنا رمز التحقق المكون من 4 أرقام إلى هاتفك المسجل عبر واتساب. يرجى إدخاله للمتابعة.'
                  : 'We have sent a 4-digit verification code to your registered WhatsApp phone. Please enter it to continue.'}
              </p>

              {/* Exactly 4 OTP Digit Boxes matching 124.png */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 py-1" dir="ltr">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    id={`otp-4digit-box-${idx}`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]*"
                    maxLength={2}
                    value={digit}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => handleOtpChange(idx, e)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    onPaste={(e) => handleOtpPaste(idx, e)}
                    className={`w-12 h-12 sm:w-14 sm:h-14 text-center rounded-xl bg-[#0f0d09] border ${
                      digit 
                        ? 'border-[#d4af35] text-[#f7e49c] shadow-[0_0_10px_rgba(212,175,53,0.3)]' 
                        : 'border-[#292013] text-slate-300'
                    } focus:border-[#d4af35] focus:ring-1 focus:ring-[#d4af35]/40 text-lg sm:text-xl font-black outline-none transition-all`}
                  />
                ))}
              </div>

              {/* Resend Code Link */}
              <div>
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-xs text-[#d4af35] hover:text-[#f3d57a] font-semibold transition-colors cursor-pointer"
                >
                  {resendSuccess 
                    ? (isArabic ? '✓ تم إرسال الرمز الجديد' : '✓ New Code Sent')
                    : isResending 
                    ? (isArabic ? 'جارٍ الإرسال...' : 'Sending...')
                    : (isArabic ? 'إعادة إرسال الرمز' : 'Resend Code')}
                </button>
              </div>

            </div>

            {/* Footer links: "هل نسيت كلمة المرور؟" & "اتصال بالدعم الفني" */}
            <div className="pt-4 flex items-center justify-between text-[11px] text-slate-500 border-t border-[#1e170c]">
              <button
                type="button"
                onClick={() => setInfoModal(isArabic ? 'لاستعادة كلمة المرور، يرجى التواصل مع مسؤول تكنولوجيا المعلومات أو قسم الامتثال في منشأتك.' : 'To reset your password, please contact your corporate IT administrator.')}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                {isArabic ? 'هل نسيت كلمة المرور؟' : 'Forgot Password?'}
              </button>

              <button
                type="button"
                onClick={() => setInfoModal(isArabic ? 'فريق الدعم الفني لـ MJM متاح 24/7 عبر البريد support@mjm.com أو عبر واتساب الدعم المباشر.' : 'Technical Support is available 24/7 at support@mjm.com.')}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                {isArabic ? 'اتصال بالدعم الفني' : 'Contact Support'}
              </button>
            </div>

            {/* Link to Sign Up */}
            {onNavigateToSignUp && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={onNavigateToSignUp}
                  className="text-xs text-slate-400 hover:text-[#f1d57f] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{isArabic ? 'ليس لديك حساب مفعّل؟' : 'Do not have an account?'}</span>
                  <span className="text-[#d4af35] font-bold underline underline-offset-2">
                    {isArabic ? 'سجل بياناتك الآن' : 'Sign Up'}
                  </span>
                </button>
              </div>
            )}

          </form>

        </div>

      </div>

      {/* Subtle Support / Help Modal if clicked */}
      {infoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl bg-[#120f09] border border-[#3e3215] p-6 space-y-4 text-center shadow-2xl animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-[#241c0e] text-[#d4af35] mx-auto flex items-center justify-center">
              <Info className="w-6 h-6" />
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {infoModal}
            </p>
            <button
              onClick={() => setInfoModal(null)}
              className="px-6 py-2 rounded-xl bg-[#d4af35] text-black font-bold text-xs"
            >
              {isArabic ? 'حسناً' : 'Close'}
            </button>
          </div>
        </div>
      )}

      {/* Empty bottom spacer for nice balance */}
      <div className="h-6"></div>

    </div>
  );
};
