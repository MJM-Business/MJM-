import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export type ExportLanguage = 'ar' | 'en' | 'ur';

/**
 * Common translations dictionary across Arabic, English, and Urdu
 */
export const corporateDictionary = {
  roles: {
    'محلل بيانات أول ورئيس فريق الذكاء الاصطناعي': {
      en: 'Lead Data Analyst & AI Team Head',
      ur: 'سینئر ڈیٹا اینالسٹ و سربراہ AI ٹیم'
    },
    'مدير العمليات وقائد الفريق الفني': {
      en: 'Head of Operations & Tech Lead',
      ur: 'ڈائریکٹر آپریشنز و تکنیکی ٹیم لیڈر'
    },
    'مصمم واجهات أول وتجربة مستخدم 3D': {
      en: 'Senior UI/UX & 3D Designer',
      ur: 'سینئر UI/UX اور 3D ڈیزائنر'
    },
    'مصمم واجهات وتطوير تجربة المستخدم': {
      en: 'UI/UX Designer',
      ur: 'UI/UX ڈیزائنر'
    },
    'مدير الصفقات العقارية والاستثمار': {
      en: 'Director of Real Estate & Investments',
      ur: 'ڈائریکٹر رئیل اسٹیٹ و سرمایہ کاری'
    },
    'مسؤولة علاقات كبار العملاء VIP والأصول': {
      en: 'VIP Client Relations & Asset Manager',
      ur: 'مینیجر VIP کلائنٹ ریلیشنز و اثاثہ جات'
    },
    'مدير تنفيذي - قطاع العقار': {
      en: 'Executive Director - Real Estate',
      ur: 'ایگزیکٹو ڈائریکٹر - رئیل اسٹیٹ'
    },
    'قائد عمليات اللوجستيات': {
      en: 'Logistics Operations Lead',
      ur: 'آپریشنز لیڈ برائے لاجسٹکس'
    },
    'محلل مالي واستثماري': {
      en: 'Financial & Investment Analyst',
      ur: 'مالیاتی و سرمایہ کاری تجزیہ کار'
    },
    'رئيس قسم تجربة المستخدم': {
      en: 'Head of UI/UX Department',
      ur: 'سربراہ شعبہ UI/UX'
    },
    'قائد فريق العمليات': {
      en: 'Operations Team Lead',
      ur: 'آپریشنز ٹیم لیڈ'
    },
    'الرئيس التنفيذي': {
      en: 'Chief Executive Officer (CEO)',
      ur: 'چیف ایگزیکٹو آفیسر (CEO)'
    },
    'قائد الفريق': {
      en: 'Team Leader',
      ur: 'ٹیم لیڈر'
    },
    'موظف': {
      en: 'Employee / Staff',
      ur: 'ملازم / عملہ'
    }
  },
  people: {
    'سارة العتيبي': { en: 'Sarah Al-Otaibi', ur: 'سارہ العتیبی' },
    'فيصل بن خالد': { en: 'Faisal Bin Khalid', ur: 'فیصل بن خالد' },
    'نورة سليمان': { en: 'Noura Sulaiman', ur: 'نورہ سلیمان' },
    'نورة سليمان (Staff Member)': { en: 'Noura Sulaiman', ur: 'نورہ سلیمان' },
    'عبدالرحمن الشهري': { en: 'Abdulrahman Al-Shehri', ur: 'عبدالرحمن الشہری' },
    'ليلى المنصور': { en: 'Layla Al-Mansour', ur: 'لیلیٰ المنصور' },
    'م. راشد آل ناصر': { en: 'Eng. Rashid Al-Nasser', ur: 'انجینئر راشد الناصر' },
    'د. فيصل المنصور': { en: 'Dr. Faisal Al-Mansour', ur: 'ڈاکٹر فیصل المنصور' },
    'محمد المنصور': { en: 'Mohammed Al-Mansour', ur: 'محمد المنصور' },
    'ألكسندر ثورن': { en: 'Alexander Thorne (CEO)', ur: 'الیگزینڈر تھورن (CEO)' }
  },
  businesses: {
    'إم جي إم للحلول التقنية والذكاء الاصطناعي': { en: 'MJM AI & Tech Solutions', ur: 'ایم جے ایم برائے مصنوعی ذہانت و ٹیکنالوجی' },
    'إم جي إم للتقنية والذكاء الاصطناعي': { en: 'MJM AI Solutions', ur: 'ایم جے ایم AI سسٹمز' },
    'إم جي إم للتطوير العقاري': { en: 'MJM Luxury Real Estate', ur: 'ایم جے ایم لگژری رئیل اسٹیٹ' },
    'إم جي إم للخدمات اللوجستية': { en: 'MJM Global Logistics', ur: 'ایم جے ایم گلوبل لاجسٹکس' },
    'إم جي إم للاستثمار السيادي': { en: 'MJM Sovereign Investment', ur: 'ایم جے ایم خودمختار سرمایہ کاری' },
    'إم جي إم للاستيراد والتصدير': { en: 'MJM Import & Export', ur: 'ایم جے ایم برائے درآمد و برآمد' },
    'إم جي إم للحلول التقنية والابتكار': { en: 'MJM Tech Solutions', ur: 'ایم جے ایم ٹیک سلوشنز' }
  },
  statuses: {
    'معتمد': { en: 'VERIFIED', ur: 'تصدیق شدہ' },
    'مكتمل': { en: 'COMPLETED', ur: 'مکمل شدہ' },
    'قيد المراجعة': { en: 'IN REVIEW', ur: 'زیرِ جائزہ' },
    'نشط': { en: 'ACTIVE', ur: 'فعال' },
    'عن بُعد': { en: 'REMOTE', ur: 'ریموٹ / آن لائن' },
    'إنهاء خدمة': { en: 'DISMISSED', ur: 'ملازمت ختم' },
    'VERIFIED': { ar: 'معتمد', ur: 'تصدیق شدہ' },
    'COMPLETED': { ar: 'مكتمل', ur: 'مکمل شدہ' },
    'IN REVIEW': { ar: 'قيد المراجعة', ur: 'زیرِ جائزہ' }
  }
};

