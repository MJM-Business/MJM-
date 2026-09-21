import { 
  Client, 
  Employee, 
  FinancialTransaction, 
  BankAccount, 
  AIInsight,
  BusinessUnit,
  ExecutiveDirective,
  User
} from '../types';

export const CONNECTED_BUSINESSES: BusinessUnit[] = [
  {
    id: 'biz_all',
    name: 'MJM Consolidated Group',
    nameAr: 'مجموعة MJM القابضة الموحدة',
    code: 'MJM-HOLDING',
    iconName: 'Building2',
    revenue: 48950000,
    staffCount: 184,
    description: 'Consolidated executive operations across all five sovereign business sectors.',
    descriptionAr: 'الإدارة التنفيذية الموحدة المشرفة على كافة القطاعات التشغيلية والسيادية.',
    headOfDivision: 'ألكسندر ثورن (الرئيس التنفيذي)'
  },
  {
    id: 'biz_realestate',
    name: 'MJM Luxury Real Estate & Towers',
    nameAr: 'إم جي إم للتطوير العقاري والأبراج',
    code: 'MJM-REALTY',
    iconName: 'Building',
    revenue: 18450000,
    staffCount: 52,
    description: 'High-end architectural development, smart commercial towers, and luxury hospitality compounds.',
    descriptionAr: 'تطوير الأبراج الإدارية الذكية، المجمعات السكنية الفاخرة، والاستثمار العقاري الاستراتيجي.',
    headOfDivision: 'م. راشد آل ناصر'
  },
  {
    id: 'biz_logistics',
    name: 'MJM Global Logistics & Air Cargo',
    nameAr: 'إم جي إم للخدمات اللوجستية والشحن الدولي',
    code: 'MJM-CARGO',
    iconName: 'Truck',
    revenue: 12800000,
    staffCount: 46,
    description: 'Cross-border express supply chains, temperature-controlled cargo, and automated fulfillment hubs.',
    descriptionAr: 'سلاسل الإمداد الدولية المبردة، الشحن الجوي والبحري السريع، ومستودعات التوزيع الذكية.',
    headOfDivision: 'د. فيصل المنصور'
  },
  {
    id: 'biz_tech',
    name: 'MJM AI Solutions & Cyber Systems',
    nameAr: 'إم جي إم للحلول التقنية والذكاء الاصطناعي',
    code: 'MJM-CYBER',
    iconName: 'Cpu',
    revenue: 9650000,
    staffCount: 38,
    description: 'Enterprise ERP platforms, proprietary algorithmic trading, neural agents, and sovereign cloud infrastructure.',
    descriptionAr: 'أنظمة ERP للمؤسسات الكبرى، وكلاء الذكاء الاصطناعي، وأمن البيانات والسيادة الرقمية.',
    headOfDivision: 'م. سارة العتيبي'
  },
  {
    id: 'biz_finance',
    name: 'MJM Sovereign Capital & Asset Mgmt',
    nameAr: 'إم جي إم للاستثمارات المالية وإدارة الأصول',
    code: 'MJM-CAPITAL',
    iconName: 'Landmark',
    revenue: 8050000,
    staffCount: 48,
    description: 'Private equity, venture syndication, trade finance credit lines, and treasury liquidity solutions.',
    descriptionAr: 'إدارة الصناديق الاستثمارية، خطابات الاعتماد المصرفي، وتوزيع السيولة المؤسسية.',
    headOfDivision: 'أ. جاسم الشمري'
  }
];

