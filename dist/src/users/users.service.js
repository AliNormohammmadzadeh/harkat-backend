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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
const permissions_1 = require("../common/auth/permissions");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    toResponse(user) {
        return {
            ...user,
            roleLabel: permissions_1.ROLE_LABELS[user.role] ?? user.role,
            permissions: (0, permissions_1.getPermissions)(user.role),
        };
    }
    async findAll() {
        const users = await this.prisma.user.findMany({
            orderBy: [{ role: 'asc' }, { fullName: 'asc' }],
        });
        return users.map((u) => this.toResponse(u));
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('کاربر یافت نشد');
        return this.toResponse(user);
    }
    async create(dto, actor) {
        const username = dto.username.toLowerCase().trim();
        const existing = await this.prisma.user.findUnique({ where: { username } });
        if (existing)
            throw new common_1.ConflictException('این نام کاربری قبلاً ثبت شده');
        if (dto.role === client_1.UserRole.super_admin && actor.role !== client_1.UserRole.super_admin) {
            throw new common_1.BadRequestException('فقط مدیر کل می‌تواند super_admin بسازد');
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
    async update(id, dto, actor) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('کاربر یافت نشد');
        if (dto.role === client_1.UserRole.super_admin && actor.role !== client_1.UserRole.super_admin) {
            throw new common_1.BadRequestException('فقط مدیر کل می‌تواند نقش super_admin بدهد');
        }
        if (user.role === client_1.UserRole.super_admin && dto.role && dto.role !== client_1.UserRole.super_admin) {
            const superAdminCount = await this.prisma.user.count({
                where: { role: client_1.UserRole.super_admin, isActive: true },
            });
            if (superAdminCount <= 1) {
                throw new common_1.BadRequestException('حداقل یک مدیر کل فعال باید باقی بماند');
            }
        }
        if (dto.isActive === false && user.id === actor.id) {
            throw new common_1.BadRequestException('نمی‌توانید حساب خود را غیرفعال کنید');
        }
        const data = {};
        if (dto.fullName !== undefined)
            data.fullName = dto.fullName;
        if (dto.initials !== undefined)
            data.initials = dto.initials;
        if (dto.role !== undefined)
            data.role = dto.role;
        if (dto.isActive !== undefined)
            data.isActive = dto.isActive;
        if (dto.password)
            data.passwordHash = await bcrypt.hash(dto.password, 10);
        const updated = await this.prisma.user.update({ where: { id }, data });
        return this.toResponse(updated);
    }
    async deactivate(id, actor) {
        if (id === actor.id) {
            throw new common_1.BadRequestException('نمی‌توانید حساب خود را حذف کنید');
        }
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('کاربر یافت نشد');
        if (user.role === client_1.UserRole.super_admin) {
            const superAdminCount = await this.prisma.user.count({
                where: { role: client_1.UserRole.super_admin, isActive: true },
            });
            if (superAdminCount <= 1) {
                throw new common_1.BadRequestException('حداقل یک مدیر کل فعال باید باقی بماند');
            }
        }
        const updated = await this.prisma.user.update({
            where: { id },
            data: { isActive: false },
        });
        return this.toResponse(updated);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map