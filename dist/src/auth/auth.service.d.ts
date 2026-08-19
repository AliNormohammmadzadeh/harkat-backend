import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    login(username: string, password: string): Promise<{
        accessToken: string;
        user: {
            id: string;
            username: string;
            name: string;
            initials: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            roleLabel: string;
            permissions: import("../common/auth/permissions").RolePermissions;
        };
    }>;
    me(userId: string): Promise<{
        id: string;
        username: string;
        name: string;
        initials: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        roleLabel: string;
        permissions: import("../common/auth/permissions").RolePermissions;
    }>;
    getPermissionsForRole(role: string): import("../common/auth/permissions").RolePermissions;
    listAllRolePermissions(): import("../common/auth/permissions").RolePermissions[];
}
