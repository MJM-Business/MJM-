export interface LandingContent {
  dir: 'rtl' | 'ltr';
  getStarted: string;
  home: string;
  features: string;
  ai: string;
  reviews: string;
  faq: string;
  signIn: string;
  sovereignPortals: string;
  platformTitle: string;
  smartBusiness: string;
  heroDesc: string;
  startJourney: string;
  watchDemo: string;
  executiveOperations: string;
  encryptedLive: string;
  workflowFlow: string;
  kpiIndex: string;
  transactions: string;
  automation: string;
  security: string;
  productivity: string;
  productivityDesc: string;
  integratedPortals: string;
  solutionsTitle: string;
  card1Title: string;
  card1Desc: string;
  card2Title: string;
  card2Desc: string;
  card3Title: string;
  card3Desc: string;
  card4Title: string;
  card4Desc: string;
  advancedTech: string;
  aiSectionTitle: string;
  aiSectionDesc: string;
  discoverMoreAi: string;
  smartAssistant: string;
  smartAssistantDesc: string;
  performanceTracking: string;
  performanceTrackingDesc: string;
  dailyAiAnalytics: string;
  live: string;
  secureTitle: string;
  secureDesc: string;
  fastTitle: string;
  fastDesc: string;
  responseLatency: string;
  latencyValue: string;
  clientTrust: string;
  testimonialsTitle: string;
  rev1Text: string;
  rev1Author: string;
  rev1Role: string;
  rev2Text: string;
  rev2Author: string;
  rev2Role: string;
  rev3Text: string;
  rev3Author: string;
  rev3Role: string;
  faqBadge: string;
  faqTitle: string;
  askAiTitle: string;
  askAiPlaceholder: string;
  askAiButton: string;
  instantAiResponse: string;
  aiAnswerPrefix: string;
  faqs: Array<{ q: string; a: string }>;
  footerAbout: string;
  quickLinks: string;
  linkAbout: string;
  linkServices: string;
  linkDashboard: string;
  linkRegister: string;
  supportTitle: string;
  linkHelp: string;
  linkContact: string;
  linkPrivacy: string;
  linkTerms: string;
  newsletterTitle: string;
  newsletterDesc: string;
  newsletterPlaceholder: string;
  newsletterButton: string;
  newsletterSuccess: string;
  copyright: string;
}