/**
 * Normalizes text for standard Latin PDF fonts (Helvetica),
 * providing transliterated / clear English fallback if Arabic/Urdu glyphs are encountered
 */
export function sanitizeForPdf(text: any): string {
  if (text === null || text === undefined) return '-';
  const str = String(text).trim();
  if (!str) return '-';

  // Check if string contains non-Latin characters (Arabic, Urdu, etc.)
  const hasNonLatin = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(str);
  
  if (!hasNonLatin) {
    return str;
  }

  // Lookup in dictionary
  if ((corporateDictionary.roles as any)[str]?.en) return (corporateDictionary.roles as any)[str].en;
  if ((corporateDictionary.people as any)[str]?.en) return (corporateDictionary.people as any)[str].en;
  if ((corporateDictionary.businesses as any)[str]?.en) return (corporateDictionary.businesses as any)[str].en;
  if ((corporateDictionary.statuses as any)[str]?.en) return (corporateDictionary.statuses as any)[str].en;

  // Generic clean replacement
  return str.replace(/[^\x00-\x7F]/g, '').trim() || 'Verified Record';
}

/**
 * Translates a key or value according to target ExportLanguage
 */
export function translateValue(val: any, lang: ExportLanguage): string {
  if (val === null || val === undefined) return '-';
  const str = String(val).trim();
  if (!str) return '-';

  if (lang === 'en') {
    return sanitizeForPdf(str);
  }

  if (lang === 'ur') {
    if ((corporateDictionary.roles as any)[str]?.ur) return (corporateDictionary.roles as any)[str].ur;
    if ((corporateDictionary.people as any)[str]?.ur) return (corporateDictionary.people as any)[str].ur;
    if ((corporateDictionary.businesses as any)[str]?.ur) return (corporateDictionary.businesses as any)[str].ur;
    if ((corporateDictionary.statuses as any)[str]?.ur) return (corporateDictionary.statuses as any)[str].ur;
    return str;
  }

  // Arabic
  if ((corporateDictionary.statuses as any)[str]?.ar) return (corporateDictionary.statuses as any)[str].ar;
  return str;
}

/**
 * Exports data rows to a real Excel (.xlsx) file with full UTF-8 encoding
 * Supporting Arabic (العربية), English (English), and Urdu (اردو)
 */
export const exportToExcel = (
  data: Record<string, any>[],
  fileName: string,
  sheetName: string = 'Report'
) => {
  try {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    
    // Auto calculate column widths
    if (data.length > 0) {
      const colWidths = Object.keys(data[0]).map((key) => {
        const maxLen = Math.max(
          key.length,
          ...data.map((row) => String(row[key] ?? '').length)
        );
        return { wch: Math.min(Math.max(maxLen + 4, 14), 50) };
      });
      ws['!cols'] = colWidths;
    }

    XLSX.writeFile(wb, `${fileName}.xlsx`);
  } catch (err) {
    console.error('Failed to export using XLSX, falling back to CSV with UTF-8 BOM:', err);
    exportToCsvWithBom(data, fileName);
  }
};

/**
 * Fallback CSV export with UTF-8 BOM for Arabic/Urdu native language support
 */
export const exportToCsvWithBom = (data: Record<string, any>[], fileName: string) => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Header row
  csvRows.push(headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','));

  // Value rows
  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header] ?? '';
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvContent = '\uFEFF' + csvRows.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Exports data to a formatted executive PDF report with language switching support
 */
