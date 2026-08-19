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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
const permissions_1 = require("../common/auth/permissions");
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async login(username, password) {
        const user = await this.prisma.user.findUnique({
            where: { username: username.toLowerCase().trim() },
        });
        if (!user || !user.isActive) {
            throw new common_1.UnauthorizedException('نام‌کاربری یا رمز عبور اشتباه است');
        }
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            throw new common_1.UnauthorizedException('نام‌کاربری یا رمز عبور اشتباه است');
        }
        const payload = { sub: user.id, username: user.username, role: user.role };
        const accessToken = await this.jwt.signAsync(payload);
        const permissions = (0, permissions_1.getPermissions)(user.role);
        return {
            accessToken,
            user: {
                id: user.id,
                username: user.username,
                name: user.fullName,
                initials: user.initials,
                role: user.role,
                roleLabel: permissions_1.ROLE_LABELS[user.role],
                permissions,
            },
        };
    }
    async me(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user || !user.isActive) {
            throw new common_1.UnauthorizedException();
        }
        return {
            id: user.id,
            username: user.username,
            name: user.fullName,
            initials: user.initials,
            role: user.role,
            roleLabel: permissions_1.ROLE_LABELS[user.role],
            permissions: (0, permissions_1.getPermissions)(user.role),
        };
    }
    getPermissionsForRole(role) {
        return (0, permissions_1.getPermissions)(role);
    }
    listAllRolePermissions() {
        return (0, permissions_1.getAllRolePermissions)();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map