export declare class StudentFilterDto {
    search?: string;
    gender?: string;
    grade?: string;
    gradeLevel?: string;
    status?: string;
    economic?: string;
    fatherEdu?: string;
    motherEdu?: string;
    parentInvolvement?: string;
    barriers?: string | string[];
    weakSubjects?: string | string[];
    eliteInterest?: string;
    needsBooks?: string;
    avgMax?: string;
    softSkill?: string;
    softSkillMax?: string;
    spentMin?: string;
    ibanHas?: string;
    programId?: string;
    page?: string;
    limit?: string;
}
export type StudentFilterQuery = StudentFilterDto;
