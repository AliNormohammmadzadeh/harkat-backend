import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { getPermissions, ROLE_LABELS } from '../common/auth/permissions';
import { AuthUser } from '../common/decorators/current-user.decorator';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private toResponse(user: {
    id: string;
    username: string;
    fullName: string;
    initials: string | null;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
  }) {
    return {
      ...user,
      roleLabel: ROLE_LABELS[user.role] ?? user.role,
      permissions: getPermissions(user.role),
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      orderBy: [{ role: 'asc' }, { fullName: 'asc' }],
    });
    return users.map((u) => this.toResponse(u));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('کاربر یافت نشد');
    return this.toResponse(user);
  }

  async create(dto: CreateUserDto, actor: AuthUser) {
    const username = dto.username.toLowerCase().trim();
    const existing = await this.prisma.user.findUnique({ where: { username } });
    if (existing) throw new ConflictException('این نام کاربری قبلاً ثبت شده');

    if (dto.role === UserRole.super_admin && actor.role !== UserRole.super_admin) {
      throw new BadRequestException('فقط مدیر کل می‌تواند super_admin بسازد');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        username,
        passwordHash,
        fullName: dto.fullName,
        initials: dto.initials,
        role: dto.role,
      },
    });
    return this.toResponse(user);
  }

  async update(id: string, dto: UpdateUserDto, actor: AuthUser) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('کاربر یافت نشد');

    if (dto.role === UserRole.super_admin && actor.role !== UserRole.super_admin) {
      throw new BadRequestException('فقط مدیر کل می‌تواند نقش super_admin بدهد');
    }

    if (user.role === UserRole.super_admin && dto.role && dto.role !== UserRole.super_admin) {
      const superAdminCount = await this.prisma.user.count({
        where: { role: UserRole.super_admin, isActive: true },
      });
      if (superAdminCount <= 1) {
        throw new BadRequestException('حداقل یک مدیر کل فعال باید باقی بماند');
      }
    }

    if (dto.isActive === false && user.id === actor.id) {
      throw new BadRequestException('نمی‌توانید حساب خود را غیرفعال کنید');
    }

    const data: Record<string, unknown> = {};
    if (dto.fullName !== undefined) data.fullName = dto.fullName;
    if (dto.initials !== undefined) data.initials = dto.initials;
    if (dto.role !== undefined) data.role = dto.role;
    if (dto.isActive !== undefined) data.isActive = dto.isActive;
    if (dto.password) data.passwordHash = await bcrypt.hash(dto.password, 10);

    const updated = await this.prisma.user.update({ where: { id }, data });
    return this.toResponse(updated);
  }

  async deactivate(id: string, actor: AuthUser) {
    if (id === actor.id) {
      throw new BadRequestException('نمی‌توانید حساب خود را حذف کنید');
    }

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('کاربر یافت نشد');

    if (user.role === UserRole.super_admin) {
      const superAdminCount = await this.prisma.user.count({
        where: { role: UserRole.super_admin, isActive: true },
      });
      if (superAdminCount <= 1) {
        throw new BadRequestException('حداقل یک مدیر کل فعال باید باقی بماند');
      }
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
    return this.toResponse(updated);
  }
}
