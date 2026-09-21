import React, { useState } from 'react';
import { User, ExecutiveDirective, Employee, LanguageItem, StaffTask } from '../types';
import { 
  Briefcase, 
  Mail, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Send, 
  Search, 
  Plus, 
  MessageSquare, 
  ShieldCheck, 
  Filter, 
  Calendar, 
  TrendingUp, 
  FileText, 
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  UserCheck,
  Award,
  ArrowLeft,
  ArrowRight,
  FileSpreadsheet,
  Printer,
  Download,
  DollarSign
} from 'lucide-react';
import { exportToExcel, exportToPdf, translateValue, ExportLanguage } from '../utils/exportUtils';
import { ExportLanguageSelector } from './ExportLanguageSelector';

interface TeamLeaderPortalScreenProps {
  currentUser: User;
  currentLanguage: LanguageItem;
  directives: ExecutiveDirective[];
  employees: Employee[];
  onAcknowledgeDirective: (directiveId: string) => void;
  onDispatchDirective?: (directive: ExecutiveDirective) => void;
}

export const TeamLeaderPortalScreen: React.FC<TeamLeaderPortalScreenProps> = ({
  currentUser,
  currentLanguage,
  directives,
  employees,
  onAcknowledgeDirective,
}) => {
  const isArabic = currentLanguage.dir === 'rtl';
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  // Active Tab inside Team Leader Portal
  const [activeTab, setActiveTab] = useState<'directives' | 'team_roster' | 'task_dispatch' | 'client_queue' | 'reports'>('directives');

  // Search & Filter States
  const [directiveFilter, setDirectiveFilter] = useState<'ALL' | 'PENDING' | 'ACKNOWLEDGED'>('ALL');
  const [teamSearch, setTeamSearch] = useState('');
  const [recommendationModalOpen, setRecommendationModalOpen] = useState(false);
  const [selectedStaffForAppraisal, setSelectedStaffForAppraisal] = useState<Employee | null>(null);
  const [recommendationNote, setRecommendationNote] = useState('');
  const [recommendationSentToast, setRecommendationSentToast] = useState<string | null>(null);
  const [reportToast, setReportToast] = useState<string | null>(null);
  const [exportLang, setExportLang] = useState<ExportLanguage>(
    currentLanguage.code === 'ur' ? 'ur' : currentLanguage.code === 'ar' ? 'ar' : 'en'
  );

  // Team Tasks State
  const [tasks, setTasks] = useState<StaffTask[]>([
    {
      id: 'tsk-1',
      title: 'تنفيذ بنية الذكاء الاصطناعي للمنظومة السحابية',
      titleAr: 'تنفيذ بنية الذكاء الاصطناعي للمنظومة السحابية',
      assignedTo: 'سارة الحربي',
      priority: 'URGENT',
      status: 'IN_PROGRESS',
      dueDate: '2026-09-24',
      category: 'Engineering',
      notes: 'ربط واجهات الـ API مع نظام التشفير السيادي'
    },
    {
      id: 'tsk-2',
      title: 'مراجعة معايير الأمن السيبراني وتشفير الجلسات',
      titleAr: 'مراجعة معايير الأمن السيبراني وتشفير الجلسات',
      assignedTo: 'عمر الزهراني',
      priority: 'URGENT',
      status: 'COMPLETED',
      dueDate: '2026-09-21',
      category: 'Security',
      notes: 'تم فحص طبقة 2FA بنجاح'
    },
    {
      id: 'tsk-3',
      title: 'تحديث قواعد بيانات العملاء وفهرسة الحسابات',
      titleAr: 'تحديث قواعد بيانات العملاء وفهرسة الحسابات',
      assignedTo: 'فاطمة العتيبي',
      priority: 'MEDIUM',
      status: 'TODO',
      dueDate: '2026-09-26',
      category: 'Database'
    },
    {
      id: 'tsk-4',
      title: 'إعداد تقرير أداء المناوبات الأسبوعي للمجلس',
      titleAr: 'إعداد تقرير أداء المناوبات الأسبوعي للمجلس',
      assignedTo: 'خالد الغامدي',
      priority: 'LOW',
      status: 'IN_PROGRESS',
      dueDate: '2026-09-25',
      category: 'Operations'
    }
  ]);

  // New Task Form
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('سارة الحربي');
  const [newTaskPriority, setNewTaskPriority] = useState<'URGENT' | 'MEDIUM' | 'LOW'>('MEDIUM');
  const [newTaskCategory, setNewTaskCategory] = useState('Engineering');
  const [newTaskDueDate, setNewTaskDueDate] = useState('2026-09-28');

  // Filter directives for Team Leader
  const filteredDirectives = directives.filter(d => {
    if (directiveFilter === 'PENDING') return !d.acknowledgedByTL;
    if (directiveFilter === 'ACKNOWLEDGED') return d.acknowledgedByTL;
    return true;
  });

  const pendingDirectivesCount = directives.filter(d => !d.acknowledgedByTL).length;

  // Filter team members belonging to this department
  const teamMembers = employees.filter(emp => 
    emp.name.toLowerCase().includes(teamSearch.toLowerCase()) || 
    emp.role.toLowerCase().includes(teamSearch.toLowerCase())
  );

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: StaffTask = {
      id: `tsk-${Date.now()}`,
      title: newTaskTitle,
      titleAr: newTaskTitle,
      assignedTo: newTaskAssignee,
      priority: newTaskPriority,
      status: 'TODO',
      dueDate: newTaskDueDate,
      category: newTaskCategory
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setIsNewTaskOpen(false);
    setRecommendationSentToast(
      isArabic ? 'تم إسناد المهمة التشغيلية بنجاح لعضو الفريق' : 'Operational task assigned successfully to team member'
    );
    setTimeout(() => setRecommendationSentToast(null), 4000);
  };

  const handleToggleTaskStatus = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextStatus = t.status === 'TODO' ? 'IN_PROGRESS' : t.status === 'IN_PROGRESS' ? 'COMPLETED' : 'TODO';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const handleSubmitRecommendation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaffForAppraisal || !recommendationNote.trim()) return;

    setRecommendationModalOpen(false);
    setRecommendationSentToast(
      isArabic 
        ? `تم رفع مذكرة توصية الأداء للموظف (${selectedStaffForAppraisal.name}) مباشرة لمكتب الرئيس التنفيذي.`
        : `Appraisal recommendation for (${selectedStaffForAppraisal.name}) submitted directly to the CEO office.`
    );
    setRecommendationNote('');
    setSelectedStaffForAppraisal(null);
    setTimeout(() => setRecommendationSentToast(null), 5000);
  };

  return (
    <div className="w-full bg-[#0a0a0d] text-slate-100 min-h-screen py-4 sm:py-8 px-3 sm:px-6 lg:px-8 font-sans" dir={currentLanguage.dir}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Toast Alert */}
        {recommendationSentToast && (
          <div className="fixed bottom-6 left-4 right-4 sm:right-auto sm:left-6 z-50 p-4 rounded-2xl bg-[#141d2e] border border-blue-400 text-slate-100 text-xs shadow-2xl flex items-center gap-3 animate-slideUp max-w-md">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="font-semibold">{recommendationSentToast}</span>
          </div>
        )}

        {/* 3D Header Section: Team Leader Executive Operations Hub */}
        <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-[#121929] via-[#162035] to-[#101726] border border-blue-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(96,165,250,0.3)] flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-950 p-[2px] shadow-[0_8px_20px_rgba(59,130,246,0.35)] flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0c121e] rounded-[14px] flex items-center justify-center shadow-inner">
                <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {isArabic ? 'بوابة إدارة العمليات وقائد الفريق' : 'Team Leader Operations Portal'}
                </h1>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  {isArabic ? 'صلاحية قائد العمليات المعتمد' : 'Operations Clearance'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {isArabic 
                  ? `أهلاً بك يا ${currentUser.name} • قطاع: التقنية والأنظمة • التنسيق والإشراف على الكوادر` 
                  : `Welcome ${currentUser.name} • Tech & AI Division • Operational Command & Shift Governance`}
              </p>
            </div>
          </div>

          {/* Operational Metrics Cards for Team Leader */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-2xl bg-[#0e1524] border border-blue-900/50 text-start min-w-[95px]">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                {isArabic ? 'أوامر الـ CEO' : 'Directives'}
              </div>
              <div className="text-sm sm:text-base font-black text-blue-300 font-mono flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>{directives.length}</span>
                {pendingDirectivesCount > 0 && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500 text-black font-bold">
                    {pendingDirectivesCount} جديد
                  </span>
                )}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#0e1524] border border-blue-900/50 text-start min-w-[95px]">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                {isArabic ? 'كوادر المناوبة' : 'Active Staff'}
              </div>
              <div className="text-sm sm:text-base font-black text-white font-mono flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>{employees.length}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#0e1524] border border-blue-900/50 text-start min-w-[95px]">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                {isArabic ? 'إنجاز المهام' : 'Sprint Velocity'}
              </div>
              <div className="text-sm sm:text-base font-black text-emerald-400 font-mono flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>87.5%</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#0e1524] border border-blue-900/50 text-start min-w-[95px]">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                {isArabic ? 'الانضباط' : 'Discipline'}
              </div>
              <div className="text-sm sm:text-base font-black text-[#f1d57f] font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d4af35]" />
                <span>99.1%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#212738]">
          <button
            onClick={() => setActiveTab('directives')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'directives'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/30'
                : 'bg-[#111624] text-slate-400 hover:text-white border border-[#232d45]'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>{isArabic ? 'أوامر وتوجيهات الرئيس التنفيذي' : 'CEO Directives & Decrees'}</span>
            {pendingDirectivesCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-black text-[10px] font-black">
                {pendingDirectivesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('team_roster')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'team_roster'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/30'
                : 'bg-[#111624] text-slate-400 hover:text-white border border-[#232d45]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{isArabic ? 'فريق العمل ومتابعة المناوبات' : 'Team Roster & Shifts'}</span>
          </button>

          <button
            onClick={() => setActiveTab('task_dispatch')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'task_dispatch'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/30'
                : 'bg-[#111624] text-slate-400 hover:text-white border border-[#232d45]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{isArabic ? 'توزيع ومتابعة المهام التشغيلية' : 'Task Dispatcher & Sprints'}</span>
          </button>

          <button
            onClick={() => setActiveTab('client_queue')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'client_queue'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/30'
                : 'bg-[#111624] text-slate-400 hover:text-white border border-[#232d45]'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>{isArabic ? 'طابور خدمة العملاء والواتساب' : 'Departmental Support Queue'}</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'reports'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/30'
                : 'bg-[#111624] text-slate-400 hover:text-white border border-[#232d45]'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-[#f1d57f]" />
            <span>{isArabic ? 'تقارير إنجاز ومصروفات القسم' : 'Department Reports & Velocity'}</span>
          </button>
        </div>

        {/* TAB 1: CEO Directives & Decrees Inbox */}
        {activeTab === 'directives' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111522] p-4 rounded-2xl border border-[#232d45]">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>{isArabic ? 'صندوق توجيهات الرئيس التنفيذي الرسمية' : 'Official CEO Directives Inbox'}</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {isArabic 
                    ? 'يتعين على قائد الفريق اعتماد التوجيهات إلكترونياً وتأكيد استلامها وتعميمها على الكوادر.' 
                    : 'Team Leaders must electronically acknowledge and execute incoming CEO decrees.'}
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <button
                  onClick={() => setDirectiveFilter('ALL')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    directiveFilter === 'ALL'
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#182035] text-slate-300 hover:bg-[#202b47]'
                  }`}
                >
                  {isArabic ? 'الكل' : 'All'} ({directives.length})
                </button>
                <button
                  onClick={() => setDirectiveFilter('PENDING')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    directiveFilter === 'PENDING'
                      ? 'bg-amber-500 text-black'
                      : 'bg-[#182035] text-amber-300 hover:bg-[#202b47]'
                  }`}
                >
                  {isArabic ? 'بانتظار الاعتماد' : 'Pending'} ({pendingDirectivesCount})
                </button>
                <button
                  onClick={() => setDirectiveFilter('ACKNOWLEDGED')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    directiveFilter === 'ACKNOWLEDGED'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#182035] text-slate-300 hover:bg-[#202b47]'
                  }`}
                >
                  {isArabic ? 'معتمد' : 'Signed'}
                </button>
              </div>
            </div>

            {/* Directives Cards List */}
            <div className="space-y-3">
              {filteredDirectives.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-[#111522] border border-[#232d45] text-slate-400 text-xs">
                  {isArabic ? 'لا توجد توجيهات تطابق الفلتر المحدد.' : 'No directives matching current filter.'}
                </div>
              ) : (
                filteredDirectives.map((directive) => {
                  const isPending = !directive.acknowledgedByTL;

                  return (
                    <div
                      key={directive.id}
                      className={`p-5 rounded-3xl border transition-all space-y-3 shadow-lg ${
                        isPending
                          ? 'bg-gradient-to-r from-[#1b1c2b] via-[#1e2338] to-[#171a2b] border-amber-500/50 shadow-amber-950/20'
                          : 'bg-[#101422] border-[#222b40]'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                            isPending 
                              ? 'bg-amber-500/20 border border-amber-500/50 text-amber-400' 
                              : 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400'
                          }`}>
                            {isPending ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-sm font-black text-white">
                                {isArabic ? directive.titleAr : directive.title}
                              </h4>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                {directive.type}
                              </span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                directive.priority === 'URGENT' 
                                  ? 'bg-red-500/20 text-red-400 border border-red-500/40' 
                                  : 'bg-slate-700/40 text-slate-300 border border-slate-600/40'
                              }`}>
                                {directive.priority}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {isArabic ? 'جهة الإصدار: المكتب التنفيذي للـ CEO' : 'Issued By: Executive CEO Office'} • {directive.issuedAt}
                            </div>
                          </div>
                        </div>

                        {/* Acknowledge Button */}
                        <div className="self-start sm:self-auto">
                          {isPending ? (
                            <button
                              onClick={() => onAcknowledgeDirective(directive.id)}
                              className="px-4 py-2 rounded-xl text-xs font-black text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-105 active:scale-95 transition-all shadow-md shadow-amber-500/30 flex items-center gap-2"
                            >
                              <Check className="w-4 h-4 stroke-[3]" />
                              <span>{isArabic ? 'توقيع واعتماد الاستلام إلكترونياً' : 'Sign & Acknowledge Receipt'}</span>
                            </button>
                          ) : (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>{isArabic ? 'تم التوقيع والاعتماد' : 'Acknowledged & Signed'}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 bg-[#0c101c] p-3 rounded-2xl border border-[#1d2538] leading-relaxed">
                        {isArabic ? directive.messageAr : directive.message}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Team Roster & Shifts Attendance */}
        {activeTab === 'team_roster' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111522] p-4 rounded-2xl border border-[#232d45]">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute top-3 right-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder={isArabic ? 'بحث في أعضاء الفريق...' : 'Search team staff...'}
                  value={teamSearch}
                  onChange={(e) => setTeamSearch(e.target.value)}
                  className="w-full bg-[#0b0f1a] border border-[#26324e] focus:border-blue-500 rounded-xl py-2 px-3 pr-9 text-xs text-slate-100 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{isArabic ? 'كافة الأعضاء في حالة تواجد نشط' : 'All members active on shift'}</span>
              </div>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {teamMembers.map((emp) => (
                <div
                  key={emp.id}
                  className="p-4 rounded-3xl bg-[#111522] border border-[#232d45] hover:border-blue-500/50 transition-all space-y-3 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="w-11 h-11 rounded-2xl object-cover border border-blue-500/30"
                      />
                      <div>
                        <h4 className="text-xs font-black text-white">{emp.name}</h4>
                        <div className="text-[10px] text-slate-400">{emp.role}</div>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {emp.status}
                    </span>
                  </div>

                  {/* Operational Shift Status */}
                  <div className="p-2.5 rounded-xl bg-[#0c101a] border border-[#1b2335] grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-500 text-[10px] block">{isArabic ? 'وقت تسجيل الحضور' : 'Clock-In'}</span>
                      <span className="font-mono font-bold text-blue-300">08:32 AM</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">{isArabic ? 'تقييم الأداء' : 'Score'}</span>
                      <span className="font-mono font-bold text-[#f1d57f]">{emp.performanceScore}/100</span>
                    </div>
                  </div>

                  {/* Team Leader Action: Submit Appraisal Recommendation Note to CEO */}
                  <button
                    onClick={() => {
                      setSelectedStaffForAppraisal(emp);
                      setRecommendationModalOpen(true);
                    }}
                    className="w-full py-2 px-3 rounded-xl text-xs font-bold text-blue-200 bg-[#162035] hover:bg-[#1f2d4a] border border-[#2b3b5e] transition-all flex items-center justify-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5 text-blue-400" />
                    <span>{isArabic ? 'رفع توصية أداء ومكافأة للـ CEO' : 'Recommend Appraisal to CEO'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Task & Sprint Dispatcher */}
        {activeTab === 'task_dispatch' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111522] p-4 rounded-2xl border border-[#232d45]">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>{isArabic ? 'لوحة توزيع وإسناد المهام التشغيلية' : 'Operational Task Dispatcher'}</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {isArabic ? 'إسناد المشاريع وتحديد أولويات العمل اليومية لأعضاء الفريق' : 'Dispatch sprint tasks and milestones to staff'}
                </p>
              </div>

              <button
                onClick={() => setIsNewTaskOpen(!isNewTaskOpen)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-blue-400 to-indigo-400 hover:brightness-105 transition-all shadow-md flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>{isArabic ? 'إسناد مهمة جديدة +' : 'Assign New Task +'}</span>
              </button>
            </div>

            {/* New Task Inline Form */}
            {isNewTaskOpen && (
              <form onSubmit={handleCreateTask} className="p-4 sm:p-5 rounded-3xl bg-[#141b2e] border border-blue-500/50 space-y-3 animate-fadeIn">
                <h4 className="text-xs font-bold text-white">{isArabic ? 'إسناد مهمة جديدة لعضو الفريق' : 'Assign New Task'}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 mb-1">{isArabic ? 'عنوان المهمة' : 'Task Title'}</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: مراجعة كود التشفير السيادي"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="w-full bg-[#0d121f] border border-[#2b3957] rounded-xl p-2.5 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">{isArabic ? 'الموظف المسؤول' : 'Assignee'}</label>
                    <select
                      value={newTaskAssignee}
                      onChange={(e) => setNewTaskAssignee(e.target.value)}
                      className="w-full bg-[#0d121f] border border-[#2b3957] rounded-xl p-2.5 text-white outline-none"
                    >
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.name}>{emp.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">{isArabic ? 'الأولوية' : 'Priority'}</label>
                    <select
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value as any)}
                      className="w-full bg-[#0d121f] border border-[#2b3957] rounded-xl p-2.5 text-white outline-none"
                    >
                      <option value="URGENT">عاجلة (Urgent)</option>
                      <option value="MEDIUM">متوسطة (Medium)</option>
                      <option value="LOW">اعتيادية (Low)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsNewTaskOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                  >
                    {isArabic ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold text-black bg-blue-400 hover:bg-blue-300"
                  >
                    {isArabic ? 'تأكيد الإسناد' : 'Confirm Assignment'}
                  </button>
                </div>
              </form>
            )}

            {/* Tasks List */}
            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-2xl bg-[#111522] border border-[#232d45] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-blue-500/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleTaskStatus(task.id)}
                      className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                        task.status === 'COMPLETED'
                          ? 'bg-emerald-500 text-black'
                          : task.status === 'IN_PROGRESS'
                          ? 'bg-blue-500/20 border border-blue-500 text-blue-400'
                          : 'bg-[#182033] border border-[#2d3a59] text-slate-500'
                      }`}
                      title="Click to toggle status"
                    >
                      {task.status === 'COMPLETED' ? <Check className="w-4 h-4 stroke-[3]" /> : <Clock className="w-3.5 h-3.5" />}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold ${task.status === 'COMPLETED' ? 'line-through text-slate-400' : 'text-white'}`}>
                          {task.title}
                        </span>
                        <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                          task.priority === 'URGENT' 
                            ? 'bg-red-500/20 text-red-400 border border-red-500/40' 
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {isArabic ? 'المسؤول:' : 'Assignee:'} <span className="text-blue-300 font-semibold">{task.assignedTo}</span> • {isArabic ? 'الموعد:' : 'Due:'} {task.dueDate}
                      </div>
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

        {/* TAB 4: Departmental Client Queue & Support */}
        {activeTab === 'client_queue' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#111522] border border-[#232d45] space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>{isArabic ? 'طابور الاستفسارات وخدمة العملاء المحولة' : 'Assigned Client Support Queue'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {isArabic 
                  ? 'متابعة المحادثات والاستفسارات الفنية الموكلة إلى فريقك عبر تطبيق الواتساب وبوابات الدعم.' 
                  : 'Handle client technical requests assigned to this operational division.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-3xl bg-[#111522] border border-[#232d45] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">مجموعة الصقر الدولية (VIP)</div>
                      <div className="text-[10px] text-slate-400">+966 50 123 4567</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                    نشط الآن
                  </span>
                </div>
                <p className="text-xs text-slate-300 bg-[#0c101a] p-2.5 rounded-xl border border-[#1b2335]">
                  "السلام عليكم، نود تفعيل بوابة الربط السحابي ومراجعة اتفاقية مستوى الخدمة SLA مع فريق التقنية."
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-500">مسند إلى: سارة الحربي</span>
                  <button 
                    onClick={() => {
                      setRecommendationSentToast(isArabic ? 'تم فتح جلسة الرد والمتابعة عبر الواتساب' : 'WhatsApp reply session active');
                      setTimeout(() => setRecommendationSentToast(null), 3000);
                    }}
                    className="px-3 py-1 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors"
                  >
                    {isArabic ? 'متابعة الرد' : 'Reply to Client'}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-3xl bg-[#111522] border border-[#232d45] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">شركة آفاق المملكة للتقنية</div>
                      <div className="text-[10px] text-slate-400">+966 55 987 6543</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                    استفسار جديد
                  </span>
                </div>
                <p className="text-xs text-slate-300 bg-[#0c101a] p-2.5 rounded-xl border border-[#1b2335]">
                  "طلب استفسار بخصوص تجديد مفاتيح الـ API والتأكد من دعم اللغة العربية في التقارير."
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-500">مسند إلى: عمر الزهراني</span>
                  <button 
                    onClick={() => {
                      setRecommendationSentToast(isArabic ? 'تم فتح جلسة الرد والمتابعة عبر الواتساب' : 'WhatsApp reply session active');
                      setTimeout(() => setRecommendationSentToast(null), 3000);
                    }}
                    className="px-3 py-1 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors"
                  >
                    {isArabic ? 'متابعة الرد' : 'Reply to Client'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Department Operational & Velocity Reports with Excel/PDF Exports */}
        {activeTab === 'reports' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Header & Export Actions */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-[#0e1628] to-[#151f38] border border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-blue-400" />
                  <span>{isArabic ? 'التقرير التشغيلي ومصروفات قسم التقنية والأنظمة' : 'Department Operational Velocity & Expense Audit'}</span>
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  {isArabic 
                    ? 'تدقيق شامل لأعمال كوادر القسم (ما تم إنجازه، من قام به، ومواعيده) مع ميزانية التشغيل الحالية' 
                    : 'Detailed department audit: Tasks completed, assigned staff, timestamps & operational expenditures'}
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
                      exportRows = tasks.map(t => ({
                        'المهمة التشغيلية': t.titleAr,
                        'المكلّف (من قام بالعمل)': t.assignedTo,
                        'الأولوية': t.priority === 'URGENT' ? 'عاجل جداً' : t.priority === 'MEDIUM' ? 'متوسط' : 'عادي',
                        'الحالة': translateValue(t.status, 'ar'),
                        'تاريخ الاستحقاق والتسليم': t.dueDate,
                        'القسم التابع': t.category,
                        'الملاحظات والتوجيهات': t.notes || '-'
                      }));
                    } else if (exportLang === 'ur') {
                      exportRows = tasks.map(t => ({
                        'تفویض کردہ کام': translateValue(t.title, 'ur'),
                        'ذمہ دار عملہ (کس نے کیا)': translateValue(t.assignedTo, 'ur'),
                        'ترجیح': t.priority === 'URGENT' ? 'فوری' : t.priority === 'MEDIUM' ? 'اہم' : 'معمول',
                        'حالت': translateValue(t.status, 'ur'),
                        'تکمیل کی تاریخ (کب تک)': t.dueDate,
                        'شعبہ': t.category,
                        'نوٹس و تفصیلات': t.notes || '-'
                      }));
                    } else {
                      exportRows = tasks.map(t => ({
                        'Operational Task': t.title,
                        'Assigned Staff': translateValue(t.assignedTo, 'en'),
                        'Priority': t.priority,
                        'Status': translateValue(t.status, 'en'),
                        'Due Date': t.dueDate,
                        'Department': t.category,
                        'Notes & Guidance': t.notes || '-'
                      }));
                    }

                    exportToExcel(exportRows, `Team_Operations_Report_${exportLang.toUpperCase()}_${Date.now()}`, 'TeamVelocity');
                    setReportToast(
                      exportLang === 'ar'
                        ? 'تم تصدير تقرير القسم باللغة العربية بنجاح إلى Excel (.xlsx)'
                        : exportLang === 'ur'
                        ? 'شعبہ کی کارکردگی رپورٹ اردو میں Excel (.xlsx) فائل میں تیار کر دی گئی ہے'
                        : 'Department report exported in English to Excel (.xlsx)'
                    );
                    setTimeout(() => setReportToast(null), 3500);
                  }}
                  className="px-3.5 py-2 rounded-2xl text-xs font-bold text-black bg-gradient-to-r from-blue-400 to-indigo-400 hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4 text-black stroke-[2.5]" />
                  <span>{exportLang === 'ar' ? 'تصدير Excel' : exportLang === 'ur' ? 'ایکسل برآمد' : 'Export Excel'}</span>
                </button>

                <button
                  onClick={() => {
                    let title = 'Department Operations & Task Audit';
                    let subtitle = 'Tech & AI Systems Division - Operational Summary';
                    let cols = [
                      { header: 'Task Title', dataKey: 'task' },
                      { header: 'Assigned To', dataKey: 'staff' },
                      { header: 'Priority', dataKey: 'priority' },
                      { header: 'Status', dataKey: 'status' },
                      { header: 'Due Date', dataKey: 'date' }
                    ];
                    let rows: Record<string, any>[] = [];
                    let summaryMetrics = [
                      { label: 'Total Tasks', value: `${tasks.length}` },
                      { label: 'Completed', value: `${tasks.filter(t => t.status === 'COMPLETED').length}` },
                      { label: 'Budget Used', value: '142,000 SAR' }
                    ];

                    if (exportLang === 'ar') {
                      title = 'تقرير عمليات ومهام القسم التشغيلي';
                      subtitle = 'قطاع التكنولوجيا والأنظمة الذكية - ملخص تدقيق إنجاز الكوادر';
                      cols = [
                        { header: 'المهمة التشغيلية', dataKey: 'task' },
                        { header: 'المكلّف بالعمل', dataKey: 'staff' },
                        { header: 'الأولوية', dataKey: 'priority' },
                        { header: 'الحالة', dataKey: 'status' },
                        { header: 'تاريخ التسليم', dataKey: 'date' }
                      ];
                      rows = tasks.map(t => ({
                        task: t.titleAr,
                        staff: t.assignedTo,
                        priority: t.priority === 'URGENT' ? 'عاجل جداً' : t.priority === 'MEDIUM' ? 'متوسط' : 'عادي',
                        status: translateValue(t.status, 'ar'),
                        date: t.dueDate
                      }));
                      summaryMetrics = [
                        { label: 'إجمالي المهام', value: `${tasks.length}` },
                        { label: 'المهام المكتملة', value: `${tasks.filter(t => t.status === 'COMPLETED').length}` },
                        { label: 'الميزانية المنفقة', value: '142,000 ر.س' }
                      ];
                    } else if (exportLang === 'ur') {
                      title = 'شعبہ جاتی آپریشنز اور کاموں کا تفصیلی آڈٹ';
                      subtitle = 'ٹیکنالوجی اور مصنوعی ذہانت ڈویژن - عملہ کی کارکردگی اور مخرجات کا جائزہ';
                      cols = [
                        { header: 'تفویض کردہ کام', dataKey: 'task' },
                        { header: 'ملازم (کس نے کیا)', dataKey: 'staff' },
                        { header: 'ترجیح', dataKey: 'priority' },
                        { header: 'حالت', dataKey: 'status' },
                        { header: 'تاریخ تکمیل (کب ہوا)', dataKey: 'date' }
                      ];
                      rows = tasks.map(t => ({
                        task: translateValue(t.title, 'ur'),
                        staff: translateValue(t.assignedTo, 'ur'),
                        priority: t.priority === 'URGENT' ? 'فوری' : t.priority === 'MEDIUM' ? 'اہم' : 'معمول',
                        status: translateValue(t.status, 'ur'),
                        date: t.dueDate
                      }));
                      summaryMetrics = [
                        { label: 'کل تفویض کام', value: `${tasks.length}` },
                        { label: 'مکمل شدہ کام', value: `${tasks.filter(t => t.status === 'COMPLETED').length}` },
                        { label: 'صرف شدہ بجٹ', value: '142,000 ریال' }
                      ];
                    } else {
                      rows = tasks.map(t => ({
                        task: t.title,
                        staff: translateValue(t.assignedTo, 'en'),
                        priority: t.priority,
                        status: translateValue(t.status, 'en'),
                        date: t.dueDate
                      }));
                    }

                    exportToPdf(
                      title,
                      subtitle,
                      cols,
                      rows,
                      `Team_Operations_Report_${exportLang.toUpperCase()}_${Date.now()}`,
                      summaryMetrics,
                      exportLang
                    );
                    setReportToast(
                      exportLang === 'ar'
                        ? 'تم استخراج تقرير القسم باللغة العربية (PDF) بنجاح'
                        : exportLang === 'ur'
                        ? 'شعبہ جاتی رپورٹ اردو میں PDF / پرنٹ فارمیٹ میں تیار کر دی گئی ہے'
                        : 'Department report exported to PDF (English)'
                    );
                    setTimeout(() => setReportToast(null), 3500);
                  }}
                  className="px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-200 bg-[#141b2e] hover:bg-[#1f2a47] border border-blue-500/40 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Printer className="w-4 h-4 text-blue-400" />
                  <span>{exportLang === 'ar' ? 'تصدير PDF' : exportLang === 'ur' ? 'پی ڈی ایف برآمد' : 'Export PDF'}</span>
                </button>
              </div>
            </div>

            {/* Department KPIs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-[#0e1526] border border-blue-900/50">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">{isArabic ? 'إجمالي المهام المنجزة' : 'Tasks Completed'}</span>
                <div className="text-xl font-black text-emerald-400 font-mono mt-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>{tasks.filter(t => t.status === 'COMPLETED').length} / {tasks.length}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e1526] border border-blue-900/50">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">{isArabic ? 'ساعات العمل الموثقة' : 'Hours Logged'}</span>
                <div className="text-xl font-black text-blue-300 font-mono mt-1 flex items-center gap-1.5">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>320h</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e1526] border border-blue-900/50">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">{isArabic ? 'ميزانية تشغيل القسم' : 'Dept Budget'}</span>
                <div className="text-xl font-black text-[#f1d57f] font-mono mt-1">
                  350,000 <span className="text-xs">SAR</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e1526] border border-blue-900/50">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">{isArabic ? 'المصروف الفعلي' : 'Actual Spent'}</span>
                <div className="text-xl font-black text-rose-400 font-mono mt-1">
                  142,000 <span className="text-xs">SAR</span>
                </div>
              </div>
            </div>

            {/* Department Task Audit Table: "kitna kaam huwa, kis ney kiya, kab huwa" */}
            <div className="rounded-3xl border border-blue-900/50 bg-[#0d1322] overflow-hidden shadow-xl">
              <div className="p-4 border-b border-blue-900/40 flex items-center justify-between">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>{isArabic ? 'سجل تدقيق إنجاز أعضاء الفريق (من قام بالعمل ومتى تم)' : 'Team Member Task Completion Audit (Who & When)'}</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">{tasks.length} مهام مسجلة</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs">
                  <thead>
                    <tr className="bg-[#121a2d] border-b border-blue-900/40 text-blue-300 font-bold">
                      <th className="p-3.5 text-start">{isArabic ? 'المهمة التشغيلية' : 'Task'}</th>
                      <th className="p-3.5 text-start">{isArabic ? 'المنفّذ (من قام بالعمل)' : 'Performed By'}</th>
                      <th className="p-3.5 text-start">{isArabic ? 'تاريخ الاستحقاق' : 'Due Date'}</th>
                      <th className="p-3.5 text-start">{isArabic ? 'الأولوية' : 'Priority'}</th>
                      <th className="p-3.5 text-start">{isArabic ? 'حالة الإنجاز' : 'Status'}</th>
                      <th className="p-3.5 text-start">{isArabic ? 'الملاحظات والمخرجات' : 'Notes & Output'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-950/60">
                    {tasks.map(t => (
                      <tr key={t.id} className="hover:bg-[#121929] transition-colors">
                        <td className="p-3.5 font-bold text-white">
                          <div>{isArabic ? t.titleAr : t.title}</div>
                          <span className="text-[10px] text-blue-400">{t.category}</span>
                        </td>
                        <td className="p-3.5 font-bold text-emerald-400">
                          {t.assignedTo}
                        </td>
                        <td className="p-3.5 font-mono text-slate-300">
                          {t.dueDate}
                        </td>
                        <td className="p-3.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            t.priority === 'URGENT' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-slate-700/30 text-slate-300'
                          }`}>
                            {t.priority}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            t.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-[11px] text-slate-400 max-w-xs">
                          {t.notes || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Department Operational Expenses Breakdown */}
            <div className="p-4 rounded-3xl bg-[#0e1628] border border-blue-900/50 space-y-3">
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>{isArabic ? 'تفاصيل بنود مصروفات القسم التشغيلية' : 'Department Operational Expense Breakdown'}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-[#090d18] border border-blue-900/30">
                  <div className="text-slate-400 text-[10px]">{isArabic ? 'الخوادم السحابية وتراخيص AI' : 'Cloud Servers & AI Licenses'}</div>
                  <div className="text-base font-bold text-white font-mono mt-1">68,000 SAR</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">{isArabic ? 'ضمن الخطة المعتمدة' : 'On Track'}</div>
                </div>

                <div className="p-3 rounded-2xl bg-[#090d18] border border-blue-900/30">
                  <div className="text-slate-400 text-[10px]">{isArabic ? 'تجهيزات ومعدات الفريق' : 'Team Hardware & Workstations'}</div>
                  <div className="text-base font-bold text-white font-mono mt-1">45,000 SAR</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">{isArabic ? 'مكتملة الصرف' : 'Fully Disbursed'}</div>
                </div>

                <div className="p-3 rounded-2xl bg-[#090d18] border border-blue-900/30">
                  <div className="text-slate-400 text-[10px]">{isArabic ? 'مكافآت التميز المقترحة' : 'Pending Recommended Bonuses'}</div>
                  <div className="text-base font-bold text-[#f1d57f] font-mono mt-1">29,000 SAR</div>
                  <div className="text-[10px] text-amber-400 mt-0.5">{isArabic ? 'بانتظار اعتماد الرئيس التنفيذي' : 'Awaiting CEO Approval'}</div>
                </div>
              </div>
            </div>

            {/* Notification Toast */}
            {reportToast && (
              <div className="p-3 rounded-xl bg-blue-600/30 border border-blue-400 text-blue-200 text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-300 shrink-0" />
                <span>{reportToast}</span>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Appraisal Recommendation Modal to CEO */}
      {recommendationModalOpen && selectedStaffForAppraisal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-[#141b2e] border border-blue-500/50 shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-[#24324f] pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#f1d57f]" />
                <h3 className="text-sm font-black text-white">
                  {isArabic ? 'رفع توصية أداء وتكريم لمكتب الرئيس التنفيذي' : 'Appraisal Recommendation to CEO Office'}
                </h3>
              </div>
              <button
                onClick={() => setRecommendationModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-[#0e1422] border border-[#232f4a] flex items-center gap-3">
              <img
                src={selectedStaffForAppraisal.avatar}
                alt={selectedStaffForAppraisal.name}
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div>
                <div className="text-xs font-bold text-white">{selectedStaffForAppraisal.name}</div>
                <div className="text-[10px] text-slate-400">{selectedStaffForAppraisal.role} • التقييم الحالي: {selectedStaffForAppraisal.performanceScore}/100</div>
              </div>
            </div>

            <form onSubmit={handleSubmitRecommendation} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {isArabic ? 'نص مذكرة التوصية الرسمية (ترفع للـ CEO):' : 'Official Recommendation Justification:'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={recommendationNote}
                  onChange={(e) => setRecommendationNote(e.target.value)}
                  placeholder={isArabic ? 'مثال: نوصي بصرف مكافأة تميز نظير الإنجاز الاستثنائي في تسليم المرحلة الأولى قبل الموعد...' : 'e.g. Recommend bonus due to early delivery of Phase 1...'}
                  className="w-full bg-[#0a0f1c] border border-[#263554] focus:border-blue-500 rounded-xl p-3 text-white outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRecommendationModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  {isArabic ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-black bg-gradient-to-r from-blue-400 to-indigo-400 hover:brightness-105"
                >
                  {isArabic ? 'رفع المذكرة للرئيس التنفيذي' : 'Submit to CEO'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
