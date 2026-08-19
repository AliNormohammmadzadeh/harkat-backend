export declare class CreateStudentDto {
    caseNumber?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    grade?: string;
    gradeLevel?: string;
    major?: string;
    school?: string;
    studentStatus?: string;
}
export declare class UpdateStudentSummaryDto {
    caseNumber?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    gender?: string;
    grade?: string;
    gradeLevel?: string;
    major?: string;
    school?: string;
    overallAvg?: number;
    studentStatus?: string;
    economicStatus?: number;
    decile?: number;
    fatherEdu?: number;
    motherEdu?: number;
    mentalHealthNote?: string;
    evaluatorSuggestion?: string;
}
export declare class ImportStudentsDto {
    records: Record<string, unknown>[];
}
export declare class UpdateProfileStatusDto {
    status: string;
    reason?: string;
}
export declare class HouseholdMemberDto {
    name?: string;
    relation?: string;
    age?: string;
    note?: string;
}
export declare class FamilyHealthDto {
    name?: string;
    healthType?: string;
    type?: string;
    description?: string;
    desc?: string;
    cost?: string;
}
export declare class MpiFlagsDto {
    deps: boolean[];
}
export declare class TagGroupDto {
    values: string[];
}
export declare class PaginatedStudentsResponseDto {
    data: object[];
    meta: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
}
