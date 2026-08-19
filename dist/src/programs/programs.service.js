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
exports.ProgramsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const students_service_1 = require("../students/students.service");
const permissions_1 = require("../common/auth/permissions");
let ProgramsService = class ProgramsService {
    constructor(prisma, studentsService) {
        this.prisma = prisma;
        this.studentsService = studentsService;
    }
    async findAll(search) {
        const where = search?.trim()
            ? { name: { contains: search.trim(), mode: 'insensitive' } }
            : {};
        const programs = await this.prisma.program.findMany({
            where,
            include: {
                members: { select: { studentId: true } },
                _count: { select: { members: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        return programs.map((p) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            cost: Number(p.totalCost),
            ids: p.members.map((m) => m.studentId),
            createdAt: p.createdAtJalali,
            memberCount: p._count.members,
        }));
    }
    async findOne(id) {
        const program = await this.prisma.program.findUnique({
            where: { id },
            include: {
                members: { include: { student: { select: { id: true, fullName: true, caseNumber: true, grade: true } } } },
                attendance: true,
            },
        });
        if (!program)
            throw new common_1.NotFoundException('برنامه یافت نشد');
        const attendance = {};
        program.attendance.forEach((a) => {
            attendance[a.studentId] = a.isPresent;
        });
        return {
            id: program.id,
            name: program.name,
            description: program.description,
            cost: Number(program.totalCost),
            ids: program.members.map((m) => m.studentId),
            members: program.members.map((m) => m.student),
            attendance,
            createdAt: program.createdAtJalali,
        };
    }
    async create(dto, user) {
        if (!(0, permissions_1.canWrite)(user))
            throw new common_1.ForbiddenException();
        const id = `P${Date.now()}`;
        const program = await this.prisma.program.create({
            data: {
                id,
                name: dto.name,
                description: dto.description,
                totalCost: dto.cost ?? 0,
                createdAtJalali: dto.createdAt,
                createdById: user.id,
                members: {
                    create: (dto.ids ?? []).map((studentId) => ({ studentId })),
                },
            },
        });
        await this.applyProgramFinance(program.id, dto.name, Number(dto.cost ?? 0), dto.ids ?? []);
        return this.findOne(program.id);
    }
    async update(id, dto, user) {
        if (!(0, permissions_1.canWrite)(user))
            throw new common_1.ForbiddenException();
        const existing = await this.prisma.program.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException();
        await this.prisma.programMember.deleteMany({ where: { programId: id } });
        await this.prisma.program.update({
            where: { id },
            data: {
                name: dto.name ?? existing.name,
                description: dto.description ?? existing.description,
                totalCost: dto.cost ?? existing.totalCost,
                members: {
                    create: (dto.ids ?? []).map((studentId) => ({ studentId })),
                },
            },
        });
        await this.applyProgramFinance(id, dto.name ?? existing.name, Number(dto.cost ?? existing.totalCost), dto.ids ?? []);
        return this.findOne(id);
    }
    async delete(id, user) {
        if (!(0, permissions_1.canWrite)(user))
            throw new common_1.ForbiddenException();
        await this.removeProgramFinanceEntries(id);
        await this.prisma.program.delete({ where: { id } });
        return { ok: true };
    }
    async getMembers(id) {
        return this.findOne(id);
    }
    async setMembers(id, ids, user) {
        if (!(0, permissions_1.canWrite)(user))
            throw new common_1.ForbiddenException();
        const program = await this.prisma.program.findUnique({ where: { id } });
        if (!program)
            throw new common_1.NotFoundException();
        await this.prisma.programMember.deleteMany({ where: { programId: id } });
        await this.prisma.programMember.createMany({
            data: ids.map((studentId) => ({ programId: id, studentId })),
        });
        await this.applyProgramFinance(id, program.name, Number(program.totalCost), ids);
        return this.findOne(id);
    }
    async toggleAttendance(programId, studentId, user) {
        if (!(0, permissions_1.canWrite)(user))
            throw new common_1.ForbiddenException();
        const existing = await this.prisma.programAttendance.findUnique({
            where: { programId_studentId: { programId, studentId } },
        });
        const isPresent = existing ? !existing.isPresent : true;
        await this.prisma.programAttendance.upsert({
            where: { programId_studentId: { programId, studentId } },
            create: { programId, studentId, isPresent },
            update: { isPresent },
        });
        return { programId, studentId, isPresent };
    }
    async createFromFilter(query, dto, user) {
        const result = await this.studentsService.findAll({ ...query, page: '1', limit: '10000' }, user);
        const ids = result.data.map((s) => s.id);
        return this.create({ ...dto, ids }, user);
    }
    async exportMembers(id) {
        const program = await this.findOne(id);
        return program.members;
    }
    async removeProgramFinanceEntries(programId) {
        await this.prisma.financeEntry.deleteMany({ where: { programId } });
    }
    async applyProgramFinance(programId, name, cost, ids) {
        await this.removeProgramFinanceEntries(programId);
        if (cost <= 0 || !ids.length)
            return;
        const per = cost / ids.length;
        const today = new Date();
        const dateStr = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
        await this.prisma.financeEntry.createMany({
            data: ids.map((studentId) => ({
                studentId,
                programId,
                entryDate: dateStr,
                category: 'آموزش',
                amount: new client_1.Prisma.Decimal(Math.round(per)),
                description: `برنامه: ${name}`,
            })),
        });
    }
};
exports.ProgramsService = ProgramsService;
exports.ProgramsService = ProgramsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        students_service_1.StudentsService])
], ProgramsService);
//# sourceMappingURL=programs.service.js.map