export const PRESET_USERS: User[] = [
  {
    id: 'user_ceo_01',
    email: 'businessmjm76@gmail.com',
    name: 'ألكسندر ثورن (MJM Executive)',
    role: 'الرئيس التنفيذي (CEO)',
    roleType: 'CEO',
    company: 'مجموعة MJM القابضة',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiNvii-7AQhWSAnbRIlkLLxJii5jXhhMWK3PGH66-XP__SbdNb4BYI0qqDE4AwqB49HBJYIEUF3ZGsXxl98bo2KVVInc3FscHhTacgWWvkISJ0mWe-IeMxdsBEt16tEtaX-QOCC3krs-1Vb1PpcNUTLei-fWY85HI61WKFgPARem5-FDid4nVAunVLHCUIhKlrDk8ZGULFIbaO7TZjAUpEr-oWm77r-8aGi1eyXpz1494srSZAZCyUzZsD-w0-3v1nKdCjjShDhQ',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'user_tl_01',
    email: 'leader@mjmholding.com',
    name: 'م. فيصل بن خالد (Team Leader)',
    role: 'قائد الفريق ورئيس العمليات',
    roleType: 'TEAM_LEADER',
    company: 'إم جي إم للحلول التقنية والعمليات',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGDyOBf4HA3kNBqRksy8fs_0iKOUgV2XyYvA7DrgZ8TCwvHkAXcfEvPZswI1LSxg2_6CF1pscK49ccTVhLkvyqUhh4VJHvR1nAPjrDk-bqNJPSRMF1ZdXTRgepDq-uI8jax5pISMVuzj5EAvnlaNxNHCKtC_8qndWaaxaArxrhKeOWi-XY8qGUPThWUu0hkJuDyo7kEmo1fw78GJO64tA3zwLcbxt-aE0NBwXE9sIU8KM6stMUTlD2nTieQAcZisaEl8fydjsbMg',
    createdAt: '2024-03-15T00:00:00.000Z',
    businessUnitId: 'biz_tech'
  },
  {
    id: 'user_staff_01',
    email: 'staff@mjmholding.com',
    name: 'نورة سليمان (Staff Member)',
    role: 'مصمم واجهات وتطوير تجربة المستخدم',
    roleType: 'EMPLOYEE',
    company: 'إم جي إم للحلول التقنية والابتكار',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEXsWLqabQDdSn6DQlxutpxzHWSQhOqrODXgE5nYJXsEiuFB10_BgsLo40ezI9-ujC-zp1bOogWSmfx5z9UHRh25H19avKQc6ddRXY3ERUozCk1lBXfNH-r8X0Pm75SQ7gVNVxFwAAjvHZi0GCjmPTGiYRU0QTMN4VnhSKmoNP-g5JF6SoM8nfYu_jtaHyVrC7t984UKme7EFPwAUtJDPN_eE4CAwr663-2sWvyr45EkJ6r9xgZpeCxV0DvlJs7PJQ4b0PaUX2NA',
    createdAt: '2024-06-10T00:00:00.000Z',
    businessUnitId: 'biz_tech'
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    name: 'سارة العتيبي',
    phone: '+966 50 123 4567',
    email: 'sara.otaibi@mjmholding.com',
    role: 'محلل بيانات أول ورئيس فريق الذكاء الاصطناعي',
    rating: 'A',
    status: 'active',
    department: 'التطوير التقني والذكاء الاصطناعي',
    performanceScore: 97.4,
    businessUnitId: 'biz_tech',
    salary: 28500,
    dateJoined: '2023-02-15',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTqHzecR_WoQ4-hUk7kIPovgxQAgR2_OVYnT4UxRmCvfqJkGrgI64mSSP2M0k_9AdrM1Iv7PfmdBoXzOpWy8RHV3VX8LNsqirEccfbUvnex_OtIMfL_2C3NIaBsp-CqrInjZms-DvpizEzDNHuzcM1a0NURdsR0n1DO5KswvPiX-GYVfgzRrbBhs_z29mkU6gf-TDr9a5A1ontnkhiIOfZobDw_kupItcct2c0tz5s3VTwpoXOZBJJ9CTZ6eODkl-ue1INHY5png',
    performanceReport: {
      overallScore: 97.4,
      kpiAchievement: 99.1,
      disciplineRate: 98.8,
      projectsCompleted: 14,
      leadershipPotential: 'High',
      confidentialNotes: 'أداء استثنائي في هندسة نماذج البيانات وتطوير معمارية ERP السحابية. مؤهلة لقيادة قسم الأنظمة المتقدمة.',
      salaryGrade: 'Executive Band E2',
      lastReviewDate: '2025-01-15',
      eligibleForBonus: true
    }
  },
  {
    id: 'emp-2',
    name: 'فيصل بن خالد',
    phone: '+966 55 887 7665',
    email: 'leader@mjmholding.com',
    role: 'مدير العمليات وقائد الفريق الفني',
    rating: 'A',
    status: 'active',
    department: 'العمليات وسلاسل الإمداد',
    performanceScore: 93.2,
    businessUnitId: 'biz_logistics',
    salary: 24000,
    dateJoined: '2023-05-10',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGDyOBf4HA3kNBqRksy8fs_0iKOUgV2XyYvA7DrgZ8TCwvHkAXcfEvPZswI1LSxg2_6CF1pscK49ccTVhLkvyqUhh4VJHvR1nAPjrDk-bqNJPSRMF1ZdXTRgepDq-uI8jax5pISMVuzj5EAvnlaNxNHCKtC_8qndWaaxaArxrhKeOWi-XY8qGUPThWUu0hkJuDyo7kEmo1fw78GJO64tA3zwLcbxt-aE0NBwXE9sIU8KM6stMUTlD2nTieQAcZisaEl8fydjsbMg',
    performanceReport: {
      overallScore: 93.2,
      kpiAchievement: 94.0,
      disciplineRate: 96.5,
      projectsCompleted: 11,
      leadershipPotential: 'High',
      confidentialNotes: 'انضباط ميداني عالي، قاد بنجاح إعادة هيكلة مسارات الشحن والربط اللوجستي الدولي.',
      salaryGrade: 'Senior Management M1',
      lastReviewDate: '2025-01-10',
      eligibleForBonus: true
    }
  },
  {
    id: 'emp-3',
    name: 'نورة سليمان',
    phone: '+966 54 009 9887',
    email: 'staff@mjmholding.com',
    role: 'مصمم واجهات أول وتجربة مستخدم 3D',
    rating: 'A',
    status: 'active',
    department: 'التطوير والابتكار',
    performanceScore: 95.8,
    businessUnitId: 'biz_tech',
    salary: 19500,
    dateJoined: '2023-09-01',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEXsWLqabQDdSn6DQlxutpxzHWSQhOqrODXgE5nYJXsEiuFB10_BgsLo40ezI9-ujC-zp1bOogWSmfx5z9UHRh25H19avKQc6ddRXY3ERUozCk1lBXfNH-r8X0Pm75SQ7gVNVxFwAAjvHZi0GCjmPTGiYRU0QTMN4VnhSKmoNP-g5JF6SoM8nfYu_jtaHyVrC7t984UKme7EFPwAUtJDPN_eE4CAwr663-2sWvyr45EkJ6r9xgZpeCxV0DvlJs7PJQ4b0PaUX2NA',
    performanceReport: {
      overallScore: 95.8,
      kpiAchievement: 98.0,
      disciplineRate: 97.0,
      projectsCompleted: 9,
      leadershipPotential: 'Medium',
      confidentialNotes: 'إبداع تصميمي بارز في معمارية الواجهات ثلاثية الأبعاد والتجربة الفاخرة للعملاء VIP.',
      salaryGrade: 'Professional P3',
      lastReviewDate: '2025-01-20',
      eligibleForBonus: true
    }
  },
  {
    id: 'emp-4',
    name: 'عبدالرحمن الشهري',
    phone: '+966 56 443 2211',
    email: 'a.shehri@mjmholding.com',
    role: 'مدير الصفقات العقارية والاستثمار',
    rating: 'B',
    status: 'remote',
    department: 'التطوير والاستثمار العقاري',
    performanceScore: 88.5,
    businessUnitId: 'biz_realestate',
    salary: 22000,
    dateJoined: '2024-01-12',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrviCwOdupvFXLKB4q-jjFLYodwA0t6Bq_SS7vEgc3cGVx6kkY1oejqvhWz_Mp3Fnt1Z7fe9gcSOdoN49rfOdUeXFfBDJP99Ula_G6doVhpUQu2nZO_DQL-KNF9FsugGErGk7P4lDlXlDF5jhwZu-vOD8VN8BlDNbwyKnPgoCUgYu7A-79Jh0ZwHv1BIMK1fSaX0bMfkibiWVd845txwjWLV4w-a75mo6x3G9OXdUl4ZMxhbRt-VXxy-dqdGea-FwwkXVM6RiBrw',
    performanceReport: {
      overallScore: 88.5,
      kpiAchievement: 89.0,
      disciplineRate: 91.0,
      projectsCompleted: 6,
      leadershipPotential: 'Medium',
      confidentialNotes: 'تحقيق أهداف الربع الرابع بنسبة 89%. يحتاج لتعزيز مهارات إغلاق عقود الصناديق الكبرى.',
      salaryGrade: 'Senior Specialist S2',
      lastReviewDate: '2025-01-05',
      eligibleForBonus: false
    }
  },
  {
    id: 'emp-5',
    name: 'ليلى المنصور',
    phone: '+966 52 334 5566',
    email: 'layla.m@mjmholding.com',
    role: 'مسؤولة علاقات كبار العملاء VIP والأصول',
    rating: 'A',
    status: 'active',
    department: 'إدارة الأصول والاستثمار',
    performanceScore: 96.1,
    businessUnitId: 'biz_finance',
    salary: 21500,
    dateJoined: '2023-11-20',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW5YicxAMHwHxCKxHhk4b7rRh8a7ymHfvn7kt2RvYJCzW1d7BS0bnJ2WGqgg6Iu4f9_gz9ojp32XhcCtJ8Dnqm82yLkRiJ8e8pcvOhwx4ixiIb01ScixWRGFB4CbCwT_CaiiOTZoScOUGCHMqnlV6PALT6rp-USrEGBDezSvsfRIj_ngJ2C-T5x5S8nb2d4X7qEjhGwpSTgwRXnUivEzWwFt5quPubTyM8ZeRyPB9_thalF6On3f_l_wR8fAkRTCMTMd2uRNp4oQ',
    performanceReport: {
      overallScore: 96.1,
      kpiAchievement: 97.5,
      disciplineRate: 99.0,
      projectsCompleted: 12,
      leadershipPotential: 'High',
      confidentialNotes: 'إشادة خاصة من مستثمري الصندوق السيادي لسرعة استجابتها وجودة التقارير الدورية.',
      salaryGrade: 'Senior Specialist S3',
      lastReviewDate: '2025-01-18',
      eligibleForBonus: true
    }
  }
];

