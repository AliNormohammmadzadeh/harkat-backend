import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const DEMO_USERS = [
  { username: 'admin', password: 'admin1234', fullName: 'مدیر کل سیستم', initials: 'م.ک', role: UserRole.super_admin },
  { username: 'homa', password: 'homa1234', fullName: 'هما حاجی‌زاده', initials: 'ه.ح', role: UserRole.manager },
  { username: 'elahe', password: 'elahe1234', fullName: 'الهه محمدی‌فرد', initials: 'ا.م', role: UserRole.facilitator },
  { username: 'mahsa', password: 'mahsa1234', fullName: 'مهسا سپهر', initials: 'م.س', role: UserRole.supporter },
  { username: 'narges', password: 'narges1234', fullName: 'نرگس عطایی', initials: 'ن.ع', role: UserRole.supporter },
];

interface SeedStudent {
  id: string;
  caseNumber?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  grade?: string;
  gradeLevel?: string;
  major?: string;
  natId?: string;
  isForeign?: boolean;
  phone?: string | null;
  school?: string;
  schoolType?: string | null;
  overallAvg?: number | null;
  weakSubjects?: string[];
  strongSubjects?: string[];
  tutoringSubjects?: string[];
  barriers?: string[];
  softScores?: Record<string, number>;
  economicStatus?: number | null;
  decile?: number | null;
  fatherEdu?: number | null;
  motherEdu?: number | null;
  parentInvolvement?: number | null;
  digitalAccess?: number | null;
  studentStatus?: string | null;
  registeredBy?: string;
  mentalHealthNote?: string | null;
  evaluatorSuggestion?: string | null;
  interestInEliteSchool?: string | null;
  needsSupplementaryBooks?: string | null;
}

async function main() {
  console.log('Seeding users...');
  const userMap = new Map<string, string>();

  for (const u of DEMO_USERS) {
    const hash = await bcrypt.hash(u.password, 10);
    const user = await prisma.user.upsert({
      where: { username: u.username },
      create: {
        username: u.username,
        passwordHash: hash,
        fullName: u.fullName,
        initials: u.initials,
        role: u.role,
      },
      update: {
        passwordHash: hash,
        fullName: u.fullName,
        initials: u.initials,
        role: u.role,
      },
    });
    userMap.set(u.username, user.id);
  }

  const facilitatorId = userMap.get('elahe')!;
  const seedPath = path.join(__dirname, 'seed-data.json');

  if (!fs.existsSync(seedPath)) {
    console.log('No seed-data.json — run: npx ts-node scripts/extract-students.ts');
    return;
  }

  const students: SeedStudent[] = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
  console.log(`Seeding ${students.length} students...`);

  let i = 0;
  for (const s of students) {
    const n = parseInt(String(s.caseNumber ?? '').replace(/\D/g, ''), 10);
    const parity = Number.isFinite(n) ? n % 2 : i % 2;
    const supporterUsername = parity === 0 ? 'mahsa' : 'narges';

    await prisma.student.upsert({
      where: { id: s.id },
      create: {
        id: s.id,
        caseNumber: s.caseNumber ?? null,
        firstName: s.firstName ?? null,
        lastName: s.lastName ?? null,
        fullName: s.fullName ?? null,
        gender: s.gender ?? null,
        natId: s.natId ?? null,
        isForeign: s.isForeign ?? false,
        phone: s.phone ?? null,
        grade: s.grade ?? null,
        gradeLevel: s.gradeLevel ?? null,
        major: s.major ?? null,
        school: s.school ?? null,
        schoolType: s.schoolType ?? null,
        overallAvg: s.overallAvg ?? null,
        economicStatus: s.economicStatus ?? null,
        decile: s.decile ?? null,
        fatherEdu: s.fatherEdu ?? null,
        motherEdu: s.motherEdu ?? null,
        parentInvolvement: s.parentInvolvement ?? null,
        digitalAccess: s.digitalAccess ?? null,
        studentStatus: s.studentStatus ?? 'تحت حمایت',
        registeredBy: s.registeredBy ?? null,
        mentalHealthNote: s.mentalHealthNote ?? null,
        evaluatorSuggestion: s.evaluatorSuggestion ?? null,
        interestInEliteSchool: s.interestInEliteSchool ?? null,
        needsSupplementaryBooks: s.needsSupplementaryBooks ?? null,
        facilitatorId,
        supporterId: userMap.get(supporterUsername),
        profile: { create: {} },
        tagSelections: {
          create: [
            ...(s.weakSubjects ?? []).map((tagValue) => ({ tagGroup: 'weakSubjects', tagValue })),
            ...(s.strongSubjects ?? []).map((tagValue) => ({ tagGroup: 'strongSubjects', tagValue })),
            ...(s.tutoringSubjects ?? []).map((tagValue) => ({ tagGroup: 'tutoringSubjects', tagValue })),
            ...(s.barriers ?? []).map((tagValue) => ({ tagGroup: 'barriers', tagValue })),
          ],
        },
      },
      update: {
        caseNumber: s.caseNumber ?? null,
        fullName: s.fullName ?? null,
        overallAvg: s.overallAvg ?? null,
        studentStatus: s.studentStatus ?? 'تحت حمایت',
      },
    });

    if (s.softScores) {
      const existing = await prisma.softSkillAssessment.findFirst({
        where: { studentId: s.id },
      });
      if (!existing) {
        const assessment = await prisma.softSkillAssessment.create({
          data: { studentId: s.id },
        });
        await prisma.softSkillScore.createMany({
          data: Object.entries(s.softScores).map(([skillKey, score]) => ({
            assessmentId: assessment.id,
            skillKey,
            score,
          })),
        });
      }
    }

    i++;
    if (i % 50 === 0) console.log(`  ${i}/${students.length}`);
  }

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
