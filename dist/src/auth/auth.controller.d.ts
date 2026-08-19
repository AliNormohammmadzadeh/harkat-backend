import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthUser } from '../common/decorators/current-user.decorator';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
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
    logout(): {
        ok: boolean;
    };
    me(user: AuthUser): Promise<{
        id: string;
        username: string;
        name: string;
        initials: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        roleLabel: string;
        permissions: import("../common/auth/permissions").RolePermissions;
    }>;
    permissions(user: AuthUser): import("../common/auth/permissions").RolePermissions;
}
