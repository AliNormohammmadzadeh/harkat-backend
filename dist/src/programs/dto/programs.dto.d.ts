export declare class CreateProgramDto {
    name: string;
    description?: string;
    cost?: number;
    ids?: string[];
    createdAt?: string;
}
export declare class UpdateProgramDto {
    name?: string;
    description?: string;
    cost?: number;
    ids?: string[];
}
export declare class SetProgramMembersDto {
    ids: string[];
}
export declare class CreateProgramFromFilterDto {
    name: string;
    description?: string;
    cost?: number;
}
export declare class AttendanceResponseDto {
    programId: string;
    studentId: string;
    isPresent: boolean;
}
export declare class ProgramResponseDto {
    id: string;
    name: string;
    description?: string;
    cost: number;
    ids: string[];
    createdAt?: string;
    memberCount?: number;
}
