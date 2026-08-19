import { UserRole } from '@prisma/client';
export declare class CreateUserDto {
    username: string;
    password: string;
    fullName: string;
    initials?: string;
    role: UserRole;
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    isActive?: boolean;
    password?: string;
}
export declare class UserResponseDto {
    id: string;
    username: string;
    fullName: string;
    initials: string | null;
    role: UserRole;
    roleLabel: string;
    isActive: boolean;
    createdAt: Date;
}
export {};
