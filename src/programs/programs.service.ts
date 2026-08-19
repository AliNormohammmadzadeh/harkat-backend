import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUser } from '../common/decorators/current-user.decorator';
import { StudentsService } from '../students/students.service';
import { canWrite } from '../common/auth/permissions';
import { StudentFilterQuery } from '../students/student-query.util';

@Injectable()
export class ProgramsService {
  constructor(
    private prisma: PrismaService,
    private studentsService: StudentsService,
  ) {}

  async findAll(search?: string) {
    const where = search?.trim()
      ? { name: { contains: search.trim(), mode: 'insensitive' as const } }
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

  async findOne(id: string) {
    const program = await this.prisma.program.findUnique({
      where: { id },
      include: {
        members: { include: { student: { select: { id: true, fullName: true, caseNumber: true, grade: true } } } },
        attendance: true,
      },
    });
    if (!program) throw new NotFoundException('برنامه یافت نشد');

    const attendance: Record<string, boolean> = {};
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

  async create(
    dto: { name: string; description?: string; cost?: number; ids?: string[]; createdAt?: string },
    user: AuthUser,
  ) {
    if (!canWrite(user)) throw new ForbiddenException();

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

  async update(
    id: string,
    dto: { name?: string; description?: string; cost?: number; ids?: string[] },
    user: AuthUser,
  ) {
    if (!canWrite(user)) throw new ForbiddenException();
    const existing = await this.prisma.program.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException();

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

    await this.applyProgramFinance(
      id,
      dto.name ?? existing.name,
      Number(dto.cost ?? existing.totalCost),
      dto.ids ?? [],
    );
    return this.findOne(id);
  }

  async delete(id: string, user: AuthUser) {
    if (!canWrite(user)) throw new ForbiddenException();
    await this.removeProgramFinanceEntries(id);
    await this.prisma.program.delete({ where: { id } });
    return { ok: true };
  }

  async getMembers(id: string) {
    return this.findOne(id);
  }

  async setMembers(id: string, ids: string[], user: AuthUser) {
    if (!canWrite(user)) throw new ForbiddenException();
    const program = await this.prisma.program.findUnique({ where: { id } });
    if (!program) throw new NotFoundException();

    await this.prisma.programMember.deleteMany({ where: { programId: id } });
    await this.prisma.programMember.createMany({
      data: ids.map((studentId) => ({ programId: id, studentId })),
    });

    await this.applyProgramFinance(id, program.name, Number(program.totalCost), ids);
    return this.findOne(id);
  }

  async toggleAttendance(programId: string, studentId: string, user: AuthUser) {
    if (!canWrite(user)) throw new ForbiddenException();

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

  async createFromFilter(query: StudentFilterQuery, dto: { name: string; description?: string; cost?: number }, user: AuthUser) {
    const result = await this.studentsService.findAll({ ...query, page: '1', limit: '10000' }, user);
    const ids = result.data.map((s) => s.id);
    return this.create({ ...dto, ids }, user);
  }

  async exportMembers(id: string) {
    const program = await this.findOne(id);
    return program.members;
  }

  private async removeProgramFinanceEntries(programId: string) {
    await this.prisma.financeEntry.deleteMany({ where: { programId } });
  }

  private async applyProgramFinance(programId: string, name: string, cost: number, ids: string[]) {
    await this.removeProgramFinanceEntries(programId);
    if (cost <= 0 || !ids.length) return;

    const per = cost / ids.length;
    const today = new Date();
    const dateStr = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;

    await this.prisma.financeEntry.createMany({
      data: ids.map((studentId) => ({
        studentId,
        programId,
        entryDate: dateStr,
        category: 'آموزش',
        amount: new Prisma.Decimal(Math.round(per)),
        description: `برنامه: ${name}`,
      })),
    });
  }
}
