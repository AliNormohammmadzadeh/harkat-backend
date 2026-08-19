import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUser } from '../common/decorators/current-user.decorator';
import {
  buildStudentWhere,
  buildSupporterMap,
  paginate,
  StudentFilterQuery,
} from './student-query.util';
import { supporterUsernameFor } from '../common/constants/lookups';
import { canAccessAllStudents, canWrite } from '../common/auth/permissions';

const listInclude = {
  facilitator: { select: { fullName: true } },
  supporter: { select: { fullName: true, username: true } },
  tagSelections: true,
  profile: { select: { ibanNumber: true } },
  financeEntries: { select: { amount: true } },
  softSkillAssessments: {
    orderBy: { assessedY: 'desc' as const },
    take: 1,
    include: { scores: true },
  },
};

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async assertStudentAccess(studentId: string, user: AuthUser) {
    const student = await this.prisma.student.findUnique({ where: { id: studentId } });
    if (!student) throw new NotFoundException('دانش‌آموز یافت نشد');

    if (user.role === 'supporter' && !canAccessAllStudents(user)) {
      const all = await this.prisma.student.findMany({
        select: { id: true, caseNumber: true },
        orderBy: { id: 'asc' },
      });
      const idx = all.findIndex((s) => s.id === studentId);
      const assigned = supporterUsernameFor(student.caseNumber, idx);
      if (assigned !== user.username) {
        throw new ForbiddenException('این دانش‌آموز به شما تخصیص داده نشده');
      }
    }
    return student;
  }

  async findAll(query: StudentFilterQuery, user: AuthUser) {
    const allForMap = await this.prisma.student.findMany({
      select: { id: true, caseNumber: true },
      orderBy: { id: 'asc' },
    });
    const supporterMap = buildSupporterMap(allForMap);
    let where = buildStudentWhere(query, user, supporterMap);

    let students = await this.prisma.student.findMany({
      where,
      include: listInclude,
      orderBy: { caseNumber: 'asc' },
    });

    if (query.softSkill && query.softSkillMax) {
      const skill = query.softSkill;
      const max = parseFloat(query.softSkillMax);
      if (!isNaN(max)) {
        students = students.filter((s) => {
          const assessment = s.softSkillAssessments[0];
          if (!assessment) return false;
          const score = assessment.scores.find((sc) => sc.skillKey === skill);
          return score?.score !== null && score?.score !== undefined && Number(score.score) < max;
        });
      }
    }

    if (query.spentMin) {
      const min = parseFloat(query.spentMin);
      if (!isNaN(min)) {
        students = students.filter((s) => {
          const total = s.financeEntries.reduce((a, f) => a + Number(f.amount ?? 0), 0);
          return total >= min;
        });
      }
    }

    const { skip, take, page, limit } = paginate(query);
    const total = students.length;
    const data = students.slice(skip, skip + take).map((s) => this.toListItem(s));

    return { data, meta: { total, page, limit, pages: Math.ceil(total / limit) } };
  }

  private toListItem(s: any) {
    const latestSoft = s.softSkillAssessments?.[0];
    const softScores: Record<string, number> = {};
    latestSoft?.scores?.forEach((sc: any) => {
      softScores[sc.skillKey] = Number(sc.score);
    });

    const tags = (group: string) =>
      s.tagSelections.filter((t: any) => t.tagGroup === group).map((t: any) => t.tagValue);

    const totalSpent = s.financeEntries.reduce(
      (a: number, f: any) => a + Number(f.amount ?? 0),
      0,
    );

    return {
      id: s.id,
      caseNumber: s.caseNumber,
      fullName: s.fullName,
      firstName: s.firstName,
      lastName: s.lastName,
      gender: s.gender,
      grade: s.grade,
      gradeLevel: s.gradeLevel,
      major: s.major,
      school: s.school,
      overallAvg: s.overallAvg ? Number(s.overallAvg) : null,
      studentStatus: s.studentStatus,
      economicStatus: s.economicStatus,
      decile: s.decile,
      fatherEdu: s.fatherEdu,
      motherEdu: s.motherEdu,
      facilitator: s.facilitator?.fullName ?? null,
      supporter: s.supporter?.fullName ?? null,
      registeredBy: s.registeredBy,
      mentalHealthNote: s.mentalHealthNote,
      evaluatorSuggestion: s.evaluatorSuggestion,
      weakSubjects: tags('weakSubjects'),
      strongSubjects: tags('strongSubjects'),
      tutoringSubjects: tags('tutoringSubjects'),
      barriers: tags('barriers'),
      softScores,
      interestInEliteSchool: s.interestInEliteSchool,
      needsSupplementaryBooks: s.needsSupplementaryBooks,
      ibanNumber: s.profile?.ibanNumber ?? null,
      totalSpent,
    };
  }

  async findOne(id: string, user: AuthUser) {
    await this.assertStudentAccess(id, user);
    const s = await this.prisma.student.findUnique({
      where: { id },
      include: listInclude,
    });
    return this.toListItem(s);
  }

  async createManual(dto: Record<string, unknown>, user: AuthUser) {
    if (!canWrite(user)) throw new ForbiddenException();

    const id = `S_custom_${Date.now()}`;
    const facilitator = await this.prisma.user.findFirst({ where: { role: 'facilitator' } });

    const student = await this.prisma.student.create({
      data: {
        id,
        caseNumber: String(dto.caseNumber ?? ''),
        firstName: String(dto.firstName ?? ''),
        lastName: String(dto.lastName ?? ''),
        fullName: `${dto.firstName ?? ''} ${dto.lastName ?? ''}`.trim(),
        gender: String(dto.gender ?? ''),
        grade: String(dto.grade ?? ''),
        gradeLevel: String(dto.gradeLevel ?? ''),
        major: String(dto.major ?? ''),
        school: String(dto.school ?? ''),
        studentStatus: String(dto.studentStatus ?? 'تحت حمایت'),
        facilitatorId: facilitator?.id,
        registeredBy: user.fullName,
        isCustom: true,
        profile: { create: {} },
      },
    });

    return this.findOne(student.id, user);
  }

  async updateSummary(id: string, dto: Record<string, unknown>, user: AuthUser) {
    if (!canWrite(user)) throw new ForbiddenException();
    await this.assertStudentAccess(id, user);

    await this.prisma.student.update({
      where: { id },
      data: {
        caseNumber: dto.caseNumber as string,
        firstName: dto.firstName as string,
        lastName: dto.lastName as string,
        fullName: dto.fullName as string,
        gender: dto.gender as string,
        grade: dto.grade as string,
        gradeLevel: dto.gradeLevel as string,
        major: dto.major as string,
        school: dto.school as string,
        overallAvg: dto.overallAvg as number,
        studentStatus: dto.studentStatus as string,
        economicStatus: dto.economicStatus as number,
        decile: dto.decile as number,
        fatherEdu: dto.fatherEdu as number,
        motherEdu: dto.motherEdu as number,
        mentalHealthNote: dto.mentalHealthNote as string,
        evaluatorSuggestion: dto.evaluatorSuggestion as string,
      },
    });

    return this.findOne(id, user);
  }

  async deleteStudent(id: string, user: AuthUser) {
    if (!canWrite(user)) throw new ForbiddenException();
    await this.assertStudentAccess(id, user);
    await this.prisma.student.delete({ where: { id } });
    return { ok: true };
  }

  async getFilteredForExport(query: StudentFilterQuery, user: AuthUser) {
    const result = await this.findAll({ ...query, page: '1', limit: '10000' }, user);
    return result.data;
  }

  getImportTemplate() {
    return {
      headers: [
        'caseNumber',
        'firstName',
        'lastName',
        'gender',
        'grade',
        'gradeLevel',
        'major',
        'natId',
        'school',
        'overallAvg',
        'studentStatus',
      ],
      sample: {
        caseNumber: '9999',
        firstName: 'نمونه',
        lastName: 'دانش‌آموز',
        gender: 'دختر',
        grade: 'متوسطه‌ی دوم',
        gradeLevel: 'دهم',
        major: 'ریاضی-فیزیک',
        natId: '1234567890',
        school: 'نمونه',
        overallAvg: '18.5',
        studentStatus: 'تحت حمایت',
      },
    };
  }

  async importStudents(records: Record<string, unknown>[], user: AuthUser) {
    if (!canWrite(user)) throw new ForbiddenException();
    if (!Array.isArray(records) || !records.length) {
      throw new BadRequestException('رکوردی برای import یافت نشد');
    }

    const facilitator = await this.prisma.user.findFirst({ where: { role: 'facilitator' } });
    const created: string[] = [];

    for (const r of records) {
      const id = `S_import_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      await this.prisma.student.create({
        data: {
          id,
          caseNumber: String(r.caseNumber ?? ''),
          firstName: String(r.firstName ?? ''),
          lastName: String(r.lastName ?? ''),
          fullName: `${r.firstName ?? ''} ${r.lastName ?? ''}`.trim(),
          gender: String(r.gender ?? ''),
          grade: String(r.grade ?? ''),
          gradeLevel: String(r.gradeLevel ?? ''),
          major: String(r.major ?? ''),
          natId: String(r.natId ?? ''),
          school: String(r.school ?? ''),
          overallAvg: r.overallAvg ? new Prisma.Decimal(String(r.overallAvg)) : null,
          studentStatus: String(r.studentStatus ?? 'تحت حمایت'),
          facilitatorId: facilitator?.id,
          registeredBy: user.fullName,
          isCustom: true,
          profile: { create: {} },
        },
      });
      created.push(id);
    }

    return { imported: created.length, ids: created };
  }

  async getStudentPrograms(studentId: string, user: AuthUser) {
    await this.assertStudentAccess(studentId, user);
    const memberships = await this.prisma.programMember.findMany({
      where: { studentId },
      include: { program: true },
    });
    return memberships.map((m) => m.program);
  }
}
