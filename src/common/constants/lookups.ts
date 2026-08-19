export const GRADES = ['ابتدایی', 'متوسطه‌ی اول', 'متوسطه‌ی دوم', 'پشت کنکور', 'دانشجو'];

export const GRADE_LEVELS: Record<string, string[]> = {
  ابتدایی: ['اول', 'دوم', 'سوم', 'چهارم', 'پنجم', 'ششم'],
  'متوسطه‌ی اول': ['هفتم', 'هشتم', 'نهم'],
  'متوسطه‌ی دوم': ['دهم', 'یازدهم', 'دوازدهم'],
  'پشت کنکور': ['پشت کنکور'],
  دانشجو: ['دانشجو'],
};

export const STUDENT_STATUSES = ['تحت حمایت', 'دریافت بورسیه', 'توقف', 'حذف'];

export const EDU_LABELS = ['بی‌سواد', 'ابتدایی', 'راهنمایی', 'دیپلم', 'فوق دیپلم', 'لیسانس', 'فوق لیسانس', 'دکتری'];

export const SOFT_SKILLS = [
  { key: 'selfAwareness', label: 'خودآگاهی' },
  { key: 'communication', label: 'ارتباطی' },
  { key: 'emotionRegulation', label: 'تنظیم هیجان' },
  { key: 'responsibility', label: 'مسئولیت‌پذیری' },
  { key: 'resilience', label: 'تاب‌آوری' },
  { key: 'problemSolving', label: 'حل مسئله' },
  { key: 'financialLiteracy', label: 'سواد مالی' },
];

export const FINANCE_CATEGORIES = ['آموزش', 'کتاب', 'رفت‌وآمد', 'لباس', 'سلامت', 'تغذیه', 'سایر'];

export const SERVICE_TYPES = ['مشاوره', 'کلاس', 'کارگاه', 'بازدید', 'ارجاع', 'سایر'];

export const BARRIERS = [
  'نبود فضای مناسب مطالعه',
  'مشغله‌ی کاری',
  'مشکلات خانوادگی',
  'بیماری',
  'ضعف پایه‌ی تحصیلی',
  'نبود انگیزه',
  'اختلال یادگیری',
  'دسترسی محدود به مواد آموزشی',
  'نامناسب بودن معلم',
  'فاصله تا مدرسه',
  'نبود معلم خصوصی',
];

export const MPI_INDICATORS = [
  { index: 0, name: 'سوءتغذیه‌ی یکی از اعضا', dimension: 'سلامت', weight: 1 / 6 },
  { index: 1, name: 'عدم دسترسی به درمان به‌خاطر هزینه', dimension: 'سلامت', weight: 1 / 6 },
  { index: 2, name: 'عدم تحصیل ابتدایی هیچ بزرگسالی', dimension: 'آموزش', weight: 1 / 6 },
  { index: 3, name: 'کودک بازمانده از تحصیل', dimension: 'آموزش', weight: 1 / 6 },
  { index: 4, name: 'نبود برق', dimension: 'سطح زندگی', weight: 1 / 18 },
  { index: 5, name: 'نبود آب آشامیدنی سالم', dimension: 'سطح زندگی', weight: 1 / 18 },
  { index: 6, name: 'سرویس بهداشتی نامناسب', dimension: 'سطح زندگی', weight: 1 / 18 },
  { index: 7, name: 'سوخت پخت ناسالم', dimension: 'سطح زندگی', weight: 1 / 18 },
  { index: 8, name: 'مسکن نامناسب', dimension: 'سطح زندگی', weight: 1 / 18 },
  { index: 9, name: 'نبود اقلام بادوام', dimension: 'سطح زندگی', weight: 1 / 18 },
];

export const CIRCUMSTANCE_KEYS = ['separated', 'singleParent', 'prison', 'deceased', 'addiction', 'abuse'];

export const ROLE_LABELS: Record<string, string> = {
  super_admin: 'مدیر کل سیستم',
  manager: 'مدیر تیم',
  facilitator: 'تسهیلگر رشد',
  supporter: 'پشتیبان رشد',
};

export function economicLabel(status: number | null | undefined): string {
  if (status === null || status === undefined) return 'نامشخص';
  const labels = ['', 'بسیار ضعیف', 'ضعیف', 'متوسط', 'خوب'];
  return labels[status] ?? 'نامشخص';
}

export function supporterUsernameFor(caseNumber: string | null | undefined, index: number): string {
  const n = parseInt(String(caseNumber ?? '').replace(/\D/g, ''), 10);
  const parity = Number.isFinite(n) ? n % 2 : index % 2;
  return parity === 0 ? 'mahsa' : 'narges';
}
