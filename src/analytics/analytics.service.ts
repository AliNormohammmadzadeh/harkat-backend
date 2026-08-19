import { Injectable } from '@nestjs/common';
import { StudentsService } from '../students/students.service';
import { AuthUser } from '../common/decorators/current-user.decorator';
import { StudentFilterQuery } from '../students/student-query.util';
import { EDU_LABELS, economicLabel } from '../common/constants/lookups';

const CHART_DIMENSIONS = [
  { key: 'grade', title: 'مقطع تحصیلی', get: (s: any) => s.grade || 'نامشخص' },
  { key: 'gender', title: 'جنسیت', get: (s: any) => s.gender || 'نامشخص' },
  { key: 'status', title: 'وضعیت دانش‌آموز', get: (s: any) => s.studentStatus || 'نامشخص' },
  { key: 'economic', title: 'وضعیت اقتصادی', get: (s: any) => economicLabel(s.economicStatus) },
  {
    key: 'fatherEdu',
    title: 'تحصیلات پدر',
    get: (s: any) =>
      s.fatherEdu !== null && s.fatherEdu !== undefined ? EDU_LABELS[s.fatherEdu] : 'ثبت نشده',
  },
  {
    key: 'motherEdu',
    title: 'تحصیلات مادر',
    get: (s: any) =>
      s.motherEdu !== null && s.motherEdu !== undefined ? EDU_LABELS[s.motherEdu] : 'ثبت نشده',
  },
  { key: 'eliteInterest', title: 'علاقه به مدرسهٔ ویژه', get: (s: any) => s.interestInEliteSchool || 'نامشخص' },
  {
    key: 'weakSubject',
    title: 'دروس ضعیف',
    multi: true,
    getArr: (s: any) => Array.from(new Set([...(s.weakSubjects || []), ...(s.tutoringSubjects || [])])),
  },
];

@Injectable()
export class AnalyticsService {
  constructor(private studentsService: StudentsService) {}

  private async getFilteredList(query: StudentFilterQuery, user: AuthUser) {
    const result = await this.studentsService.findAll({ ...query, page: '1', limit: '10000' }, user);
    return result.data;
  }

  async getStats(query: StudentFilterQuery, user: AuthUser) {
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

  async getChart(query: StudentFilterQuery & { groupBy?: string }, user: AuthUser) {
    const list = await this.getFilteredList(query, user);
    const dimKey = query.groupBy || 'grade';
    const dim = CHART_DIMENSIONS.find((d) => d.key === dimKey) ?? CHART_DIMENSIONS[0];
    const counts: Record<string, number> = {};

    list.forEach((s) => {
      if ('multi' in dim && dim.multi && 'getArr' in dim) {
        dim.getArr(s).forEach((v) => {
          counts[v] = (counts[v] || 0) + 1;
        });
      } else if ('get' in dim && dim.get) {
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

  async query(question: string, user: AuthUser) {
    const list = await this.getFilteredList({}, user);
    const q = question.trim();
    const numMatch = q.match(/\d+/);
    const n = numMatch ? Math.max(1, Math.min(50, parseInt(numMatch[0], 10))) : 10;
    const wantsLowest = /کمترین|ضعیف‌ترین|پایین‌ترین|بدترین|بدتر/.test(q);
    const wantsHighest = /بیشترین|بالاترین|بهترین|قوی‌ترین/.test(q);

    let filtered = list.filter((s) => s.overallAvg !== null && s.overallAvg !== undefined);
    filtered.sort((a, b) =>
      wantsHighest ? (b.overallAvg ?? 0) - (a.overallAvg ?? 0) : (a.overallAvg ?? 0) - (b.overallAvg ?? 0),
    );

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
}
