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

const PERMISSION_MATRIX: Record<UserRole, Omit<RolePermissions, 'role' | 'roleLabel'>> = {
  super_admin: {
    canRead: true,
    canWrite: true,
    canDelete: true,
    canAccessAllStudents: true,
    canManageUsers: true,
    canManagePrograms: true,
    canViewAnalytics: true,
    canExport: true,
    canImport: true,
    studentScope: 'all',
  },
  manager: {
    canRead: true,
    canWrite: false,
    canDelete: false,
    canAccessAllStudents: true,
    canManageUsers: false,
    canManagePrograms: false,
    canViewAnalytics: true,
    canExport: true,
    canImport: false,
    studentScope: 'all',
  },
  facilitator: {
    canRead: true,
    canWrite: true,
    canDelete: true,
    canAccessAllStudents: true,
    canManageUsers: false,
    canManagePrograms: true,
    canViewAnalytics: true,
    canExport: true,
    canImport: true,
    studentScope: 'all',
  },
  supporter: {
    canRead: true,
    canWrite: true,
    canDelete: false,
    canAccessAllStudents: false,
    canManageUsers: false,
    canManagePrograms: true,
    canViewAnalytics: true,
    canExport: true,
    canImport: false,
    studentScope: 'assigned',
  },
};

export function isSuperAdmin(user: Pick<AuthUser, 'role'>): boolean {
  return user.role === 'super_admin';
}

export function canWrite(user: Pick<AuthUser, 'role'>): boolean {
  return getPermissions(user.role).canWrite;
}

export function canAccessAllStudents(user: Pick<AuthUser, 'role'>): boolean {
  return getPermissions(user.role).canAccessAllStudents;
}

export function canManageUsers(user: Pick<AuthUser, 'role'>): boolean {
  return getPermissions(user.role).canManageUsers;
}

export function getPermissions(role: string): RolePermissions {
  const roleLabel = ROLE_LABELS[role] ?? role;
  const matrix = PERMISSION_MATRIX[role as UserRole];
  if (!matrix) {
    return {
      role,
      roleLabel,
      canRead: false,
      canWrite: false,
      canDelete: false,
      canAccessAllStudents: false,
      canManageUsers: false,
      canManagePrograms: false,
      canViewAnalytics: false,
      canExport: false,
      canImport: false,
      studentScope: 'none',
    };
  }
  return { role, roleLabel, ...matrix };
}

export function getAllRolePermissions(): RolePermissions[] {
  return (Object.keys(PERMISSION_MATRIX) as UserRole[]).map((role) => getPermissions(role));
}

export const ROLE_LABELS: Record<string, string> = {
  super_admin: 'مدیر کل سیستم',
  manager: 'مدیر تیم',
  facilitator: 'تسهیلگر رشد',
  supporter: 'پشتیبان رشد',
};

export const ASSIGNABLE_ROLES: UserRole[] = [
  UserRole.manager,
  UserRole.facilitator,
  UserRole.supporter,
];
