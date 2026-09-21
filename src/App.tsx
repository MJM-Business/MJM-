import React, { useState, useEffect } from 'react';
import { AppScreen, User, UserRole, Employee, ExecutiveDirective, BusinessUnit, LanguageItem } from './types';
import { ALL_LANGUAGES } from './data/languages';
import { 
  CONNECTED_BUSINESSES, 
  PRESET_USERS, 
  INITIAL_EMPLOYEES, 
  INITIAL_DIRECTIVES 
} from './data/mockData';
import { RightSidebar } from './components/RightSidebar';
import { TopHeader } from './components/TopHeader';
import { LanguageSelectorModal } from './components/LanguageSelectorModal';
import { AddEmployeeModal } from './components/AddEmployeeModal';
import { DirectivesScreen } from './components/DirectivesScreen';
import { ConnectedBusinessesScreen } from './components/ConnectedBusinessesScreen';
import { WorkforceScreen } from './components/WorkforceScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { CRMScreen } from './components/CRMScreen';
import { RegistrationScreen } from './components/RegistrationScreen';
import { LoginScreen } from './components/LoginScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { LandingScreen } from './components/LandingScreen';
import { CEOReportsScreen } from './components/CEOReportsScreen';
import { TeamLeaderPortalScreen } from './components/TeamLeaderPortalScreen';
import { EmployeePortalScreen } from './components/EmployeePortalScreen';
import { NewEntryModal } from './components/NewEntryModal';
import { AuthModal } from './components/AuthModal';
import { authClient } from './lib/authClient';
import { CheckCircle2, X, Sparkles, Mail, Crown, AlertTriangle, LogIn, Globe, Shield, BarChart3, Building, Menu, UserPlus } from 'lucide-react';
import { getTranslation } from './data/translations';

