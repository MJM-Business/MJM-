import React, { useState } from 'react';
import { BusinessUnit, LanguageItem } from '../types';
import { CONNECTED_BUSINESSES, INITIAL_TRANSACTIONS } from '../data/mockData';
import { 
  Building2, 
  Building, 
  Truck, 
  Cpu, 
  Landmark, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  ShieldCheck, 
  Globe, 
  Activity, 
  Coins, 
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';
import { getTranslation } from '../data/translations';

interface ConnectedBusinessesScreenProps {
  activeBusiness: BusinessUnit;
  setActiveBusiness: (biz: BusinessUnit) => void;
  currentLanguage: LanguageItem;
}

export const ConnectedBusinessesScreen: React.FC<ConnectedBusinessesScreenProps> = ({
  activeBusiness,
  setActiveBusiness,
  currentLanguage
}) => {
  const isArabic = currentLanguage.dir === 'rtl';
  const t = getTranslation(currentLanguage.code);
  const [selectedSubId, setSelectedSubId] = useState<string>('biz_all');

  const businessCards = CONNECTED_BUSINESSES.filter(b => b.id !== 'biz_all');

  const totalRev = businessCards.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalStaff = businessCards.reduce((acc, curr) => acc + curr.staffCount, 0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building': return Building;
      case 'Truck': return Truck;
      case 'Cpu': return Cpu;
      case 'Landmark': return Landmark;
      default: return Building2;
    }
  };

  return (
    <div className="w-full bg-[#0b0b0e] text-slate-100 min-h-screen py-4 sm:py-8 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">

        {/* 3D Header Section */}
        <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-[#17140d] via-[#211a0f] to-[#17140d] border border-[#d4af35]/40 shadow-[0_20px_45px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(212,175,53,0.3)] flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#f5d77f] via-[#d4af35] to-[#785b19] p-[2px] shadow-lg shadow-[#d4af35]/30 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#13110a] rounded-[14px] flex items-center justify-center">
                <Layers className="w-5 h-5 sm:w-7 sm:h-7 text-[#f1d57f]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-2xl font-black text-white">
                  {isArabic ? 'منظومة قطاعات الأعمال المتصلة' : 'Connected Business Ecosystem Hub'}
                </h1>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#d4af35]/20 text-[#f1d57f] border border-[#d4af35]/40">
                  5 Sovereign Sectors
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                {isArabic 
                  ? 'بنية ERP متقدمة تربط كافة استثمارات وشركات مجموعة MJM (العقارات، اللوجستيات، الذكاء الاصطناعي، وإدارة الأصول) في شبكة رقمية مركزية واحدة.' 
                  : 'Multi-subsidiary enterprise matrix interconnecting Real Estate, Air Logistics, AI Infrastructure, and Sovereign Wealth into unified ERP orchestration.'}
              </p>
            </div>
          </div>

          {/* Consolidated Group KPIs */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-[#14120c] border border-[#3b3014] text-start min-w-[110px] sm:min-w-[130px]">
              <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-semibold">{t.totalRevenue}</div>
              <div className="text-xs sm:text-base font-black text-[#f1d57f] font-mono">
                {(totalRev / 1000000).toFixed(1)}M SAR
              </div>
            </div>

            <div className="p-2.5 sm:p-3 rounded-2xl bg-[#14120c] border border-[#3b3014] text-start min-w-[100px] sm:min-w-[110px]">
              <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-semibold">{t.totalStaff}</div>
              <div className="text-xs sm:text-base font-black text-white font-mono flex items-center gap-1">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af35]" />
                <span>{totalStaff} Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Connected Businesses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {businessCards.map((biz) => {
            const Icon = getIcon(biz.iconName);
            const isSelected = activeBusiness.id === biz.id;

            return (
              <div
                key={biz.id}
                onClick={() => setActiveBusiness(biz)}
                className={`p-4 sm:p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden group shadow-[0_12px_30px_rgba(0,0,0,0.6)] ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#251e0e] via-[#1b170c] to-[#12100a] border-[#d4af35] shadow-[0_12px_35px_rgba(212,175,53,0.2)]'
                    : 'bg-[#121115] hover:bg-[#19171d] border-[#25211c] hover:border-[#4d3d19]'
                }`}
              >
                {/* 3D Top Accent */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#f5d77f] to-[#997415] text-black shadow-[#d4af35]/30'
                        : 'bg-[#1c1913] border border-[#3b3017] text-[#f1d57f]'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                        {biz.code}
                      </div>
                      <h3 className="text-base font-extrabold text-white group-hover:text-[#f1d57f] transition-colors">
                        {isArabic ? biz.nameAr : biz.name}
                      </h3>
                      <div className="text-[11px] text-[#9b7617]">
                        {isArabic ? `المدير التنفيذي: ${biz.headOfDivision}` : `Division Head: ${biz.headOfDivision}`}
                      </div>
                    </div>
                  </div>

                  {isSelected ? (
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-[#d4af35] text-black shadow-md shadow-[#d4af35]/40 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{isArabic ? 'القطاع النشط' : 'Active'}</span>
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-1 rounded-lg bg-[#181611] text-slate-400 border border-[#332914] group-hover:text-white">
                      {isArabic ? 'تبديل العرض' : 'Switch'}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-xs text-slate-300 leading-relaxed font-sans">
                  {isArabic ? biz.descriptionAr : biz.description}
                </p>

                {/* Metrics Row */}
                <div className="mt-5 pt-4 border-t border-[#261f10] grid grid-cols-2 gap-3">
                  <div className="p-2.5 rounded-xl bg-[#0d0c09] border border-[#231b0e]">
                    <div className="text-[10px] text-slate-400 font-semibold">{t.salary} / {isArabic ? 'الإيراد' : 'Revenue'}</div>
                    <div className="text-xs font-black text-[#f1d57f] font-mono mt-0.5">
                      {biz.revenue.toLocaleString()} SAR
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#0d0c09] border border-[#231b0e]">
                    <div className="text-[10px] text-slate-400 font-semibold">{t.totalStaff}</div>
                    <div className="text-xs font-black text-white font-mono mt-0.5">
                      {biz.staffCount} {isArabic ? 'موظف معتمد' : 'Personnel'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real-Time Cross-Subsidiary Financial Clearances */}
        <div className="p-6 rounded-3xl bg-[#121113] border border-[#2d2414] shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Coins className="w-5 h-5 text-[#d4af35]" />
              <h2 className="text-sm sm:text-base font-bold text-white">
                {isArabic ? 'المقاصة المالية وحركة المعاملات بين الشركات التابعة' : 'Inter-Company Sovereign Clearing & Settlement Feed'}
              </h2>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              Live Encrypted Ledger
            </span>
          </div>

          <div className="divide-y divide-[#221c10]">
            {INITIAL_TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#1b1710] border border-[#3b2f16] flex items-center justify-center text-[#f1d57f]">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{tx.operation}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{tx.department} • {tx.date}</div>
                  </div>
                </div>

                <div className="text-end">
                  <div className="font-mono font-black text-[#f1d57f]">
                    + {tx.amount.toLocaleString()} SAR
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                    CLEARED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