export const LANDING_TRANSLATIONS: Record<string, LandingContent> = {
  ar: {
    dir: 'rtl',
    getStarted: 'ابدأ الآن',
    home: 'الرئيسية',
    features: 'المميزات',
    ai: 'الذكاء الاصطناعي',
    reviews: 'آراء',
    faq: 'الأسئلة',
    signIn: 'تسجيل الدخول',
    sovereignPortals: 'استقبال بوابات',
    platformTitle: 'منصة MJM',
    smartBusiness: 'للأعمال الذكية',
    heroDesc: 'نظام Super ERP المطور مع أتمتة شاملة بالذكاء الاصطناعي، حلول تقنية تعيد تعريف الكفاءة والنمو لمؤسستك في العصر الرقمي.',
    startJourney: 'ابدأ رحلتك الآن',
    watchDemo: 'مشاهدة العرض',
    executiveOperations: 'لوحة العمليات التنفيذية',
    encryptedLive: 'متصل ومؤمن',
    workflowFlow: 'كفاءة تدفق العمليات',
    kpiIndex: 'مؤشر الأداء',
    transactions: 'المعاملات',
    automation: 'الأتمتة الذكية',
    security: 'الحماية والسيادة',
    productivity: 'إنتاجية',
    productivityDesc: 'تحسين الأداء التشغيلي باستخدام تقنياتنا الذكية.',
    integratedPortals: 'بواباتنا المتكاملة',
    solutionsTitle: 'حلول مصممة للتميز',
    card1Title: 'الخدمات العامة',
    card1Desc: 'إدارة شاملة لجميع العمليات الإدارية والتشغيلية في مسار واحد.',
    card2Title: 'السفر والشحن',
    card2Desc: 'أنظمة لوجستية ذكية لتتبع الشحنات وإدارتها بدقة وأمان.',
    card3Title: 'إدارة الأصول',
    card3Desc: 'حماية وتتبع ممتلكات المؤسسة الهامة والرقابة بدقة متناهية.',
    card4Title: 'ذكاء الآلة',
    card4Desc: 'تحليلات تشغيلية متقدمة تعتمد على بيانات ضخمة لدعم اتخاذ القرار.',
    advancedTech: 'تقنية متقدمة',
    aiSectionTitle: 'أتمتة ذكية لمستقبل بلا حدود',
    aiSectionDesc: 'نحن لا نوفر مجرد أدوات، بل نبني عقلاً إلكترونياً لمنشأتك يتعلم ويتطور مع كل عملية، تقنيات الذكاء الاصطناعي لدينا تضمن لك البقاء في طليعة المنافسة.',
    discoverMoreAi: 'اكتشف المزيد عن AI',
    smartAssistant: 'المساعد الذكي (AI)',
    smartAssistantDesc: 'مساعد افتراضي متكامل لجدولة المهام والرد الآلي وتنظيم العمل اليومي.',
    performanceTracking: 'نظام الأداء',
    performanceTrackingDesc: 'مراقبة لحظية لمؤشرات الأداء الرئيسية والتقييم التلقائي بدقة.',
    dailyAiAnalytics: 'تحليلات الذكاء الاصطناعي اليومية',
    live: 'مباشر',
    secureTitle: 'أمن بيانات سيادي',
    secureDesc: 'استخدام تشفير AES-256 المتطور لضمان خصوصية بياناتك وحمايتها من أي تهديدات خارجية، متوافق مع أعلى المعايير العالمية.',
    fastTitle: 'سرعة تنفيذ فائقة',
    fastDesc: 'محركنا المطور يضمن تنفيذ كافة العمليات والمعاملات في أقل من جزء من الثانية، مما يمنح فريقك تجربة استخدام سلسة وإنتاجية أعلى.',
    responseLatency: 'زمن الاستجابة',
    latencyValue: '1.2 ثانية',
    clientTrust: 'ثقة شركائنا',
    testimonialsTitle: 'آراء العملاء',
    rev1Text: '"لقد أحدثت منصة MJM تحولاً جذرياً في طريقة إدارتنا للعمليات اللوجستية، الكفاءة الاستثنائية أصبحت أسرع، ليس مجرد كلمة تسويقية هنا، بل هو واقع ملموس نراه في إيراداتنا وتطورنا يومياً."',
    rev1Author: 'أحمد المنصور',
    rev1Role: 'المدير التنفيذي، شركة المسار للنقل',
    rev2Text: '"نظام الأتمتة الذكي والتحليلات الفورية وفر علينا مئات الساعات شهرياً في التدقيق المالي ومتابعة الموظفين."',
    rev2Author: 'سارة القحطاني',
    rev2Role: 'مديرة العمليات المالية، مجموعة الأفق',
    rev3Text: '"أفضل استثمار تكنولوجي قمنا به لربط فروعنا ومستودعاتنا مع بوابات الدفع والتخليص الجمركي في منصة واحدة."',
    rev3Author: 'طارق الهاشمي',
    rev3Role: 'رئيس مجلس الإدارة، الهاشمي للتجارة',
    faqBadge: 'الشفافية والمعرفة',
    faqTitle: 'الأسئلة الشائعة حول المنظومة',
    askAiTitle: 'اسأل الذكاء الاصطناعي (MJM AI Assistant)',
    askAiPlaceholder: 'اسأل عن ميزات النظام، التشفير، أو الربط والتكامل...',
    askAiButton: 'إرسال الاستفسار',
    instantAiResponse: 'إجابة المساعد الذكي الفورية',
    aiAnswerPrefix: '[محرك MJM الذكي]',
    faqs: [
      {
        q: 'كيف يضمن النظام أمن البيانات الحساسة؟',
        a: 'نعتمد بروتوكولات تشفير سيادية بمستوى عسكري AES-256 مع تخزين معزول وصلاحيات وصول متعددة المستويات RBAC تضمن عدم وصول أي جهة غير مصرح لها ومطابقة تامة مع أنظمة الامتثال.'
      },
      {
        q: 'هل يمكن ربط MJM مع أنظمتنا الحالية؟',
        a: 'نعم، توفر المنصة واجهات برمجة تطبيقات متقدمة RESTful APIs و Webhooks للتكامل السلس مع الأنظمة البنكية، والمستودعات، وبوابات الدفع، وبرامج المحاسبة المعتمدة دون انقطاع.'
      },
      {
        q: 'ما هي ميزة الأتمتة الذكية مقارنة بالأنظمة التقليدية؟',
        a: 'الأتمتة في MJM لا تقتصر على القواعد الثابتة، بل تستخدم نماذج تعلم آلي تتنبأ بمسار العمليات وتنجز التقارير والقرارات الروتينية ذاتياً بنسبة دقة تصل إلى 99.8%.'
      },
      {
        q: 'كيف يتم تحديث التقارير أثناء الاستخدام؟',
        a: 'يتم التحديث آنياً وبشكل فوري (Real-Time Streams)، حيث تنعكس كل حركة بيع، صرف، شحن، أو تسجيل موظف مباشرة في لوحات القيادة والرسوم البيانية.'
      }
    ],
    footerAbout: 'الريادة في تقديم حلول إدارة الأعمال الذكية المتكاملة، نجمع بين أحدث تقنيات الذكاء الاصطناعي والأمان السيادي.',
    quickLinks: 'الروابط السريعة',
    linkAbout: 'عن المنصة',
    linkServices: 'خدماتنا',
    linkDashboard: 'لوحة القيادة ERP',
    linkRegister: 'إنشاء حساب جديد',
    supportTitle: 'الدعم الفني',
    linkHelp: 'مركز المساعدة',
    linkContact: 'تواصل معنا',
    linkPrivacy: 'سياسة الخصوصية',
    linkTerms: 'الشروط والأحكام',
    newsletterTitle: 'اشترك في نشرتنا',
    newsletterDesc: 'كن أول من يعرف عن تحديثاتنا الذكية.',
    newsletterPlaceholder: 'بريدك الإلكتروني',
    newsletterButton: 'اشتراك',
    newsletterSuccess: 'تم الاشتراك بنجاح!',
    copyright: 'جميع الحقوق محفوظة منصة MJM للأعمال الذكية'
  },

  ur: {
    dir: 'rtl',
    getStarted: 'ابھی شروع کریں',
    home: 'ہوم',
    features: 'خصوصیات',
    ai: 'مصنوعی ذہانت (AI)',
    reviews: 'جائزے',
    faq: 'عمومی سوالات',
    signIn: 'لاگ ان کریں',
    sovereignPortals: 'خود مختار پورٹل گیٹ وے',
    platformTitle: 'MJM پلیٹ فارم',
    smartBusiness: 'اسمارٹ بزنس کے لیے',
    heroDesc: 'جدید سپر ای آر پی (Super ERP) سسٹم، خودکار مصنوعی ذہانت کے ساتھ۔ ڈیجیٹل دور میں آپ کے کاروبار کی رفتار، منافع اور سیکیورٹی کو بے مثال بناتا ہے۔',
    startJourney: 'اپنا سفر شروع کریں',
    watchDemo: 'ڈیمو دیکھیں',
    executiveOperations: 'ایگزیکٹو آپریشنز پورٹل',
    encryptedLive: 'محفوظ اور لائیو',
    workflowFlow: 'ورک فلو کی رفتار',
    kpiIndex: 'کارکردگی انڈیکس',
    transactions: 'لین دین',
    automation: 'اسمارٹ آٹومیشن',
    security: 'سیکیورٹی و خود مختاری',
    productivity: 'پیداواری صلاحیت',
    productivityDesc: 'ہماری جدید ٹیکنالوجی سے کاروباری پیداواری صلاحیت میں زبردست اضافہ۔',
    integratedPortals: 'ہمارے مربوط پورٹلز',
    solutionsTitle: 'کامیابی کے لیے بہترین حل',
    card1Title: 'عمومی و کارپوریٹ خدمات',
    card1Desc: 'تمام انتظامی، دفتری اور آپریشنل امور کا ایک ہی جگہ جامع انتظام۔',
    card2Title: 'سفر، کارگو اور لاجسٹکس',
    card2Desc: 'سامان اور کارگو کی ترسیل کے لیے تیز رفتار، محفوظ اور اسمارٹ ٹریکنگ سسٹم۔',
    card3Title: 'اثاثہ جات اور سرمایہ کاری',
    card3Desc: 'کمپنی کے قیمتی اثاثوں، فنڈز اور مالیاتی وسائل کی 100% محفوظ نگرانی۔',
    card4Title: 'مشین انٹیلی جنس و تجزیات',
    card4Desc: 'بگ ڈیٹا اور جدید AI الگورتھم جو کاروباری فیصلے لینے میں معاونت کرتے ہیں۔',
    advancedTech: 'جدید ترین ٹیکنالوجی',
    aiSectionTitle: 'لامحدود مستقبل کے لیے اسمارٹ خودکاری',
    aiSectionDesc: 'ہم صرف سافٹ ویئر نہیں بناتے، بلکہ آپ کے ادارے کے لیے ایک باصلاحیت ڈیجیٹل دماغ تخلیق کرتے ہیں جو ہر ٹرانزیکشن کے ساتھ مزید بہتر ہوتا ہے۔',
    discoverMoreAi: 'AI کے بارے میں مزید جانیں',
    smartAssistant: 'اسمارٹ AI اسسٹنٹ',
    smartAssistantDesc: 'ملازمین کی رہنمائی اور روزمرہ کارروائیوں کے لیے خودکار ورچوئل اسسٹنٹ۔',
    performanceTracking: 'کارکردگی ٹریکنگ سسٹم',
    performanceTrackingDesc: 'کلیدی اشاریوں (KPIs) کی لمحہ بہ لمحہ مانیٹرنگ اور خودکار اسکورنگ۔',
    dailyAiAnalytics: 'روزانہ کے اسمارٹ تجزیات',
    live: 'لائیو',
    secureTitle: 'مکمل خود مختار ڈیٹا سیکیورٹی',
    secureDesc: 'ملٹری گریڈ AES-256 انکرپشن جس سے آپ کا تجارتی ڈیٹا ہر بیرونی خطرے سے محفوظ رہتا ہے، عالمی معیارات کے عین مطابق۔',
    fastTitle: 'انتہائی تیز رفتار کارروائی',
    fastDesc: 'ہمارا جدید انجن ہر لین دین کو سیکنڈ کے ہزارویں حصے میں پروسیس کرتا ہے، بغیر کسی تاخیر کے۔',
    responseLatency: 'جوابی وقت (Latency)',
    latencyValue: '1.2 سیکنڈ',
    clientTrust: 'گاہکوں کا اعتماد',
    testimonialsTitle: 'صارفین کی آراء',
    rev1Text: '"MJM پلیٹ فارم نے ہمارے لاجسٹکس اور سپلائی چین کے نظام کو یکسر بدل دیا ہے۔ اب ہمارے اخراجات کم اور منافع میں مسلسل اضافہ ہو رہا ہے۔"',
    rev1Author: 'احمد المنصور',
    rev1Role: 'سی ای او، المسار لاجسٹکس',
    rev2Text: '"خودکار آڈٹ اور ریئل ٹائم رپورٹس نے ہمارے اکاؤنٹس ڈیپارٹمنٹ کا مہینوں کا کام گھنٹوں میں سمیٹ دیا ہے۔"',
    rev2Author: 'سارہ القحطانی',
    rev2Role: 'فنانشل ڈائریکٹر، افق گروپ',
    rev3Text: '"اپنی تمام برانچز اور بینک اکاؤنٹس کو ایک ڈیش بورڈ پر یکجا کرنے کے لیے یہ بہترین سسٹم ہے۔"',
    rev3Author: 'طارق الہاشمی',
    rev3Role: 'چیئرمین، الہاشمی ٹریڈنگ',
    faqBadge: 'معلومات و رہنمائی',
    faqTitle: 'پلیٹ فارم کے متعلق عام سوالات',
    askAiTitle: 'MJM اسمارٹ AI سے پوچھیں',
    askAiPlaceholder: 'سسٹم کی خصوصیات، سیکیورٹی یا انٹیگریشن کے متعلق پوچھیں...',
    askAiButton: 'سوال بھیجیں',
    instantAiResponse: 'AI کی فوری رہنمائی',
    aiAnswerPrefix: '[MJM اسمارٹ انجن]',
    faqs: [
      {
        q: 'کیا ہمارا حساس ڈیٹا محفوظ رہے گا؟',
        a: 'جی ہاں، ہم جدید ترین ملٹری گریڈ AES-256 انکرپشن اور آئسولیٹڈ کلاؤڈ والٹس استعمال کرتے ہیں جس سے کسی غیر متعلقہ فرد کو رسائی نہیں مل سکتی۔'
      },
      {
        q: 'کیا MJM ہمارے موجودہ سافٹ ویئر سے منسلک ہو سکتا ہے؟',
        a: 'بالکل، ہمارے پاس تیز رفتار REST APIs اور Webhooks موجود ہیں جو بینکوں، ویئر ہاؤسز اور دیگر اکاونٹنگ سسٹمز کے ساتھ فوراً جڑ جاتے ہیں۔'
      },
      {
        q: 'روایتی ای آر پی کے مقابلے میں MJM کا کیا فائدہ ہے؟',
        a: 'یہ صرف ریکارڈ نہیں رکھتا بلکہ خودکار طور پر ڈیٹا کا تجزیہ کر کے فیصلے کرتا ہے اور 99.8% درستگی کے ساتھ عملے کا بوجھ ختم کرتا ہے۔'
      },
      {
        q: 'کیا رپورٹس فوری اپڈیٹ ہوتی ہیں؟',
        a: 'جی ہاں، ہر ٹرانزیکشن اور ملازم کی سرگرمی ریئل ٹائم WebSocket اسٹریم کے ذریعے بغیر کسی تاخیر کے لائیو اپڈیٹ ہوتی ہے۔'
      }
    ],
    footerAbout: 'اسمارٹ انٹرپرائز مینجمنٹ میں صف اول کا ادارہ، جو جدید مصنوعی ذہانت اور مضبوط سیکیورٹی کو یکجا کرتا ہے۔',
    quickLinks: 'فوری لنکس',
    linkAbout: 'پلیٹ فارم کے بارے میں',
    linkServices: 'ہماری خدمات',
    linkDashboard: 'ای آر پی ڈیش بورڈ',
    linkRegister: 'نیا اکاؤنٹ بنائیں',
    supportTitle: 'تکنیکی سپورٹ',
    linkHelp: 'امدادی مرکز',
    linkContact: 'ہم سے رابطہ کریں',
    linkPrivacy: 'پرائیویسی پالیسی',
    linkTerms: 'شرائط و ضوابط',
    newsletterTitle: 'نیوز لیٹر سبسکرائب کریں',
    newsletterDesc: 'نئی اپڈیٹس کی فوری معلومات حاصل کریں۔',
    newsletterPlaceholder: 'آپ کا ای میل پتہ',
    newsletterButton: 'سبسکرائب',
    newsletterSuccess: 'آپ کامیابی سے شامل ہو گئے ہیں!',
    copyright: 'جملہ حقوق بحق MJM اسمارٹ بزنس پلیٹ فارم محفوظ ہیں'
  },

  en: {
    dir: 'ltr',
    getStarted: 'Get Started',
    home: 'Home',
    features: 'Features',
    ai: 'AI Intelligence',
    reviews: 'Reviews',
    faq: 'FAQ',
    signIn: 'Sign In',
    sovereignPortals: 'Sovereign Portals Gateway',
    platformTitle: 'MJM Platform',
    smartBusiness: 'Smart Business',
    heroDesc: 'Next-generation Super ERP system powered by autonomous AI intelligence. Unified workflows, maximum speed, and unprecedented operational accuracy.',
    startJourney: 'Start Your Journey',
    watchDemo: 'Watch Demo',
    executiveOperations: 'Executive Operations Portal',
    encryptedLive: 'Encrypted & Live',
    workflowFlow: 'Process Workflow Flow',
    kpiIndex: 'KPI Index',
    transactions: 'Transactions',
    automation: 'Smart Automation',
    security: 'Sovereign Security',
    productivity: 'Productivity',
    productivityDesc: 'Operational performance boosted exponentially with smart AI models.',
    integratedPortals: 'Integrated Portals',
    solutionsTitle: 'Solutions Built for Excellence',
    card1Title: 'Public & Corporate Services',
    card1Desc: 'Unified administration and operational workflow management in a single hub.',
    card2Title: 'Travel & Cargo Logistics',
    card2Desc: 'Intelligent routing, cargo dispatching, and high-precision freight tracking.',
    card3Title: 'Asset & Capital Management',
    card3Desc: 'Comprehensive asset tracking, financial audit vaults, and capital risk controls.',
    card4Title: 'Machine Intelligence',
    card4Desc: 'Predictive data pipelines and automated analytical engines for executive decisions.',
    advancedTech: 'Advanced Technology',
    aiSectionTitle: 'Smart Automation for a Limitless Future',
    aiSectionDesc: 'We don’t just supply software tools; we engineer an autonomous operational mind that learns from your enterprise rhythms to outperform competitors.',
    discoverMoreAi: 'Discover more about AI',
    smartAssistant: 'Smart AI Assistant',
    smartAssistantDesc: 'Autonomous virtual assistant for real-time task allocation and operational queries.',
    performanceTracking: 'Performance System',
    performanceTrackingDesc: 'Millisecond telemetry across corporate KPIs with autonomous scorecards.',
    dailyAiAnalytics: 'Daily AI Analytics Execution',
    live: 'LIVE',
    secureTitle: 'Sovereign Data Security',
    secureDesc: 'Military-grade AES-256 encryption ensuring airtight corporate privacy and resilience against all vectors.',
    fastTitle: 'Ultra-Fast Execution',
    fastDesc: 'Our proprietary engine guarantees sub-second execution across high-frequency transactional flows.',
    responseLatency: 'Response Latency',
    latencyValue: '1.2 seconds',
    clientTrust: 'Client Trust',
    testimonialsTitle: 'Client Testimonials',
    rev1Text: '"MJM made a monumental leap in how we manage our freight operations. The efficiency gains transformed our revenue margins visibly every single day."',
    rev1Author: 'Ahmed Al-Mansoor',
    rev1Role: 'CEO, Al-Masar Logistics',
    rev2Text: '"The autonomous reconciliation and real-time audit tools cut down our financial closing cycle from weeks to mere hours."',
    rev2Author: 'Sarah Al-Qahtani',
    rev2Role: 'Chief Financial Officer, Horizon Group',
    rev3Text: '"The most seamless corporate platform integration we have experienced across multi-branch retail and customs clearance."',
    rev3Author: 'Tariq Al-Hashemi',
    rev3Role: 'Chairman, Hashemi Trading',
    faqBadge: 'Transparency & Knowledge',
    faqTitle: 'Frequently Asked Questions',
    askAiTitle: 'Ask MJM AI Assistant',
    askAiPlaceholder: 'Ask about security protocols, integration APIs, or autonomous workflows...',
    askAiButton: 'Ask Question',
    instantAiResponse: 'Instant AI Intelligence',
    aiAnswerPrefix: '[MJM AI Engine]',
    faqs: [
      {
        q: 'How does the system protect sensitive data?',
        a: 'We employ sovereign military-grade AES-256 encryption with isolated cloud vaults and multi-tier RBAC access controls compliant with international GDPR and ISO standards.'
      },
      {
        q: 'Can MJM integrate with our existing systems?',
        a: 'Yes, our platform provides advanced RESTful APIs and real-time Webhooks for seamless integration with ERPs, banking networks, and logistics hubs.'
      },
      {
        q: 'What is the advantage of smart AI automation over legacy systems?',
        a: 'MJM automation is predictive and adaptive, learning from operational flows to execute reporting, compliance, and auditing autonomously.'
      },
      {
        q: 'How are reports updated during operations?',
        a: 'All analytics update via real-time WebSocket streams with millisecond synchronization across all executive screens.'
      }
    ],
    footerAbout: 'Pioneering unified smart enterprise suites, fusing next-generation AI automation with sovereign security architecture.',
    quickLinks: 'Quick Links',
    linkAbout: 'About Platform',
    linkServices: 'Our Services',
    linkDashboard: 'ERP Dashboard',
    linkRegister: 'Register Account',
    supportTitle: 'Technical Support',
    linkHelp: 'Help Center',
    linkContact: 'Contact Us',
    linkPrivacy: 'Privacy Policy',
    linkTerms: 'Terms & Conditions',
    newsletterTitle: 'Subscribe to Newsletter',
    newsletterDesc: 'Be the first to receive sovereign technology and operational updates.',
    newsletterPlaceholder: 'Your work email',
    newsletterButton: 'Subscribe',
    newsletterSuccess: 'Subscribed successfully!',
    copyright: 'All rights reserved MJM Smart Business Platform'
  },

  hi: {
    dir: 'ltr',
    getStarted: 'अभी शुरू करें',
    home: 'मुख्य पृष्ठ',
    features: 'विशेषताएं',
    ai: 'आर्टिफिशियल इंटेलिजेंस (AI)',
    reviews: 'समीक्षाएं',
    faq: 'सामान्य प्रश्न',
    signIn: 'साइन इन करें',
    sovereignPortals: 'संप्रभु संचालन पोर्टल',
    platformTitle: 'MJM प्लेटफ़ॉर्म',
    smartBusiness: 'स्मार्ट बिज़नेस',
    heroDesc: 'आर्टिफिशियल इंटेलिजेंस द्वारा संचालित अगली पीढ़ी का सुपर ईआरपी सिस्टम। निर्बाध वर्कफ़्लो, तेज़ गति और अभूतपूर्व परिचालन सटीकता।',
    startJourney: 'अपनी यात्रा शुरू करें',
    watchDemo: 'डेमो देखें',
    executiveOperations: 'कार्यकारी संचालन पोर्टल',
    encryptedLive: 'सुरक्षित एवं सक्रिय',
    workflowFlow: 'कार्यप्रवाह दक्षता',
    kpiIndex: 'प्रदर्शन सूचकांक',
    transactions: 'लेन-देन',
    automation: 'स्मार्ट स्वचालन',
    security: 'सुरक्षा एवं संप्रभुता',
    productivity: 'उत्पादकता',
    productivityDesc: 'स्मार्ट एआई तकनीकों के साथ परिचालन प्रदर्शन में उल्लेखनीय सुधार।',
    integratedPortals: 'एकीकृत पोर्टल',
    solutionsTitle: 'उत्कृष्टता के लिए तैयार समाधान',
    card1Title: 'सार्वजनिक एवं कॉर्पोरेट सेवाएं',
    card1Desc: 'सभी प्रशासनिक और परिचालन प्रक्रियाओं का एक ही मंच पर संपूर्ण प्रबंधन।',
    card2Title: 'यात्रा एवं कार्गो लॉजिस्टिक्स',
    card2Desc: 'सटीक ट्रैकिंग और सुरक्षित प्रबंधन के लिए बुद्धिमान लॉजिस्टिक्स सिस्टम।',
    card3Title: 'परिसंपत्ति एवं वित्तीय प्रबंधन',
    card3Desc: 'कॉर्पोरेट संपत्तियों की सुरक्षा और संपूर्ण ऑडिट ट्रेल के साथ निगरानी।',
    card4Title: 'मशीन इंटेलिजेंस एवं विश्लेषण',
    card4Desc: 'कार्यकारी निर्णयों को सशक्त बनाने के लिए उन्नत बिग डेटा एनालिटिक्स।',
    advancedTech: 'उन्नत तकनीक',
    aiSectionTitle: 'असीमित भविष्य के लिए स्मार्ट स्वचालन',
    aiSectionDesc: 'हम केवल सॉफ़्टवेयर टूल नहीं देते, बल्कि आपके व्यवसाय के लिए एक स्वायत्त डिजिटल मस्तिष्क तैयार करते हैं जो निरंतर सीखता है।',
    discoverMoreAi: 'AI के बारे में और जानें',
    smartAssistant: 'स्मार्ट AI सहायक',
    smartAssistantDesc: 'दैनिक कार्यों के स्वचालन और शेड्यूलिंग के लिए वर्चुअल सहायक।',
    performanceTracking: 'प्रदर्शन ट्रैकिंग सिस्टम',
    performanceTrackingDesc: 'प्रमुख संकेतकों (KPIs) की रीयल-टाइम निगरानी और ऑटो-स्कोरिंग।',
    dailyAiAnalytics: 'दैनिक एआई एनालिटिक्स निष्पादन',
    live: 'लाइव',
    secureTitle: 'संप्रभु डेटा सुरक्षा',
    secureDesc: 'अंतरराष्ट्रीय मानकों के अनुरूप सैन्य-स्तरीय AES-256 एन्क्रिप्शन।',
    fastTitle: 'अत्यंत तीव्र निष्पादन',
    fastDesc: 'हमारा उन्नत इंजन सभी लेनदेन को एक सेकंड के अंश में प्रोसेस करता है।',
    responseLatency: 'प्रतिक्रिया समय',
    latencyValue: '1.2 सेकंड',
    clientTrust: 'ग्राहकों का विश्वास',
    testimonialsTitle: 'ग्राहक समीक्षाएं',
    rev1Text: '"MJM ने हमारे लॉजिस्टिक्स संचालन को पूरी तरह बदल दिया है। दक्षता में भारी सुधार हुआ है।"',
    rev1Author: 'अहमद अल-मंसूर',
    rev1Role: 'सीईओ, अल-मसार लॉजिस्टिक्स',
    rev2Text: '"स्वचालित वित्तीय ऑडिट ने हमारा कई हफ़्तों का काम कुछ घंटों में समेट दिया है।"',
    rev2Author: 'सारा अल-क़हतानी',
    rev2Role: 'मुख्य वित्तीय अधिकारी, होराइजन ग्रुप',
    rev3Text: '"अपनी सभी शाखाओं को एक ही प्लेटफॉर्म पर प्रबंधित करने का यह सबसे बेहतरीन समाधान है।"',
    rev3Author: 'तारिक अल-हाशमी',
    rev3Role: 'अध्यक्ष, हाशमी ट्रेडिंग',
    faqBadge: 'पारदर्शिता एवं ज्ञान',
    faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
    askAiTitle: 'MJM AI सहायक से पूछें',
    askAiPlaceholder: 'सिस्टम सुविधाओं, सुरक्षा या एकीकरण के बारे में पूछें...',
    askAiButton: 'प्रश्न पूछें',
    instantAiResponse: 'त्वरित एआई प्रतिक्रिया',
    aiAnswerPrefix: '[MJM AI इंजन]',
    faqs: [
      {
        q: 'सिस्टम संवेदनशील डेटा की सुरक्षा कैसे करता है?',
        a: 'हम सुरक्षित क्लाउड वॉल्ट्स और मिलिट्री-ग्रेड AES-256 एन्क्रिप्शन का उपयोग करते हैं।'
      },
      {
        q: 'क्या MJM हमारे मौजूदा सिस्टम से जुड़ सकता है?',
        a: 'हाँ, हम सहज एकीकरण के लिए REST APIs और Webhooks प्रदान करते हैं।'
      },
      {
        q: 'पारंपरिक प्रणालियों की तुलना में MJM का क्या लाभ है?',
        a: 'यह 99.8% सटीकता के साथ प्रक्रियाओं का पूर्वानुमान लगाकर उन्हें स्वचालित करता है।'
      },
      {
        q: 'क्या रिपोर्ट तुरंत अपडेट होती हैं?',
        a: 'हाँ, सभी रिपोर्ट वास्तविक समय (WebSocket) में तुरंत अपडेट होती हैं।'
      }
    ],
    footerAbout: 'स्मार्ट बिजनेस सॉल्यूशंस में अग्रणी, उन्नत एआई और संप्रभु सुरक्षा का अनूठा संगम।',
    quickLinks: 'त्वरित लिंक',
    linkAbout: 'प्लेटफ़ॉर्म के बारे में',
    linkServices: 'हमारी सेवाएं',
    linkDashboard: 'ईआरपी डैशबोर्ड',
    linkRegister: 'नया खाता बनाएं',
    supportTitle: 'तकनीकी सहायता',
    linkHelp: 'सहायता केंद्र',
    linkContact: 'संपर्क करें',
    linkPrivacy: 'गोपनीयता नीति',
    linkTerms: 'नियम एवं शर्तें',
    newsletterTitle: 'न्यूज़लेटर सब्सक्राइब करें',
    newsletterDesc: 'नवीनतम अपडेट सबसे पहले प्राप्त करें।',
    newsletterPlaceholder: 'आपका ईमेल पता',
    newsletterButton: 'सब्सक्राइब',
    newsletterSuccess: 'सफलतापूर्वक सब्सक्राइब किया गया!',
    copyright: 'सर्वाधिकार सुरक्षित MJM स्मार्ट बिज़नेस प्लेटफ़ॉर्म'
  },

  bn: {
    dir: 'ltr',
    getStarted: 'এখনই শুরু করুন',
    home: 'হোম',
    features: 'বৈশিষ্ট্যসমূহ',
    ai: 'কৃত্রিম বুদ্ধিমত্তা (AI)',
    reviews: 'মতামত',
    faq: 'প্রশ্নোত্তর',
    signIn: 'লগইন করুন',
    sovereignPortals: 'সার্বভৌম অপারেশনাল পোর্টাল',
    platformTitle: 'MJM প্ল্যাটফর্ম',
    smartBusiness: 'স্মার্ট বিজনেস',
    heroDesc: 'কৃত্রিম বুদ্ধিমত্তা চালিত আধুনিক সুপার ইআরপি সিস্টেম। ব্যবসার গতি, নিরাপত্তা ও কার্যক্ষমতার এক নতুন যুগ।',
    startJourney: 'আপনার যাত্রা শুরু করুন',
    watchDemo: 'ডেমো দেখুন',
    executiveOperations: 'নির্বাহী পরিচালনা পোর্টাল',
    encryptedLive: 'সুরক্ষিত ও লাইভ',
    workflowFlow: 'কাজের গতি ও দক্ষতা',
    kpiIndex: 'পারফরম্যান্স ইনডেক্স',
    transactions: 'লেনদেন',
    automation: 'স্মার্ট অটোমেশন',
    security: 'নিরাপত্তা ও সার্বভৌমত্ব',
    productivity: 'উৎপাদনশীলতা',
    productivityDesc: 'আমাদের স্মার্ট প্রযুক্তির মাধ্যমে প্রতিষ্ঠানের উৎপাদনশীলতা উল্লেখযোগ্যভাবে বৃদ্ধি পায়।',
    integratedPortals: 'সমন্বিত পোর্টাল',
    solutionsTitle: 'উৎকর্ষের জন্য তৈরি সমাধান',
    card1Title: 'সাধারণ ও কর্পোরেট সেবা',
    card1Desc: 'একই প্ল্যাটফর্মে সকল প্রশাসনিক ও পরিচালনা সংক্রান্ত কাজের সহজ ব্যবস্থাপনা।',
    card2Title: 'ভ্রমণ ও কার্গো লজিস্টিকস',
    card2Desc: 'পণ্য পরিবহন ও ট্র্যাকিংয়ের জন্য অত্যন্ত নিরাপদ ও আধুনিক লজিস্টিকস সিস্টেম।',
    card3Title: 'সম্পদ ও মূলধন ব্যবস্থাপনা',
    card3Desc: 'প্রতিষ্ঠানের সকল আর্থিক সম্পদ ও বিনিয়োগের পূর্ণাঙ্গ নিরাপত্তা ও পর্যবেক্ষণ।',
    card4Title: 'মেশিন ইন্টেলিজেন্স ও অডিট',
    card4Desc: 'ব্যবসার সঠিক সিদ্ধান্ত গ্রহণের জন্য স্বয়ংক্রিয় বিগ ডেটা অ্যানালিটিক্স।',
    advancedTech: 'উন্নত প্রযুক্তি',
    aiSectionTitle: 'সীমাহীন ভবিষ্যতের জন্য স্মার্ট অটোমেশন',
    aiSectionDesc: 'আমরা কেবল সফটওয়্যার তৈরি করি না, বরং আপনার প্রতিষ্ঠানের জন্য একটি বুদ্ধিমান ডিজিটাল মস্তিষ্ক গড়ে তুলি।',
    discoverMoreAi: 'AI সম্পর্কে আরও জানুন',
    smartAssistant: 'স্মার্ট এআই সহকারী',
    smartAssistantDesc: 'দৈনন্দিন কাজ ও যোগাযোগের জন্য স্বয়ংক্রিয় ভার্চুয়াল সহকারী।',
    performanceTracking: 'পারফরম্যান্স ট্র্যাকিং',
    performanceTrackingDesc: 'রিয়েল-টাইমে কর্মীদের কাজের মান এবং কেপিআই মূল্যায়ন।',
    dailyAiAnalytics: 'দৈনিক এআই বিশ্লেষণ',
    live: 'লাইভ',
    secureTitle: 'সার্বভৌম ডেটা সুরক্ষা',
    secureDesc: 'আন্তর্জাতিক মানের মিলিটারি-গ্রেড AES-256 এনক্রিপশন সুরক্ষা।',
    fastTitle: 'দ্রুততম লেনদেন সম্পাদন',
    fastDesc: 'আমাদের শক্তিশালী ইঞ্জিন প্রতিটি লেনদেন সেকেন্ডের ভগ্নাংশে সম্পন্ন করে।',
    responseLatency: 'রেসপন্স সময়',
    latencyValue: '১.২ সেকেন্ড',
    clientTrust: 'গ্রাহকদের আস্থা',
    testimonialsTitle: 'গ্রাহকদের প্রতিক্রিয়া',
    rev1Text: '"MJM প্ল্যাটফর্ম আমাদের লজিস্টিকস পরিচালনাকে অবিশ্বাস্যভাবে সহজ ও দ্রুততর করেছে।"',
    rev1Author: 'আহমেদ আল-মানসুর',
    rev1Role: 'সিইও, আল-মাসার লজিস্টিকস',
    rev2Text: '"রিয়েল-টাইম অডিট ও রিপোর্ট আমাদের হিসাব বিভাগের সময় বহুলাংশে বাঁচিয়ে দিয়েছে।"',
    rev2Author: 'সারাহ আল-কাহতানি',
    rev2Role: 'সিএফও, দিগন্ত গ্রুপ',
    rev3Text: '"সকল শাখা ও ব্যাংক অ্যাকাউন্টকে একত্রে পরিচালনার জন্য সেরা সফটওয়্যার।"',
    rev3Author: 'তারেক আল-হাশেমি',
    rev3Role: 'চেয়ারম্যান, হাশেমি ট্রেডিং',
    faqBadge: 'স্বচ্ছতা ও তথ্য',
    faqTitle: 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী',
    askAiTitle: 'MJM এআই সহকারীকে জিজ্ঞাসা করুন',
    askAiPlaceholder: 'সিস্টেমের সুবিধা বা ইন্টিগ্রেশন সম্পর্কে প্রশ্ন করুন...',
    askAiButton: 'প্রশ্ন পাঠান',
    instantAiResponse: 'তাৎক্ষণিক এআই উত্তর',
    aiAnswerPrefix: '[MJM স্মার্ট ইঞ্জিন]',
    faqs: [
      {
        q: 'সিস্টেমটি কীভাবে সংবেদনশীল ডেটা রক্ষা করে?',
        a: 'আমরা মিলিটারি-গ্রেড AES-256 এনক্রিপশন এবং বিচ্ছিন্ন ক্লাউড ভল্ট ব্যবহার করি।'
      },
      {
        q: 'MJM কি আমাদের বর্তমান সফটওয়্যারের সাথে যুক্ত হতে পারে?',
        a: 'হ্যাঁ, আমরা REST APIs এবং Webhooks এর মাধ্যমে যেকোনো সিস্টেমে যুক্ত হতে পারি।'
      },
      {
        q: 'চিরাচরিত ইআরপির চেয়ে MJM এর বিশেষত্ব কী?',
        a: 'এটি ৯৯.৮% নির্ভুলতায় নিজেই ডেটা বিশ্লেষণ ও স্বয়ংক্রিয় কাজ সম্পাদন করে।'
      },
      {
        q: 'রিপোর্ট কি তাৎক্ষণিকভাবে আপডেট হয়?',
        a: 'হ্যাঁ, প্রতিটি লেনদেন রিয়েল-টাইমে সরাসরি ড্যাশবোর্ডে প্রতিফলিত হয়।'
      }
    ],
    footerAbout: 'স্মার্ট ব্যবসায়িক ব্যবস্থাপনায় অগ্রগামী, এআই প্রযুক্তি ও সার্বভৌম নিরাপত্তার মেলবন্ধন।',
    quickLinks: 'প্রয়োজনীয় লিংক',
    linkAbout: 'প্ল্যাটফর্ম পরিচিতি',
    linkServices: 'সেবাসমূহ',
    linkDashboard: 'ইআরপি ড্যাশবোর্ড',
    linkRegister: 'নতুন অ্যাকাউন্ট তৈরি',
    supportTitle: 'কারিগরি সহায়তা',
    linkHelp: 'হেল্প সেন্টার',
    linkContact: 'যোগাযোগ',
    linkPrivacy: 'গোপনীয়তা নীতি',
    linkTerms: 'শর্তাবলী',
    newsletterTitle: 'নিউজলেটার সাবস্ক্রাইব করুন',
    newsletterDesc: 'সবার আগে নতুন আপডেট পান।',
    newsletterPlaceholder: 'আপনার ইমেইল ঠিকানা',
    newsletterButton: 'সাবস্ক্রাইব',
    newsletterSuccess: 'সফলভাবে সাবস্ক্রাইব করা হয়েছে!',
    copyright: 'সর্বস্বত্ব সংরক্ষিত MJM স্মার্ট বিজনেস প্ল্যাটফর্ম'
  },

  fr: {
    dir: 'ltr',
    getStarted: 'Commencer',
    home: 'Accueil',
    features: 'Fonctionnalités',
    ai: 'Intelligence Artificielle',
    reviews: 'Avis',
    faq: 'FAQ',
    signIn: 'Connexion',
    sovereignPortals: 'Portail Opérationnel Souverain',
    platformTitle: 'Plateforme MJM',
    smartBusiness: 'Smart Business',
    heroDesc: 'Système Super ERP nouvelle génération propulsé par une IA autonome. Gestion unifiée, automatisation maximale et précision opérationnelle absolue.',
    startJourney: 'Commencez Votre Parcours',
    watchDemo: 'Voir la Démo',
    executiveOperations: 'Portail Opérations Exécutives',
    encryptedLive: 'Sécurisé et Actif',
    workflowFlow: 'Efficacité des Processus',
    kpiIndex: 'Indice de Performance',
    transactions: 'Transactions',
    automation: 'Automatisation IA',
    security: 'Sécurité Souveraine',
    productivity: 'Productivité',
    productivityDesc: 'Performance opérationnelle décuplée grâce à nos algorithmes d’IA prédictive.',
    integratedPortals: 'Portails Intégrés',
    solutionsTitle: 'Solutions Conçues pour l’Excellence',
    card1Title: 'Services Généraux & Entreprise',
    card1Desc: 'Gestion centralisée de l’ensemble des opérations administratives et logistiques.',
    card2Title: 'Voyage, Fret & Logistique',
    card2Desc: 'Systèmes logistiques intelligents pour le suivi et l’acheminement du fret en temps réel.',
    card3Title: 'Gestion d’Actifs & Finance',
    card3Desc: 'Protection et audit des capitaux d’entreprise avec traçabilité intégrale.',
    card4Title: 'Intelligence Artificielle & Audit',
    card4Desc: 'Analyses prédictives basées sur le Big Data pour éclairer les décisions stratégiques.',
    advancedTech: 'Technologie de Pointe',
    aiSectionTitle: 'Automatisation Intelligente pour un Avenir Illimité',
    aiSectionDesc: 'Nous ne fournissons pas de simples logiciels : nous concevons un cerveau numérique pour votre entreprise qui apprend de chaque transaction.',
    discoverMoreAi: 'En savoir plus sur l’IA',
    smartAssistant: 'Assistant IA Intelligent',
    smartAssistantDesc: 'Assistant virtuel autonome pour l’ordonnancement des tâches et le support interne.',
    performanceTracking: 'Suivi des Performances',
    performanceTrackingDesc: 'Télémétrie en temps réel sur l’ensemble des KPI avec notation automatique.',
    dailyAiAnalytics: 'Analyses Quotidiennes IA',
    live: 'EN DIRECT',
    secureTitle: 'Sécurité des Données Souveraine',
    secureDesc: 'Chiffrement AES-256 de niveau militaire garantissant la confidentialité absolue de vos données.',
    fastTitle: 'Exécution Ultra-Rapide',
    fastDesc: 'Notre moteur exclusif traite les flux transactionnels en une fraction de seconde sans aucune latence.',
    responseLatency: 'Temps de Réponse',
    latencyValue: '1.2 secondes',
    clientTrust: 'Confiance Partenaires',
    testimonialsTitle: 'Témoignages Clients',
    rev1Text: '"La plateforme MJM a révolutionné notre gestion logistique internationale. Le gain en rentabilité est visible chaque jour."',
    rev1Author: 'Ahmed Al-Mansoor',
    rev1Role: 'Directeur Général, Al-Masar Logistics',
    rev2Text: '"L’audit automatisé et les rapports en direct ont réduit notre clôture mensuelle de deux semaines à quelques heures."',
    rev2Author: 'Sarah Al-Qahtani',
    rev2Role: 'Directrice Financière, Groupe Horizon',
    rev3Text: '"La solution ERP la plus fluide pour interconnecter nos filiales et entrepôts sur un tableau de bord unique."',
    rev3Author: 'Tariq Al-Hashemi',
    rev3Role: 'Président, Hashemi Trading',
    faqBadge: 'Transparence & Expertise',
    faqTitle: 'Questions Fréquemment Posées',
    askAiTitle: 'Interroger l’Assistant IA MJM',
    askAiPlaceholder: 'Posez une question sur l’intégration, la sécurité ou l’ERP...',
    askAiButton: 'Poser la question',
    instantAiResponse: 'Réponse IA Immédiate',
    aiAnswerPrefix: '[Moteur IA MJM]',
    faqs: [
      {
        q: 'Comment le système protège-t-il les données sensibles ?',
        a: 'Nous utilisons un chiffrement souverain AES-256 avec coffres-forts cloud isolés et contrôle d’accès RBAC certifié ISO et RGPD.'
      },
      {
        q: 'MJM peut-il s’intégrer à nos outils existants ?',
        a: 'Oui, notre plateforme dispose d’APIs RESTful et de Webhooks pour se connecter aux banques et systèmes existants sans interruption.'
      },
      {
        q: 'Quel est l’avantage de l’IA par rapport aux ERP classiques ?',
        a: 'Notre IA anticipe les anomalies et automatise les processus de conformité avec 99,8% de précision.'
      },
      {
        q: 'Les rapports sont-ils mis à jour en direct ?',
        a: 'Oui, grâce à des flux WebSocket en temps réel synchronisés à la milliseconde près.'
      }
    ],
    footerAbout: 'Leader des suites d’entreprise intelligentes, combinant l’intelligence artificielle de pointe et la souveraineté numérique.',
    quickLinks: 'Liens Rapides',
    linkAbout: 'À propos de la plateforme',
    linkServices: 'Nos Services',
    linkDashboard: 'Tableau de Bord ERP',
    linkRegister: 'Créer un Compte',
    supportTitle: 'Support Technique',
    linkHelp: 'Centre d’Aide',
    linkContact: 'Contactez-nous',
    linkPrivacy: 'Politique de Confidentialité',
    linkTerms: 'Conditions Générales',
    newsletterTitle: 'Abonnez-vous à la Newsletter',
    newsletterDesc: 'Recevez nos dernières innovations en priorité.',
    newsletterPlaceholder: 'Votre adresse e-mail',
    newsletterButton: 'S’inscrire',
    newsletterSuccess: 'Inscription réussie !',
    copyright: 'Tous droits réservés Plateforme MJM Smart Business'
  }
};

export function getLandingContent(langCode: string): LandingContent {
  if (LANDING_TRANSLATIONS[langCode]) {
    return LANDING_TRANSLATIONS[langCode];
  }
  // For other languages in the 100+ set, return English default with appropriate direction
  const isRTL = ['ar', 'ur', 'fa', 'ps', 'sd', 'he', 'ug', 'dv', 'ku'].includes(langCode);
  if (isRTL) {
    return {
      ...LANDING_TRANSLATIONS.ar,
      dir: 'rtl'
    };
  }
  return LANDING_TRANSLATIONS.en;
}
