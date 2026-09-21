import React, { useState, useMemo } from 'react';
import { User, LanguageItem, BusinessUnit } from '../types';
import { 
  MASTER_FINANCIAL_REPORTS, 
  WORK_EXECUTION_AUDIT_LOGS, 
  CONNECTED_BUSINESSES 
} from '../data/mockData';
import { exportToExcel, exportToPdf, translateValue, ExportLanguage } from '../utils/exportUtils';
import { ExportLanguageSelector } from './ExportLanguageSelector';
import { 
  FileSpreadsheet, 
  Download, 
  Filter, 
  Search, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Building2, 
  Users, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  FileText,
  Printer,
  ChevronDown
} from 'lucide-react';

interface CEOReportsScreenProps {
  currentUser: User;
  currentLanguage: LanguageItem;
  activeBusiness: BusinessUnit;
}

export const CEOReportsScreen: React.FC<CEOReportsScreenProps> = ({
  currentUser,
  currentLanguage,
  activeBusiness
}) => {
  const isArabic = currentLanguage.dir === 'rtl';

  // Active Tab
  const [activeTab, setActiveTab] = useState<'financial' | 'work_audit' | 'workforce_cost'>('financial');

  // Filters
  const [selectedBizId, setSelectedBizId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Export Language State: Arabic ('ar'), English ('en'), Urdu ('ur')
  const [exportLang, setExportLang] = useState<ExportLanguage>(
    currentLanguage.code === 'ur' ? 'ur' : currentLanguage.code === 'ar' ? 'ar' : 'en'
  );

  // Financial Data filtered by business
  const filteredFinancials = useMemo(() => {
    if (selectedBizId === 'all') return MASTER_FINANCIAL_REPORTS;
    return MASTER_FINANCIAL_REPORTS.filter(b => b.businessId === selectedBizId);
  }, [selectedBizId]);

  // Aggregate Metrics for selected view
  const totals = useMemo(() => {
    return filteredFinancials.reduce((acc, curr) => ({
      revenue: acc.revenue + curr.totalRevenue,
      expenses: acc.expenses + curr.totalExpenses,
      profit: acc.profit + curr.netProfit,
      salaries: acc.salaries + curr.staffSalariesExpense,
      operations: acc.operations + curr.operationalExpense,
      tasks: acc.tasks + curr.tasksCompletedCount,
    }), { revenue: 0, expenses: 0, profit: 0, salaries: 0, operations: 0, tasks: 0 });
  }, [filteredFinancials]);

  // Work Audit Logs filtered
  const filteredWorkLogs = useMemo(() => {
    return WORK_EXECUTION_AUDIT_LOGS.filter(log => {
      const matchBiz = selectedBizId === 'all' || log.businessUnitId === selectedBizId;
      const matchSearch = 
        log.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.performedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || log.status === statusFilter;
      return matchBiz && matchSearch && matchStatus;
    });
  }, [selectedBizId, searchQuery, statusFilter]);

  // Trigger Notification Toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 1. Export to Excel (.xlsx) with Arabic / English / Urdu shift
  const handleExportExcel = () => {
    if (activeTab === 'financial') {
      let exportRows: Record<string, any>[] = [];

      if (exportLang === 'ar') {
        exportRows = filteredFinancials.map(item => ({
          'الشركة / القطاع': item.businessNameAr,
          'رمز القطاع': item.code,
          'إجمالي الإيرادات (ر.س)': item.totalRevenue.toLocaleString('en-US'),
          'إجمالي المصروفات (ر.س)': item.totalExpenses.toLocaleString('en-US'),
          'صافي الأرباح (ر.س)': item.netProfit.toLocaleString('en-US'),
          'هامش الربحية (%)': `${item.profitMarginPercent}%`,
          'بند الرواتب والأجور (ر.س)': item.staffSalariesExpense.toLocaleString('en-US'),
          'المصروفات التشغيلية (ر.س)': item.operationalExpense.toLocaleString('en-US'),
          'عدد المهام المنجزة': item.tasksCompletedCount,
          'معدل الكفاءة (%)': `${item.efficiencyScore}%`
        }));
      } else if (exportLang === 'ur') {
        exportRows = filteredFinancials.map(item => ({
          'کمپنی / تجارتی شعبہ': translateValue(item.businessName, 'ur'),
          'شعبہ کوڈ': item.code,
          'کل آمدنی (ر.س)': item.totalRevenue.toLocaleString('en-US'),
          'کل اخراجات (ر.س)': item.totalExpenses.toLocaleString('en-US'),
          'خالص منافع (ر.س)': item.netProfit.toLocaleString('en-US'),
          'منافع کا تناسب (%)': `${item.profitMarginPercent}%`,
          'ملازمین کی تنخواہیں (ر.س)': item.staffSalariesExpense.toLocaleString('en-US'),
          'عملیاتی اخراجات (ر.س)': item.operationalExpense.toLocaleString('en-US'),
          'مکمل شدہ کام': item.tasksCompletedCount,
          'کارکردگی کی شرح (%)': `${item.efficiencyScore}%`
        }));
      } else {
        exportRows = filteredFinancials.map(item => ({
          'Company / Sector': item.businessName,
          'Sector Code': item.code,
          'Total Revenue (SAR)': item.totalRevenue.toLocaleString('en-US'),
          'Total Expenses (SAR)': item.totalExpenses.toLocaleString('en-US'),
          'Net Profit (SAR)': item.netProfit.toLocaleString('en-US'),
          'Profit Margin (%)': `${item.profitMarginPercent}%`,
          'Staff Salaries (SAR)': item.staffSalariesExpense.toLocaleString('en-US'),
          'Operational Expense (SAR)': item.operationalExpense.toLocaleString('en-US'),
          'Tasks Completed': item.tasksCompletedCount,
          'Efficiency Score (%)': `${item.efficiencyScore}%`
        }));
      }

      exportToExcel(exportRows, `MJM_Financial_Report_${exportLang.toUpperCase()}_${Date.now()}`, 'Financials');
      triggerToast(
        exportLang === 'ar' 
          ? 'تم تصدير التقرير المالي باللغة العربية بنجاح إلى Excel (.xlsx)' 
          : exportLang === 'ur'
          ? 'مالیاتی رپورٹ کامیابی سے اردو زبان میں Excel (.xlsx) فائل میں برآمد کر دی گئی ہے'
          : 'Financial executive report exported in English to Excel (.xlsx)'
      );
    } else {
      let exportRows: Record<string, any>[] = [];

      if (exportLang === 'ar') {
        exportRows = filteredWorkLogs.map(log => ({
          'عنوان المهمة / المشروع': log.taskTitleAr,
          'المنفّذ (من قام بالعمل)': log.performedBy,
          'المسمى الوظيفي': log.performerRole,
          'الشركة التابعة': log.businessUnitNameAr,
          'القطاع والنوع': log.category,
          'تاريخ ووقت الإنجاز': log.completedAt,
          'ساعات العمل المستغرقة': log.hoursSpent,
          'حالة الاعتماد': translateValue(log.status, 'ar'),
          'ملاحظات ومخرجات العمل': log.outputNotes || '-'
        }));
      } else if (exportLang === 'ur') {
        exportRows = filteredWorkLogs.map(log => ({
          'منصوبہ / تفویض کردہ کام': translateValue(log.taskTitle, 'ur'),
          'تکمیل کنندہ (کس نے کام کیا)': translateValue(log.performedBy, 'ur'),
          'عہدہ و منصب': translateValue(log.performerRole, 'ur'),
          'ذیلی ادارہ / شعبہ': translateValue(log.businessUnitName, 'ur'),
          'تجارتی زمرہ': log.category,
          'تکمیل کی تاریخ و وقت (کب ہوا)': log.completedAt,
          'صرف شدہ کام کے گھنٹے': `${log.hoursSpent}h`,
          'توثیقی حیثیت': translateValue(log.status, 'ur'),
          'حتمی مخرجات و نوٹس': log.outputNotes || '-'
        }));
      } else {
        exportRows = filteredWorkLogs.map(log => ({
          'Task / Project Name': log.taskTitle,
          'Performed By (Staff)': translateValue(log.performedBy, 'en'),
          'Corporate Role': translateValue(log.performerRole, 'en'),
          'Subsidiary Business': log.businessUnitName,
          'Category': log.category,
          'Completion Timestamp': log.completedAt,
          'Hours Spent': `${log.hoursSpent}h`,
          'Verification Status': translateValue(log.status, 'en'),
          'Output Notes & Deliverables': log.outputNotes || '-'
        }));
      }

      exportToExcel(exportRows, `MJM_Work_Execution_Audit_${exportLang.toUpperCase()}_${Date.now()}`, 'WorkAudit');
      triggerToast(
        exportLang === 'ar'
          ? 'تم تصدير سجل تدقيق الأعمال باللغة العربية إلى Excel (.xlsx)'
          : exportLang === 'ur'
          ? 'کام کی تکمیل کا آڈٹ ریکارڈ اردو زبان میں Excel (.xlsx) میں کامیابی سے برآمد ہو گیا'
          : 'Work execution audit log exported in English to Excel (.xlsx)'
      );
    }
  };

  // 2. Export to PDF (.pdf) with Arabic / English / Urdu shift
  const handleExportPdf = () => {
    if (activeTab === 'financial') {
      let title = 'Consolidated Financial P&L Report';
      let subtitle = 'Executive Review across all Sovereign Subsidiaries';
      let columns = [
        { header: 'Business / Sector', dataKey: 'business' },
        { header: 'Revenue (SAR)', dataKey: 'revenue' },
        { header: 'Expenses (SAR)', dataKey: 'expenses' },
        { header: 'Net Profit (SAR)', dataKey: 'profit' },
        { header: 'Margin', dataKey: 'margin' },
        { header: 'Tasks Done', dataKey: 'tasks' },
        { header: 'Efficiency', dataKey: 'efficiency' }
      ];
      let rows: Record<string, any>[] = [];
      let summaryMetrics = [
        { label: 'Total Revenue', value: `${(totals.revenue / 1e6).toFixed(2)}M SAR` },
        { label: 'Total Expenses', value: `${(totals.expenses / 1e6).toFixed(2)}M SAR` },
        { label: 'Net Profit', value: `${(totals.profit / 1e6).toFixed(2)}M SAR` },
        { label: 'Avg Margin', value: `${((totals.profit / totals.revenue) * 100).toFixed(1)}%` }
      ];

      if (exportLang === 'ar') {
        title = 'التقرير المالي التنفيذي الموحد';
        subtitle = 'مراجعة الميزانية والأرباح لكافة الشركات التابعة للسيادة والاستثمار';
        columns = [
          { header: 'الشركة / القطاع', dataKey: 'business' },
          { header: 'الإيرادات (ر.س)', dataKey: 'revenue' },
          { header: 'المصروفات (ر.س)', dataKey: 'expenses' },
          { header: 'صافي الأرباح (ر.س)', dataKey: 'profit' },
          { header: 'الهامش', dataKey: 'margin' },
          { header: 'المهام المنجزة', dataKey: 'tasks' },
          { header: 'الكفاءة', dataKey: 'efficiency' }
        ];
        rows = filteredFinancials.map(item => ({
          business: item.businessNameAr,
          revenue: item.totalRevenue.toLocaleString(),
          expenses: item.totalExpenses.toLocaleString(),
          profit: item.netProfit.toLocaleString(),
          margin: `${item.profitMarginPercent}%`,
          tasks: item.tasksCompletedCount,
          efficiency: `${item.efficiencyScore}%`
        }));
        summaryMetrics = [
          { label: 'إجمالي الإيرادات', value: `${(totals.revenue / 1e6).toFixed(2)}M ر.س` },
          { label: 'إجمالي المصروفات', value: `${(totals.expenses / 1e6).toFixed(2)}M ر.س` },
          { label: 'صافي الأرباح', value: `${(totals.profit / 1e6).toFixed(2)}M ر.س` },
          { label: 'متوسط الهامش', value: `${((totals.profit / totals.revenue) * 100).toFixed(1)}%` }
        ];
      } else if (exportLang === 'ur') {
        title = 'ایم جے ایم باضابطہ مالیاتی و منافع ایگزیکٹو رپورٹ';
        subtitle = 'تمام ذیلی اداروں کی آمدنی، اخراجات اور خالص منافع کا جامع جائزہ';
        columns = [
          { header: 'کمپنی / تجارتی شعبہ', dataKey: 'business' },
          { header: 'کل آمدنی (ریال)', dataKey: 'revenue' },
          { header: 'کل اخراجات (ریال)', dataKey: 'expenses' },
          { header: 'خالص منافع (ریال)', dataKey: 'profit' },
          { header: 'منافع کا تناسب', dataKey: 'margin' },
          { header: 'مکمل شدہ کام', dataKey: 'tasks' },
          { header: 'کارکردگی کی شرح', dataKey: 'efficiency' }
        ];
        rows = filteredFinancials.map(item => ({
          business: translateValue(item.businessName, 'ur'),
          revenue: item.totalRevenue.toLocaleString(),
          expenses: item.totalExpenses.toLocaleString(),
          profit: item.netProfit.toLocaleString(),
          margin: `${item.profitMarginPercent}%`,
          tasks: item.tasksCompletedCount,
          efficiency: `${item.efficiencyScore}%`
        }));
        summaryMetrics = [
          { label: 'کل آمدنی', value: `${(totals.revenue / 1e6).toFixed(2)}M ریال` },
          { label: 'کل اخراجات', value: `${(totals.expenses / 1e6).toFixed(2)}M ریال` },
          { label: 'خالص منافع', value: `${(totals.profit / 1e6).toFixed(2)}M ریال` },
          { label: 'منافع کا تناسب', value: `${((totals.profit / totals.revenue) * 100).toFixed(1)}%` }
        ];
      } else {
        rows = filteredFinancials.map(item => ({
          business: item.businessName,
          revenue: item.totalRevenue.toLocaleString(),
          expenses: item.totalExpenses.toLocaleString(),
          profit: item.netProfit.toLocaleString(),
          margin: `${item.profitMarginPercent}%`,
          tasks: item.tasksCompletedCount,
          efficiency: `${item.efficiencyScore}%`
        }));
      }

      exportToPdf(
        title,
        subtitle,
        columns,
        rows,
        `MJM_Financial_Executive_Report_${exportLang.toUpperCase()}_${Date.now()}`,
        summaryMetrics,
        exportLang
      );

      triggerToast(
        exportLang === 'ar'
          ? 'تم استخراج التقرير المالي التنفيذي باللغة العربية (PDF) بنجاح'
          : exportLang === 'ur'
          ? 'مالیاتی رپورٹ اردو میں PDF / پرنٹ فارمیٹ میں تیار کر دی گئی ہے'
          : 'Financial executive report exported to PDF (English)'
      );
    } else {
      let title = 'Work Execution & Audit Log Report';
      let subtitle = 'Detailed Operational Audit: Tasks Completed, Performers & Timestamps';
      let columns = [
        { header: 'Task / Project', dataKey: 'task' },
        { header: 'Performed By', dataKey: 'performer' },
        { header: 'Role', dataKey: 'role' },
        { header: 'Business Unit', dataKey: 'business' },
        { header: 'Date & Time', dataKey: 'date' },
        { header: 'Hours', dataKey: 'hours' },
        { header: 'Audit Status', dataKey: 'status' }
      ];
      let rows: Record<string, any>[] = [];
      let summaryMetrics = [
        { label: 'Total Tasks Audited', value: `${filteredWorkLogs.length}` },
        { label: 'Verified Complete', value: `${filteredWorkLogs.filter(l => l.status === 'VERIFIED').length}` },
        { label: 'Total Hours Spent', value: `${filteredWorkLogs.reduce((a, c) => a + c.hoursSpent, 0)}h` }
      ];

      if (exportLang === 'ar') {
        title = 'سجل تدقيق إنجاز الأعمال والمهام المكتملة';
        subtitle = 'تدقيق تنفيذي مفصل: ما تم إنجازه، من قام بالعمل، وتاريخ وساعات التنفيذ';
        columns = [
          { header: 'المهمة / المشروع', dataKey: 'task' },
          { header: 'المنفّذ (من قام بالعمل)', dataKey: 'performer' },
          { header: 'المسمى الوظيفي', dataKey: 'role' },
          { header: 'الشركة التابعة', dataKey: 'business' },
          { header: 'تاريخ ووقت الإنجاز', dataKey: 'date' },
          { header: 'الساعات', dataKey: 'hours' },
          { header: 'حالة التدقيق', dataKey: 'status' }
        ];
        rows = filteredWorkLogs.map(log => ({
          task: log.taskTitleAr,
          performer: log.performedBy,
          role: log.performerRole,
          business: log.businessUnitNameAr,
          date: log.completedAt,
          hours: `${log.hoursSpent}س`,
          status: translateValue(log.status, 'ar')
        }));
        summaryMetrics = [
          { label: 'إجمالي المهام المدققة', value: `${filteredWorkLogs.length}` },
          { label: 'معتمد ومكتمل', value: `${filteredWorkLogs.filter(l => l.status === 'VERIFIED').length}` },
          { label: 'ساعات العمل المنفذة', value: `${filteredWorkLogs.reduce((a, c) => a + c.hoursSpent, 0)} ساعة` }
        ];
      } else if (exportLang === 'ur') {
        title = 'ایم جے ایم - آڈٹ ریکارڈ برائے تکمیل کام و عملہ';
        subtitle = 'تفصیلی آڈٹ: کام کس نے کیا، کیا مکمل ہوا، اور کب ہوا';
        columns = [
          { header: 'منصوبہ / تفویض کردہ کام', dataKey: 'task' },
          { header: 'تکمیل کنندہ (کس نے کیا)', dataKey: 'performer' },
          { header: 'عہدہ و منصب', dataKey: 'role' },
          { header: 'ذیلی کمپنی / شعبہ', dataKey: 'business' },
          { header: 'تکمیل کی تاریخ و وقت', dataKey: 'date' },
          { header: 'صرف گھنٹے', dataKey: 'hours' },
          { header: 'توثیقی حیثیت', dataKey: 'status' }
        ];
        rows = filteredWorkLogs.map(log => ({
          task: translateValue(log.taskTitle, 'ur'),
          performer: translateValue(log.performedBy, 'ur'),
          role: translateValue(log.performerRole, 'ur'),
          business: translateValue(log.businessUnitName, 'ur'),
          date: log.completedAt,
          hours: `${log.hoursSpent}h`,
          status: translateValue(log.status, 'ur')
        }));
        summaryMetrics = [
          { label: 'کل مدقق شدہ کام', value: `${filteredWorkLogs.length}` },
          { label: 'تصدیق شدہ مکمل', value: `${filteredWorkLogs.filter(l => l.status === 'VERIFIED').length}` },
          { label: 'صرف شدہ کل گھنٹے', value: `${filteredWorkLogs.reduce((a, c) => a + c.hoursSpent, 0)} گھنٹے` }
        ];
      } else {
        rows = filteredWorkLogs.map(log => ({
          task: log.taskTitle,
          performer: log.performedBy,
          role: log.performerRole,
          business: log.businessUnitName,
          date: log.completedAt,
          hours: `${log.hoursSpent}h`,
          status: log.status
        }));
      }

      exportToPdf(
        title,
        subtitle,
        columns,
        rows,
        `MJM_Work_Execution_Report_${exportLang.toUpperCase()}_${Date.now()}`,
        summaryMetrics,
        exportLang
      );

      triggerToast(
        exportLang === 'ar'
          ? 'تم استخراج تقرير تدقيق الأعمال باللغة العربية (PDF) بنجاح'
          : exportLang === 'ur'
          ? 'کام کی تکمیل کا آڈٹ ریکارڈ اردو میں PDF / پرنٹ فارمیٹ میں تیار کر دیا گیا ہے'
          : 'Work audit log exported to PDF (English)'
      );
    }
  };

  return (
    <div className="w-full bg-[#0a0a0d] text-slate-100 min-h-screen py-4 sm:py-8 px-3 sm:px-6 lg:px-8 font-sans" dir={currentLanguage.dir}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Live Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 left-4 right-4 sm:right-auto sm:left-6 z-50 p-4 rounded-2xl bg-[#1c190f] border border-[#d4af35] text-slate-100 text-xs shadow-2xl flex items-center gap-3 animate-slideUp max-w-md">
            <Sparkles className="w-4 h-4 text-[#d4af35] shrink-0" />
            <span className="font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* 3D Master Header Section: Consolidated CEO Reports Center */}
        <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-[#17140f] via-[#211a0f] to-[#14110b] border border-[#d4af35]/40 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(212,175,53,0.3)] flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#f7e49c] via-[#d4af35] to-[#7f631b] p-[2px] shadow-[0_8px_20px_rgba(212,175,53,0.35)] flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0e0d0b] rounded-[14px] flex items-center justify-center shadow-inner">
                <FileSpreadsheet className="w-6 h-6 sm:w-8 sm:h-8 text-[#f1d57f]" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {isArabic ? 'مركز التقارير التنفيذية والتدقيق الشامل' : 'CEO Master Executive Reports & Audit Center'}
                </h1>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500/20 text-[#f5d77f] border border-amber-500/40">
                  {isArabic ? 'صلاحية الرئيس التنفيذي المطلقة' : 'CEO Master Clearance'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {isArabic 
                  ? 'متابعة شاملة لجميع الشركات والقطاعات: الإيرادات، المصروفات، الأرباح، وتدقيق دقيق لما تم إنجازه ومن قام به ومواعيده' 
                  : 'Full oversight of all subsidiaries: Revenue, Expenses, Net Profit, and detailed work audit logs (Who, What & When)'}
              </p>
            </div>
          </div>

          {/* Export Action Controls: Language Shift (AR/EN/UR) + Excel (.xlsx) & PDF (.pdf) */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            <ExportLanguageSelector 
              currentLang={exportLang} 
              onChange={setExportLang} 
            />

            <button
              onClick={handleExportExcel}
              className="px-3.5 py-2 rounded-2xl text-xs font-black text-black bg-gradient-to-b from-[#f5d77f] via-[#d4af35] to-[#997415] hover:brightness-105 active:scale-95 transition-all shadow-[0_6px_16px_rgba(212,175,53,0.3)] flex items-center gap-2"
              title="Export filtered dataset to Microsoft Excel (.xlsx)"
            >
              <FileSpreadsheet className="w-4 h-4 text-black stroke-[2.5]" />
              <span>{isArabic ? 'تصدير Excel' : exportLang === 'ur' ? 'ایکسل برآمد' : 'Export Excel'}</span>
            </button>

            <button
              onClick={handleExportPdf}
              className="px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-200 bg-[#1e1a12] hover:bg-[#2b2416] border border-[#d4af35]/50 active:scale-95 transition-all shadow-md flex items-center gap-2"
              title="Generate printable PDF report (.pdf)"
            >
              <Printer className="w-4 h-4 text-[#f1d57f]" />
              <span>{isArabic ? 'تصدير PDF' : exportLang === 'ur' ? 'پی ڈی ایف برآمد' : 'Export PDF'}</span>
            </button>
          </div>
        </div>

        {/* Master Consolidated Executive Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#11100e] border border-[#2e2615] space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">{isArabic ? 'إجمالي الإيرادات' : 'Total Revenue'}</span>
            <div className="text-base sm:text-lg font-black text-[#f1d57f] font-mono">
              {(totals.revenue / 1e6).toFixed(2)}M <span className="text-xs">SAR</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#11100e] border border-[#2e2615] space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">{isArabic ? 'إجمالي المصروفات' : 'Total Expenses'}</span>
            <div className="text-base sm:text-lg font-black text-rose-400 font-mono">
              {(totals.expenses / 1e6).toFixed(2)}M <span className="text-xs">SAR</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#11100e] border border-[#2e2615] space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">{isArabic ? 'صافي الأرباح' : 'Net Profit'}</span>
            <div className="text-base sm:text-lg font-black text-emerald-400 font-mono flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{(totals.profit / 1e6).toFixed(2)}M</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#11100e] border border-[#2e2615] space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">{isArabic ? 'هامش الربحية' : 'Profit Margin'}</span>
            <div className="text-base sm:text-lg font-black text-emerald-300 font-mono">
              {((totals.profit / totals.revenue) * 100).toFixed(1)}%
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#11100e] border border-[#2e2615] space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">{isArabic ? 'بند الرواتب والأجور' : 'Payroll Cost'}</span>
            <div className="text-base sm:text-lg font-black text-blue-300 font-mono">
              {(totals.salaries / 1e6).toFixed(2)}M <span className="text-xs">SAR</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#11100e] border border-[#2e2615] space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">{isArabic ? 'المهام المنفذة والمحققة' : 'Tasks Completed'}</span>
            <div className="text-base sm:text-lg font-black text-white font-mono flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-[#f1d57f]" />
              <span>{totals.tasks}</span>
            </div>
          </div>
        </div>

        {/* Subsidiary Selector Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-[#12110e] border border-[#2e2615] flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Subsidiary Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setSelectedBizId('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedBizId === 'all'
                  ? 'bg-gradient-to-r from-[#d4af35] to-[#9b771a] text-black font-black shadow-md'
                  : 'bg-[#181611] text-slate-400 hover:text-white border border-[#2e2615]'
              }`}
            >
              {isArabic ? 'كافة الشركات التابعة' : 'All Subsidiaries'} ({MASTER_FINANCIAL_REPORTS.length})
            </button>

            {MASTER_FINANCIAL_REPORTS.map(biz => (
              <button
                key={biz.businessId}
                onClick={() => setSelectedBizId(biz.businessId)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedBizId === biz.businessId
                    ? 'bg-gradient-to-r from-[#d4af35] to-[#9b771a] text-black font-black shadow-md'
                    : 'bg-[#181611] text-slate-400 hover:text-white border border-[#2e2615]'
                }`}
              >
                {isArabic ? biz.businessNameAr.split(' ')[0] + ' ' + (biz.businessNameAr.split(' ')[1] || '') : biz.code}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute top-3 right-3 pointer-events-none" />
            <input
              type="text"
              placeholder={isArabic ? 'بحث في المهام والمنفذين...' : 'Search tasks, performers...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d0c0a] border border-[#2e2615] focus:border-[#d4af35] rounded-xl py-2 px-3 pr-9 text-xs text-white outline-none"
            />
          </div>
        </div>

        {/* Tab Navigation for Reports */}
        <div className="flex items-center gap-2 border-b border-[#262013] pb-1">
          <button
            onClick={() => setActiveTab('financial')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'financial'
                ? 'bg-[#272012] text-[#f5d77f] border border-[#d4af35]/50 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4 text-[#f1d57f]" />
            <span>{isArabic ? 'تقرير الأرباح والمصروفات لكافة الشركات' : 'P&L, Revenue & Expenses By Business'}</span>
          </button>

          <button
            onClick={() => setActiveTab('work_audit')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'work_audit'
                ? 'bg-[#272012] text-[#f5d77f] border border-[#d4af35]/50 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>{isArabic ? 'سجل تدقيق الإنجاز (كم عمل، من قام به، ومتى)' : 'Work Execution Audit (Who, What, When)'}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#d4af35] text-black text-[10px] font-black">
              {filteredWorkLogs.length}
            </span>
          </button>
        </div>

        {/* TAB 1: Financial & P&L Master Table */}
        {activeTab === 'financial' && (
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-3xl border border-[#2e2615] bg-[#11100e] shadow-xl">
              <table className="w-full text-start text-xs">
                <thead>
                  <tr className="bg-[#17140f] border-b border-[#2e2615] text-[#f1d57f] font-bold">
                    <th className="p-4 text-start">{isArabic ? 'الشركة / القطاع التابع' : 'Business Unit / Subsidiary'}</th>
                    <th className="p-4 text-start">{isArabic ? 'إجمالي الإيرادات' : 'Revenue'}</th>
                    <th className="p-4 text-start">{isArabic ? 'إجمالي المصروفات' : 'Expenses'}</th>
                    <th className="p-4 text-start">{isArabic ? 'صافي الأرباح' : 'Net Profit'}</th>
                    <th className="p-4 text-start">{isArabic ? 'هامش الربح' : 'Margin'}</th>
                    <th className="p-4 text-start">{isArabic ? 'بند الرواتب' : 'Payroll Cost'}</th>
                    <th className="p-4 text-start">{isArabic ? 'المصروف التشغيلي' : 'Operational Cost'}</th>
                    <th className="p-4 text-start">{isArabic ? 'المهام المحققة' : 'Tasks Done'}</th>
                    <th className="p-4 text-start">{isArabic ? 'الكفاءة' : 'Efficiency'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1b14]">
                  {filteredFinancials.map((row) => (
                    <tr key={row.businessId} className="hover:bg-[#16140f] transition-colors">
                      <td className="p-4 font-bold text-white">
                        <div>{isArabic ? row.businessNameAr : row.businessName}</div>
                        <div className="text-[10px] text-[#d4af35] font-mono mt-0.5">{row.code}</div>
                      </td>
                      <td className="p-4 font-mono font-bold text-[#f1d57f]">
                        {row.totalRevenue.toLocaleString()} SAR
                      </td>
                      <td className="p-4 font-mono font-bold text-rose-400">
                        {row.totalExpenses.toLocaleString()} SAR
                      </td>
                      <td className="p-4 font-mono font-bold text-emerald-400">
                        {row.netProfit.toLocaleString()} SAR
                      </td>
                      <td className="p-4 font-mono text-slate-200">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                          {row.profitMarginPercent}%
                        </span>
                      </td>
                      <td className="p-4 font-mono text-slate-300">
                        {row.staffSalariesExpense.toLocaleString()} SAR
                      </td>
                      <td className="p-4 font-mono text-slate-300">
                        {row.operationalExpense.toLocaleString()} SAR
                      </td>
                      <td className="p-4 font-mono font-bold text-blue-300">
                        {row.tasksCompletedCount}
                      </td>
                      <td className="p-4 font-mono font-bold text-emerald-400">
                        {row.efficiencyScore}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Work Execution & Audit Log: "kitna kaam huwa, kis ney kiya, kab huwa" */}
        {activeTab === 'work_audit' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-[#11100e] p-3 rounded-2xl border border-[#2e2615] text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>
                  {isArabic 
                    ? 'سجل تدقيق الإنجاز الفوري لكافة الشركات: يوضح المهمة المنجزة، اسم المنفّذ، وقت وتاريخ الانتهاء، والمخرجات' 
                    : 'Real-time audit trails: Task title, performer name, completion timestamp & deliverables'}
                </span>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setStatusFilter('ALL')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${statusFilter === 'ALL' ? 'bg-[#d4af35] text-black' : 'bg-[#181611] text-slate-400'}`}
                >
                  {isArabic ? 'الكل' : 'All'}
                </button>
                <button
                  onClick={() => setStatusFilter('VERIFIED')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${statusFilter === 'VERIFIED' ? 'bg-emerald-500 text-black' : 'bg-[#181611] text-emerald-400'}`}
                >
                  {isArabic ? 'معتمد' : 'Verified'}
                </button>
                <button
                  onClick={() => setStatusFilter('COMPLETED')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${statusFilter === 'COMPLETED' ? 'bg-blue-500 text-white' : 'bg-[#181611] text-blue-400'}`}
                >
                  {isArabic ? 'مكتمل' : 'Completed'}
                </button>
              </div>
            </div>

            {/* Audit Logs Table */}
            <div className="overflow-x-auto rounded-3xl border border-[#2e2615] bg-[#11100e] shadow-xl">
              <table className="w-full text-start text-xs">
                <thead>
                  <tr className="bg-[#17140f] border-b border-[#2e2615] text-[#f1d57f] font-bold">
                    <th className="p-4 text-start">{isArabic ? 'المهمة / المشروع المنجز' : 'Completed Task / Project'}</th>
                    <th className="p-4 text-start">{isArabic ? 'المنفّذ (من قام بالعمل)' : 'Performed By'}</th>
                    <th className="p-4 text-start">{isArabic ? 'الشركة والقطاع' : 'Subsidiary'}</th>
                    <th className="p-4 text-start">{isArabic ? 'تاريخ ووقت الإنجاز (متى)' : 'Completed At (When)'}</th>
                    <th className="p-4 text-start">{isArabic ? 'ساعات العمل' : 'Hours Spent'}</th>
                    <th className="p-4 text-start">{isArabic ? 'حالة التدقيق' : 'Audit Status'}</th>
                    <th className="p-4 text-start">{isArabic ? 'ملاحظات المخرجات' : 'Output Deliverable'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1b14]">
                  {filteredWorkLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#16140f] transition-colors">
                      <td className="p-4 font-bold text-white max-w-xs">
                        <div>{isArabic ? log.taskTitleAr : log.taskTitle}</div>
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 inline-block mt-1">
                          {log.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-white">{log.performedBy}</div>
                        <div className="text-[10px] text-slate-400">{log.performerRole}</div>
                      </td>
                      <td className="p-4 text-slate-300">
                        {isArabic ? log.businessUnitNameAr : log.businessUnitName}
                      </td>
                      <td className="p-4 font-mono text-[#f1d57f] font-bold whitespace-nowrap">
                        {log.completedAt}
                      </td>
                      <td className="p-4 font-mono text-emerald-400 font-bold">
                        {log.hoursSpent}h
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          log.status === 'VERIFIED'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="p-4 text-[11px] text-slate-400 max-w-xs bg-[#0b0a08] rounded-xl my-1">
                        {log.outputNotes || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
