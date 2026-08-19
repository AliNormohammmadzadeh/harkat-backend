export declare class LoginDto {
    username: string;
    password: string;
}
export declare class LoginResponseDto {
    accessToken: string;
    user: {
        id: string;
        username: string;
        name: string;
        initials: string | null;
        role: string;
        roleLabel: string;
    };
}
export declare class MeResponseDto {
    id: string;
    username: string;
    name: string;
    initials: string | null;
    role: string;
    roleLabel: string;
}
export declare class OkResponseDto {
    ok: boolean;
}
