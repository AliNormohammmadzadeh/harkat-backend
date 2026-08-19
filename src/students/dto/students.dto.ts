import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiPropertyOptional({ example: '9999', description: 'شماره پرونده' })
  @IsOptional()
  @IsString()
  caseNumber?: string;

  @ApiPropertyOptional({ example: 'مریم' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: 'احمدی' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: 'دختر' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ example: 'متوسطه‌ی دوم' })
  @IsOptional()
  @IsString()
  grade?: string;

  @ApiPropertyOptional({ example: 'دهم' })
  @IsOptional()
  @IsString()
  gradeLevel?: string;

  @ApiPropertyOptional({ example: 'ریاضی-فیزیک' })
  @IsOptional()
  @IsString()
  major?: string;

  @ApiPropertyOptional({ example: 'مدرسه نمونه' })
  @IsOptional()
  @IsString()
  school?: string;

  @ApiPropertyOptional({ example: 'تحت حمایت' })
  @IsOptional()
  @IsString()
  studentStatus?: string;
}

export class UpdateStudentSummaryDto {
  @ApiPropertyOptional({ example: '1381' })
  @IsOptional()
  @IsString()
  caseNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  grade?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  gradeLevel?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  major?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  school?: string;

  @ApiPropertyOptional({ example: 18.5 })
  @IsOptional()
  overallAvg?: number;

  @ApiPropertyOptional({ example: 'تحت حمایت' })
  @IsOptional()
  @IsString()
  studentStatus?: string;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  economicStatus?: number;

  @ApiPropertyOptional({ example: 5 })
  @IsOptional()
  decile?: number;

  @ApiPropertyOptional()
  @IsOptional()
  fatherEdu?: number;

  @ApiPropertyOptional()
  @IsOptional()
  motherEdu?: number;

  @ApiPropertyOptional({ description: 'یادداشت محرمانه سلامت روان' })
  @IsOptional()
  @IsString()
  mentalHealthNote?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  evaluatorSuggestion?: string;
}

export class ImportStudentsDto {
  @ApiProperty({
    type: 'array',
    items: { type: 'object' },
    description: 'آرایه رکوردهای دانش‌آموز برای import',
    example: [
      {
        caseNumber: '9999',
        firstName: 'نمونه',
        lastName: 'دانش‌آموز',
        gender: 'دختر',
        grade: 'متوسطه‌ی دوم',
        gradeLevel: 'دهم',
        major: 'ریاضی-فیزیک',
        natId: '1234567890',
        school: 'نمونه',
        overallAvg: '18.5',
        studentStatus: 'تحت حمایت',
      },
    ],
  })
  @IsArray()
  records: Record<string, unknown>[];
}

export class UpdateProfileStatusDto {
  @ApiProperty({ example: 'توقف', description: 'وضعیت جدید دانش‌آموز' })
  @IsString()
  status: string;

  @ApiPropertyOptional({ example: 'انتقال محل سکونت', description: 'دلیل (برای توقف/حذف)' })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class HouseholdMemberDto {
  @ApiPropertyOptional({ example: 'علی' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'برادر' })
  @IsOptional()
  @IsString()
  relation?: string;

  @ApiPropertyOptional({ example: '14' })
  @IsOptional()
  @IsString()
  age?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;
}

export class FamilyHealthDto {
  @ApiPropertyOptional({ example: 'پدر' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'دیابت' })
  @IsOptional()
  @IsString()
  healthType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  desc?: string;

  @ApiPropertyOptional({ example: '500000' })
  @IsOptional()
  @IsString()
  cost?: string;
}

export class MpiFlagsDto {
  @ApiProperty({
    type: [Boolean],
    description: '۱۰ شاخص MPI — true = محروم',
    example: [false, false, true, false, false, false, false, false, false, false],
  })
  deps: boolean[];
}

export class TagGroupDto {
  @ApiProperty({
    type: [String],
    example: ['ریاضی', 'فیزیک'],
    description: 'مقادیر تگ انتخاب‌شده',
  })
  values: string[];
}

export class PaginatedStudentsResponseDto {
  @ApiProperty({ type: 'array', items: { type: 'object' } })
  data: object[];

  @ApiProperty({
    example: { total: 527, page: 1, limit: 50, pages: 11 },
  })
  meta: { total: number; page: number; limit: number; pages: number };
}
