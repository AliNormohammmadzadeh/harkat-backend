import { AuthUser } from '../decorators/current-user.decorator';
import { UserRole } from '@prisma/client';
export interface RolePermissions {
    role: string;
    roleLabel: string;
    canRead: boolean;
    canWrite: boolean;
    canDelete: boolean;
    canAccessAllStudents: boolean;
    canManageUsers: boolean;
    canManagePrograms: boolean;
    canViewAnalytics: boolean;
    canExport: boolean;
    canImport: boolean;
    studentScope: 'all' | 'assigned' | 'none';
}
export declare function isSuperAdmin(user: Pick<AuthUser, 'role'>): boolean;
export declare function canWrite(user: Pick<AuthUser, 'role'>): boolean;
export declare function canAccessAllStudents(user: Pick<AuthUser, 'role'>): boolean;
export declare function canManageUsers(user: Pick<AuthUser, 'role'>): boolean;
export declare function getPermissions(role: string): RolePermissions;
export declare function getAllRolePermissions(): RolePermissions[];
export declare const ROLE_LABELS: Record<string, string>;
export declare const ASSIGNABLE_ROLES: UserRole[];