export const exportToPdf = (
  title: string,
  subtitle: string,
  columns: { header: string; dataKey: string }[],
  data: Record<string, any>[],
  fileName: string,
  summaryMetrics?: { label: string; value: string }[],
  lang: ExportLanguage = 'en'
) => {
  // When language is Arabic or Urdu, browser print-to-PDF renders 100% native typography,
  // right-to-left alignment, and complex ligatures without any library font corruption.
  if (lang === 'ar' || lang === 'ur') {
    triggerPrintReport(title, subtitle, data, lang, summaryMetrics);
    return;
  }

  // English jsPDF direct download
  try {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Dark luxury executive header banner
    doc.setFillColor(15, 14, 18);
    doc.rect(0, 0, 297, 28, 'F');

    // Gold accent bar
    doc.setFillColor(212, 175, 53);
    doc.rect(0, 28, 297, 2, 'F');

    // Title
    doc.setTextColor(245, 215, 127);
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    const safeTitle = sanitizeForPdf(title).toUpperCase();
    doc.text(`MJM SOVEREIGN ENTERPRISE - ${safeTitle}`, 14, 14);

    // Subtitle & Timestamp
    doc.setTextColor(180, 180, 190);
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'normal');
    const safeSubtitle = sanitizeForPdf(subtitle);
    doc.text(`${safeSubtitle} | Generated: ${new Date().toLocaleString('en-US')}`, 14, 22);

    let startY = 38;

    // Summary Metrics Blocks
    if (summaryMetrics && summaryMetrics.length > 0) {
      doc.setFontSize(9);
      const boxWidth = Math.min(65, (270 / summaryMetrics.length));
      
      summaryMetrics.forEach((metric, idx) => {
        const x = 14 + idx * (boxWidth + 4);
        doc.setFillColor(245, 245, 247);
        doc.roundedRect(x, startY, boxWidth, 14, 2, 2, 'F');
        
        doc.setTextColor(100, 100, 110);
        doc.setFont('helvetica', 'normal');
        doc.text(sanitizeForPdf(metric.label), x + 3, startY + 5);

        doc.setTextColor(20, 20, 30);
        doc.setFont('helvetica', 'bold');
        doc.text(sanitizeForPdf(metric.value), x + 3, startY + 11);
      });

      startY += 20;
    }

    // Sanitize columns and data rows to avoid font encoding errors
    const safeColumns = columns.map(c => ({
      header: sanitizeForPdf(c.header),
      dataKey: c.dataKey
    }));

    const safeData = data.map(row => {
      const sanitizedRow: Record<string, any> = {};
      for (const key of Object.keys(row)) {
        sanitizedRow[key] = sanitizeForPdf(row[key]);
      }
      return sanitizedRow;
    });

    // Table
    autoTable(doc, {
      startY: startY,
      columns: safeColumns,
      body: safeData,
      theme: 'grid',
      headStyles: {
        fillColor: [30, 26, 17],
        textColor: [245, 215, 127],
        fontStyle: 'bold',
        fontSize: 9,
      },
      bodyStyles: {
        fontSize: 8,
        textColor: [40, 40, 50],
      },
      alternateRowStyles: {
        fillColor: [248, 249, 250],
      },
      margin: { left: 14, right: 14 },
    });

    // Footer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 160);
      doc.text(
        `Confidential & Proprietary - MJM Holdings Group - Page ${i} of ${pageCount}`,
        14,
        202
      );
    }

    doc.save(`${fileName}.pdf`);
  } catch (err) {
    console.error('PDF export error, triggering print fallback:', err);
    triggerPrintReport(title, subtitle, data, lang, summaryMetrics);
  }
};

/**
 * Browser printable executive window with full native Arabic (العربية), Urdu (اردو), and English support
 */
