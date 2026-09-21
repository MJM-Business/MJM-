export type AppScreen = 
  | 'landing' 
  | 'dashboard' 
  | 'crm' 
  | 'workforce' 
  | 'businesses' 
  | 'directives' 
  | 'registration' 
  | 'login'
  | 'signup'
  | 'team_portal'
  | 'employee_portal'
  | 'reports';

export interface WorkExecutionLog {
  id: string;
  taskTitle: string;
  taskTitleAr: string;
  performedBy: string;
  performerRole: string;
  businessUnitId: string;
  businessUnitName: string;
  businessUnitNameAr: string;
  category: string;
  completedAt: string;
  hoursSpent: number;
  status: 'COMPLETED' | 'VERIFIED' | 'IN_REVIEW';
  outputNotes?: string;
}

export interface BusinessFinancialReport {
  businessId: string;
  businessName: string;
  businessNameAr: string;
  code: string;
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMarginPercent: number;
  staffSalariesExpense: number;
  operationalExpense: number;
  tasksCompletedCount: number;
  efficiencyScore: number;
}

export type UserRole = 'CEO' | 'TEAM_LEADER' | 'EMPLOYEE';

export interface StaffTask {
  id: string;
  title: string;
  titleAr: string;
  assignedTo: string;
  priority: 'URGENT' | 'MEDIUM' | 'LOW';
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  dueDate: string;
  category: string;
  notes?: string;
}

export interface ShiftAttendanceRecord {
  id: string;
  date: string;
  clockInTime: string;
  clockOutTime?: string;
  status: 'ON_TIME' | 'LATE' | 'REMOTE' | 'LEAVE';
  location: string;
  durationHours?: number;
}

export interface LeaveRequest {
  id: string;
  staffName: string;
  type: 'ANNUAL' | 'EMERGENCY' | 'SICK' | 'REMOTE';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
}

export type Language = string;

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  roleType: UserRole;
  company?: string;
  avatar?: string;
  createdAt: string;
  businessUnitId?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface BusinessUnit {
  id: string;
  name: string;
  nameAr: string;
  code: string;
  iconName: string;
  revenue: number;
  staffCount: number;
  description: string;
  descriptionAr: string;
  headOfDivision: string;
}

export interface Client {
  id: string;
  code: string;
  name: string;
  initials: string;
  category: 'VIP' | 'Regular';
  syncStatus: 'synced' | 'offline';
  assignedAgent: {
    name: string;
    avatar: string;
  };
  status: 'verified' | 'pending';
  whatsappNumber?: string;
  company?: string;
  lastContactDate?: string;
  businessUnitId?: string;
}

export interface EmployeePerformanceReport {
  overallScore: number;
  kpiAchievement: number;
  disciplineRate: number;
  projectsCompleted: number;
  leadershipPotential: 'High' | 'Medium' | 'Emerging';
  confidentialNotes: string;
  salaryGrade: string;
  lastReviewDate: string;
  eligibleForBonus: boolean;
}

export interface Employee {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: string;
  rating: 'A' | 'B' | 'C';
  status: 'active' | 'remote' | 'offline' | 'dismissed';
  avatar: string;
  department: string;
  performanceScore: number;
  businessUnitId: string;
  salary?: number;
  dateJoined?: string;
  performanceReport?: EmployeePerformanceReport;
}

export interface ExecutiveDirective {
  id: string;
  type: 'PROMOTION' | 'REWARD' | 'DISMISSAL' | 'NEW_HIRE' | 'ANNOUNCEMENT';
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  employeeId?: string;
  employeeName?: string;
  issuedBy: string;
  issuedAt: string;
  acknowledgedByTL: boolean;
  businessUnitId?: string;
  priority: 'URGENT' | 'STANDARD' | 'CONFIDENTIAL';
}

export interface FinancialTransaction {
  id: string;
  operation: string;
  department: string;
  date: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
  icon: string;
  businessUnitId?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  iban: string;
  cif: string;
}

export interface AIInsight {
  id: string;
  type: 'info' | 'urgent' | 'recommendation';
  message: string;
  timestamp: string;
  actionable?: boolean;
}

export interface LanguageItem {
  code: string;
  name: string;
  nativeName: string;
  dir: 'rtl' | 'ltr';
  flag: string;
}
