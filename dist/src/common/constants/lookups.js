"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE_LABELS = exports.CIRCUMSTANCE_KEYS = exports.MPI_INDICATORS = exports.BARRIERS = exports.SERVICE_TYPES = exports.FINANCE_CATEGORIES = exports.SOFT_SKILLS = exports.EDU_LABELS = exports.STUDENT_STATUSES = exports.GRADE_LEVELS = exports.GRADES = void 0;
exports.economicLabel = economicLabel;
exports.supporterUsernameFor = supporterUsernameFor;
exports.GRADES = ['ابتدایی', 'متوسطه‌ی اول', 'متوسطه‌ی دوم', 'پشت کنکور', 'دانشجو'];
exports.GRADE_LEVELS = {
    ابتدایی: ['اول', 'دوم', 'سوم', 'چهارم', 'پنجم', 'ششم'],
    'متوسطه‌ی اول': ['هفتم', 'هشتم', 'نهم'],
    'متوسطه‌ی دوم': ['دهم', 'یازدهم', 'دوازدهم'],
    'پشت کنکور': ['پشت کنکور'],
    دانشجو: ['دانشجو'],
};
exports.STUDENT_STATUSES = ['تحت حمایت', 'دریافت بورسیه', 'توقف', 'حذف'];
exports.EDU_LABELS = ['بی‌سواد', 'ابتدایی', 'راهنمایی', 'دیپلم', 'فوق دیپلم', 'لیسانس', 'فوق لیسانس', 'دکتری'];
exports.SOFT_SKILLS = [
    { key: 'selfAwareness', label: 'خودآگاهی' },
    { key: 'communication', label: 'ارتباطی' },
    { key: 'emotionRegulation', label: 'تنظیم هیجان' },
    { key: 'responsibility', label: 'مسئولیت‌پذیری' },
    { key: 'resilience', label: 'تاب‌آوری' },
    { key: 'problemSolving', label: 'حل مسئله' },
    { key: 'financialLiteracy', label: 'سواد مالی' },
];
exports.FINANCE_CATEGORIES = ['آموزش', 'کتاب', 'رفت‌وآمد', 'لباس', 'سلامت', 'تغذیه', 'سایر'];
exports.SERVICE_TYPES = ['مشاوره', 'کلاس', 'کارگاه', 'بازدید', 'ارجاع', 'سایر'];
exports.BARRIERS = [
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
exports.MPI_INDICATORS = [
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
exports.CIRCUMSTANCE_KEYS = ['separated', 'singleParent', 'prison', 'deceased', 'addiction', 'abuse'];
exports.ROLE_LABELS = {
    super_admin: 'مدیر کل سیستم',
    manager: 'مدیر تیم',
    facilitator: 'تسهیلگر رشد',
    supporter: 'پشتیبان رشد',
};
function economicLabel(status) {
    if (status === null || status === undefined)
        return 'نامشخص';
    const labels = ['', 'بسیار ضعیف', 'ضعیف', 'متوسط', 'خوب'];
    return labels[status] ?? 'نامشخص';
}
function supporterUsernameFor(caseNumber, index) {
    const n = parseInt(String(caseNumber ?? '').replace(/\D/g, ''), 10);
    const parity = Number.isFinite(n) ? n % 2 : index % 2;
    return parity === 0 ? 'mahsa' : 'narges';
}
//# sourceMappingURL=lookups.js.map