import React from 'react';
import { AppScreen, Language, User } from '../types';
import { 
  Home, 
  BarChart3, 
  Users, 
  Sparkles, 
  Building2, 
  UserCheck, 
  LogIn
} from 'lucide-react';

interface MobileBottomNavProps {
  currentScreen: AppScreen;
  setCurrentScreen: (screen: AppScreen) => void;
  language: Language;
  isAuthenticated: boolean;
  currentUser: User | null;
  onOpenAuth: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentScreen,
  setCurrentScreen,
  language,
  isAuthenticated,
  currentUser,
  onOpenAuth
}) => {
  const isArabic = language === 'ar';

  const items: { id: AppScreen; label: string; icon: any; isAuthTrigger?: boolean }[] = [
    { id: 'landing', label: isArabic ? 'الرئيسية' : 'Home', icon: Home },
    { id: 'dashboard', label: isArabic ? 'القيادة' : 'Stats', icon: BarChart3 },
    { id: 'crm', label: isArabic ? 'العملاء' : 'CRM', icon: Users },
    { id: 'workforce', label: isArabic ? 'الفريق' : 'Team', icon: Sparkles },
    { 
      id: 'login', 
      label: isAuthenticated ? (isArabic ? 'حسابي' : 'Profile') : (isArabic ? 'دخول' : 'Login'), 
      icon: isAuthenticated ? UserCheck : LogIn,
      isAuthTrigger: true 
    }
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e0e0e]/95 backdrop-blur-xl border-t border-[#2d2514] px-2 py-1.5 shadow-2xl safe-bottom"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => {
                if (item.isAuthTrigger && !isAuthenticated) {
                  onOpenAuth();
                } else {
                  setCurrentScreen(item.id);
                }
              }}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 min-w-[56px] ${
                isActive 
                  ? 'text-[#f1d57f]' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg transition-transform ${
                isActive ? 'bg-[#d4af35]/20 text-[#d4af35] scale-110' : ''
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap ${
                isActive ? 'font-bold text-[#f1d57f]' : 'font-medium'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