export const triggerPrintReport = (
  title: string,
  subtitle: string,
  data: Record<string, any>[],
  lang: ExportLanguage = 'ar',
  summaryMetrics?: { label: string; value: string }[]
) => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const isRtl = lang === 'ar' || lang === 'ur';
  const orgTitle = lang === 'ar'
    ? 'مجموعة إم جي إم (MJM) القابضة — تقرير تنفيذي رسمي'
    : lang === 'ur'
    ? 'ایم جے ایم (MJM) ہولڈنگز گروپ — باضابطہ ایگزیکٹو رپورٹ'
    : 'MJM Sovereign Enterprise — Official Executive Report';

  const dateLabel = lang === 'ar'
    ? `تاريخ الاستخراج: ${new Date().toLocaleString('ar-SA')}`
    : lang === 'ur'
    ? `تاریخ و وقتِ اجرا: ${new Date().toLocaleString('ur-PK')}`
    : `Generated: ${new Date().toLocaleString('en-US')}`;

  const confidentialityNote = lang === 'ar'
    ? 'وثيقة رسمية وسرية للغاية خاصة بالرئاسة التنفيذية ومجلس الإدارة بمجموعة MJM'
    : lang === 'ur'
    ? 'خفیہ اور باضابطہ اندرونی دستاویز برائے چیف ایگزیکٹو اور انتظامیہ MJM'
    : 'Strictly Confidential & Proprietary Document — Executive Command of MJM Holding';

  const printBtnText = lang === 'ar' ? '🖨️ طباعة / حفظ بصيغة PDF' : lang === 'ur' ? '🖨️ پرنٹ / محفوظ بطور PDF' : '🖨️ Print / Save as PDF';
  const closeBtnText = lang === 'ar' ? 'إغلاق النافذة' : lang === 'ur' ? 'بند کریں' : 'Close Window';

  const html = `
    <!DOCTYPE html>
    <html dir="${isRtl ? 'rtl' : 'ltr'}" lang="${lang}">
    <head>
      <meta charset="utf-8">
      <title>${title} - MJM Executive Report</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
        
        * { box-sizing: border-box; }
        body { 
          font-family: ${lang === 'ur' ? "'Noto Nastaliq Urdu', 'Segoe UI', Tahoma, sans-serif" : "'Cairo', 'Segoe UI', Tahoma, sans-serif"}; 
          padding: 24px; 
          color: #111; 
          background: #fafafa;
          line-height: ${lang === 'ur' ? '1.8' : '1.5'};
        }
        .action-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: #15130e;
          border-radius: 12px;
          margin-bottom: 24px;
        }
        .action-bar button {
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: bold;
          font-size: 13px;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }
        .btn-print {
          background: #d4af35;
          color: #000;
        }
        .btn-print:hover { background: #f5d77f; }
        .btn-close {
          background: #2a251b;
          color: #f1d57f;
        }
        .btn-close:hover { background: #3a3326; }
        .header { 
          border-bottom: 3px solid #d4af35; 
          padding-bottom: 16px; 
          margin-bottom: 20px; 
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        h1 { margin: 0; color: #111; font-size: 20px; font-weight: 800; }
        .sub { color: #555; font-size: 13px; margin-top: 6px; }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }
        .metric-card {
          background: #fff;
          border: 1px solid #e2d2a4;
          border-radius: 8px;
          padding: 10px 14px;
        }
        .metric-label { font-size: 11px; color: #666; font-weight: 600; }
        .metric-val { font-size: 16px; font-weight: 800; color: #1a1710; margin-top: 4px; font-family: monospace; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; background: #fff; }
        th { background: #1a1710; color: #f5d77f; text-align: ${isRtl ? 'right' : 'left'}; padding: 10px 12px; border: 1px solid #333; font-weight: 700; }
        td { padding: 9px 12px; border: 1px solid #ddd; text-align: ${isRtl ? 'right' : 'left'}; }
        tr:nth-child(even) { background: #fbfbfb; }
        tr:hover { background: #f5f2e9; }
        .footer { 
          margin-top: 30px; 
          padding-top: 15px; 
          border-top: 1px solid #ddd; 
          font-size: 11px; 
          color: #777; 
          display: flex; 
          justify-content: space-between; 
        }
        @media print {
          body { padding: 0; background: #fff; }
          .action-bar { display: none !important; }
          @page { size: landscape; margin: 12mm; }
        }
      </style>
    </head>
    <body>
      <div class="action-bar">
        <span style="color: #f5d77f; font-size: 13px; font-weight: bold;">
          ${orgTitle}
        </span>
        <div style="display: flex; gap: 8px;">
          <button class="btn-print" onclick="window.print()">${printBtnText}</button>
          <button class="btn-close" onclick="window.close()">${closeBtnText}</button>
        </div>
      </div>

      <div class="header">
        <div>
          <h1>${title}</h1>
          <div class="sub">${subtitle}</div>
        </div>
        <div style="text-align: ${isRtl ? 'left' : 'right'}; font-size: 11px; color: #666;">
          <div><strong>MJM SOVEREIGN ENTERPRISE</strong></div>
          <div style="margin-top: 4px;">${dateLabel}</div>
        </div>
      </div>

      ${summaryMetrics && summaryMetrics.length > 0 ? `
        <div class="metrics-grid">
          ${summaryMetrics.map(m => `
            <div class="metric-card">
              <div class="metric-label">${m.label}</div>
              <div class="metric-val">${m.value}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <table>
        <thead>
          <tr>
            ${headers.map(h => `<th>${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${data.map(row => `
            <tr>
              ${headers.map(h => `<td>${row[h] ?? '-'}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="footer">
        <div>${confidentialityNote}</div>
        <div>Page 1 of 1</div>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 400);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
};
