import React, { useState } from 'react';
import { Language } from '../types';
import { Plus, X, DollarSign, Users, Sparkles, CheckCircle2 } from 'lucide-react';

interface NewEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSuccess: (msg: string) => void;
}

export const NewEntryModal: React.FC<NewEntryModalProps> = ({
  isOpen,
  onClose,
  language,
  onSuccess
}) => {
  if (!isOpen) return null;

  const isArabic = language === 'ar';
  const [entryType, setEntryType] = useState<'financial' | 'client' | 'task'>('financial');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [department, setDepartment] = useState('العمليات واللوجستيات');
  const [priority, setPriority] = useState('عالية');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSuccess(
      isArabic
        ? `تم تسجيل الإجراء بنجاح: "${title}" وإرسال إشعار فوري لمدراء الأقسام عبر واتساب!`
        : `Action registered: "${title}" and broadcast to managers via WhatsApp!`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-[#141414] border border-[#3e3215] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#292112] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#d4af35]/20 text-[#d4af35] border border-[#d4af35]/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isArabic ? 'إجراء تشغيلي جديد - منظومة MJM' : 'New Operational Action'}
              </h3>
              <p className="text-xs text-slate-400">
                {isArabic ? 'إدخال فوري للعمليات المالية والعملاء والمهام الفائقة' : 'Instant logging for financials, VIP clients, and tasks'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#202020] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Type Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 bg-[#0c0c0c] p-1.5 rounded-2xl border border-[#261f12] text-xs font-semibold">
          <button
            type="button"
            onClick={() => setEntryType('financial')}
            className={`py-2 px-3 rounded-xl transition-all ${
              entryType === 'financial'
                ? 'bg-[#d4af35] text-black font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isArabic ? 'معاملة مالية' : 'Financial'}
          </button>
          <button
            type="button"
            onClick={() => setEntryType('client')}
            className={`py-2 px-3 rounded-xl transition-all ${
              entryType === 'client'
                ? 'bg-[#d4af35] text-black font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isArabic ? 'تواصل VIP' : 'VIP Contact'}
          </button>
          <button
            type="button"
            onClick={() => setEntryType('task')}
            className={`py-2 px-3 rounded-xl transition-all ${
              entryType === 'task'
                ? 'bg-[#d4af35] text-black font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isArabic ? 'أمر تنفيذي' : 'Task'}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {isArabic ? 'عنوان الإجراء أو البيان *' : 'Description / Title *'}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={isArabic ? 'مثال: سداد فاتورة توريد تراخيص التقنية' : 'e.g., International freight payment'}
              className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-3 text-white outline-none"
            />
          </div>

          {entryType === 'financial' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {isArabic ? 'المبلغ الإجمالي (ر.س)' : 'Amount (SAR)'}
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-3 text-white outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {isArabic ? 'القسم المسؤول' : 'Department'}
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-[#0b0b0b] border border-[#302615] focus:border-[#d4af35] rounded-xl p-3 text-white outline-none"
                >
                  <option value="العمليات واللوجستيات">العمليات واللوجستيات</option>
                  <option value="التقنية والذكاء الاصطناعي">التقنية والذكاء الاصطناعي</option>
                  <option value="المبيعات وعلاقات العملاء">المبيعات وعلاقات العملاء</option>
                  <option value="الموارد البشرية">الموارد البشرية</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {isArabic ? 'درجة الأولوية والتصنيف' : 'Priority Level'}
            </label>
            <div className="flex gap-2">
              {['عادية', 'عالية', 'فورية'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                    priority === p
                      ? 'bg-[#2b210e] border-[#d4af35] text-[#f1d57f]'
                      : 'bg-[#161616] border-[#292012] text-slate-400'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#261f12]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#1d1d1d] text-slate-300 hover:text-white"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-black bg-gradient-to-r from-[#d4af35] to-[#b8860b] hover:opacity-95 shadow-md shadow-[#d4af35]/20"
            >
              {isArabic ? 'اعتماد وإرسال التنبيه' : 'Confirm & Send'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
