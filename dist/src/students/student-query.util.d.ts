import { Prisma } from '@prisma/client';
import { AuthUser } from '../common/decorators/current-user.decorator';
import { StudentFilterQuery } from '../common/dto/student-filter.dto';
export type { StudentFilterQuery };
export declare function buildStudentWhere(query: StudentFilterQuery, user: AuthUser, supporterUsernames: Map<string, string>): Prisma.StudentWhereInput;
export declare function buildSupporterMap(students: {
    id: string;
    caseNumber: string | null;
}[]): Map<string, string>;
export declare function paginate(query: StudentFilterQuery): {
    skip: number;
    take: number;
    page: number;
    limit: number;
};