export const INITIAL_DIRECTIVES: ExecutiveDirective[] = [
  {
    id: 'dir_01',
    type: 'PROMOTION',
    title: 'Executive Order: Sarah Al-Otaibi Promotion',
    titleAr: 'قرار إداري نافذ: ترقية الأستاذة سارة العتيبي وتعيينها نائباً لرئيس التقنية',
    message: 'Pursuant to outstanding Q4 performance and architecture excellence, Sarah Al-Otaibi is promoted to Senior AI Systems Lead with immediate salary grade E2 upgrade.',
    messageAr: 'بناءً على التقييم الاستثنائي للربع الرابع، قرر مكتب الرئيس التنفيذي ترقية سارة العتيبي إلى منصب نائب رئيس قطاع الذكاء الاصطناعي وترقية سلم الرواتب فورياً.',
    employeeId: 'emp-1',
    employeeName: 'سارة العتيبي',
    issuedBy: 'ألكسندر ثورن (الرئيس التنفيذي - CEO)',
    issuedAt: '2025-02-10T09:30:00.000Z',
    acknowledgedByTL: true,
    businessUnitId: 'biz_tech',
    priority: 'CONFIDENTIAL'
  },
  {
    id: 'dir_02',
    type: 'REWARD',
    title: 'Discretionary Bonus: Logistics Operations Team',
    titleAr: 'مكافأة تميز استثنائية: فريق العمليات اللوجستية بقيادة م. فيصل',
    message: 'Granted a one-month incentive bonus to the operations dispatch unit for achieving 100% on-time air cargo fulfillment.',
    messageAr: 'اعتماد صرف مكافأة راتب شهر إضافي لكافة منسوبي وحدة الشحن الجوي والعمليات نظير كفاءة التشغيل الميداني الصفرية في التأخير.',
    employeeId: 'emp-2',
    employeeName: 'فيصل بن خالد',
    issuedBy: 'ألكسندر ثورن (الرئيس التنفيذي - CEO)',
    issuedAt: '2025-02-14T14:15:00.000Z',
    acknowledgedByTL: false,
    businessUnitId: 'biz_logistics',
    priority: 'STANDARD'
  },
  {
    id: 'dir_03',
    type: 'ANNOUNCEMENT',
    title: 'Q1 Strategic Group Alignment Memo',
    titleAr: 'تعميم رئاسي ملزم: خطة التوسع المالي ودمج العمليات الذكية لعام 2025',
    message: 'All divisional directors and Team Leaders are instructed to migrate pending audit sheets to the unified automated ERP portal by month end.',
    messageAr: 'إلزام كافة مدراء القطاعات وقادة الفرق بإتمام نقل ومطابقة كافة الدفاتر المحاسبية إلى بوابة ERP الموحدة قبل نهاية الشهر الجاري.',
    issuedBy: 'ألكسندر ثورن (الرئيس التنفيذي - CEO)',
    issuedAt: '2025-02-18T11:00:00.000Z',
    acknowledgedByTL: false,
    priority: 'URGENT'
  }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: '1',
    code: 'MJM-8829-X',
    name: 'جوليان بلاكوود',
    initials: 'JB',
    category: 'VIP',
    syncStatus: 'synced',
    assignedAgent: {
      name: 'سارة ل.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMF_XcNHDJU0SPOPxDzxB8gDzl64VFrNLUJo7-yQjofyp_BXTWs-0ZQJ5iSOfkUc-t4iSUPffGnExllofshx-uh3CzDQ5s0LbiX8FR-erYb6p1tdNs-q4maPrSLtSn1UYmQ1Wj204uwSyZP8h-hgJrsDERQuS3lPcLtJtfIZkrhxtd-ACRGBn9E0an-vT99kUj1uPc8w_ueIdGXDycigdnZX2zUY7kQ5JcShO0OLrZqQbI22BM7p0O-58i0sOF7o9quvseIXW4_Q'
    },
    status: 'verified',
    whatsappNumber: '+966 50 112 3344',
    company: 'مجموعة بلاكوود الدولية للاستثمار',
    businessUnitId: 'biz_realestate'
  },
  {
    id: '2',
    code: 'MJM-9011-B',
    name: 'حمدان الفهد',
    initials: 'HA',
    category: 'Regular',
    syncStatus: 'offline',
    assignedAgent: {
      name: 'حسان ر.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACljwNclvyBGc2_1DDAqNgE6h8HjHdwvvfol846KrZBi86GDhKVwGtNMJTUJInTIVdAUBIK-PXE5xjWTyphnFGiK03II6P25R1-DmnDtiBBizG2HjFVtDvzPmQWvVGF2NGEYv5CjugV4sKTI0c_0NR2_FM67huemjE2wWCqsvmKJ2MJWFeRX2LQnN96AHewrlqLNDWEGlxs4kG78i_lPasrjoZljLCjoXDhKIJmlMgk4KRcnWKDuEN0aj53wZPxbqpTasQoafEsw'
    },
    status: 'pending',
    whatsappNumber: '+971 52 445 6677',
    company: 'شركة الفهد للخدمات اللوجستية',
    businessUnitId: 'biz_logistics'
  },
  {
    id: '3',
    code: 'MJM-4412-A',
    name: 'صوفيا تشن',
    initials: 'SC',
    category: 'VIP',
    syncStatus: 'synced',
    assignedAgent: {
      name: 'سارة ل.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoR3PK0xe0SdNWUmFOxTAPOakKvue1a-GDYu9smBxTND4UAaylXOdQFIYKHgYeNUp_FVU7-Q0tspKBLlMNLwRWeGsjpqJwsCcXPChgjLLOA77Z9cx2TNEKp45Hbu5Ue4g0ej-Mcs82ZqYr1poFPt791cq0tmzr5lvCLXa5gsakivQryqumsN_FllRSM6ZfoX6hwny9Bnz-OZX9FuHWgT58o6fbUmJnfl137YfUpx6ToquM_pzBVg379TVoAlHTZTynHIKFZFl2fQ'
    },
    status: 'verified',
    whatsappNumber: '+966 54 889 0011',
    company: 'تشن للتجارة المتقدمة والأنظمة الذكية',
    businessUnitId: 'biz_tech'
  },
  {
    id: '4',
    code: 'MJM-3319-K',
    name: 'ماركوس فيليب',
    initials: 'MP',
    category: 'VIP',
    syncStatus: 'synced',
    assignedAgent: {
      name: 'حسان ر.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACljwNclvyBGc2_1DDAqNgE6h8HjHdwvvfol846KrZBi86GDhKVwGtNMJTUJInTIVdAUBIK-PXE5xjWTyphnFGiK03II6P25R1-DmnDtiBBizG2HjFVtDvzPmQWvVGF2NGEYv5CjugV4sKTI0c_0NR2_FM67huemjE2wWCqsvmKJ2MJWFeRX2LQnN96AHewrlqLNDWEGlxs4kG78i_lPasrjoZljLCjoXDhKIJmlMgk4KRcnWKDuEN0aj53wZPxbqpTasQoafEsw'
    },
    status: 'verified',
    whatsappNumber: '+966 55 998 7766',
    company: 'إليت لإدارة الأصول وصناديق التحوط',
    businessUnitId: 'biz_finance'
  }
];

