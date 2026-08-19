import { StudentsService } from '../students/students.service';
import { AuthUser } from '../common/decorators/current-user.decorator';
import { StudentFilterQuery } from '../students/student-query.util';
export declare class AnalyticsService {
    private studentsService;
    constructor(studentsService: StudentsService);
    private getFilteredList;
    getStats(query: StudentFilterQuery, user: AuthUser): Promise<{
        tiles: {
            label: string;
            value: any;
        }[];
    }>;
    getChart(query: StudentFilterQuery & {
        groupBy?: string;
    }, user: AuthUser): Promise<{
        dimension: string;
        entries: {
            label: string;
            count: number;
        }[];
    }>;
    query(question: string, user: AuthUser): Promise<{
        question: string;
        caveat: string;
        results: {
            rank: number;
            id: any;
            fullName: any;
            grade: any;
            gradeLevel: any;
            overallAvg: number | null;
        }[];
    }>;
}
