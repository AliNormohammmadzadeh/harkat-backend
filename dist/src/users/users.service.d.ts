import { UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { AuthUser } from '../common/decorators/current-user.decorator';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    private toResponse;
    findAll(): Promise<{
        roleLabel: string;
        permissions: import("../common/auth/permissions").RolePermissions;
        id: string;
        username: string;
        fullName: string;
        initials: string | null;
        role: UserRole;
        isActive: boolean;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        roleLabel: string;
        permissions: import("../common/auth/permissions").RolePermissions;
        id: string;
        username: string;
        fullName: string;
        initials: string | null;
        role: UserRole;
        isActive: boolean;
        createdAt: Date;
    }>;
    create(dto: CreateUserDto, actor: AuthUser): Promise<{
        roleLabel: string;
        permissions: import("../common/auth/permissions").RolePermissions;
        id: string;
        username: string;
        fullName: string;
        initials: string | null;
        role: UserRole;
        isActive: boolean;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateUserDto, actor: AuthUser): Promise<{
        roleLabel: string;
        permissions: import("../common/auth/permissions").RolePermissions;
        id: string;
        username: string;
        fullName: string;
        initials: string | null;
        role: UserRole;
        isActive: boolean;
        createdAt: Date;
    }>;
    deactivate(id: string, actor: AuthUser): Promise<{
        roleLabel: string;
        permissions: import("../common/auth/permissions").RolePermissions;
        id: string;
        username: string;
        fullName: string;
        initials: string | null;
        role: UserRole;
        isActive: boolean;
        createdAt: Date;
    }>;
}