export const INITIAL_TRANSACTIONS: FinancialTransaction[] = [
  {
    id: 'tx-1',
    operation: 'عقد استئجار برج إداري فاخر',
    department: 'التطوير العقاري',
    date: '2025-02-18 14:30',
    amount: 1450000.0,
    status: 'success',
    icon: 'building',
    businessUnitId: 'biz_realestate'
  },
  {
    id: 'tx-2',
    operation: 'شحنة جوية مبردة - خط فرانكفورت / الرياض',
    department: 'اللوجستيات والشحن',
    date: '2025-02-18 11:15',
    amount: 325000.0,
    status: 'success',
    icon: 'plane',
    businessUnitId: 'biz_logistics'
  },
  {
    id: 'tx-3',
    operation: 'اشتراك ترخيص خوادم الذكاء الاصطناعي السحابية',
    department: 'التقنية والأنظمة',
    date: '2025-02-17 16:45',
    amount: 88500.0,
    status: 'pending',
    icon: 'cpu',
    businessUnitId: 'biz_tech'
  },
  {
    id: 'tx-4',
    operation: 'توزيع عوائد صندوق الاستثمار السيادي',
    department: 'إدارة الأصول والمالية',
    date: '2025-02-16 09:20',
    amount: 2890000.0,
    status: 'success',
    icon: 'landmark',
    businessUnitId: 'biz_finance'
  }
];

