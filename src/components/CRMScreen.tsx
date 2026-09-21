import React, { useState } from 'react';
import { Client, Language, AIInsight } from '../types';
import { INITIAL_CLIENTS, AI_INSIGHTS } from '../data/mockData';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  MessageSquare, 
  Phone, 
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  MoreVertical
} from 'lucide-react';

interface CRMScreenProps {
  language: Language;
}

export const CRMScreen: React.FC<CRMScreenProps> = ({ language }) => {
  const isArabic = language === 'ar';
  
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'VIP' | 'Regular'>('all');
  const [syncFilter, setSyncFilter] = useState<'all' | 'synced' | 'offline'>('all');
  
  // New Client Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientCompany, setNewClientCompany] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientCategory, setNewClientCategory] = useState<'VIP' | 'Regular'>('VIP');

  // WhatsApp chat simulation toast
  const [activeWhatsappToast, setActiveWhatsappToast] = useState<string | null>(null);

  const filteredClients = clients.filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
    const matchesSync = syncFilter === 'all' || c.syncStatus === syncFilter;

    return matchesSearch && matchesCategory && matchesSync;
  });

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const newClient: Client = {
      id: String(Date.now()),
      code: `MJM-${Math.floor(1000 + Math.random() * 9000)}-Z`,
      name: newClientName,
      initials: newClientName.slice(0, 2).toUpperCase(),
      category: newClientCategory,
      syncStatus: 'synced',
      assignedAgent: {
        name: 'سارة ل.',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMF_XcNHDJU0SPOPxDzxB8gDzl64VFrNLUJo7-yQjofyp_BXTWs-0ZQJ5iSOfkUc-t4iSUPffGnExllofshx-uh3CzDQ5s0LbiX8FR-erYb6p1tdNs-q4maPrSLtSn1UYmQ1Wj204uwSyZP8h-hgJrsDERQuS3lPcLtJtfIZkrhxtd-ACRGBn9E0an-vT99kUj1uPc8w_ueIdGXDycigdnZX2zUY7kQ5JcShO0OLrZqQbI22BM7p0O-58i0sOF7o9quvseIXW4_Q'
      },
      status: 'verified',
      whatsappNumber: newClientPhone || '+966 50 000 0000',
      company: newClientCompany || 'مؤسسة تجارية'
    };

    setClients([newClient, ...clients]);
    setIsAddModalOpen(false);
    setNewClientName('');
    setNewClientCompany('');
    setNewClientPhone('');

    setActiveWhatsappToast(
      isArabic 
        ? `تم تسجيل العميل "${newClient.name}" وربطه تلقائياً بروبوت واتساب للأعمال!`
        : `Client "${newClient.name}" created and synced with WhatsApp bot!`
    );
    setTimeout(() => setActiveWhatsappToast(null), 4000);
  };

  const handleOpenWhatsapp = (client: Client) => {
    setActiveWhatsappToast(
      isArabic 
        ? `جاري فتح محادثة مشفرة عبر واتساب مع: ${client.name} (${client.whatsappNumber || '+966...'})`
        : `Opening encrypted WhatsApp chat with: ${client.name}`
    );
    setTimeout(() => setActiveWhatsappToast(null), 4000);
  };

  return (
    <div className="w-full bg-[#0b0b0b] text-slate-100 min-h-screen py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

        {/* Toast Notification */}
        {activeWhatsappToast && (
          <div className="fixed bottom-6 left-4 right-4 sm:right-auto sm:left-6 z-50 p-4 rounded-xl bg-[#1a160d] border border-[#d4af35] text-slate-100 text-xs shadow-2xl flex items-center gap-3 animate-slideUp max-w-md">
            <div className="p-2 rounded-lg bg-[#25D366]/20 text-[#25D366] shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span>{activeWhatsappToast}</span>
          </div>
        )}

        {/* CRM Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121212] p-4 sm:p-6 rounded-2xl border border-[#2b2313] shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#d4af35]" />
              <h1 className="text-lg sm:text-2xl font-black text-white">
                {isArabic ? 'إدارة علاقات العملاء والبيانات (CRM)' : 'Smart CRM & Client Governance'}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              {isArabic 
                ? 'لوحة تحكم كبار العملاء ومسارات التحويل المدعومة بالأتمتة وروبوتات واتساب الذكية.'
                : 'High-net-worth client pipeline powered by automated WhatsApp routing.'}
            </p>
          </div>

          <button
            id="crm-add-client-btn"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#d4af35] to-[#b8860b] hover:opacity-95 active:scale-95 transition-all shadow-md shadow-[#d4af35]/20 self-start md:self-auto"
          >
            <UserPlus className="w-4 h-4 text-black" />
            <span>{isArabic ? 'إضافة عميل جديد +' : 'Add New Client +'}</span>
          </button>
        </div>

        {/* Pipeline Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-xl bg-[#131313] border border-[#2b2212] flex items-center justify-between">
            <div>
              <div className="text-[11px] sm:text-xs text-slate-400">{isArabic ? 'عملاء محتملون' : 'Leads'}</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-1">28</div>
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded bg-[#1f190e] text-[#f1d57f] border border-[#3d3013]">
              +14%
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#131313] border border-[#2b2212] flex items-center justify-between">
            <div>
              <div className="text-[11px] sm:text-xs text-slate-400">{isArabic ? 'مفاوضات جارية' : 'In Negotiation'}</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-1">16</div>
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded bg-[#1f190e] text-[#f1d57f] border border-[#3d3013]">
              نشط
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#131313] border border-[#2b2212] flex items-center justify-between">
            <div>
              <div className="text-[11px] sm:text-xs text-slate-400">{isArabic ? 'عقود VIP معتمدة' : 'VIP Contracts'}</div>
              <div className="text-xl sm:text-2xl font-black text-[#f1d57f] mt-1">54</div>
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              98% رضاء
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#131313] border border-[#2b2212] flex items-center justify-between">
            <div>
              <div className="text-[11px] sm:text-xs text-slate-400">{isArabic ? 'قيمة الصفقات النشطة' : 'Pipeline Value'}</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-1">5.2M <span className="text-xs font-normal text-[#d4af35]">ر.س</span></div>
            </div>
            <TrendingUp className="w-4 h-4 text-[#d4af35]" />
          </div>
        </div>

        {/* Main Section: Clients Table + AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Table Area (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl bg-[#131313] border border-[#2b2212] flex flex-col sm:flex-row gap-3 items-center justify-between">
              
              {/* Search Box */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute top-2.5 right-3 pointer-events-none" />
                <input
                  type="text"
                  id="crm-client-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isArabic ? 'ابحث بالاسم، الكود، أو الشركة...' : 'Search by name, code, company...'}
                  className="w-full bg-[#0d0d0d] border border-[#2f2514] focus:border-[#d4af35] rounded-xl py-2 px-9 text-xs text-white placeholder-slate-500 outline-none"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as any)}
                  className="bg-[#0d0d0d] border border-[#2f2514] rounded-xl py-2 px-3 text-xs text-slate-300 outline-none cursor-pointer"
                >
                  <option value="all">كل الفئات</option>
                  <option value="VIP">VIP فقط</option>
                  <option value="Regular">عادي</option>
                </select>

                <select
                  value={syncFilter}
                  onChange={(e) => setSyncFilter(e.target.value as any)}
                  className="bg-[#0d0d0d] border border-[#2f2514] rounded-xl py-2 px-3 text-xs text-slate-300 outline-none cursor-pointer"
                >
                  <option value="all">كل المزامنات</option>
                  <option value="synced">متصل بواتساب</option>
                  <option value="offline">غير متزامن</option>
                </select>
              </div>

            </div>

            {/* Clients Table Card */}
            <div className="rounded-2xl bg-[#121212] border border-[#2b2212] overflow-hidden shadow-xl">
              <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                <table className="w-full min-w-[550px] text-start text-xs text-slate-300">
                  <thead className="text-[11px] uppercase text-slate-400 bg-[#161616] border-b border-[#292012]">
                    <tr>
                      <th className="py-3.5 px-4 text-start">{isArabic ? 'العميل والكود' : 'Client & Code'}</th>
                      <th className="py-3.5 px-4 text-start">{isArabic ? 'التصنيف' : 'Category'}</th>
                      <th className="py-3.5 px-4 text-start">{isArabic ? 'مزامنة واتساب' : 'WhatsApp'}</th>
                      <th className="py-3.5 px-4 text-start">{isArabic ? 'الموظف المسؤول' : 'Agent'}</th>
                      <th className="py-3.5 px-4 text-start">{isArabic ? 'الإجراءات' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e190f]">
                    {filteredClients.map((client) => (
                      <tr key={client.id} className="hover:bg-[#181818] transition-colors">
                        
                        {/* Name & Code */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3a2e12] to-[#6e551c] flex items-center justify-center font-bold text-xs text-[#f1d57f] border border-[#d4af35]/40 shrink-0">
                              {client.initials}
                            </div>
                            <div>
                              <div className="font-bold text-white text-xs flex items-center gap-1.5">
                                <span>{client.name}</span>
                                {client.status === 'verified' && (
                                  <span title="Verified"><CheckCircle className="w-3 h-3 text-[#d4af35]" /></span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                {client.code} {client.company && `• ${client.company}`}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4">
                          {client.category === 'VIP' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#29200f] text-[#f1d57f] border border-[#d4af35]/50 shadow-sm shadow-[#d4af35]/10">
                              <Sparkles className="w-2.5 h-2.5 text-[#d4af35]" />
                              <span>VIP</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#1d1d1d] text-slate-300 border border-slate-700">
                              Regular
                            </span>
                          )}
                        </td>

                        {/* Sync Status */}
                        <td className="py-4 px-4">
                          {client.syncStatus === 'synced' ? (
                            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                              <span>متزامن</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                              <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                              <span>غير متصل</span>
                            </div>
                          )}
                        </td>

                        {/* Agent */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={client.assignedAgent.avatar}
                              alt={client.assignedAgent.name}
                              className="w-6 h-6 rounded-full object-cover border border-[#4a3b18]"
                            />
                            <span className="text-xs text-slate-200">{client.assignedAgent.name}</span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOpenWhatsapp(client)}
                              className="p-1.5 rounded-lg bg-[#1a170f] hover:bg-[#25D366]/20 border border-[#3b3017] hover:border-[#25D366] text-[#25D366] transition-all"
                              title={isArabic ? 'فتح محادثة واتساب' : 'Open WhatsApp'}
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleOpenWhatsapp(client)}
                              className="p-1.5 rounded-lg bg-[#1a170f] hover:bg-[#202020] border border-[#3b3017] text-slate-300 hover:text-white transition-all"
                              title={isArabic ? 'اتصال صوتي' : 'Call'}
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* AI Insights & WhatsApp Activity Stream (1 Col) */}
          <div className="space-y-6">

            {/* AI Insights Box */}
            <div className="p-5 rounded-2xl bg-[#121212] border border-[#2d2212] shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-gradient-to-tr from-[#d4af35] to-[#8c670b] text-black">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {isArabic ? 'توصيات الذكاء الاصطناعي' : 'AI Strategic Insights'}
                    </h3>
                    <div className="text-[10px] text-[#f1d57f]">تحديث لحظي</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {AI_INSIGHTS.map((insight) => (
                  <div 
                    key={insight.id}
                    className="p-3.5 rounded-xl bg-[#17140c] border border-[#332813] hover:border-[#d4af35]/40 transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className={`font-bold px-1.5 py-0.2 rounded ${
                        insight.type === 'urgent' 
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                          : 'bg-[#d4af35]/20 text-[#f1d57f] border border-[#d4af35]/30'
                      }`}>
                        {insight.type === 'urgent' ? 'أولوية قصوى' : 'توصية استباقية'}
                      </span>
                      <span className="text-slate-500">{insight.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {insight.message}
                    </p>
                    {insight.actionable && (
                      <button 
                        onClick={() => {
                          setActiveWhatsappToast('تم تنفيذ التوصية الذكية وإرسال الإشعارات المباشرة.');
                          setTimeout(() => setActiveWhatsappToast(null), 3000);
                        }}
                        className="text-[11px] font-bold text-[#d4af35] hover:text-[#f3dc94] flex items-center gap-1 transition-colors"
                      >
                        <span>تطبيق الإجراء الآن</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Live WhatsApp Activity Feed */}
            <div className="p-5 rounded-2xl bg-[#121212] border border-[#2d2212] shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">
                  {isArabic ? 'آخر تفاعلات واتساب' : 'Recent WhatsApp Events'}
                </h3>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>مباشر</span>
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  { name: 'جوليان بلاكوود', action: 'استلم عرض السعر الآلي', time: 'منذ دقيقتين' },
                  { name: 'صوفيا تشن', action: 'تم تأكيد تحويل الدفعة المقدمة', time: 'منذ ١٥ دقيقة' },
                  { name: 'حمدان الفهد', action: 'استفسار عن تجديد التراخيص', time: 'منذ ٤٠ دقيقة' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#161616] border border-[#2b2212] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-200">{item.name}</div>
                      <div className="text-[11px] text-slate-400">{item.action}</div>
                    </div>
                    <span className="text-[10px] text-slate-500">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#141414] border border-[#3e3215] rounded-2xl p-6 shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-[#2a2212] pb-3">
              <h3 className="text-base font-bold text-white">
                {isArabic ? 'إضافة عميل جديد للمنظومة' : 'Add New Client'}
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">اسم العميل / الشركة *</label>
                <input
                  type="text"
                  required
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="مثال: عبد الله السعدي"
                  className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">اسم المؤسسة أو النشاط</label>
                <input
                  type="text"
                  value={newClientCompany}
                  onChange={(e) => setNewClientCompany(e.target.value)}
                  placeholder="مثال: مجموعة السعدي للاستثمار"
                  className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">رقم واتساب المعتمد</label>
                <input
                  type="text"
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
                  placeholder="+966 50 123 4567"
                  className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">الفئة والتصنيف</label>
                <select
                  value={newClientCategory}
                  onChange={(e) => setNewClientCategory(e.target.value as any)}
                  className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-2.5 text-white outline-none"
                >
                  <option value="VIP">عميل كبار الشخصيات VIP</option>
                  <option value="Regular">عميل اعتيادي Regular</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#1f1f1f] text-slate-300 hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-black bg-[#d4af35] hover:bg-[#e4c25f] transition-colors"
                >
                  حفظ وتفعيل المزامنة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
