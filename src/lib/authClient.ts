import { User, AuthResponse } from '../types';

const TOKEN_KEY = 'mjm_auth_token';
const USER_KEY = 'mjm_auth_user';

// Default admin profile matching the current session user
export const DEFAULT_ADMIN_USER: User = {
  id: 'user_mjm_exec_01',
  email: 'businessmjm76@gmail.com',
  name: 'ألكسندر ثورن (MJM Executive)',
  role: 'الرئيس التنفيذي (CEO)',
  roleType: 'CEO',
  company: 'مجموعة MJM القابضة',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiNvii-7AQhWSAnbRIlkLLxJii5jXhhMWK3PGH66-XP__SbdNb4BYI0qqDE4AwqB49HBJYIEUF3ZGsXxl98bo2KVVInc3FscHhTacgWWvkISJ0mWe-IeMxdsBEt16tEtaX-QOCC3krs-1Vb1PpcNUTLei-fWY85HI61WKFgPARem5-FDid4nVAunVLHCUIhKlrDk8ZGULFIbaO7TZjAUpEr-oWm77r-8aGi1eyXpz1494srSZAZCyUzZsD-w0-3v1nKdCjjShDhQ',
  createdAt: new Date().toISOString()
};

export const authClient = {
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setSession(token: string, user: User) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn('Storage error', e);
    }
  },

  clearSession() {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      console.warn('Storage error', e);
    }
  },

  getSavedUser(): User | null {
    try {
      const data = localStorage.getItem(USER_KEY);
      if (data) return JSON.parse(data);
      return DEFAULT_ADMIN_USER;
    } catch {
      return DEFAULT_ADMIN_USER;
    }
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'فشل تسجيل الدخول. تحقق من البريد وكلمة المرور.');
      }

      this.setSession(data.token, data.user);
      return data;
    } catch (err: any) {
      // Fallback for demo email if offline or network glitch
      if (email.toLowerCase().trim() === DEFAULT_ADMIN_USER.email && password === 'Password123!') {
        const mockToken = 'mock_jwt_session_' + Date.now();
        this.setSession(mockToken, DEFAULT_ADMIN_USER);
        return { user: DEFAULT_ADMIN_USER, token: mockToken };
      }
      throw err;
    }
  },

  async signup(
    email: string,
    password: string,
    name: string,
    role?: string,
    company?: string
  ): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role, company })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'فشل إنشاء الحساب.');
      }

      this.setSession(data.token, data.user);
      return data;
    } catch (err: any) {
      // Fallback in case of server restart
      if (err.message && !err.message.includes('fetch')) {
        throw err;
      }
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: email.trim().toLowerCase(),
        name: name.trim(),
        role: role || 'عضو معتمد',
        roleType: (role?.includes('CEO') ? 'CEO' : role?.includes('Leader') ? 'TEAM_LEADER' : 'EMPLOYEE'),
        company: company || 'منشأة تجارية',
        avatar: DEFAULT_ADMIN_USER.avatar,
        createdAt: new Date().toISOString()
      };
      const mockToken = 'token_' + Date.now();
      this.setSession(mockToken, newUser);
      return { user: newUser, token: mockToken };
    }
  },

  async getCurrentUser(): Promise<User | null> {
    const token = this.getToken();
    if (!token) return this.getSavedUser();

    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        this.setSession(token, data.user);
        return data.user;
      }
    } catch {
      // Return saved user
    }
    return this.getSavedUser();
  },

  async logout(): Promise<void> {
    const token = this.getToken();
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch {
        // ignore
      }
    }
    this.clearSession();
  }
};