export const INITIAL_BANK_ACCOUNTS: BankAccount[] = [
  {
    id: 'bank-1',
    bankName: 'مصرف الراجحي للشركات',
    iban: 'SA03 8000 0234 6080 1012 3456',
    cif: 'MJM-CORP-991'
  },
  {
    id: 'bank-2',
    bankName: 'البنك الأهلي السعودي التجاري',
    iban: 'SA44 1000 0012 3456 7890 1234',
    cif: 'MJM-TREASURY-002'
  }
];

export const AI_INSIGHTS: AIInsight[] = [
  {
    id: 'ins-1',
    type: 'info',
    message: 'تم رصد نمو بنسبة 28% في إيرادات قطاع العقارات بعد توقيع عقد برج النخبة التجاري.',
    timestamp: 'منذ ١٠ دقائق',
    actionable: true
  },
  {
    id: 'ins-2',
    type: 'urgent',
    message: 'توجيهات الرئيس التنفيذي: تأكيد صرف مكافآت فريق العمليات اللوجستية قبل نهاية الأسبوع.',
    timestamp: 'منذ ساعة',
    actionable: true
  },
  {
    id: 'ins-3',
    type: 'recommendation',
    message: 'يوصي نظام الذكاء الاصطناعي بتعيين 3 مهندسي بيانات إضافيين لتلبية توسعات الربع الأول.',
    timestamp: 'اليوم',
    actionable: true
  }
];

