export interface AuthUser {
    id: string;
    username: string;
    fullName: string;
    initials: string | null;
    role: string;
}
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
