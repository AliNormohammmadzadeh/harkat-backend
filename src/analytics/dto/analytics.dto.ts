import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { StudentFilterDto } from '../../common/dto/student-filter.dto';

export class ChartQueryDto extends StudentFilterDto {
  @ApiPropertyOptional({
    description: 'بُعد نمودار',
    enum: ['grade', 'gender', 'status', 'economic', 'fatherEdu', 'motherEdu', 'eliteInterest', 'weakSubject'],
    example: 'grade',
  })
  @IsOptional()
  @IsString()
  groupBy?: string;
}

export class AnalyticsQueryDto {
  @ApiProperty({
    example: '۱۰ دانش‌آموز با کمترین معدل',
    description: 'پرسش آماری ساختاریافته (نه چت‌بات آزاد)',
  })
  @IsString()
  question: string;
}

export class AnalyticsStatsResponseDto {
  @ApiProperty({
    example: [
      { label: 'تعداد دانش‌آموزان (در فیلتر فعلی)', value: 527 },
      { label: 'میانگین معدل کل', value: 17.85 },
    ],
  })
  tiles: { label: string; value: string | number | null }[];
}

export class AnalyticsChartResponseDto {
  @ApiProperty({ example: 'مقطع تحصیلی' })
  dimension: string;

  @ApiProperty({
    example: [
      { label: 'متوسطه‌ی دوم', count: 200 },
      { label: 'متوسطه‌ی اول', count: 150 },
    ],
  })
  entries: { label: string; count: number }[];
}

export class AnalyticsQueryResponseDto {
  @ApiProperty()
  question: string;

  @ApiProperty()
  caveat: string;

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  results: object[];
}