export const TOP_PERFORMERS = [
  {
    rank: 1,
    name: 'سارة العتيبي',
    role: 'رئيس قسم الذكاء الاصطناعي',
    score: '٩٩.١٪',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTqHzecR_WoQ4-hUk7kIPovgxQAgR2_OVYnT4UxRmCvfqJkGrgI64mSSP2M0k_9AdrM1Iv7PfmdBoXzOpWy8RHV3VX8LNsqirEccfbUvnex_OtIMfL_2C3NIaBsp-CqrInjZms-DvpizEzDNHuzcM1a0NURdsR0n1DO5KswvPiX-GYVfgzRrbBhs_z29mkU6gf-TDr9a5A1ontnkhiIOfZobDw_kupItcct2c0tz5s3VTwpoXOZBJJ9CTZ6eODkl-ue1INHY5png'
  },
  {
    rank: 2,
    name: 'ليلى المنصور',
    role: 'إدارة الأصول والاستثمار',
    score: '٩٦.١٪',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW5YicxAMHwHxCKxHhk4b7rRh8a7ymHfvn7kt2RvYJCzW1d7BS0bnJ2WGqgg6Iu4f9_gz9ojp32XhcCtJ8Dnqm82yLkRiJ8e8pcvOhwx4ixiIb01ScixWRGFB4CbCwT_CaiiOTZoScOUGCHMqnlV6PALT6rp-USrEGBDezSvsfRIj_ngJ2C-T5x5S8nb2d4X7qEjhGwpSTgwRXnUivEzWwFt5quPubTyM8ZeRyPB9_thalF6On3f_l_wR8fAkRTCMTMd2uRNp4oQ'
  },
  {
    rank: 3,
    name: 'نورة سليمان',
    role: 'تصميم واجهات وتجربة المستخدم',
    score: '٩٥.٨٪',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEXsWLqabQDdSn6DQlxutpxzHWSQhOqrODXgE5nYJXsEiuFB10_BgsLo40ezI9-ujC-zp1bOogWSmfx5z9UHRh25H19avKQc6ddRXY3ERUozCk1lBXfNH-r8X0Pm75SQ7gVNVxFwAAjvHZi0GCjmPTGiYRU0QTMN4VnhSKmoNP-g5JF6SoM8nfYu_jtaHyVrC7t984UKme7EFPwAUtJDPN_eE4CAwr663-2sWvyr45EkJ6r9xgZpeCxV0DvlJs7PJQ4b0PaUX2NA'
  }
];

