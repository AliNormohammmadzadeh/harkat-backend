import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { AuthUser } from '../common/decorators/current-user.decorator';
import { AuthService } from '../auth/auth.service';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    listRolePermissions(): import("../common/auth/permissions").RolePermissions[];
    findAll(): Promise<{
        roleLabel: string;
        permissions: import("../common/auth/permissions").RolePermissions;
        id: string;
        username: string;
        fullName: string;
        initials: string | null;
        role: import(".prisma/client").UserRole;
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
        role: import(".prisma/client").UserRole;
        isActive: boolean;
        createdAt: Date;
    }>;
    create(dto: CreateUserDto, user: AuthUser): Promise<{
        roleLabel: string;
        permissions: import("../common/auth/permissions").RolePermissions;
        id: string;
        username: string;
        fullName: string;
        initials: string | null;
        role: import(".prisma/client").UserRole;
        isActive: boolean;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateUserDto, user: AuthUser): Promise<{
        roleLabel: string;
        permissions: import("../common/auth/permissions").RolePermissions;
        id: string;
        username: string;
        fullName: string;
        initials: string | null;
        role: import(".prisma/client").UserRole;
        isActive: boolean;
        createdAt: Date;
    }>;
    deactivate(id: string, user: AuthUser): Promise<{
        roleLabel: string;
        permissions: import("../common/auth/permissions").RolePermissions;
        id: string;
        username: string;
        fullName: string;
        initials: string | null;
        role: import(".prisma/client").UserRole;
        isActive: boolean;
        createdAt: Date;
    }>;
}
