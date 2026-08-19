export declare const GRADES: string[];
export declare const GRADE_LEVELS: Record<string, string[]>;
export declare const STUDENT_STATUSES: string[];
export declare const EDU_LABELS: string[];
export declare const SOFT_SKILLS: {
    key: string;
    label: string;
}[];
export declare const FINANCE_CATEGORIES: string[];
export declare const SERVICE_TYPES: string[];
export declare const BARRIERS: string[];
export declare const MPI_INDICATORS: {
    index: number;
    name: string;
    dimension: string;
    weight: number;
}[];
export declare const CIRCUMSTANCE_KEYS: string[];
export declare const ROLE_LABELS: Record<string, string>;
export declare function economicLabel(status: number | null | undefined): string;
export declare function supporterUsernameFor(caseNumber: string | null | undefined, index: number): string;
