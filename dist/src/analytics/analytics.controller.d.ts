import { AnalyticsService } from './analytics.service';
import { AuthUser } from '../common/decorators/current-user.decorator';
import { StudentFilterDto } from '../common/dto/student-filter.dto';
import { AnalyticsQueryDto, ChartQueryDto } from './dto/analytics.dto';
export declare class AnalyticsController {
    private analyticsService;
    constructor(analyticsService: AnalyticsService);
    stats(query: StudentFilterDto, user: AuthUser): Promise<{
        tiles: {
            label: string;
            value: any;
        }[];
    }>;
    chart(query: ChartQueryDto, user: AuthUser): Promise<{
        dimension: string;
        entries: {
            label: string;
            count: number;
        }[];
    }>;
    query(body: AnalyticsQueryDto, user: AuthUser): Promise<{
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
