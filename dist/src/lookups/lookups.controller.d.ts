export declare class LookupsController {
    grades(): string[];
    gradeLevels(): Record<string, string[]>;
    studentStatuses(): string[];
    softSkills(): {
        key: string;
        label: string;
    }[];
    financeCategories(): string[];
    serviceTypes(): string[];
    barriers(): string[];
    mpiIndicators(): {
        index: number;
        name: string;
        dimension: string;
        weight: number;
    }[];
}
