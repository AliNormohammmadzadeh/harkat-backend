import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUser } from '../common/decorators/current-user.decorator';
import { CIRCUMSTANCE_KEYS } from '../common/constants/lookups';
import { canWrite } from '../common/auth/permissions';
import { StudentsService } from './students.service';

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
    private studentsService: StudentsService,
  ) {}

  private async loadFull(studentId: string) {
    return this.prisma.student.findUnique({
      where: { id: studentId },
      include: {
        profile: true,
        householdMembers: true,
        familyHealthRecords: true,
        familyCircumstances: true,
        mpiFlags: true,
        tagSelections: true,
        reportCards: { include: { grades: true }, orderBy: { sortOrder: 'asc' } },
        softSkillAssessments: { include: { scores: true } },
        financeEntries: true,
        services: true,
        referrals: true,
        scholarships: true,
        facilitator: { select: { fullName: true } },
        supporter: { select: { fullName: true } },
      },
    });
  }

  private tagsByGroup(selections: { tagGroup: string; tagValue: string }[], group: string) {
    return selections.filter((t) => t.tagGroup === group).map((t) => t.tagValue);
  }

  toProfileState(student: NonNullable<Awaited<ReturnType<ProfileService['loadFull']>>>) {
    const p = student.profile;
    const circ: Record<string, boolean> = {};
    CIRCUMSTANCE_KEYS.forEach((k) => {
      circ[k] = student.familyCircumstances.some((c) => c.circumstanceKey === k && c.isActive);
    });

    const deps = Array(10).fill(false);
    student.mpiFlags.forEach((f) => {
      if (f.depIndex >= 0 && f.depIndex < 10) deps[f.depIndex] = f.isDeprived;
    });

    return {
      id: student.id,
      caseNumber: student.caseNumber ?? '',
      facilitator: student.facilitator?.fullName ?? '',
      supporter: student.supporter?.fullName ?? '',
      studentStatus: student.studentStatus ?? '',
      studentStatusReason: student.studentStatusReason ?? '',
      firstName: student.firstName ?? '',
      lastName: student.lastName ?? '',
      gender: student.gender ?? '',
      natId: student.natId ?? '',
      foreignId: student.foreignId ?? '',
      photo: p?.photoUrl ?? '',
      birthY: p?.birthY ?? '',
      birthM: p?.birthM ?? '',
      birthD: p?.birthD ?? '',
      enrollY: p?.enrollY ?? '',
      enrollM: p?.enrollM ?? '',
      enrollD: p?.enrollD ?? '',
      phone: student.phone ?? '',
      fatherPhone: p?.fatherPhone ?? '',
      motherPhone: p?.motherPhone ?? '',
      landline: p?.landline ?? '',
      district: p?.district ?? '',
      address: p?.address ?? '',
      introMethod: p?.introMethod ?? '',
      referrer: p?.referrer ?? '',
      referrerNote: p?.referrerNote ?? '',
      fatherName: p?.fatherName ?? '',
      fatherJob: p?.fatherJob ?? '',
      fatherEdu: student.fatherEdu ?? '',
      motherName: p?.motherName ?? '',
      motherJob: p?.motherJob ?? '',
      motherEdu: student.motherEdu ?? '',
      familySize: p?.familySize ?? '',
      head: p?.householdHead ?? '',
      relatives: student.householdMembers.map((r) => ({
        id: r.id,
        name: r.name,
        relation: r.relation,
        age: r.age,
        note: r.note,
      })),
      familyHealth: student.familyHealthRecords.map((h) => ({
        id: h.id,
        name: h.name,
        type: h.healthType,
        desc: h.description,
        cost: h.cost,
      })),
      consentY: p?.consentY ?? '',
      consentM: p?.consentM ?? '',
      consentD: p?.consentD ?? '',
      consentStatus: p?.consentStatus ?? '',
      fatherIncome: p?.fatherIncome ? String(p.fatherIncome) : '',
      motherIncome: p?.motherIncome ? String(p.motherIncome) : '',
      decile: student.decile ?? '',
      economicStatus: student.economicStatus ?? '',
      deprivedArea: p?.deprivedArea ?? '',
      housingType: p?.housingType ?? '',
      housingArea: p?.housingArea ? String(p.housingArea) : '',
      housingCondition: p?.housingCondition ?? '',
      housingDeposit: p?.housingDeposit ? String(p.housingDeposit) : '',
      housingRent: p?.housingRent ? String(p.housingRent) : '',
      circ,
      parentInvolvement: student.parentInvolvement ?? '',
      familyLeisure: p?.familyLeisure ?? '',
      educationView: p?.educationView ?? '',
      digitalAccess: student.digitalAccess ?? '',
      deps,
      externalAid: this.tagsByGroup(student.tagSelections, 'externalAid'),
      externalAidOther: p?.externalAidOther ?? '',
      depAnalysis: p?.depAnalysis ?? '',
      depRecommend: p?.depRecommend ?? '',
      grade: student.grade ?? '',
      gradeLevel: student.gradeLevel ?? '',
      major: student.major ?? '',
      school: student.school ?? '',
      schoolType: student.schoolType ?? '',
      schoolDist: p?.schoolDistanceKm ? String(p.schoolDistanceKm) : '',
      interestLevel: p?.interestLevel ?? '',
      preferredMajor: p?.preferredMajor ?? '',
      preferredMajorTags: this.tagsByGroup(student.tagSelections, 'preferredMajorTags'),
      eliteSchools: this.tagsByGroup(student.tagSelections, 'eliteSchools'),
      eliteSchoolsOther: '',
      strongSubjects: this.tagsByGroup(student.tagSelections, 'strongSubjects'),
      weakSubjects: this.tagsByGroup(student.tagSelections, 'weakSubjects'),
      tutoringSubjects: this.tagsByGroup(student.tagSelections, 'tutoringSubjects'),
      neededBooks: this.tagsByGroup(student.tagSelections, 'neededBooks'),
      barriers: this.tagsByGroup(student.tagSelections, 'barriers'),
      barriersOther: p?.barriersOther ?? '',
      needsSupplementaryBooks: student.needsSupplementaryBooks ?? '',
      interestInEliteSchool: student.interestInEliteSchool ?? '',
      customSubjectTags: this.tagsByGroup(student.tagSelections, 'customSubjectTags'),
      reportCards: student.reportCards.map((rc) => ({
        id: rc.id,
        term: rc.term,
        year: rc.year,
        grades: rc.grades.map((g) => ({
          id: g.id,
          subject: g.subject,
          score: g.score ? Number(g.score) : null,
          weight: g.weight ? Number(g.weight) : 1,
        })),
      })),
      softAssessments: student.softSkillAssessments.map((a) => ({
        id: a.id,
        y: a.assessedY,
        m: a.assessedM,
        d: a.assessedD,
        note: a.note,
        scores: Object.fromEntries(
          a.scores.map((s) => [s.skillKey, s.score ? Number(s.score) : null]),
        ),
      })),
      softNote: p?.softNote ?? '',
      financialCode: p?.financialCode ?? '',
      ibanNumber: p?.ibanNumber ?? '',
      services: student.services.map((s) => ({
        id: s.id,
        date: s.serviceDate,
        type: s.serviceType,
        desc: s.description,
      })),
      referrals: student.referrals.map((r) => ({
        id: r.id,
        date: r.refDate,
        org: r.organization,
        status: r.status,
        desc: r.description,
      })),
      scholarships: student.scholarships.map((s) => ({
        id: s.id,
        source: s.source,
        amount: s.amount,
        period: s.period,
        desc: s.description,
      })),
      finances: student.financeEntries.map((f) => ({
        id: f.id,
        date: f.entryDate,
        cat: f.category,
        amount: f.amount ? String(f.amount) : '',
        desc: f.description,
        progId: f.programId,
      })),
      mentalHealthNote: student.mentalHealthNote ?? '',
      evaluatorSuggestion: student.evaluatorSuggestion ?? '',
    };
  }

  async getProfile(studentId: string, user: AuthUser) {
    await this.studentsService.assertStudentAccess(studentId, user);
    const student = await this.loadFull(studentId);
    if (!student) throw new NotFoundException();
    return this.toProfileState(student);
  }

  async saveProfile(studentId: string, state: Record<string, any>, user: AuthUser) {
    if (!canWrite(user)) throw new ForbiddenException();
    await this.studentsService.assertStudentAccess(studentId, user);

    await this.prisma.$transaction(async (tx) => {
      await tx.student.update({
        where: { id: studentId },
        data: {
          caseNumber: state.caseNumber,
          firstName: state.firstName,
          lastName: state.lastName,
          fullName: `${state.firstName ?? ''} ${state.lastName ?? ''}`.trim(),
          gender: state.gender,
          natId: state.natId,
          foreignId: state.foreignId,
          phone: state.phone,
          studentStatus: state.studentStatus,
          studentStatusReason: state.studentStatusReason,
          grade: state.grade,
          gradeLevel: state.gradeLevel,
          major: state.major,
          school: state.school,
          schoolType: state.schoolType,
          economicStatus: state.economicStatus ? parseInt(String(state.economicStatus), 10) : null,
          decile: state.decile ? parseInt(String(state.decile), 10) : null,
          fatherEdu: state.fatherEdu !== '' ? parseInt(String(state.fatherEdu), 10) : null,
          motherEdu: state.motherEdu !== '' ? parseInt(String(state.motherEdu), 10) : null,
          parentInvolvement: state.parentInvolvement !== '' ? parseInt(String(state.parentInvolvement), 10) : null,
          digitalAccess: state.digitalAccess !== '' ? parseInt(String(state.digitalAccess), 10) : null,
          mentalHealthNote: state.mentalHealthNote,
          evaluatorSuggestion: state.evaluatorSuggestion,
          needsSupplementaryBooks: state.needsSupplementaryBooks,
          interestInEliteSchool: state.interestInEliteSchool,
        },
      });

      await tx.studentProfile.upsert({
        where: { studentId },
        create: { studentId, photoUrl: state.photo },
        update: {
          photoUrl: state.photo,
          birthY: state.birthY ? parseInt(String(state.birthY), 10) : null,
          birthM: state.birthM ? parseInt(String(state.birthM), 10) : null,
          birthD: state.birthD ? parseInt(String(state.birthD), 10) : null,
          enrollY: state.enrollY ? parseInt(String(state.enrollY), 10) : null,
          enrollM: state.enrollM ? parseInt(String(state.enrollM), 10) : null,
          enrollD: state.enrollD ? parseInt(String(state.enrollD), 10) : null,
          fatherPhone: state.fatherPhone,
          motherPhone: state.motherPhone,
          landline: state.landline,
          district: state.district,
          address: state.address,
          introMethod: state.introMethod,
          referrer: state.referrer,
          referrerNote: state.referrerNote,
          fatherName: state.fatherName,
          fatherJob: state.fatherJob,
          motherName: state.motherName,
          motherJob: state.motherJob,
          familySize: state.familySize ? parseInt(String(state.familySize), 10) : null,
          householdHead: state.head,
          consentY: state.consentY ? parseInt(String(state.consentY), 10) : null,
          consentM: state.consentM ? parseInt(String(state.consentM), 10) : null,
          consentD: state.consentD ? parseInt(String(state.consentD), 10) : null,
          consentStatus: state.consentStatus,
          fatherIncome: state.fatherIncome ? parseFloat(String(state.fatherIncome)) : null,
          motherIncome: state.motherIncome ? parseFloat(String(state.motherIncome)) : null,
          deprivedArea: state.deprivedArea,
          housingType: state.housingType,
          housingArea: state.housingArea ? parseFloat(String(state.housingArea)) : null,
          housingCondition: state.housingCondition ? parseInt(String(state.housingCondition), 10) : null,
          housingDeposit: state.housingDeposit ? parseFloat(String(state.housingDeposit)) : null,
          housingRent: state.housingRent ? parseFloat(String(state.housingRent)) : null,
          familyLeisure: state.familyLeisure ? parseInt(String(state.familyLeisure), 10) : null,
          educationView: state.educationView ? parseInt(String(state.educationView), 10) : null,
          externalAidOther: state.externalAidOther,
          depAnalysis: state.depAnalysis,
          depRecommend: state.depRecommend,
          schoolDistanceKm: state.schoolDist ? parseFloat(String(state.schoolDist)) : null,
          interestLevel: state.interestLevel ? parseInt(String(state.interestLevel), 10) : null,
          preferredMajor: state.preferredMajor,
          barriersOther: state.barriersOther,
          softNote: state.softNote,
          financialCode: state.financialCode,
          ibanNumber: state.ibanNumber,
        },
      });

      await this.syncTags(tx, studentId, state);
      await this.syncCircumstances(tx, studentId, state.circ ?? {});
      await this.syncMpi(tx, studentId, state.deps ?? []);
      await this.syncCollections(tx, studentId, state);
    });

    return this.getProfile(studentId, user);
  }

  private async syncTags(tx: any, studentId: string, state: Record<string, any>) {
    const groups: Record<string, string[]> = {
      externalAid: state.externalAid ?? [],
      preferredMajorTags: state.preferredMajorTags ?? [],
      eliteSchools: state.eliteSchools ?? [],
      strongSubjects: state.strongSubjects ?? [],
      weakSubjects: state.weakSubjects ?? [],
      tutoringSubjects: state.tutoringSubjects ?? [],
      neededBooks: state.neededBooks ?? [],
      barriers: state.barriers ?? [],
      customSubjectTags: state.customSubjectTags ?? [],
    };

    await tx.studentTagSelection.deleteMany({ where: { studentId } });
    const rows = Object.entries(groups).flatMap(([tagGroup, values]) =>
      (values as string[]).map((tagValue) => ({ studentId, tagGroup, tagValue })),
    );
    if (rows.length) await tx.studentTagSelection.createMany({ data: rows });
  }

  private async syncCircumstances(tx: any, studentId: string, circ: Record<string, boolean>) {
    await tx.studentFamilyCircumstance.deleteMany({ where: { studentId } });
    const rows = CIRCUMSTANCE_KEYS.filter((k) => circ[k]).map((circumstanceKey) => ({
      studentId,
      circumstanceKey,
      isActive: true,
    }));
    if (rows.length) await tx.studentFamilyCircumstance.createMany({ data: rows });
  }

  private async syncMpi(tx: any, studentId: string, deps: boolean[]) {
    await tx.studentMpiFlag.deleteMany({ where: { studentId } });
    const rows = deps
      .map((isDeprived, depIndex) => ({ studentId, depIndex, isDeprived: !!isDeprived }))
      .filter((r) => r.isDeprived);
    if (rows.length) await tx.studentMpiFlag.createMany({ data: rows });
  }

  private async syncCollections(tx: any, studentId: string, state: Record<string, any>) {
    await tx.householdMember.deleteMany({ where: { studentId } });
    if (state.relatives?.length) {
      await tx.householdMember.createMany({
        data: state.relatives.map((r: any) => ({
          studentId,
          name: r.name,
          relation: r.relation,
          age: r.age,
          note: r.note,
        })),
      });
    }

    await tx.familyHealthRecord.deleteMany({ where: { studentId } });
    if (state.familyHealth?.length) {
      await tx.familyHealthRecord.createMany({
        data: state.familyHealth.map((h: any) => ({
          studentId,
          name: h.name,
          healthType: h.type,
          description: h.desc,
          cost: h.cost,
        })),
      });
    }

    await tx.reportCardGrade.deleteMany({
      where: { reportCard: { studentId } },
    });
    await tx.reportCard.deleteMany({ where: { studentId } });
    for (const [i, rc] of (state.reportCards ?? []).entries()) {
      const card = await tx.reportCard.create({
        data: { studentId, term: rc.term, year: rc.year, sortOrder: i },
      });
      if (rc.grades?.length) {
        await tx.reportCardGrade.createMany({
          data: rc.grades.map((g: any) => ({
            reportCardId: card.id,
            subject: g.subject,
            score: g.score,
            weight: g.weight ?? 1,
          })),
        });
      }
    }

    await tx.softSkillScore.deleteMany({
      where: { assessment: { studentId } },
    });
    await tx.softSkillAssessment.deleteMany({ where: { studentId } });
    for (const a of state.softAssessments ?? []) {
      const assessment = await tx.softSkillAssessment.create({
        data: {
          studentId,
          assessedY: a.y,
          assessedM: a.m,
          assessedD: a.d,
          note: a.note,
        },
      });
      const scores = Object.entries(a.scores ?? {}).map(([skillKey, score]) => ({
        assessmentId: assessment.id,
        skillKey,
        score: score as number,
      }));
      if (scores.length) await tx.softSkillScore.createMany({ data: scores });
    }

    await tx.financeEntry.deleteMany({ where: { studentId, programId: null } });
    const manualFinances = (state.finances ?? []).filter((f: any) => !f.progId);
    if (manualFinances.length) {
      await tx.financeEntry.createMany({
        data: manualFinances.map((f: any) => ({
          studentId,
          entryDate: f.date,
          category: f.cat,
          amount: f.amount ? parseFloat(String(f.amount)) : null,
          description: f.desc,
        })),
      });
    }

    await tx.service.deleteMany({ where: { studentId } });
    if (state.services?.length) {
      await tx.service.createMany({
        data: state.services.map((s: any) => ({
          studentId,
          serviceDate: s.date,
          serviceType: s.type,
          description: s.desc,
        })),
      });
    }

    await tx.referral.deleteMany({ where: { studentId } });
    if (state.referrals?.length) {
      await tx.referral.createMany({
        data: state.referrals.map((r: any) => ({
          studentId,
          refDate: r.date,
          organization: r.org,
          status: r.status,
          description: r.desc,
        })),
      });
    }

    await tx.scholarship.deleteMany({ where: { studentId } });
    if (state.scholarships?.length) {
      await tx.scholarship.createMany({
        data: state.scholarships.map((s: any) => ({
          studentId,
          source: s.source,
          amount: s.amount,
          period: s.period,
          description: s.desc,
        })),
      });
    }
  }

  async updatePhoto(studentId: string, photoUrl: string, user: AuthUser) {
    if (!canWrite(user)) throw new ForbiddenException();
    await this.studentsService.assertStudentAccess(studentId, user);
    await this.prisma.studentProfile.upsert({
      where: { studentId },
      create: { studentId, photoUrl },
      update: { photoUrl },
    });
    return { photoUrl };
  }

  async updateStatus(studentId: string, status: string, reason: string, user: AuthUser) {
    if (!canWrite(user)) throw new ForbiddenException();
    await this.studentsService.assertStudentAccess(studentId, user);
    await this.prisma.student.update({
      where: { id: studentId },
      data: { studentStatus: status, studentStatusReason: reason },
    });
    return { studentStatus: status, studentStatusReason: reason };
  }

  // Sub-resource CRUD helpers
  async addHouseholdMember(studentId: string, dto: Record<string, string>, user: AuthUser) {
    if (!canWrite(user)) throw new ForbiddenException();
    await this.studentsService.assertStudentAccess(studentId, user);
    return this.prisma.householdMember.create({
      data: { studentId, ...dto },
    });
  }

  async removeHouseholdMember(studentId: string, memberId: string, user: AuthUser) {
    if (!canWrite(user)) throw new ForbiddenException();
    await this.studentsService.assertStudentAccess(studentId, user);
    await this.prisma.householdMember.deleteMany({ where: { id: memberId, studentId } });
    return { ok: true };
  }

  async addFamilyHealth(studentId: string, dto: Record<string, string>, user: AuthUser) {
    if (!canWrite(user)) throw new ForbiddenException();
    await this.studentsService.assertStudentAccess(studentId, user);
    return this.prisma.familyHealthRecord.create({
      data: {
        studentId,
        name: dto.name,
        healthType: dto.healthType ?? dto.type,
        description: dto.description ?? dto.desc,
        cost: dto.cost,
      },
    });
  }

  async removeFamilyHealth(studentId: string, recordId: string, user: AuthUser) {
    if (!canWrite(user)) throw new ForbiddenException();
    await this.studentsService.assertStudentAccess(studentId, user);
    await this.prisma.familyHealthRecord.deleteMany({ where: { id: recordId, studentId } });
    return { ok: true };
  }

  async setMpiFlags(studentId: string, deps: boolean[], user: AuthUser) {
    if (!canWrite(user)) throw new ForbiddenException();
    await this.studentsService.assertStudentAccess(studentId, user);
    await this.prisma.studentMpiFlag.deleteMany({ where: { studentId } });
    const rows = deps
      .map((isDeprived, depIndex) => ({ studentId, depIndex, isDeprived: !!isDeprived }))
      .filter((r) => r.isDeprived);
    if (rows.length) await this.prisma.studentMpiFlag.createMany({ data: rows });
    return { deps };
  }

  async setFamilyCircumstances(studentId: string, circ: Record<string, boolean>, user: AuthUser) {
    if (!canWrite(user)) throw new ForbiddenException();
    await this.studentsService.assertStudentAccess(studentId, user);
    await this.prisma.studentFamilyCircumstance.deleteMany({ where: { studentId } });
    const rows = CIRCUMSTANCE_KEYS.filter((k) => circ[k]).map((circumstanceKey) => ({
      studentId,
      circumstanceKey,
      isActive: true,
    }));
    if (rows.length) await this.prisma.studentFamilyCircumstance.createMany({ data: rows });
    return { circ };
  }

  async setTags(studentId: string, group: string, values: string[], user: AuthUser) {
    if (!canWrite(user)) throw new ForbiddenException();
    await this.studentsService.assertStudentAccess(studentId, user);
    await this.prisma.studentTagSelection.deleteMany({ where: { studentId, tagGroup: group } });
    if (values.length) {
      await this.prisma.studentTagSelection.createMany({
        data: values.map((tagValue) => ({ studentId, tagGroup: group, tagValue })),
      });
    }
    return { group, values };
  }
}
