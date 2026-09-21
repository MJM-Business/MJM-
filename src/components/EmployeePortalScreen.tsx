import React, { useState, useEffect } from 'react';
import { User, LanguageItem, StaffTask, LeaveRequest } from '../types';
import { 
  UserCheck, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MapPin, 
  Award, 
  Send, 
  FileText, 
  Sparkles, 
  AlertCircle, 
  Plus, 
  Check, 
  TrendingUp, 
  ShieldCheck, 
  Coffee, 
  ChevronRight, 
  ChevronLeft,
  Crown,
  FileSpreadsheet,
  Printer,
  Download,
  DollarSign
} from 'lucide-react';
import { exportToExcel, exportToPdf, translateValue, ExportLanguage } from '../utils/exportUtils';
import { ExportLanguageSelector } from './ExportLanguageSelector';

interface EmployeePortalScreenProps {
  currentUser: User;
  currentLanguage: LanguageItem;
}

export const EmployeePortalScreen: React.FC<EmployeePortalScreenProps> = ({
  currentUser,
  currentLanguage
}) => {
  const isArabic = currentLanguage.dir === 'rtl';

  // Tabs inside Employee Portal
  const [activeTab, setActiveTab] = useState<'my_tasks' | 'attendance' | 'performance' | 'reports'>('my_tasks');

  // Clock-in / Clock-out state
  const [isClockedIn, setIsClockedIn] = useState<boolean>(true);
  const [clockInTime, setClockInTime] = useState<string>('08:32 AM');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [exportLang, setExportLang] = useState<ExportLanguage>(
    currentLanguage.code === 'ur' ? 'ur' : currentLanguage.code === 'ar' ? 'ar' : 'en'
  );

  // Live digital clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString(isArabic ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [isArabic]);

  // Personal Tasks State
  const [myTasks, setMyTasks] = useState<StaffTask[]>([
    {
      id: 'emp-tsk-1',
      title: 'مراجعة خوارزميات الذكاء الاصطناعي وتحديث استجابة النموذج',
      titleAr: 'مراجعة خوارزميات الذكاء الاصطناعي وتحديث استجابة النموذج',
      assignedTo: currentUser.name,
      priority: 'URGENT',
      status: 'IN_PROGRESS',
      dueDate: '2026-09-22',
      category: 'AI Engineering',
      notes: 'تم فحص أداء النموذج وتوثيق المعاملات'
    },
    {
      id: 'emp-tsk-2',
      title: 'إعداد تقرير التوثيق الفني للربط مع المنظومة السحابية',
      titleAr: 'إعداد تقرير التوثيق الفني للربط مع المنظومة السحابية',
      assignedTo: currentUser.name,
      priority: 'MEDIUM',
      status: 'TODO',
      dueDate: '2026-09-24',
      category: 'Documentation'
    },
    {
      id: 'emp-tsk-3',
      title: 'فحص مصفوفة الأمان السيبراني ونظام الصلاحيات RBAC',
      titleAr: 'فحص مصفوفة الأمان السيبراني ونظام الصلاحيات RBAC',
      assignedTo: currentUser.name,
      priority: 'URGENT',
      status: 'COMPLETED',
      dueDate: '2026-09-20',
      category: 'Security Compliance'
    }
  ]);

  // Leave Requests State
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: 'lr-1',
      staffName: currentUser.name,
      type: 'ANNUAL',
      startDate: '2026-10-10',
      endDate: '2026-10-15',
      reason: 'إجازة سنوية اعتيادية مجدولة',
      status: 'APPROVED',
      submittedAt: '2026-09-15'
    }
  ]);

  // New Leave Request Form Modal
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveType, setLeaveType] = useState<'ANNUAL' | 'EMERGENCY' | 'SICK' | 'REMOTE'>('ANNUAL');
  const [leaveStartDate, setLeaveStartDate] = useState('2026-10-01');
  const [leaveEndDate, setLeaveEndDate] = useState('2026-10-03');
  const [leaveReason, setLeaveReason] = useState('');

  // Deliverable submission note modal
  const [deliverableModalOpen, setDeliverableModalOpen] = useState(false);
  const [deliverableNote, setDeliverableNote] = useState('');

  // Verified Attendance History State for Timesheet & Reports
  const [attendanceHistory] = useState([
    { id: 'att-1', date: '2026-09-20', clockInTime: '08:28 AM', clockOutTime: '05:05 PM', durationHours: 8.5, location: 'MJM Tower, Riyadh HQ', status: 'ON_TIME' },
    { id: 'att-2', date: '2026-09-19', clockInTime: '08:31 AM', clockOutTime: '05:10 PM', durationHours: 8.6, location: 'MJM Tower, Riyadh HQ', status: 'ON_TIME' },
    { id: 'att-3', date: '2026-09-18', clockInTime: '08:30 AM', clockOutTime: '05:00 PM', durationHours: 8.5, location: 'MJM Tower, Riyadh HQ', status: 'ON_TIME' },
    { id: 'att-4', date: '2026-09-17', clockInTime: '08:29 AM', clockOutTime: '05:15 PM', durationHours: 8.7, location: 'Remote / Verified VPN', status: 'ON_TIME' },
    { id: 'att-5', date: '2026-09-16', clockInTime: '08:32 AM', clockOutTime: '05:02 PM', durationHours: 8.5, location: 'MJM Tower, Riyadh HQ', status: 'ON_TIME' },
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleToggleClock = () => {
    if (isClockedIn) {
      setIsClockedIn(false);
      triggerToast(isArabic ? 'تم تسجيل الانصراف بنجاح وتوثيق ساعات العمل اليومية' : 'Clocked-out successfully. Hours recorded.');
    } else {
      setIsClockedIn(true);
      const timeStr = new Date().toLocaleTimeString(isArabic ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' });
      setClockInTime(timeStr);
      triggerToast(isArabic ? `تم تسجيل الحضور بنجاح في تمام ${timeStr} مع توثيق الموقع الجغرافي GPS` : `Clocked-in at ${timeStr} with GPS verified location`);
    }
  };

  const handleToggleTaskStatus = (taskId: string) => {
    setMyTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextStatus = t.status === 'TODO' ? 'IN_PROGRESS' : t.status === 'IN_PROGRESS' ? 'COMPLETED' : 'TODO';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReason.trim()) return;

    const newReq: LeaveRequest = {
      id: `lr-${Date.now()}`,
      staffName: currentUser.name,
      type: leaveType,
      startDate: leaveStartDate,
      endDate: leaveEndDate,
      reason: leaveReason,
      status: 'PENDING',
      submittedAt: new Date().toISOString().split('T')[0]
    };

    setLeaveRequests([newReq, ...leaveRequests]);
    setIsLeaveModalOpen(false);
    setLeaveReason('');
    triggerToast(
      isArabic 
        ? 'تم إرسال طلب الإجازة بنجاح إلى قائد الفريق للمراجعة والاعتماد' 
        : 'Leave request submitted successfully to Team Leader for approval'
    );
  };

  const handleSubmitDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliverableNote.trim()) return;

    setDeliverableModalOpen(false);
    setDeliverableNote('');
    triggerToast(
      isArabic 
        ? 'تم إرسال تقرير الإنجاز والمخرجات بنجاح إلى قائد الفريق' 
        : 'Work output deliverable submitted to Team Leader'
    );
  };

  return (
    <div className="w-full bg-[#090b0a] text-slate-100 min-h-screen py-4 sm:py-8 px-3 sm:px-6 lg:px-8 font-sans" dir={currentLanguage.dir}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Live Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 left-4 right-4 sm:right-auto sm:left-6 z-50 p-4 rounded-2xl bg-[#0f2119] border border-emerald-500 text-slate-100 text-xs shadow-2xl flex items-center gap-3 animate-slideUp max-w-md">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* 3D Header Section: Verified Staff Member Workspace */}
        <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0d1712] via-[#11241a] to-[#0d1712] border border-emerald-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(52,211,153,0.3)] flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-600 to-teal-950 p-[2px] shadow-[0_8px_20px_rgba(16,185,129,0.35)] flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0a140f] rounded-[14px] flex items-center justify-center shadow-inner">
                <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {isArabic ? 'مساحة عمل الموظف والخدمات الذاتية' : 'Employee Workspace & Self-Service'}
                </h1>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {isArabic ? 'حساب موظف معتمد' : 'Verified Staff Account'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {isArabic 
                  ? `أهلاً بك يا ${currentUser.name} (${currentUser.role}) • متابعة المهام اليومية وتسجيل الحضور الذكي` 
                  : `Welcome ${currentUser.name} (${currentUser.role}) • Daily tasks & Attendance self-service`}
              </p>
            </div>
          </div>

          {/* Quick Staff Operational Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-2xl bg-[#09150f] border border-emerald-900/50 text-start min-w-[95px]">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                {isArabic ? 'حالة الدوام' : 'Shift Status'}
              </div>
              <div className="text-sm sm:text-base font-black text-emerald-400 font-mono flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isClockedIn ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></span>
                <span>{isClockedIn ? (isArabic ? 'نشط' : 'Clocked-In') : (isArabic ? 'منصرف' : 'Clocked-Out')}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#09150f] border border-emerald-900/50 text-start min-w-[95px]">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                {isArabic ? 'المهام المسندة' : 'My Tasks'}
              </div>
              <div className="text-sm sm:text-base font-black text-white font-mono flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>{myTasks.filter(t => t.status === 'COMPLETED').length}/{myTasks.length}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#09150f] border border-emerald-900/50 text-start min-w-[95px]">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                {isArabic ? 'نسبة الالتزام' : 'Attendance'}
              </div>
              <div className="text-sm sm:text-base font-black text-[#f1d57f] font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d4af35]" />
                <span>99.2%</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#09150f] border border-emerald-900/50 text-start min-w-[95px]">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                {isArabic ? 'رصيد الإجازات' : 'Leaves Left'}
              </div>
              <div className="text-sm sm:text-base font-black text-emerald-300 font-mono flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>21 {isArabic ? 'يوم' : 'Days'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#1b2620]">
          <button
            onClick={() => setActiveTab('my_tasks')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'my_tasks'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-[#0f1712] text-slate-400 hover:text-white border border-[#1e2d24]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{isArabic ? 'مهامي اليومية وجدول العمل' : 'My Daily Tasks & Deliverables'}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-400 text-black text-[10px] font-black">
              {myTasks.filter(t => t.status !== 'COMPLETED').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'attendance'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-[#0f1712] text-slate-400 hover:text-white border border-[#1e2d24]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{isArabic ? 'تسجيل الحضور وطلبات الإجازة' : 'Clock-In & Leave Requests'}</span>
          </button>

          <button
            onClick={() => setActiveTab('performance')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'performance'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-[#0f1712] text-slate-400 hover:text-white border border-[#1e2d24]'
            }`}
          >
            <Award className="w-4 h-4 text-[#f1d57f]" />
            <span>{isArabic ? 'تقييم أدائي والتكريمات' : 'My Scorecard & Honors'}</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'reports'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-[#0f1712] text-slate-400 hover:text-white border border-[#1e2d24]'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-[#f1d57f]" />
            <span>{isArabic ? 'تقارير إنجازي وساعات العمل' : 'My Productivity & Timesheet'}</span>
          </button>
        </div>

        {/* TAB 1: My Daily Tasks */}
        {activeTab === 'my_tasks' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0e1611] p-4 rounded-2xl border border-[#1d2d23]">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>{isArabic ? 'المهام التشغيلية المسندة إليك' : 'Tasks Assigned by Team Leader'}</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {isArabic ? 'انقر على الدائرة لتبديل حالة المهمة بين (قيد التنفيذ / مكتملة)' : 'Click checkbox to update progress status'}
                </p>
              </div>

              <button
                onClick={() => setDeliverableModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-emerald-400 to-teal-400 hover:brightness-105 transition-all shadow-md flex items-center gap-2 self-start sm:self-auto"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isArabic ? 'تسليم مخرجات العمل لقائد الفريق' : 'Submit Deliverable'}</span>
              </button>
            </div>

            {/* Task Cards List */}
            <div className="space-y-2.5">
              {myTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-2xl bg-[#0e1611] border border-[#1d2d23] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleTaskStatus(task.id)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                        task.status === 'COMPLETED'
                          ? 'bg-emerald-500 text-black shadow-md'
                          : task.status === 'IN_PROGRESS'
                          ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400'
                          : 'bg-[#15241b] border border-[#23382c] text-slate-500'
                      }`}
                      title="Click to toggle status"
                    >
                      {task.status === 'COMPLETED' ? <Check className="w-4 h-4 stroke-[3]" /> : <Clock className="w-4 h-4" />}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold ${task.status === 'COMPLETED' ? 'line-through text-slate-400' : 'text-white'}`}>
                          {task.title}
                        </span>
                        <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                          task.priority === 'URGENT' 
                            ? 'bg-red-500/20 text-red-400 border border-red-500/40' 
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {isArabic ? 'القطاع:' : 'Category:'} <span className="text-emerald-300 font-semibold">{task.category}</span> • {isArabic ? 'تاريخ الاستحقاق:' : 'Due Date:'} {task.dueDate}
                      </div>
                      {task.notes && (
                        <div className="text-[10px] text-slate-400 mt-1 bg-[#09110d] px-2.5 py-1 rounded-lg border border-[#192b20]">
                          {task.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className={`text-xs font-bold px-3 py-1 rounded-xl ${
                      task.status === 'COMPLETED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : task.status === 'IN_PROGRESS'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Smart Clock-In & Attendance Roster */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            
            {/* Clock-In / Out Hero Control */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0e1913] via-[#14281e] to-[#0e1913] border border-emerald-500/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>{isArabic ? 'نظام الحضور والانصراف الذكي المعتمد' : 'Smart Clock-In System Active'}</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-wider">
                  {currentTime || '08:45:12 AM'}
                </div>
                <div className="text-xs text-slate-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{isArabic ? 'الموقع الجغرافي: مقر الرياض الرئيسي • موثق عبر GPS' : 'GPS Location: Riyadh HQ • Verified'}</span>
                </div>
              </div>

              {/* Punch Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleToggleClock}
                  className={`px-8 py-4 rounded-2xl text-sm font-black transition-all shadow-xl active:scale-95 flex items-center gap-2.5 ${
                    isClockedIn
                      ? 'bg-gradient-to-b from-red-500 to-red-700 text-white shadow-red-600/30'
                      : 'bg-gradient-to-b from-emerald-400 to-emerald-600 text-black shadow-emerald-500/40'
                  }`}
                >
                  <Clock className="w-5 h-5 stroke-[2.5]" />
                  <span>{isClockedIn ? (isArabic ? 'تسجيل الانصراف' : 'Clock Out') : (isArabic ? 'تسجيل الحضور الآن' : 'Clock In Now')}</span>
                </button>

                <button
                  onClick={() => setIsLeaveModalOpen(true)}
                  className="px-5 py-4 rounded-2xl text-xs font-bold text-slate-200 bg-[#16271e] hover:bg-[#1d3529] border border-[#2b4d3a] transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>{isArabic ? 'طلب إجازة / استئذان' : 'Request Leave'}</span>
                </button>
              </div>
            </div>

            {/* Attendance Roster Log */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>{isArabic ? 'سجل حضور الأسبوع الحالي' : 'Weekly Attendance Log'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-[#0e1611] border border-[#1d2d23] space-y-1">
                  <div className="text-slate-400">{isArabic ? 'اليوم: الأحد' : 'Sunday'}</div>
                  <div className="text-sm font-bold text-white font-mono">08:28 AM - 05:05 PM</div>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    {isArabic ? 'في الموعد' : 'On Time'} (8.5h)
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0e1611] border border-[#1d2d23] space-y-1">
                  <div className="text-slate-400">{isArabic ? 'اليوم: الاثنين' : 'Monday'}</div>
                  <div className="text-sm font-bold text-white font-mono">08:31 AM - 05:10 PM</div>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    {isArabic ? 'في الموعد' : 'On Time'} (8.6h)
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0e1611] border border-[#1d2d23] space-y-1">
                  <div className="text-slate-400">{isArabic ? 'اليوم: الثلاثاء' : 'Tuesday'}</div>
                  <div className="text-sm font-bold text-white font-mono">08:30 AM - 05:00 PM</div>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    {isArabic ? 'في الموعد' : 'On Time'} (8.5h)
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0e1611] border border-emerald-500/40 space-y-1 ring-1 ring-emerald-500/30">
                  <div className="text-emerald-300 font-bold">{isArabic ? 'اليوم: الجاري' : 'Today (Active)'}</div>
                  <div className="text-sm font-bold text-white font-mono">{clockInTime} - حتى الآن</div>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    {isArabic ? 'مناوبة جارية' : 'In Progress'}
                  </span>
                </div>
              </div>
            </div>

            {/* Leave Requests Table */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>{isArabic ? 'طلبات الإجازات والاستئذان المقدمة' : 'My Submitted Leave Requests'}</span>
              </h3>

              <div className="space-y-2">
                {leaveRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-2xl bg-[#0e1611] border border-[#1d2d23] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          {req.type === 'ANNUAL' ? (isArabic ? 'إجازة سنوية' : 'Annual Leave') : (isArabic ? 'استئذان طارئ' : 'Emergency')}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {req.startDate} → {req.endDate}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">{req.reason}</div>
                    </div>

                    <span className={`text-xs font-bold px-3 py-1 rounded-xl self-start sm:self-auto ${
                      req.status === 'APPROVED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {req.status === 'APPROVED' ? (isArabic ? 'تمت الموافقة' : 'Approved') : (isArabic ? 'قيد المراجعة' : 'Pending')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: My Scorecard & Honors */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            
            {/* Scorecard Summary Hero */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#171f11] via-[#212f17] to-[#171f11] border border-[#d4af35]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#f1d57f]">
                  <Award className="w-4 h-4" />
                  <span>{isArabic ? 'بطاقة تقييم الأداء والتميز الوظيفي' : 'Official Performance Scorecard'}</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black text-white font-mono">97.4</span>
                  <span className="text-lg text-slate-400">/ 100</span>
                  <span className="text-xs font-black px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Grade A+ (Exemplary)
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  {isArabic 
                    ? 'تقييم رسمي صادر عن إدارة العمليات ومصادق عليه من قبل الرئيس التنفيذي.' 
                    : 'Official appraisal verified by Team Leadership and the CEO.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#10190d] border border-[#3b4b1a] text-start min-w-[200px] space-y-2">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-[#f1d57f]" />
                  <span>{isArabic ? 'مكافآت التميز المعتمدة' : 'Approved CEO Bonuses'}</span>
                </div>
                <div className="text-xs text-emerald-400 font-mono font-bold">
                  +15,000 SAR (Q3 Performance Award)
                </div>
                <div className="text-[10px] text-slate-400">
                  {isArabic ? 'تم إيداعها مع مسير الرواتب المعتمد' : 'Credited with monthly salary'}
                </div>
              </div>
            </div>

            {/* Performance Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#0e1611] border border-[#1d2d23] space-y-2">
                <div className="text-slate-400">{isArabic ? 'جودة المخرجات البرمجية' : 'Code & Systems Quality'}</div>
                <div className="text-xl font-black text-white font-mono">98%</div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e1611] border border-[#1d2d23] space-y-2">
                <div className="text-slate-400">{isArabic ? 'الالتزام بالمواعيد النهائية' : 'On-Time Deliverables'}</div>
                <div className="text-xl font-black text-white font-mono">96%</div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e1611] border border-[#1d2d23] space-y-2">
                <div className="text-slate-400">{isArabic ? 'التعاون وروح الفريق' : 'Team Collaboration'}</div>
                <div className="text-xl font-black text-white font-mono">99%</div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#d4af35] h-full rounded-full" style={{ width: '99%' }}></div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: My Productivity & Timesheet Reports with Excel/PDF Exports */}
        {activeTab === 'reports' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Header & Export Controls */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-[#0d1812] to-[#12241b] border border-emerald-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                  <span>{isArabic ? 'تقرير إنجازاتي وساعات العمل الشهرية' : 'Personal Work Deliverables & Timesheet Report'}</span>
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  {isArabic 
                    ? 'سجل تدقيق ذاتي لكافة المهام التي أنجزتها، ساعات الدوام المسجلة، ومكافآت التميز المعتمدة' 
                    : 'Personal audit log: Completed tasks, logged shift hours & approved bonuses'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <ExportLanguageSelector 
                  currentLang={exportLang} 
                  onChange={setExportLang} 
                />

                <button
                  onClick={() => {
                    let exportRows: Record<string, any>[] = [];

                    if (exportLang === 'ar') {
                      exportRows = myTasks.map(t => ({
                        'المهمة المسندة': t.titleAr,
                        'الأولوية': t.priority === 'URGENT' ? 'عاجل جداً' : t.priority === 'MEDIUM' ? 'متوسط' : 'عادي',
                        'الحالة': translateValue(t.status, 'ar'),
                        'تاريخ الاستحقاق': t.dueDate,
                        'القسم': t.category,
                        'ملاحظات المخرجات المسلمة': t.notes || '-'
                      }));
                    } else if (exportLang === 'ur') {
                      exportRows = myTasks.map(t => ({
                        'تفویض کردہ کام': translateValue(t.title, 'ur'),
                        'ترجیح': t.priority === 'URGENT' ? 'فوری' : t.priority === 'MEDIUM' ? 'اہم' : 'معمول',
                        'حالت': translateValue(t.status, 'ur'),
                        'تکمیل کی تاریخ (کب ہوا)': t.dueDate,
                        'شعبہ': t.category,
                        'تفصیلات و نتائج': t.notes || '-'
                      }));
                    } else {
                      exportRows = myTasks.map(t => ({
                        'Assigned Task': t.title,
                        'Priority': t.priority,
                        'Status': translateValue(t.status, 'en'),
                        'Due Date': t.dueDate,
                        'Department': t.category,
                        'Deliverable Notes': t.notes || '-'
                      }));
                    }

                    exportToExcel(exportRows, `Employee_Deliverables_${currentUser.name}_${exportLang.toUpperCase()}_${Date.now()}`, 'MyDeliverables');
                    setToastMessage(
                      exportLang === 'ar'
                        ? 'تم تصدير تقرير إنجازاتك باللغة العربية بنجاح إلى Excel (.xlsx)'
                        : exportLang === 'ur'
                        ? 'کارکردگی کی رپورٹ اردو میں Excel (.xlsx) فائل میں تیار کر دی گئی ہے'
                        : 'Personal deliverables exported in English to Excel (.xlsx)'
                    );
                  }}
                  className="px-3.5 py-2 rounded-2xl text-xs font-bold text-black bg-gradient-to-r from-emerald-400 to-teal-400 hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4 text-black stroke-[2.5]" />
                  <span>{exportLang === 'ar' ? 'تصدير Excel' : exportLang === 'ur' ? 'ایکسل برآمد' : 'Export Excel'}</span>
                </button>

                <button
                  onClick={() => {
                    let title = `Personal Work Deliverables - ${currentUser.name}`;
                    let subtitle = `Staff: ${currentUser.name} (${currentUser.role}) | Department: Tech & AI`;
                    let cols = [
                      { header: 'Task Deliverable', dataKey: 'task' },
                      { header: 'Priority', dataKey: 'priority' },
                      { header: 'Status', dataKey: 'status' },
                      { header: 'Due Date', dataKey: 'date' },
                      { header: 'Deliverable Notes', dataKey: 'notes' }
                    ];
                    let rows: Record<string, any>[] = [];
                    let summaryMetrics = [
                      { label: 'Tasks Done', value: `${myTasks.filter(t => t.status === 'COMPLETED').length}/${myTasks.length}` },
                      { label: 'Hours Logged', value: '168h' },
                      { label: 'Attendance Rate', value: '99.2%' }
                    ];

                    if (exportLang === 'ar') {
                      title = `تقرير مخرجات العمل الفردية - ${currentUser.name}`;
                      subtitle = `الموظف: ${currentUser.name} (${translateValue(currentUser.role, 'ar')}) | قطاع التقنية والأنظمة`;
                      cols = [
                        { header: 'المهمة المنجزة', dataKey: 'task' },
                        { header: 'الأولوية', dataKey: 'priority' },
                        { header: 'الحالة', dataKey: 'status' },
                        { header: 'تاريخ التسليم', dataKey: 'date' },
                        { header: 'المخرجات والنتائج', dataKey: 'notes' }
                      ];
                      rows = myTasks.map(t => ({
                        task: t.titleAr,
                        priority: t.priority === 'URGENT' ? 'عاجل جداً' : t.priority === 'MEDIUM' ? 'متوسط' : 'عادي',
                        status: translateValue(t.status, 'ar'),
                        date: t.dueDate,
                        notes: t.notes || '-'
                      }));
                      summaryMetrics = [
                        { label: 'المهام المنجزة', value: `${myTasks.filter(t => t.status === 'COMPLETED').length}/${myTasks.length}` },
                        { label: 'ساعات العمل', value: '168 ساعة' },
                        { label: 'نسبة الحضور', value: '99.2%' }
                      ];
                    } else if (exportLang === 'ur') {
                      title = `انفرادی کارکردگی اور تفویض شدہ کاموں کی رپورٹ - ${translateValue(currentUser.name, 'ur')}`;
                      subtitle = `ملازم: ${translateValue(currentUser.name, 'ur')} (${translateValue(currentUser.role, 'ur')}) | شعبہ آئی ٹی و مصنوعی ذہانت`;
                      cols = [
                        { header: 'تفویض کردہ کام', dataKey: 'task' },
                        { header: 'ترجیح', dataKey: 'priority' },
                        { header: 'حالت', dataKey: 'status' },
                        { header: 'تاریخ تکمیل (کب ہوا)', dataKey: 'date' },
                        { header: 'نوٹس و نتائج', dataKey: 'notes' }
                      ];
                      rows = myTasks.map(t => ({
                        task: translateValue(t.title, 'ur'),
                        priority: t.priority === 'URGENT' ? 'فوری' : t.priority === 'MEDIUM' ? 'اہم' : 'معمول',
                        status: translateValue(t.status, 'ur'),
                        date: t.dueDate,
                        notes: t.notes || '-'
                      }));
                      summaryMetrics = [
                        { label: 'مکمل شدہ کام', value: `${myTasks.filter(t => t.status === 'COMPLETED').length}/${myTasks.length}` },
                        { label: 'حاضری کے گھنٹے', value: '168 گھنٹے' },
                        { label: 'حاضری کی شرح', value: '99.2%' }
                      ];
                    } else {
                      rows = myTasks.map(t => ({
                        task: t.title,
                        priority: t.priority,
                        status: translateValue(t.status, 'en'),
                        date: t.dueDate,
                        notes: t.notes || '-'
                      }));
                    }

                    exportToPdf(
                      title,
                      subtitle,
                      cols,
                      rows,
                      `Staff_Report_${currentUser.name}_${exportLang.toUpperCase()}_${Date.now()}`,
                      summaryMetrics,
                      exportLang
                    );
                    setToastMessage(
                      exportLang === 'ar'
                        ? 'تم استخراج تقرير إنجازاتك باللغة العربية (PDF) بنجاح'
                        : exportLang === 'ur'
                        ? 'کارکردگی کی رپورٹ اردو میں PDF / پرنٹ فارمیٹ میں تیار کر دی گئی ہے'
                        : 'Personal report exported to PDF (English)'
                    );
                  }}
                  className="px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-200 bg-[#102117] hover:bg-[#162d20] border border-emerald-500/40 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Printer className="w-4 h-4 text-emerald-400" />
                  <span>{exportLang === 'ar' ? 'تصدير PDF' : exportLang === 'ur' ? 'پی ڈی ایف برآمد' : 'Export PDF'}</span>
                </button>
              </div>
            </div>

            {/* Quick Performance & Compensation Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-[#0c1611] border border-emerald-900/50">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">{isArabic ? 'المهام المسلمة' : 'Delivered Tasks'}</span>
                <div className="text-xl font-black text-emerald-400 font-mono mt-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>{myTasks.filter(t => t.status === 'COMPLETED').length} / {myTasks.length}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0c1611] border border-emerald-900/50">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">{isArabic ? 'ساعات الحضور' : 'Logged Hours'}</span>
                <div className="text-xl font-black text-white font-mono mt-1 flex items-center gap-1.5">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <span>168h</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0c1611] border border-emerald-900/50">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">{isArabic ? 'الراتب الأساسي' : 'Basic Salary'}</span>
                <div className="text-xl font-black text-[#f1d57f] font-mono mt-1">
                  14,500 <span className="text-xs">SAR</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0c1611] border border-emerald-900/50">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">{isArabic ? 'مكافأة تميز معتمدة' : 'CEO Bonus'}</span>
                <div className="text-xl font-black text-emerald-300 font-mono mt-1">
                  +3,500 <span className="text-xs">SAR</span>
                </div>
              </div>
            </div>

            {/* Personal Work Deliverables Table: "kitna kaam huwa, kab huwa, deliverables" */}
            <div className="rounded-3xl border border-emerald-900/50 bg-[#0a140f] overflow-hidden shadow-xl">
              <div className="p-4 border-b border-emerald-900/40 flex items-center justify-between">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>{isArabic ? 'سجل المهام والمخرجات المسلمة لقائد الفريق' : 'Delivered Tasks & Work Submissions Log'}</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">{myTasks.length} مهام في السجل</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs">
                  <thead>
                    <tr className="bg-[#0f1d16] border-b border-emerald-900/40 text-emerald-300 font-bold">
                      <th className="p-3.5 text-start">{isArabic ? 'المهمة' : 'Task'}</th>
                      <th className="p-3.5 text-start">{isArabic ? 'القسم' : 'Category'}</th>
                      <th className="p-3.5 text-start">{isArabic ? 'الأولوية' : 'Priority'}</th>
                      <th className="p-3.5 text-start">{isArabic ? 'موعد التسليم' : 'Due Date'}</th>
                      <th className="p-3.5 text-start">{isArabic ? 'الحالة' : 'Status'}</th>
                      <th className="p-3.5 text-start">{isArabic ? 'ملاحظات ورابط التسليم' : 'Submission Deliverable Notes'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-950/60">
                    {myTasks.map(t => (
                      <tr key={t.id} className="hover:bg-[#0e1c14] transition-colors">
                        <td className="p-3.5 font-bold text-white max-w-xs">
                          {isArabic ? t.titleAr : t.title}
                        </td>
                        <td className="p-3.5 text-slate-300 font-mono text-[11px]">
                          {t.category}
                        </td>
                        <td className="p-3.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            t.priority === 'URGENT' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-slate-700/30 text-slate-300'
                          }`}>
                            {t.priority}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono text-slate-300">
                          {t.dueDate}
                        </td>
                        <td className="p-3.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            t.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-[11px] text-slate-400 max-w-xs bg-[#070e0a] rounded-xl my-1">
                          {t.notes || (isArabic ? 'بانتظار تسليم المخرجات' : 'Pending Deliverable')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Attendance & Shift History Table */}
            <div className="rounded-3xl border border-emerald-900/50 bg-[#0a140f] overflow-hidden shadow-xl">
              <div className="p-4 border-b border-emerald-900/40 flex items-center justify-between">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>{isArabic ? 'سجل مناوبات الحضور وساعات العمل الموثقة' : 'Recorded Shifts & Clock-in History'}</span>
                </h3>
                <span className="text-[10px] text-emerald-400 font-bold">{isArabic ? 'انضباط 99.2%' : '99.2% On-Time'}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs">
                  <thead>
                    <tr className="bg-[#0f1d16] border-b border-emerald-900/40 text-emerald-300 font-bold">
                      <th className="p-3.5 text-start">{isArabic ? 'التاريخ' : 'Date'}</th>
                      <th className="p-3.5 text-start">{isArabic ? 'وقت الدخول' : 'Clock-In'}</th>
                      <th className="p-3.5 text-start">{isArabic ? 'وقت الانصراف' : 'Clock-Out'}</th>
                      <th className="p-3.5 text-start">{isArabic ? 'إجمالي الساعات' : 'Duration'}</th>
                      <th className="p-3.5 text-start">{isArabic ? 'موقع التحقق' : 'Verification Location'}</th>
                      <th className="p-3.5 text-start">{isArabic ? 'الحالة' : 'Status'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-950/60">
                    {attendanceHistory.map(att => (
                      <tr key={att.id} className="hover:bg-[#0e1c14] transition-colors">
                        <td className="p-3.5 font-mono text-white font-bold">{att.date}</td>
                        <td className="p-3.5 font-mono text-emerald-400 font-bold">{att.clockInTime}</td>
                        <td className="p-3.5 font-mono text-slate-300">{att.clockOutTime || (isArabic ? 'قيد العمل' : 'Active')}</td>
                        <td className="p-3.5 font-mono text-[#f1d57f] font-bold">{att.durationHours ? `${att.durationHours}h` : '8.0h'}</td>
                        <td className="p-3.5 text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{att.location}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {att.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Leave Request Form Modal */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#111e17] border border-emerald-500/40 shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-[#21382a] pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>{isArabic ? 'تقديم طلب إجازة / استئذان جديد' : 'Submit Leave Request'}</span>
              </h3>
              <button
                onClick={() => setIsLeaveModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitLeave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">{isArabic ? 'نوع الإجازة' : 'Leave Type'}</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as any)}
                  className="w-full bg-[#0a130e] border border-[#233a2c] rounded-xl p-2.5 text-white outline-none"
                >
                  <option value="ANNUAL">إجازة سنوية اعتيادية (Annual)</option>
                  <option value="EMERGENCY">استئذان طارئ (Emergency)</option>
                  <option value="SICK">إجازة مرضية (Sick Leave)</option>
                  <option value="REMOTE">طلب عمل عن بعد (Remote Work)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">{isArabic ? 'تاريخ البدء' : 'Start Date'}</label>
                  <input
                    type="date"
                    required
                    value={leaveStartDate}
                    onChange={(e) => setLeaveStartDate(e.target.value)}
                    className="w-full bg-[#0a130e] border border-[#233a2c] rounded-xl p-2.5 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">{isArabic ? 'تاريخ العودة' : 'End Date'}</label>
                  <input
                    type="date"
                    required
                    value={leaveEndDate}
                    onChange={(e) => setLeaveEndDate(e.target.value)}
                    className="w-full bg-[#0a130e] border border-[#233a2c] rounded-xl p-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">{isArabic ? 'السبب / الملاحظات' : 'Reason / Notes'}</label>
                <textarea
                  required
                  rows={3}
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  placeholder={isArabic ? 'يرجى كتابة سبب الإجازة...' : 'State your reason...'}
                  className="w-full bg-[#0a130e] border border-[#233a2c] rounded-xl p-2.5 text-white outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsLeaveModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  {isArabic ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-black bg-emerald-400 hover:bg-emerald-300"
                >
                  {isArabic ? 'إرسال الطلب' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Submit Deliverable Modal */}
      {deliverableModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#111e17] border border-emerald-500/40 shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-[#21382a] pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-400" />
                <span>{isArabic ? 'تسليم مخرجات المهمة لقائد الفريق' : 'Submit Task Deliverable'}</span>
              </h3>
              <button
                onClick={() => setDeliverableModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitDeliverable} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {isArabic ? 'تقرير الإنجاز وروابط المخرجات:' : 'Deliverable Notes & Repository Links:'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={deliverableNote}
                  onChange={(e) => setDeliverableNote(e.target.value)}
                  placeholder={isArabic ? 'مثال: تم إكمال فحص التشفير بنجاح وتحديث واجهات الـ API...' : 'Completed encryption tests and updated APIs...'}
                  className="w-full bg-[#0a130e] border border-[#233a2c] rounded-xl p-2.5 text-white outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeliverableModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  {isArabic ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-black bg-emerald-400 hover:bg-emerald-300"
                >
                  {isArabic ? 'تأكيد التسليم' : 'Confirm Submission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
