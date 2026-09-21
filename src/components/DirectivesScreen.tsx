import React, { useState } from 'react';
import { ExecutiveDirective, User, LanguageItem } from '../types';
import { 
  Mail, 
  Send, 
  Crown, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  UserMinus, 
  Award, 
  UserPlus, 
  ShieldCheck,
  Check,
  Filter
} from 'lucide-react';
import { getTranslation } from '../data/translations';

interface DirectivesScreenProps {
  directives: ExecutiveDirective[];
  onAcknowledgeDirective: (directiveId: string) => void;
  onBroadcastDirective: (directive: ExecutiveDirective) => void;
  currentUser: User | null;
  currentLanguage: LanguageItem;
}

export const DirectivesScreen: React.FC<DirectivesScreenProps> = ({
  directives,
  onAcknowledgeDirective,
  onBroadcastDirective,
  currentUser,
  currentLanguage
}) => {
  const isArabic = currentLanguage.dir === 'rtl';
  const t = getTranslation(currentLanguage.code);
  const isCEO = currentUser?.roleType === 'CEO';
  const isTL = currentUser?.roleType === 'TEAM_LEADER';

  const [activeFilter, setActiveFilter] = useState<'ALL' | 'PROMOTION' | 'DISMISSAL' | 'NEW_HIRE' | 'REWARD'>('ALL');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newPriority, setNewPriority] = useState<'URGENT' | 'STANDARD' | 'CONFIDENTIAL'>('STANDARD');

  const filteredDirectives = directives.filter((d) => {
    if (activeFilter === 'ALL') return true;
    return d.type === activeFilter;
  });

  const handleCreateDirective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newMessage.trim()) return;

    const directive: ExecutiveDirective = {
      id: `dir_${Date.now()}`,
      type: 'ANNOUNCEMENT',
      title: newTitle.trim(),
      titleAr: newTitle.trim(),
      message: newMessage.trim(),
      messageAr: newMessage.trim(),
      issuedBy: currentUser?.name || 'ألكسندر ثورن (الرئيس التنفيذي - CEO)',
      issuedAt: new Date().toISOString(),
      acknowledgedByTL: false,
      priority: newPriority
    };

    onBroadcastDirective(directive);
    setNewTitle('');
    setNewMessage('');
    setIsComposeOpen(false);
  };

  return (
    <div className="w-full bg-[#0b0b0e] text-slate-100 min-h-screen py-4 sm:py-8 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">

        {/* Top Header Card with 3D Depth */}
        <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-[#17150e] via-[#211b10] to-[#17150e] border border-[#d4af35]/40 shadow-[0_15px_35px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(212,175,53,0.3)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#f5d77f] via-[#d4af35] to-[#806115] p-[2px] shadow-[0_6px_16px_rgba(212,175,53,0.35)] flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#12110b] rounded-[14px] flex items-center justify-center shadow-inner">
                <Mail className="w-5 h-5 sm:w-7 sm:h-7 text-[#f1d57f]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-2xl font-black text-white">
                  {isArabic ? 'صندوق التوجيهات والقرارات التنفيذية' : 'Executive Directives & Decree Inbox'}
                </h1>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#d4af35]/20 text-[#f1d57f] border border-[#d4af35]/40">
                  {directives.length} Directives
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                {isArabic 
                  ? 'قناة المراسلات الإدارية الرسمية. تصدر القرارات من مكتب الرئيس التنفيذي وتصل فورياً لصندوق بريد قادة الفرق (Team Leaders) لتأكيد الاستلام والتنفيذ الميداني.'
                  : 'Sovereign internal memo dispatch. Orders issued by the CEO are instantly transmitted to Team Leader inboxes for electronic acknowledgment and execution.'}
              </p>
            </div>
          </div>

          {/* CEO Action: Compose Directive */}
          {isCEO && (
            <button
              onClick={() => setIsComposeOpen(!isComposeOpen)}
              className="px-4 py-2 sm:py-2.5 rounded-2xl text-xs font-black text-black bg-gradient-to-b from-[#f5d77f] via-[#d4af35] to-[#997415] shadow-[0_6px_14px_rgba(212,175,53,0.35),inset_0_1px_0_rgba(255,255,255,0.7)] hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 self-start md:self-auto"
            >
              <Crown className="w-4 h-4" />
              <span>{isArabic ? 'إصدار تعميم إداري جديد' : 'Broadcast CEO Decree'}</span>
            </button>
          )}
        </div>

        {/* CEO Compose Box */}
        {isCEO && isComposeOpen && (
          <form onSubmit={handleCreateDirective} className="p-5 rounded-3xl bg-[#14120e] border border-[#d4af35]/50 shadow-xl space-y-4 animate-slideDown">
            <div className="flex items-center justify-between pb-2 border-b border-[#2d2311]">
              <div className="flex items-center gap-2 text-xs font-black text-[#f1d57f]">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>{isArabic ? 'تحرير تعميم رئاسي جديد لكافة قادة الفرق' : 'Draft New Presidential Directive for Team Leaders'}</span>
              </div>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as any)}
                className="bg-[#1f1a10] border border-[#3d3016] text-xs text-slate-200 rounded-xl px-2.5 py-1 outline-none"
              >
                <option value="STANDARD">أولوية عادية (Standard)</option>
                <option value="URGENT">عاجل وفوري (Urgent)</option>
                <option value="CONFIDENTIAL">سري للغاية (Confidential)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">
                {isArabic ? 'عنوان التوجيه / القرار' : 'Directive Subject'}
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={isArabic ? 'مثال: تعميم اعتماد خطة التحول الرقمي للربع الأول' : 'e.g. Q1 Digital Infrastructure Expansion Decree'}
                className="w-full bg-[#0b0a08] border border-[#3b3017] focus:border-[#d4af35] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">
                {isArabic ? 'نص القرار والتوجيه الإداري الملزم' : 'Directive Text & Direct Instructions'}
              </label>
              <textarea
                rows={3}
                required
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={isArabic ? 'اكتب تفاصيل التوجيه الإداري هنا...' : 'Detail instructions for division leaders...'}
                className="w-full bg-[#0b0a08] border border-[#3b3017] focus:border-[#d4af35] rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none resize-none"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsComposeOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-[#1d1810] text-slate-400 text-xs font-bold hover:text-white"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 rounded-xl bg-[#d4af35] text-black text-xs font-black hover:bg-[#e4c25f] flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isArabic ? 'إرسال وتعميم فورياً' : 'Dispatch Now'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-xs text-slate-400 font-bold flex items-center gap-1 shrink-0 me-1">
            <Filter className="w-3.5 h-3.5 text-[#d4af35]" />
            <span>{isArabic ? 'تصفية النوع:' : 'Filter:'}</span>
          </span>
          {[
            { id: 'ALL', label: isArabic ? 'كافة التوجيهات' : 'All Directives' },
            { id: 'PROMOTION', label: isArabic ? 'ترقيات وظيفية' : 'Promotions' },
            { id: 'DISMISSAL', label: isArabic ? 'إنهاء خدمة / فصل' : 'Dismissals' },
            { id: 'NEW_HIRE', label: isArabic ? 'تعيينات جديدة' : 'New Hires' },
            { id: 'REWARD', label: isArabic ? 'مكافآت تميز' : 'Rewards' },
          ].map((flt) => (
            <button
              key={flt.id}
              onClick={() => setActiveFilter(flt.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeFilter === flt.id
                  ? 'bg-[#d4af35] text-black shadow-md shadow-[#d4af35]/25 font-black'
                  : 'bg-[#15130d] hover:bg-[#221c11] text-slate-400 border border-[#2d2412]'
              }`}
            >
              {flt.label}
            </button>
          ))}
        </div>

        {/* Directives Feed Cards */}
        <div className="space-y-4">
          {filteredDirectives.length === 0 ? (
            <div className="p-12 rounded-3xl bg-[#12110e] border border-[#261f10] text-center text-slate-500 text-xs">
              {isArabic ? 'لا توجد توجيهات تطابق الفلتر المحدد.' : 'No directives matching selected category.'}
            </div>
          ) : (
            filteredDirectives.map((dir) => {
              const isAcknowledged = dir.acknowledgedByTL;
              const dateStr = new Date(dir.issuedAt).toLocaleString(isArabic ? 'ar-SA' : 'en-US', {
                dateStyle: 'medium',
                timeStyle: 'short'
              });

              return (
                <div
                  key={dir.id}
                  className={`p-5 rounded-3xl border transition-all relative overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.6)] ${
                    !isAcknowledged && isTL
                      ? 'bg-gradient-to-r from-[#1c160b] via-[#241c0e] to-[#1c160b] border-[#d4af35] shadow-[0_10px_30px_rgba(212,175,53,0.15)]'
                      : 'bg-[#121110] border-[#2b2212] hover:border-[#423517]'
                  }`}
                >
                  {/* Decorative Side Bevel */}
                  <div className={`absolute top-0 bottom-0 ${isArabic ? 'right-0' : 'left-0'} w-1.5 ${
                    dir.type === 'DISMISSAL'
                      ? 'bg-red-500'
                      : dir.type === 'PROMOTION'
                      ? 'bg-emerald-400'
                      : dir.type === 'REWARD'
                      ? 'bg-amber-400'
                      : 'bg-[#d4af35]'
                  }`}></div>

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {/* 3D Icon Badge */}
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                        dir.type === 'DISMISSAL'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : dir.type === 'PROMOTION'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : dir.type === 'NEW_HIRE'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-amber-500/20 text-[#f1d57f] border border-amber-500/30'
                      }`}>
                        {dir.type === 'DISMISSAL' && <UserMinus className="w-5 h-5" />}
                        {dir.type === 'PROMOTION' && <Sparkles className="w-5 h-5" />}
                        {dir.type === 'NEW_HIRE' && <UserPlus className="w-5 h-5" />}
                        {dir.type === 'REWARD' && <Award className="w-5 h-5" />}
                        {dir.type === 'ANNOUNCEMENT' && <Mail className="w-5 h-5" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                            dir.type === 'DISMISSAL'
                              ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                              : dir.type === 'PROMOTION'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-[#d4af35]/20 text-[#f1d57f] border border-[#d4af35]/40'
                          }`}>
                            {dir.type}
                          </span>

                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#1e1a12] text-slate-400 border border-[#342a15] font-mono">
                            {dir.priority}
                          </span>

                          {!isAcknowledged && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-red-600 text-white animate-pulse">
                              {isArabic ? 'غير مستلم بعد' : 'UNREAD / PENDING TL'}
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm font-bold text-white leading-snug">
                          {isArabic ? dir.titleAr : dir.title}
                        </h3>

                        <div className="text-[11px] text-[#a88225] flex items-center gap-2">
                          <span>{dir.issuedBy}</span>
                          <span>•</span>
                          <span className="text-slate-400 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span>{dateStr}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Acknowledgment Button / Status */}
                    <div className="shrink-0 pt-2 sm:pt-0">
                      {isAcknowledged ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>{isArabic ? 'تم تأكيد الاستلام من قائد الفريق' : 'Acknowledged by Team Leader'}</span>
                        </div>
                      ) : isTL ? (
                        <button
                          onClick={() => onAcknowledgeDirective(dir.id)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-b from-[#f5d77f] to-[#b8860b] text-black font-black text-xs shadow-md shadow-[#d4af35]/30 hover:brightness-105 active:translate-y-0.5 transition-all flex items-center gap-1.5"
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>{t.acknowledgeDirective}</span>
                        </button>
                      ) : (
                        <div className="text-[11px] text-amber-400/80 bg-[#1e190e] px-2.5 py-1 rounded-lg border border-[#382d14] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{isArabic ? 'في انتظار استلام قائد الفريق' : 'Awaiting TL Sign-off'}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Directive Message Body */}
                  <div className="mt-3 p-3.5 rounded-2xl bg-[#0c0b08] border border-[#241d0e] text-xs text-slate-300 leading-relaxed font-sans">
                    {isArabic ? dir.messageAr : dir.message}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
