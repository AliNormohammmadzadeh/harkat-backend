"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const students_service_1 = require("../students/students.service");
const lookups_1 = require("../common/constants/lookups");
const CHART_DIMENSIONS = [
    { key: 'grade', title: 'مقطع تحصیلی', get: (s) => s.grade || 'نامشخص' },
    { key: 'gender', title: 'جنسیت', get: (s) => s.gender || 'نامشخص' },
    { key: 'status', title: 'وضعیت دانش‌آموز', get: (s) => s.studentStatus || 'نامشخص' },
    { key: 'economic', title: 'وضعیت اقتصادی', get: (s) => (0, lookups_1.economicLabel)(s.economicStatus) },
    {
        key: 'fatherEdu',
        title: 'تحصیلات پدر',
        get: (s) => s.fatherEdu !== null && s.fatherEdu !== undefined ? lookups_1.EDU_LABELS[s.fatherEdu] : 'ثبت نشده',
    },
    {
        key: 'motherEdu',
        title: 'تحصیلات مادر',
        get: (s) => s.motherEdu !== null && s.motherEdu !== undefined ? lookups_1.EDU_LABELS[s.motherEdu] : 'ثبت نشده',
    },
    { key: 'eliteInterest', title: 'علاقه به مدرسهٔ ویژه', get: (s) => s.interestInEliteSchool || 'نامشخص' },
    {
        key: 'weakSubject',
        title: 'دروس ضعیف',
        multi: true,
        getArr: (s) => Array.from(new Set([...(s.weakSubjects || []), ...(s.tutoringSubjects || [])])),
    },
];
let AnalyticsService = class AnalyticsService {
    constructor(studentsService) {
        this.studentsService = studentsService;
    }
    async getFilteredList(query, user) {
        const result = await this.studentsService.findAll({ ...query, page: '1', limit: '10000' }, user);
        return result.data;
    }
    async getStats(query, user) {
        const list = await this.getFilteredList(query, user);
        const n = list.length;
        const withAvg = list.filter((s) => s.overallAvg !== null && s.overallAvg !== undefined);
        const avg = withAvg.length
            ? withAvg.reduce((a, s) => a + (s.overallAvg ?? 0), 0) / withAvg.length
            : null;
        const scholarship = list.filter((s) => s.studentStatus === 'دریافت بورسیه').length;
        const girls = list.filter((s) => s.gender === 'دختر').length;
        const boys = list.filter((s) => s.gender === 'پسر').length;
        const totalSpent = list.reduce((a, s) => a + (s.totalSpent ?? 0), 0);
        return {
            tiles: [
                { label: 'تعداد دانش‌آموزان (در فیلتر فعلی)', value: n },
                {
                    label: 'میانگین معدل کل (از موارد ثبت‌شده)',
                    value: avg !== null ? Number(avg.toFixed(2)) : null,
                },
                {
                    label: 'دریافت‌کنندهٔ بورسیه',
                    value: `${scholarship} نفر (${n ? Math.round((scholarship / n) * 100) : 0}٪)`,
                },
                { label: 'نسبت دختر / پسر', value: `${girls} / ${boys}` },
                { label: 'مجموع هزینهٔ ثبت‌شده', value: totalSpent },
            ],
        };
    }
    async getChart(query, user) {
        const list = await this.getFilteredList(query, user);
        const dimKey = query.groupBy || 'grade';
        const dim = CHART_DIMENSIONS.find((d) => d.key === dimKey) ?? CHART_DIMENSIONS[0];
        const counts = {};
        list.forEach((s) => {
            if ('multi' in dim && dim.multi && 'getArr' in dim) {
                dim.getArr(s).forEach((v) => {
                    counts[v] = (counts[v] || 0) + 1;
                });
            }
            else if ('get' in dim && dim.get) {
                const v = dim.get(s);
                counts[v] = (counts[v] || 0) + 1;
            }
        });
        const entries = Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 15)
            .map(([label, count]) => ({ label, count }));
        return { dimension: dim.title, entries };
    }
    async query(question, user) {
        const list = await this.getFilteredList({}, user);
        const q = question.trim();
        const numMatch = q.match(/\d+/);
        const n = numMatch ? Math.max(1, Math.min(50, parseInt(numMatch[0], 10))) : 10;
        const wantsLowest = /کمترین|ضعیف‌ترین|پایین‌ترین|بدترین|بدتر/.test(q);
        const wantsHighest = /بیشترین|بالاترین|بهترین|قوی‌ترین/.test(q);
        let filtered = list.filter((s) => s.overallAvg !== null && s.overallAvg !== undefined);
        filtered.sort((a, b) => wantsHighest ? (b.overallAvg ?? 0) - (a.overallAvg ?? 0) : (a.overallAvg ?? 0) - (b.overallAvg ?? 0));
        return {
            question: q,
            caveat: 'پرسش آماری ساختاریافته — نه چت‌بات آزاد',
            results: filtered.slice(0, n).map((s, i) => ({
                rank: i + 1,
                id: s.id,
                fullName: s.fullName,
                grade: s.grade,
                gradeLevel: s.gradeLevel,
                overallAvg: s.overallAvg,
            })),
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map