export const FAQS = [
  {
    question: 'كيف يضمن نظام MJM صلاحيات الفصل والترقية الحصرية للرئيس التنفيذي (CEO)؟',
    answer: 'تم تصميم بنية الصلاحيات (RBAC) بحيث لا تظهر أزرار تعيين الموظفين الجدد، الترقية، المكافأة، أو إنهاء الخدمة إلا لحساب الرئيس التنفيذي فقط، مع إرسال توجيهات آلية فورية لبريد قادة الفرق المعنيين.'
  },
  {
    question: 'كيف ترتبط القطاعات والشركات المختلفة داخل نظام واحد؟',
    answer: 'يوفر نظام MJM بوابة متصلة تضم العقارات، اللوجستيات، الذكاء الاصطناعي، والمالية والاستثمار، مما يسمح بمشاهدة التقارير الموحدة للجروب أو تصفية العمليات حسب كل شركة تابعة بضغطة زر.'
  },
  {
    question: 'ما هي آلية التوجيهات التنفيذية بين الرئيس التنفيذي وقادة الفرق؟',
    answer: 'بمجرد اتخاذ قرار إداري (ترقية أو فصل أو مكافأة أو تعميم) من قبل الرئيس التنفيذي، يتم إرسال توجيه رسمي موثق إلى صندوق بريد قائد الفريق (Team Leader Inbox) مع إمكانية تأكيد الاستلام إلكترونياً.'
  },
  {
    question: 'كيف يدعم النظام أكثر من 100 لغة مع التبديل الفوري لاتجاه الصفحة (RTL / LTR)؟',
    answer: 'يدعم النظام كافة اللغات العالمية بما فيها العربية والأردية والإنجليزية والهندية والفارسية والبنغالية، مع تحول تلقائي للاتجاه RTL/LTR ومطابقة المحاذاة والرموز ثلاثية الأبعاد فورياً.'
  }
];

export const MASTER_FINANCIAL_REPORTS = [
  {
    businessId: 'biz_realestate',
    businessName: 'MJM Luxury Real Estate & Towers',
    businessNameAr: 'إم جي إم للتطوير العقاري والأبراج',
    code: 'MJM-REALTY',
    totalRevenue: 18450000,
    totalExpenses: 11200000,
    netProfit: 7250000,
    profitMarginPercent: 39.3,
    staffSalariesExpense: 4850000,
    operationalExpense: 6350000,
    tasksCompletedCount: 142,
    efficiencyScore: 94.8
  },
  {
    businessId: 'biz_logistics',
    businessName: 'MJM Global Logistics & Air Cargo',
    businessNameAr: 'إم جي إم للخدمات اللوجستية والشحن الدولي',
    code: 'MJM-CARGO',
    totalRevenue: 12800000,
    totalExpenses: 8400000,
    netProfit: 4400000,
    profitMarginPercent: 34.4,
    staffSalariesExpense: 3600000,
    operationalExpense: 4800000,
    tasksCompletedCount: 218,
    efficiencyScore: 96.2
  },
  {
    businessId: 'biz_tech',
    businessName: 'MJM AI Solutions & Cyber Systems',
    businessNameAr: 'إم جي إم للحلول التقنية والذكاء الاصطناعي',
    code: 'MJM-CYBER',
    totalRevenue: 9650000,
    totalExpenses: 4900000,
    netProfit: 4750000,
    profitMarginPercent: 49.2,
    staffSalariesExpense: 3100000,
    operationalExpense: 1800000,
    tasksCompletedCount: 186,
    efficiencyScore: 98.4
  },
  {
    businessId: 'biz_investment',
    businessName: 'MJM Sovereign Investment & Asset Fund',
    businessNameAr: 'إم جي إم للاستثمار السيادي وإدارة الأصول',
    code: 'MJM-FUND',
    totalRevenue: 8050000,
    totalExpenses: 3200000,
    netProfit: 4850000,
    profitMarginPercent: 60.2,
    staffSalariesExpense: 2100000,
    operationalExpense: 1100000,
    tasksCompletedCount: 94,
    efficiencyScore: 97.1
  }
];

