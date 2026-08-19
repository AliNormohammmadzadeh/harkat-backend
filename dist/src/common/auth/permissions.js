"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASSIGNABLE_ROLES = exports.ROLE_LABELS = void 0;
exports.isSuperAdmin = isSuperAdmin;
exports.canWrite = canWrite;
exports.canAccessAllStudents = canAccessAllStudents;
exports.canManageUsers = canManageUsers;
exports.getPermissions = getPermissions;
exports.getAllRolePermissions = getAllRolePermissions;
const client_1 = require("@prisma/client");
const PERMISSION_MATRIX = {
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
function isSuperAdmin(user) {
    return user.role === 'super_admin';
}
function canWrite(user) {
    return getPermissions(user.role).canWrite;
}
function canAccessAllStudents(user) {
    return getPermissions(user.role).canAccessAllStudents;
}
function canManageUsers(user) {
    return getPermissions(user.role).canManageUsers;
}
function getPermissions(role) {
    const roleLabel = exports.ROLE_LABELS[role] ?? role;
    const matrix = PERMISSION_MATRIX[role];
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
function getAllRolePermissions() {
    return Object.keys(PERMISSION_MATRIX).map((role) => getPermissions(role));
}
exports.ROLE_LABELS = {
    super_admin: 'مدیر کل سیستم',
    manager: 'مدیر تیم',
    facilitator: 'تسهیلگر رشد',
    supporter: 'پشتیبان رشد',
};
exports.ASSIGNABLE_ROLES = [
    client_1.UserRole.manager,
    client_1.UserRole.facilitator,
    client_1.UserRole.supporter,
];
//# sourceMappingURL=permissions.js.map