export default function App() {
  // Navigation & View Screen: Starts at 'landing' (Home Page) on URL load
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Multi-Language State (100+ Languages with RTL/LTR)
  const [currentLanguage, setCurrentLanguage] = useState<LanguageItem>(() => {
    const saved = localStorage.getItem('mjm_selected_lang');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.code) return parsed;
      } catch {
        // fallback
      }
    }
    return ALL_LANGUAGES.find(l => l.code === 'ar') || ALL_LANGUAGES[0];
  });

  // User Authentication & RBAC (CEO / Team Leader / Staff Member)
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('mjm_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return PRESET_USERS[0]; // Default profile: CEO
  });

  // Connected Businesses
  const [activeBusiness, setActiveBusiness] = useState<BusinessUnit>(CONNECTED_BUSINESSES[0]);

  // Workforce Employees State with persistence
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('mjm_workforce_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_EMPLOYEES;
  });

  // Executive Directives & Team Leader Inbox State with persistence
  const [directives, setDirectives] = useState<ExecutiveDirective[]>(() => {
    const saved = localStorage.getItem('mjm_directives_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_DIRECTIVES;
  });

  // UI Modals & Drawers
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState<boolean>(false);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState<boolean>(false);
  const [isNewEntryModalOpen, setIsNewEntryModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  // Auto-collapse sidebar on smaller screens (mobile & tablet)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsRightSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Live Toast & Directive Notification Banner
  const [globalToast, setGlobalToast] = useState<string | null>(null);
  const [liveBannerDirective, setLiveBannerDirective] = useState<ExecutiveDirective | null>(null);

  const t = getTranslation(currentLanguage.code);
  const isCEO = currentUser.roleType === 'CEO';
  const isTL = currentUser.roleType === 'TEAM_LEADER';

  // Calculate unread directives count for Team Leader or pending for CEO
  const unreadDirectivesCount = directives.filter((d) => !d.acknowledgedByTL).length;

  // Persist employees and directives
  useEffect(() => {
    localStorage.setItem('mjm_workforce_data', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('mjm_directives_data', JSON.stringify(directives));
  }, [directives]);

  useEffect(() => {
    localStorage.setItem('mjm_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('mjm_selected_lang', JSON.stringify(currentLanguage));
    // Apply global dir & lang to root HTML document
    document.documentElement.dir = currentLanguage.dir;
    document.documentElement.lang = currentLanguage.code;
  }, [currentLanguage]);

  const showGlobalToast = (msg: string) => {
    setGlobalToast(msg);
    setTimeout(() => {
      setGlobalToast(null);
    }, 4500);
  };

  // Switch User Role (CEO, Team Leader, or Employee)
  const handleSwitchUserRole = (roleType: 'CEO' | 'TEAM_LEADER' | 'EMPLOYEE') => {
    const targetUser = PRESET_USERS.find(u => u.roleType === roleType) || PRESET_USERS[0];
    setCurrentUser(targetUser);

    if (roleType === 'CEO') {
      setCurrentScreen('dashboard');
    } else if (roleType === 'TEAM_LEADER') {
      setCurrentScreen('team_portal');
    } else {
      setCurrentScreen('employee_portal');
    }

    showGlobalToast(
      currentLanguage.dir === 'rtl'
        ? `تم التبديل إلى بوابة: ${targetUser.name} (${targetUser.role})`
        : `Switched active portal to: ${targetUser.name} (${targetUser.role})`
    );
  };

  // Role-based Login: Routes to strictly isolated portal according to role
  const handleRoleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);

    if (user.roleType === 'CEO') {
      // CEO lands on Master Dashboard with full rights
      setCurrentScreen('dashboard');
      showGlobalToast(
        currentLanguage.dir === 'rtl'
          ? `أهلاً بك يا سعادة الرئيس التنفيذي (${user.name})! كافة الصلاحيات التنفيذية وتقارير كافة القطاعات مفعلة.`
          : `Welcome Executive CEO (${user.name})! Full holding dashboard and consolidated reports active.`
      );
    } else if (user.roleType === 'TEAM_LEADER') {
      // Team Leader lands on dedicated Team Leader Operations Portal
      setCurrentScreen('team_portal');
      showGlobalToast(
        currentLanguage.dir === 'rtl'
          ? `مرحباً بك يا ${user.name}! تم فتح بوابة قيادة العمليات وإدارة مناوبات الفريق وتقارير الإنجاز.`
          : `Welcome Team Leader (${user.name})! Operations Command & Department Reports portal active.`
      );
    } else {
      // Regular staff lands on dedicated Employee Workspace Portal
      setCurrentScreen('employee_portal');
      showGlobalToast(
        currentLanguage.dir === 'rtl'
          ? `أهلاً بك يا ${user.name}! تم فتح بوابة خدمات الموظف الذاتية، متابعة المهام، وسجل الحضور.`
          : `Welcome ${user.name}! Employee self-service workspace and attendance reports active.`
      );
    }
  };

  // Direct Role Login from Landing Page
  const handleQuickRoleLogin = (role: UserRole) => {
    const targetUser = PRESET_USERS.find(u => u.roleType === role) || PRESET_USERS[0];
    handleRoleLogin(targetUser);
  };

  // CEO adds a new employee -> updates state & dispatches directive to Team Leader
  const handleAddEmployee = (newEmp: Employee, newDirective: ExecutiveDirective) => {
    setEmployees(prev => [newEmp, ...prev]);
    setDirectives(prev => [newDirective, ...prev]);
    setLiveBannerDirective(newDirective);
    showGlobalToast(
      currentLanguage.dir === 'rtl'
        ? `تم اعتماد تعيين ${newEmp.name} وإرسال توجيه إداري رسمي لصندوق بريد الـ Team Leader!`
        : `New personnel ${newEmp.name} added. Official directive dispatched to Team Leader!`
    );
  };

  // CEO triggers a promotion / dismissal / reward directive from Workforce Screen
  const handleDispatchDirective = (newDirective: ExecutiveDirective) => {
    setDirectives(prev => [newDirective, ...prev]);
    setLiveBannerDirective(newDirective);
  };

  // Team Leader acknowledges an executive directive
  const handleAcknowledgeDirective = (directiveId: string) => {
    setDirectives(prev => prev.map(d => {
      if (d.id === directiveId) {
        return {
          ...d,
          acknowledgedByTL: true,
          acknowledgedAt: new Date().toISOString()
        };
      }
      return d;
    }));

    showGlobalToast(
      currentLanguage.dir === 'rtl'
        ? 'تم تأكيد استلام التوجيه الإداري إلكترونياً وتوثيق التوقيع.'
        : 'Directive electronically acknowledged by Team Leader.'
    );
  };

  // CEO broadcasts new manual decree
  const handleBroadcastDirective = (directive: ExecutiveDirective) => {
    setDirectives(prev => [directive, ...prev]);
    setLiveBannerDirective(directive);
    showGlobalToast(
      currentLanguage.dir === 'rtl'
        ? 'تم تعميم القرار الإداري وإرساله فورياً لكافة قادة الفرق.'
        : 'Directive broadcasted to all Team Leaders.'
    );
  };

  const handleLogout = async () => {
    await authClient.logout();
    setIsAuthenticated(false);
    setCurrentScreen('landing');
    showGlobalToast(
      currentLanguage.dir === 'rtl'
        ? 'تم تسجيل الخروج وتأمين الجلسة، العودة للصفحة الرئيسية.'
        : 'Logged out successfully. Returned to Home Page.'
    );
  };

  const [loginPrefill, setLoginPrefill] = useState<{ email?: string; role?: UserRole }>({});

  const handleUserRegistered = (newUser: User, newEmployee: Employee) => {
    setEmployees(prev => [newEmployee, ...prev]);
    const welcomeDirective: ExecutiveDirective = {
      id: `dir_reg_${Date.now()}`,
      type: 'NEW_HIRE',
      title: `New Personnel Registration: ${newUser.name}`,
      titleAr: `تسجيل مستخدم جديد: ${newUser.name} (${newUser.role})`,
      message: `User ${newUser.name} has registered on the platform with role ${newUser.role}. CEO can allot or reassign operational roles in Workforce.`,
      messageAr: `تم تسجيل وانضمام المستخدم (${newUser.name}) برتبة [${newUser.role}]. يمكن للرئيس التنفيذي وقادة الفرق متابعة المهام وتعديل الصلاحيات الممنوحة له.`,
      employeeId: newEmployee.id,
      employeeName: newUser.name,
      issuedBy: 'نظام إدارة الهوية والتسجيل السيادي (MJM Sovereign ID)',
      issuedAt: new Date().toISOString(),
      acknowledgedByTL: false,
      businessUnitId: newEmployee.businessUnitId,
      priority: 'STANDARD'
    };
    setDirectives(prev => [welcomeDirective, ...prev]);
    setLiveBannerDirective(welcomeDirective);
    showGlobalToast(
      currentLanguage.dir === 'rtl'
        ? `تم تسجيل حساب ${newUser.name} وإدراجه في سجل القوى العاملة (Workforce)!`
        : `Account for ${newUser.name} created and registered into Workforce directory!`
    );
  };

  const isLandingPage = currentScreen === 'landing';
  const isAuthPage = currentScreen === 'login' || currentScreen === 'signup';
  const showPortalChrome = !isLandingPage && !isAuthPage;

  return (
    <div 
      className="min-h-screen bg-[#09090b] text-slate-100 flex flex-col font-sans selection:bg-[#d4af35]/30 selection:text-[#f1d592]"
      dir={currentLanguage.dir}
    >


      {/* 
        RIGHT SIDEBAR NAVIGATION (Shown inside the ERP portal, NOT on Landing or Login/Signup)
        Per user instruction: "jab hum sign button click karkay login page per jaatey hain to ussi page per side baar menu nahi aana chahiaye صرف login page hi hona chahiaye"
      */}
      {showPortalChrome && (
        <RightSidebar
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
          currentUser={currentUser}
          currentLanguage={currentLanguage}
          onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
          onOpenAddEmployeeModal={() => setIsAddEmployeeModalOpen(true)}
          onSwitchUserRole={handleSwitchUserRole}
          unreadDirectivesCount={unreadDirectivesCount}
          isOpen={isRightSidebarOpen}
          setIsOpen={setIsRightSidebarOpen}
          onLogout={handleLogout}
        />
      )}

      {/* 
        MAIN CONTENT CONTAINER:
        Offset on the RIGHT side for desktop ONLY when inside the portal (sidebar visible).
      */}
      <div className={`flex-1 flex flex-col transition-all duration-300 min-w-0 ${
        showPortalChrome ? (isRightSidebarOpen ? 'lg:pr-80' : 'lg:pr-20') : ''
      } ${showPortalChrome ? 'pb-16 lg:pb-0' : ''}`}>
        
        {/* Sleek Top Utility Header (Shown inside the portal, not on Landing or Login/Signup) */}
        {showPortalChrome && (
          <TopHeader
            activeBusiness={activeBusiness}
            setActiveBusiness={setActiveBusiness}
            currentUser={currentUser}
            currentLanguage={currentLanguage}
            onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
            onOpenAddEmployeeModal={() => setIsAddEmployeeModalOpen(true)}
            unreadDirectivesCount={unreadDirectivesCount}
            onOpenDirectives={() => setCurrentScreen('directives')}
            onToggleSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
            onSwitchUserRole={handleSwitchUserRole}
          />
        )}

        {/* Live Automatic Directive Notification Bar (CEO -> Team Leader) */}
        {liveBannerDirective && showPortalChrome && (
          <div className="bg-gradient-to-r from-[#2a210d] via-[#3d2e13] to-[#2a210d] border-b border-[#d4af35]/50 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 shadow-lg shadow-black/50 animate-slideDown">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-[#17140c] border border-[#d4af35] text-[#f1d57f] flex items-center justify-center shrink-0">
                <Crown className="w-4 h-4 text-amber-400" />
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-black text-white truncate flex items-center gap-2">
                  <span>{t.newDirectiveAlert}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-[#f1d57f] border border-amber-500/40">
                    {liveBannerDirective.type}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 truncate">
                  {currentLanguage.dir === 'rtl' ? liveBannerDirective.titleAr : liveBannerDirective.title}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setCurrentScreen('directives');
                  setLiveBannerDirective(null);
                }}
                className="px-3 py-1 rounded-xl bg-[#d4af35] text-black font-black text-xs hover:bg-[#e4c25f] transition-colors shadow-sm"
              >
                {currentLanguage.dir === 'rtl' ? 'فتح البريد الإداري' : 'View in Directives Inbox'}
              </button>
              <button
                onClick={() => setLiveBannerDirective(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Screen Routing */}
        <main className="flex-1 w-full flex flex-col">
          {currentScreen === 'landing' && (
            <LandingScreen 
              onNavigate={(screen) => setCurrentScreen(screen)} 
              language={currentLanguage.code} 
              currentLanguage={currentLanguage}
              onSelectRole={handleQuickRoleLogin}
              onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
              onSelectLanguage={(lang) => {
                setCurrentLanguage(lang);
                localStorage.setItem('mjm_selected_lang', JSON.stringify(lang));
                showGlobalToast(
                  lang.dir === 'rtl'
                    ? `تم التبديل إلى (${lang.nativeName}) وتحديث لغة منظومة ERP بنجاح.`
                    : `Language switched to ${lang.name} (${lang.nativeName}). ERP system synchronized.`
                );
              }}
              onToggleLanguage={() => setIsLanguageModalOpen(true)}
            />
          )}

          {currentScreen === 'login' && (
            <LoginScreen 
              language={currentLanguage.code} 
              onLoginSuccess={handleRoleLogin} 
              onNavigateToSignUp={() => setCurrentScreen('signup')}
              onNavigateToHome={() => setCurrentScreen('landing')}
              initialEmail={loginPrefill.email}
              initialRole={loginPrefill.role}
              onSetLanguage={(langCode: string) => {
                const selected = ALL_LANGUAGES.find(l => l.code === langCode) || ALL_LANGUAGES[0];
                setCurrentLanguage(selected);
                localStorage.setItem('mjm_selected_lang', JSON.stringify(selected));
              }}
            />
          )}

          {currentScreen === 'signup' && (
            <SignUpScreen 
              language={currentLanguage.code}
              onNavigateToLogin={(email, role) => {
                if (email) setLoginPrefill({ email, role });
                setCurrentScreen('login');
              }}
              onNavigateToHome={() => setCurrentScreen('landing')}
              onUserRegistered={handleUserRegistered}
              onToggleLanguage={() => {
                setIsLanguageModalOpen(true);
              }}
            />
          )}

          {currentScreen === 'dashboard' && (
            <DashboardScreen 
              language={currentLanguage.code} 
              onOpenNewEntryModal={() => setIsNewEntryModalOpen(true)} 
            />
          )}

          {currentScreen === 'businesses' && (
            <ConnectedBusinessesScreen
              activeBusiness={activeBusiness}
              setActiveBusiness={setActiveBusiness}
              currentLanguage={currentLanguage}
            />
          )}

          {currentScreen === 'workforce' && (
            <WorkforceScreen
              employees={employees}
              onUpdateEmployees={setEmployees}
              onOpenAddEmployeeModal={() => setIsAddEmployeeModalOpen(true)}
              currentUser={currentUser}
              currentLanguage={currentLanguage}
              onDispatchDirective={handleDispatchDirective}
              activeBusiness={activeBusiness}
            />
          )}

          {currentScreen === 'directives' && (
            <DirectivesScreen
              directives={directives}
              onAcknowledgeDirective={handleAcknowledgeDirective}
              onBroadcastDirective={handleBroadcastDirective}
              currentUser={currentUser}
              currentLanguage={currentLanguage}
            />
          )}

          {currentScreen === 'crm' && (
            <CRMScreen language={currentLanguage.code} />
          )}

          {currentScreen === 'registration' && (
            <RegistrationScreen language={currentLanguage.code} />
          )}

          {currentScreen === 'reports' && (
            <CEOReportsScreen
              currentUser={currentUser}
              currentLanguage={currentLanguage}
              activeBusiness={activeBusiness}
            />
          )}

          {currentScreen === 'team_portal' && (
            <TeamLeaderPortalScreen
              currentUser={currentUser}
              currentLanguage={currentLanguage}
              directives={directives}
              employees={employees}
              onAcknowledgeDirective={handleAcknowledgeDirective}
              onDispatchDirective={handleDispatchDirective}
            />
          )}

          {currentScreen === 'employee_portal' && (
            <EmployeePortalScreen
              currentUser={currentUser}
              currentLanguage={currentLanguage}
            />
          )}
        </main>
      </div>

      {/* 100+ Global Languages Modal */}
      <LanguageSelectorModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        currentLanguage={currentLanguage}
        onSelectLanguage={(lang) => {
          setCurrentLanguage(lang);
          showGlobalToast(
            lang.dir === 'rtl'
              ? `تم التبديل إلى اللغة (${lang.nativeName}) وتحويل الواجهة تلقائياً`
              : `Language switched to ${lang.name}. Layout synchronized.`
          );
        }}
      />

      {/* CEO Exclusive Add Employee Modal */}
      <AddEmployeeModal
        isOpen={isAddEmployeeModalOpen}
        onClose={() => setIsAddEmployeeModalOpen(false)}
        onAddEmployee={handleAddEmployee}
        currentLanguage={currentLanguage}
        isCEO={isCEO}
      />

      {/* Quick Transaction Entry Modal */}
      <NewEntryModal
        isOpen={isNewEntryModalOpen}
        onClose={() => setIsNewEntryModalOpen(false)}
        language={currentLanguage.code}
        onSuccess={(msg) => showGlobalToast(msg)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(user) => {
          handleRoleLogin(user);
        }}
        language={currentLanguage.code}
        initialMode={authModalMode}
      />

      {/* Global Toast Alert */}
      {globalToast && (
        <div className="fixed bottom-6 left-6 z-50 px-5 py-3.5 rounded-2xl bg-[#1c180e] border border-[#d4af35] text-slate-100 text-xs shadow-2xl flex items-center gap-3 backdrop-blur-md animate-slideUp">
          <Sparkles className="w-4 h-4 text-[#d4af35] shrink-0" />
          <span className="font-semibold">{globalToast}</span>
          <button 
            onClick={() => setGlobalToast(null)}
            className="text-slate-400 hover:text-white ms-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Mobile Bottom Navigation Dock (Optimized for Phones & Tablets, Hidden on Desktop & Landing & Login/Signup) */}
      {showPortalChrome && (
        <nav 
          aria-label="Mobile Bottom Navigation"
          className="fixed bottom-0 inset-x-0 z-40 bg-[#0d0d10]/95 backdrop-blur-md border-t border-[#2b2212] py-1.5 px-3 flex items-center justify-around lg:hidden shadow-[0_-8px_25px_rgba(0,0,0,0.8)]"
          dir={currentLanguage.dir}
        >
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
              currentScreen === 'dashboard'
                ? 'text-[#f1d57f] font-bold bg-[#221c10] border border-[#d4af35]/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">{t.dashboard}</span>
          </button>

          <button
            onClick={() => setCurrentScreen('businesses')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
              currentScreen === 'businesses'
                ? 'text-[#f1d57f] font-bold bg-[#221c10] border border-[#d4af35]/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">{t.businesses}</span>
          </button>

          <button
            onClick={() => setCurrentScreen('workforce')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
              currentScreen === 'workforce'
                ? 'text-[#f1d57f] font-bold bg-[#221c10] border border-[#d4af35]/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">{t.workforce}</span>
          </button>

          <button
            onClick={() => setCurrentScreen('directives')}
            className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
              currentScreen === 'directives'
                ? 'text-[#f1d57f] font-bold bg-[#221c10] border border-[#d4af35]/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Mail className="w-4 h-4" />
              {unreadDirectivesCount > 0 && (
                <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 rounded-full bg-red-600 text-white text-[8px] font-black flex items-center justify-center">
                  {unreadDirectivesCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5">{t.directives}</span>
          </button>

          <button
            onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
              isRightSidebarOpen
                ? 'text-[#f1d57f] font-bold bg-[#221c10] border border-[#d4af35]/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            aria-label="Toggle Full Menu"
          >
            <Menu className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">{currentLanguage.dir === 'rtl' ? 'القائمة' : 'Menu'}</span>
          </button>
        </nav>
      )}
    </div>
  );
}