export const WORK_EXECUTION_AUDIT_LOGS = [
  {
    id: 'log-001',
    taskTitle: 'تدشين المنظومة السحابية الموحدة وتشفير الـ 2FA',
    taskTitleAr: 'تدشين المنظومة السحابية الموحدة وتشفير الـ 2FA',
    performedBy: 'سارة العتيبي',
    performerRole: 'مهندس أول ذكاء اصطناعي',
    businessUnitId: 'biz_tech',
    businessUnitName: 'MJM AI Solutions',
    businessUnitNameAr: 'إم جي إم للتقنية والذكاء الاصطناعي',
    category: 'Engineering & AI',
    completedAt: '2026-09-19 14:32:00',
    hoursSpent: 16.5,
    status: 'VERIFIED' as const,
    outputNotes: 'تم ربط البوابة بنجاح مع منظومة الأمان السيادية واجتياز الفحص الأمني 100%'
  },
  {
    id: 'log-002',
    taskTitle: 'توقيع اتفاقية الاستحواذ العقاري لبرج الياقوت التجاري',
    taskTitleAr: 'توقيع اتفاقية الاستحواذ العقاري لبرج الياقوت التجاري',
    performedBy: 'م. راشد آل ناصر',
    performerRole: 'مدير تنفيذي - قطاع العقار',
    businessUnitId: 'biz_realestate',
    businessUnitName: 'MJM Luxury Real Estate',
    businessUnitNameAr: 'إم جي إم للتطوير العقاري',
    category: 'Acquisitions & Contracts',
    completedAt: '2026-09-18 11:15:00',
    hoursSpent: 28.0,
    status: 'VERIFIED' as const,
    outputNotes: 'تم إبرام الصفقة بقيمة 12.5 مليون ر.س وتوثيق السجلات لدى كتابة العدل'
  },
  {
    id: 'log-003',
    taskTitle: 'أتمتة مسارات الشحن الجوي المبرد بين الرياض وجدة',
    taskTitleAr: 'أتمتة مسارات الشحن الجوي المبرد بين الرياض وجدة',
    performedBy: 'د. فيصل المنصور',
    performerRole: 'قائد عمليات اللوجستيات',
    businessUnitId: 'biz_logistics',
    businessUnitName: 'MJM Global Logistics',
    businessUnitNameAr: 'إم جي إم للخدمات اللوجستية',
    category: 'Supply Chain Operations',
    completedAt: '2026-09-19 09:40:00',
    hoursSpent: 12.0,
    status: 'COMPLETED' as const,
    outputNotes: 'خفض تكلفة النقل بنسبة 22% وزيادة دقة التسليم إلى 99.4%'
  },
  {
    id: 'log-004',
    taskTitle: 'مراجعة خوارزمية التداول الآلي وتدفقات السيولة',
    taskTitleAr: 'مراجعة خوارزمية التداول الآلي وتدفقات السيولة',
    performedBy: 'ليلى المنصور',
    performerRole: 'محلل مالي واستثماري',
    businessUnitId: 'biz_investment',
    businessUnitName: 'MJM Sovereign Investment',
    businessUnitNameAr: 'إم جي إم للاستثمار السيادي',
    category: 'Quantitative Finance',
    completedAt: '2026-09-17 16:50:00',
    hoursSpent: 14.5,
    status: 'VERIFIED' as const,
    outputNotes: 'تحقيق عائد استثماري إضافي قدره 320,000 ر.س خلال الربع الثالث'
  },
  {
    id: 'log-005',
    taskTitle: 'تصميم واجهة لوحة تحكم الرئيس التنفيذي ثلاثية الأبعاد',
    taskTitleAr: 'تصميم واجهة لوحة تحكم الرئيس التنفيذي ثلاثية الأبعاد',
    performedBy: 'نورة سليمان',
    performerRole: 'رئيس قسم تجربة المستخدم',
    businessUnitId: 'biz_tech',
    businessUnitName: 'MJM AI Solutions',
    businessUnitNameAr: 'إم جي إم للتقنية والذكاء الاصطناعي',
    category: 'UI/UX Architecture',
    completedAt: '2026-09-18 17:20:00',
    hoursSpent: 22.0,
    status: 'VERIFIED' as const,
    outputNotes: 'تم تطبيق تدرجات الذهب الإمبراطوري ودعم أكثر من 100 لغة مع كامل التجاوب'
  },
  {
    id: 'log-006',
    taskTitle: 'فحص التزام المناوبات وإصدار شهادات التميز الوظيفي',
    taskTitleAr: 'فحص التزام المناوبات وإصدار شهادات التميز الوظيفي',
    performedBy: 'محمد المنصور',
    performerRole: 'قائد فريق العمليات',
    businessUnitId: 'biz_tech',
    businessUnitName: 'MJM AI Solutions',
    businessUnitNameAr: 'إم جي إم للتقنية والذكاء الاصطناعي',
    category: 'Workforce Governance',
    completedAt: '2026-09-20 08:30:00',
    hoursSpent: 6.5,
    status: 'COMPLETED' as const,
    outputNotes: 'تسجيل نسبة انضباط 99.1% لكافة أفراد المناوبة الصباحية والمسائية'
  }
];
