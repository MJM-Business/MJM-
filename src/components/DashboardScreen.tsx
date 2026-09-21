import React, { useState } from 'react';
import { FinancialTransaction, Language } from '../types';
import { INITIAL_TRANSACTIONS } from '../data/mockData';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  MessageSquare, 
  ArrowUpRight, 
  Filter, 
  Plus, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Sparkles,
  Bot,
  Send,
  Download,
  Calendar
} from 'lucide-react';

interface DashboardScreenProps {
  language: Language;
  onOpenNewEntryModal: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ language, onOpenNewEntryModal }) => {
  const isArabic = language === 'ar';
  
  const [transactions, setTransactions] = useState<FinancialTransaction[]>(INITIAL_TRANSACTIONS);
  const [txFilter, setTxFilter] = useState<'all' | 'success' | 'pending' | 'failed'>('all');
  const [timeRange, setTimeRange] = useState('30days');
  const [liveBotMessage, setLiveBotMessage] = useState('');
  const [botChatLogs, setBotChatLogs] = useState([
    { id: 1, sender: 'bot', text: 'تم استلام استفسار من العميل "جوليان بلاكوود" بخصوص تجديد العقد الفاخر.', time: '14:32' },
    { id: 2, sender: 'client', text: 'أرغب في إضافة 3 حسابات مدراء جديدة لمنظومتنا.', time: '14:33' },
    { id: 3, sender: 'bot', text: 'تم إعداد عرض الأسعار وإرساله للمراجعة الآلية مع نسبة خصم الشريك 10%.', time: '14:33' }
  ]);

  const filteredTransactions = transactions.filter((tx) => {
    if (txFilter === 'all') return true;
    return tx.status === txFilter;
  });

  const handleSendTestBotMessage = () => {
    if (!liveBotMessage.trim()) return;
    const newLog = {
      id: Date.now(),
      sender: 'admin',
      text: liveBotMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setBotChatLogs((prev) => [...prev, newLog]);
    setLiveBotMessage('');

    setTimeout(() => {
      setBotChatLogs((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: isArabic 
            ? 'تم اعتماد الأمر عبر واتساب وتحديث سجل العمليات المالية تلقائياً.' 
            : 'Action confirmed via WhatsApp and financials logged automatically.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 800);
  };

  // Monthly revenue chart data
  const monthlyData = [
    { month: isArabic ? 'مايو' : 'May', revenue: 320, expense: 120 },
    { month: isArabic ? 'يونيو' : 'Jun', revenue: 380, expense: 140 },
    { month: isArabic ? 'يوليو' : 'Jul', revenue: 410, expense: 155 },
    { month: isArabic ? 'أغسطس' : 'Aug', revenue: 450, expense: 160 },
    { month: isArabic ? 'سبتمبر' : 'Sep', revenue: 470, expense: 150 },
    { month: isArabic ? 'أكتوبر' : 'Oct', revenue: 520, expense: 165 },
  ];

  const maxVal = 550;

  return (
    <div className="w-full bg-[#0b0b0b] text-slate-100 min-h-screen py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

        {/* Dashboard Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121212] p-4 sm:p-6 rounded-2xl border border-[#2b2313] shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                {isArabic ? 'لوحة القيادة الرئيسية' : 'Executive Dashboard'}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#d4af35]/20 text-[#f1d57f] border border-[#d4af35]/40">
                VIP Access
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              {isArabic 
                ? 'مرحباً بك مجدداً، ألكسندر ثورن. إليك ملخص العمليات، الإيرادات ومراقب واتساب الحي.'
                : 'Welcome back, Alexander Thorne. Here is the operational overview and live WhatsApp telemetry.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Period Selector */}
            <div className="flex items-center gap-1.5 bg-[#1a1a1a] px-3 py-1.5 rounded-xl border border-[#332a18] text-xs text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-[#d4af35]" />
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-transparent text-white font-medium outline-none cursor-pointer text-xs"
              >
                <option value="30days" className="bg-[#1a1a1a]">آخر ٣٠ يوماً</option>
                <option value="thisWeek" className="bg-[#1a1a1a]">هذا الأسبوع</option>
                <option value="today" className="bg-[#1a1a1a]">اليوم</option>
              </select>
            </div>

            {/* Quick Action Button */}
            <button
              id="dashboard-new-action-btn"
              onClick={onOpenNewEntryModal}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#d4af35] to-[#b8860b] hover:opacity-95 transition-all shadow-md shadow-[#d4af35]/20 active:scale-95"
            >
              <Plus className="w-4 h-4 text-black" />
              <span>{isArabic ? 'إجراء مالي جديد' : 'New Action'}</span>
            </button>
          </div>
        </div>

        {/* 4 Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Revenue */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#131313] border border-[#2d2514] hover:border-[#d4af35] transition-all space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                {isArabic ? 'إجمالي الإيرادات' : 'Total Revenue'}
              </span>
              <div className="p-2 rounded-xl bg-[#d4af35]/15 border border-[#d4af35]/30 text-[#d4af35]">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-black text-white">482,900.00 <span className="text-xs font-bold text-[#d4af35]">ر.س</span></div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="font-semibold">+12.5%</span>
                <span className="text-slate-500 text-[11px]">{isArabic ? 'مقارنة بالشهر السابق' : 'vs last mo'}</span>
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#131313] border border-[#2d2514] hover:border-[#d4af35] transition-all space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                {isArabic ? 'المصروفات التشغيلية' : 'Operating Expenses'}
              </span>
              <div className="p-2 rounded-xl bg-[#1f1a0e] border border-[#3e3215] text-[#d4af35]">
                <TrendingDown className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-black text-white">164,200.00 <span className="text-xs font-bold text-[#d4af35]">ر.س</span></div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="font-semibold">-4.2%</span>
                <span className="text-slate-500 text-[11px]">{isArabic ? 'ترشيد ذكي للتكاليف' : 'optimized'}</span>
              </div>
            </div>
          </div>

          {/* Net Profit */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#131313] border border-[#2d2514] hover:border-[#d4af35] transition-all space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                {isArabic ? 'صافي الأرباح التقديري' : 'Estimated Net Profit'}
              </span>
              <div className="p-2 rounded-xl bg-[#d4af35]/15 border border-[#d4af35]/30 text-[#d4af35]">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-black text-[#f1d57f]">318,700.00 <span className="text-xs font-bold text-[#d4af35]">ر.س</span></div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="font-semibold">+18.7%</span>
                <span className="text-slate-500 text-[11px]">{isArabic ? 'هامش ربح استثنائي' : 'margin'}</span>
              </div>
            </div>
          </div>

          {/* WhatsApp AI Handled */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#131313] border border-[#2d2514] hover:border-[#d4af35] transition-all space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                {isArabic ? 'معاملات واتساب الذكية' : 'WhatsApp AI Handled'}
              </span>
              <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-black text-white">1,420 <span className="text-xs font-normal text-slate-400">{isArabic ? 'محادثة' : 'chats'}</span></div>
              <div className="flex items-center gap-1.5 text-xs text-[#d4af35]">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-semibold">99.4%</span>
                <span className="text-slate-500 text-[11px]">{isArabic ? 'دقة الإجابة والتحويل' : 'AI accuracy'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Main Grid: Chart & WhatsApp Monitor */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column (2 cols): Revenue Chart + Transactions Table */}
          <div className="lg:col-span-2 space-y-6">

            {/* Revenue vs Expenses Bar Chart */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#121212] border border-[#2d2414] shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white">
                    {isArabic ? 'مقارنة الإيرادات بالمصروفات الشهرية' : 'Monthly Revenue vs Expenses'}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {isArabic ? 'تحليلات الأداء المالي المدعومة بنموذج التوقع الذكي' : 'Financial performance analytics with predictive modeling'}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-gradient-to-r from-[#d4af35] to-[#f1d57f]"></span>
                    <span className="text-slate-300">{isArabic ? 'الإيرادات' : 'Revenue'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-[#332812]"></span>
                    <span className="text-slate-400">{isArabic ? 'المصروفات' : 'Expenses'}</span>
                  </div>
                </div>
              </div>

              {/* Visual Bars Container */}
              <div className="pt-6">
                <div className="h-52 sm:h-56 flex items-end justify-between gap-1.5 sm:gap-6 border-b border-[#282112] pb-2">
                  {monthlyData.map((item, idx) => {
                    const revHeight = (item.revenue / maxVal) * 100;
                    const expHeight = (item.expense / maxVal) * 100;

                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                        <div className="w-full flex items-end justify-center gap-0.5 sm:gap-2 h-full">
                          {/* Revenue Bar */}
                          <div 
                            style={{ height: `${revHeight}%` }}
                            className="w-full max-w-[12px] xs:max-w-[16px] sm:max-w-[24px] bg-gradient-to-t from-[#8f6d14] via-[#d4af35] to-[#f6e58d] rounded-t-sm sm:rounded-t-md transition-all duration-500 group-hover:brightness-125 relative flex justify-center"
                          >
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 text-[10px] font-bold text-[#f1d57f] bg-black/90 px-1.5 py-0.5 rounded border border-[#d4af35]/40 whitespace-nowrap pointer-events-none z-10">
                              {item.revenue}k
                            </span>
                          </div>
                          {/* Expense Bar */}
                          <div 
                            style={{ height: `${expHeight}%` }}
                            className="w-full max-w-[12px] xs:max-w-[16px] sm:max-w-[24px] bg-[#2a2211] hover:bg-[#3d3118] rounded-t-sm sm:rounded-t-md transition-all duration-500 relative flex justify-center"
                          >
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 text-[10px] font-medium text-slate-300 bg-black/90 px-1.5 py-0.5 rounded border border-slate-700 whitespace-nowrap pointer-events-none z-10">
                              {item.expense}k
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] sm:text-xs font-semibold text-slate-400 group-hover:text-[#d4af35] transition-colors">
                          {item.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recent Financial Transactions Table */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#121212] border border-[#2d2414] shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {isArabic ? 'العمليات المالية الأخيرة' : 'Recent Financial Transactions'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isArabic ? 'سجل التدقيق الفوري لكافة التحويلات والفواتير' : 'Real-time audit log of transfers and invoices'}
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 bg-[#181818] p-1 rounded-xl border border-[#2c2415] self-start sm:self-auto overflow-x-auto">
                  {(['all', 'success', 'pending'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTxFilter(filter)}
                      className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
                        txFilter === filter
                          ? 'bg-[#d4af35] text-black font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {filter === 'all' && (isArabic ? 'الكل' : 'All')}
                      {filter === 'success' && (isArabic ? 'مكتمل' : 'Completed')}
                      {filter === 'pending' && (isArabic ? 'معلق' : 'Pending')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transactions List */}
              <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                <table className="w-full min-w-[480px] text-start text-xs text-slate-300">
                  <thead className="text-[11px] uppercase text-slate-400 border-b border-[#282112]">
                    <tr>
                      <th className="py-3 px-3 text-start">{isArabic ? 'العملية والقسم' : 'Operation & Dept'}</th>
                      <th className="py-3 px-3 text-start">{isArabic ? 'التاريخ والوقت' : 'Date & Time'}</th>
                      <th className="py-3 px-3 text-start">{isArabic ? 'المبلغ' : 'Amount'}</th>
                      <th className="py-3 px-3 text-start">{isArabic ? 'الحالة' : 'Status'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e190f]">
                    {filteredTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-[#181818] transition-colors">
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-white text-xs">{tx.operation}</div>
                          <div className="text-[11px] text-[#a3822a]">{tx.department}</div>
                        </td>
                        <td className="py-3.5 px-3 text-slate-400 font-mono text-[11px]">
                          {tx.date}
                        </td>
                        <td className="py-3.5 px-3 font-bold text-slate-100">
                          {tx.amount.toLocaleString()} <span className="text-[10px] text-[#d4af35]">ر.س</span>
                        </td>
                        <td className="py-3.5 px-3">
                          {tx.status === 'success' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              <CheckCircle className="w-3 h-3" />
                              <span>{isArabic ? 'ناجحة' : 'Success'}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                              <Clock className="w-3 h-3" />
                              <span>{isArabic ? 'قيد المعالجة' : 'Pending'}</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column (1 col): WhatsApp AI Monitor & Budget breakdown */}
          <div className="space-y-6">

            {/* WhatsApp AI Live Monitor */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-[#2d2414] shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {isArabic ? 'مراقب واتساب الذكي' : 'WhatsApp AI Monitor'}
                    </h3>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>{isArabic ? 'متصل ومؤتمت بالكامل' : 'Online & Automated'}</span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1f1a0e] text-[#f1d57f] border border-[#3e3215]">
                  AI v2.4
                </span>
              </div>

              {/* Live Chat snippet box */}
              <div className="bg-[#0b0b0b] rounded-xl p-3 border border-[#261f12] h-64 overflow-y-auto space-y-2.5">
                {botChatLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className={`flex flex-col ${log.sender === 'client' ? 'items-start' : 'items-end'}`}
                  >
                    <div className={`p-2.5 rounded-xl text-xs max-w-[85%] ${
                      log.sender === 'client'
                        ? 'bg-[#1e1e1e] text-slate-200 border border-slate-700'
                        : log.sender === 'bot'
                        ? 'bg-[#1f190e] text-[#f1d57f] border border-[#524116]'
                        : 'bg-[#d4af35] text-black font-medium'
                    }`}>
                      <p className="leading-relaxed">{log.text}</p>
                      <span className="text-[9px] text-slate-400 block mt-1 text-end">
                        {log.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bot Interactive Input */}
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={liveBotMessage}
                  onChange={(e) => setLiveBotMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendTestBotMessage()}
                  placeholder={isArabic ? 'أدخل أمراً أو استجابة...' : 'Type instructions...'}
                  className="flex-1 bg-[#161616] border border-[#302716] focus:border-[#d4af35] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
                />
                <button
                  onClick={handleSendTestBotMessage}
                  className="p-2 rounded-xl bg-[#d4af35] hover:bg-[#e2c15e] text-black transition-colors"
                  title={isArabic ? 'إرسال' : 'Send'}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Stats Footer inside Monitor */}
              <div className="pt-2 border-t border-[#241e12] grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-[#181818] border border-[#2d2514]">
                  <div className="text-[10px] text-slate-400">{isArabic ? 'دقة الإجابة' : 'Accuracy'}</div>
                  <div className="font-bold text-emerald-400">99.4%</div>
                </div>
                <div className="p-2 rounded-lg bg-[#181818] border border-[#2d2514]">
                  <div className="text-[10px] text-slate-400">{isArabic ? 'تدخل بشري' : 'Human Escalation'}</div>
                  <div className="font-bold text-[#d4af35]">1.2%</div>
                </div>
              </div>

            </div>

            {/* Department Budget Breakdown */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-[#2d2414] shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white">
                {isArabic ? 'التوزيع المالي للقطاعات' : 'Departmental Allocation'}
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>{isArabic ? 'العمليات وسلاسل الإمداد' : 'Operations & Logistics'}</span>
                    <span className="font-bold text-[#f1d57f]">42%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#201a0e] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#8f6d14] to-[#d4af35] w-[42%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>{isArabic ? 'التقنية والذكاء الاصطناعي' : 'Tech & AI Systems'}</span>
                    <span className="font-bold text-[#f1d57f]">24%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#201a0e] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#8f6d14] to-[#d4af35] w-[24%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>{isArabic ? 'التسويق وعلاقات VIP' : 'Marketing & VIP Relations'}</span>
                    <span className="font-bold text-[#f1d57f]">20%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#201a0e] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#8f6d14] to-[#d4af35] w-[20%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>{isArabic ? 'الموارد البشرية والإدارة' : 'HR & Governance'}</span>
                    <span className="font-bold text-[#f1d57f]">14%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#201a0e] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#8f6d14] to-[#d4af35] w-[14%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
