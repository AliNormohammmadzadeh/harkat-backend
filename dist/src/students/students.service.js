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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const student_query_util_1 = require("./student-query.util");
const lookups_1 = require("../common/constants/lookups");
const permissions_1 = require("../common/auth/permissions");
const listInclude = {
    facilitator: { select: { fullName: true } },
    supporter: { select: { fullName: true, username: true } },
    tagSelections: true,
    profile: { select: { ibanNumber: true } },
    financeEntries: { select: { amount: true } },
    softSkillAssessments: {
        orderBy: { assessedY: 'desc' },
        take: 1,
        include: { scores: true },
    },
};
let StudentsService = class StudentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assertStudentAccess(studentId, user) {
        const student = await this.prisma.student.findUnique({ where: { id: studentId } });
        if (!student)
            throw new common_1.NotFoundException('دانش‌آموز یافت نشد');
        if (user.role === 'supporter' && !(0, permissions_1.canAccessAllStudents)(user)) {
            const all = await this.prisma.student.findMany({
                select: { id: true, caseNumber: true },
                orderBy: { id: 'asc' },
            });
            const idx = all.findIndex((s) => s.id === studentId);
            const assigned = (0, lookups_1.supporterUsernameFor)(student.caseNumber, idx);
            if (assigned !== user.username) {
                throw new common_1.ForbiddenException('این دانش‌آموز به شما تخصیص داده نشده');
            }
        }
        return student;
    }
    async findAll(query, user) {
        const allForMap = await this.prisma.student.findMany({
            select: { id: true, caseNumber: true },
            orderBy: { id: 'asc' },
        });
        const supporterMap = (0, student_query_util_1.buildSupporterMap)(allForMap);
        let where = (0, student_query_util_1.buildStudentWhere)(query, user, supporterMap);
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
                    if (!assessment)
                        return false;
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
        const { skip, take, page, limit } = (0, student_query_util_1.paginate)(query);
        const total = students.length;
        const data = students.slice(skip, skip + take).map((s) => this.toListItem(s));
        return { data, meta: { total, page, limit, pages: Math.ceil(total / limit) } };
    }
    toListItem(s) {
        const latestSoft = s.softSkillAssessments?.[0];
        const softScores = {};
        latestSoft?.scores?.forEach((sc) => {
            softScores[sc.skillKey] = Number(sc.score);
        });
        const tags = (group) => s.tagSelections.filter((t) => t.tagGroup === group).map((t) => t.tagValue);
        const totalSpent = s.financeEntries.reduce((a, f) => a + Number(f.amount ?? 0), 0);
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
    async findOne(id, user) {
        await this.assertStudentAccess(id, user);
        const s = await this.prisma.student.findUnique({
            where: { id },
            include: listInclude,
        });
        return this.toListItem(s);
    }
    async createManual(dto, user) {
        if (!(0, permissions_1.canWrite)(user))
            throw new common_1.ForbiddenException();
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
    async updateSummary(id, dto, user) {
        if (!(0, permissions_1.canWrite)(user))
            throw new common_1.ForbiddenException();
        await this.assertStudentAccess(id, user);
        await this.prisma.student.update({
            where: { id },
            data: {
                caseNumber: dto.caseNumber,
                firstName: dto.firstName,
                lastName: dto.lastName,
                fullName: dto.fullName,
                gender: dto.gender,
                grade: dto.grade,
                gradeLevel: dto.gradeLevel,
                major: dto.major,
                school: dto.school,
                overallAvg: dto.overallAvg,
                studentStatus: dto.studentStatus,
                economicStatus: dto.economicStatus,
                decile: dto.decile,
                fatherEdu: dto.fatherEdu,
                motherEdu: dto.motherEdu,
                mentalHealthNote: dto.mentalHealthNote,
                evaluatorSuggestion: dto.evaluatorSuggestion,
            },
        });
        return this.findOne(id, user);
    }
    async deleteStudent(id, user) {
        if (!(0, permissions_1.canWrite)(user))
            throw new common_1.ForbiddenException();
        await this.assertStudentAccess(id, user);
        await this.prisma.student.delete({ where: { id } });
        return { ok: true };
    }
    async getFilteredForExport(query, user) {
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
    async importStudents(records, user) {
        if (!(0, permissions_1.canWrite)(user))
            throw new common_1.ForbiddenException();
        if (!Array.isArray(records) || !records.length) {
            throw new common_1.BadRequestException('رکوردی برای import یافت نشد');
        }
        const facilitator = await this.prisma.user.findFirst({ where: { role: 'facilitator' } });
        const created = [];
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
                    overallAvg: r.overallAvg ? new client_1.Prisma.Decimal(String(r.overallAvg)) : null,
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
    async getStudentPrograms(studentId, user) {
        await this.assertStudentAccess(studentId, user);
        const memberships = await this.prisma.programMember.findMany({
            where: { studentId },
            include: { program: true },
        });
        return memberships.map((m) => m.program);
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudentsService);
//# sourceMappingURL=students.service.js.map