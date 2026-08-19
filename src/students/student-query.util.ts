import { Prisma } from '@prisma/client';
import { AuthUser } from '../common/decorators/current-user.decorator';
import { canAccessAllStudents } from '../common/auth/permissions';
import { supporterUsernameFor } from '../common/constants/lookups';
import { StudentFilterQuery } from '../common/dto/student-filter.dto';

export type { StudentFilterQuery };

function toArray(v: string | string[] | undefined): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

export function buildStudentWhere(
  query: StudentFilterQuery,
  user: AuthUser,
  supporterUsernames: Map<string, string>,
): Prisma.StudentWhereInput {
  const where: Prisma.StudentWhereInput = { AND: [] };
  const and = where.AND as Prisma.StudentWhereInput[];

  if (user.role === 'supporter' && !canAccessAllStudents(user)) {
    and.push({
      OR: Array.from(supporterUsernames.entries())
        .filter(([, u]) => u === user.username)
        .map(([studentId]) => ({ id: studentId })),
    });
  }

  if (query.search?.trim()) {
    const q = query.search.trim();
    and.push({
      OR: [
        { fullName: { contains: q, mode: 'insensitive' } },
        { caseNumber: { contains: q, mode: 'insensitive' } },
        { profile: { ibanNumber: { contains: q, mode: 'insensitive' } } },
      ],
    });
  }

  if (query.gender) and.push({ gender: query.gender });
  if (query.grade) and.push({ grade: query.grade });
  if (query.gradeLevel) and.push({ gradeLevel: query.gradeLevel });
  if (query.status) and.push({ studentStatus: query.status });
  if (query.economic) and.push({ economicStatus: parseInt(query.economic, 10) });
  if (query.fatherEdu) and.push({ fatherEdu: parseInt(query.fatherEdu, 10) });
  if (query.motherEdu) and.push({ motherEdu: parseInt(query.motherEdu, 10) });
  if (query.parentInvolvement) and.push({ parentInvolvement: parseInt(query.parentInvolvement, 10) });
  if (query.eliteInterest) and.push({ interestInEliteSchool: query.eliteInterest });
  if (query.needsBooks) and.push({ needsSupplementaryBooks: query.needsBooks });

  const barriers = toArray(query.barriers);
  if (barriers.length) {
    and.push({
      tagSelections: {
        some: { tagGroup: 'barriers', tagValue: { in: barriers } },
      },
    });
  }

  const weakSubjects = toArray(query.weakSubjects);
  if (weakSubjects.length) {
    and.push({
      OR: weakSubjects.flatMap((tag) => [
        { tagSelections: { some: { tagGroup: 'weakSubjects', tagValue: tag } } },
        { tagSelections: { some: { tagGroup: 'tutoringSubjects', tagValue: tag } } },
      ]),
    });
  }

  if (query.avgMax) {
    const max = parseFloat(query.avgMax);
    if (!isNaN(max)) {
      and.push({ overallAvg: { lt: max } });
    }
  }

  if (query.programId) {
    and.push({ programMembers: { some: { programId: query.programId } } });
  }

  if (query.ibanHas === 'has') {
    and.push({ profile: { ibanNumber: { not: null } } });
  } else if (query.ibanHas === 'none') {
    and.push({ OR: [{ profile: null }, { profile: { ibanNumber: null } }] });
  }

  if (and.length === 0) delete where.AND;
  return where;
}

export function buildSupporterMap(
  students: { id: string; caseNumber: string | null }[],
): Map<string, string> {
  const map = new Map<string, string>();
  students.forEach((s, i) => map.set(s.id, supporterUsernameFor(s.caseNumber, i)));
  return map;
}

export function paginate(query: StudentFilterQuery) {
  const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
  const limit = Math.min(200, Math.max(1, parseInt(query.limit ?? '50', 10) || 50));
  return { skip: (page - 1) * limit, take: limit, page, limit };
}
