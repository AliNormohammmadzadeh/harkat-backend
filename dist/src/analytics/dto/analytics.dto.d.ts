import { StudentFilterDto } from '../../common/dto/student-filter.dto';
export declare class ChartQueryDto extends StudentFilterDto {
    groupBy?: string;
}
export declare class AnalyticsQueryDto {
    question: string;
}
export declare class AnalyticsStatsResponseDto {
    tiles: {
        label: string;
        value: string | number | null;
    }[];
}
export declare class AnalyticsChartResponseDto {
    dimension: string;
    entries: {
        label: string;
        count: number;
    }[];
}
export declare class AnalyticsQueryResponseDto {
    question: string;
    caveat: string;
    results: object[];
}
