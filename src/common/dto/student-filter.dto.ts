import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class StudentFilterDto {
  @ApiPropertyOptional({ description: 'جستجو در نام، شماره پرونده، یا شبا' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'جنسیت', example: 'دختر' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ description: 'مقطع تحصیلی', example: 'متوسطه‌ی دوم' })
  @IsOptional()
  @IsString()
  grade?: string;

  @ApiPropertyOptional({ description: 'پایه تحصیلی', example: 'یازدهم' })
  @IsOptional()
  @IsString()
  gradeLevel?: string;

  @ApiPropertyOptional({ description: 'وضعیت دانش‌آموز', example: 'تحت حمایت' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'وضعیت اقتصادی (۱–۴)', example: '2' })
  @IsOptional()
  @IsString()
  economic?: string;

  @ApiPropertyOptional({ description: 'تحصیلات پدر (۰–۷)', example: '3' })
  @IsOptional()
  @IsString()
  fatherEdu?: string;

  @ApiPropertyOptional({ description: 'تحصیلات مادر (۰–۷)', example: '3' })
  @IsOptional()
  @IsString()
  motherEdu?: string;

  @ApiPropertyOptional({ description: 'میزان همراهی خانواده (۱–۵)', example: '3' })
  @IsOptional()
  @IsString()
  parentInvolvement?: string;

  @ApiPropertyOptional({ description: 'موانع تحصیلی (چند مقداری)', isArray: true, type: String })
  @IsOptional()
  barriers?: string | string[];

  @ApiPropertyOptional({ description: 'دروس ضعیف (چند مقداری)', isArray: true, type: String })
  @IsOptional()
  weakSubjects?: string | string[];

  @ApiPropertyOptional({ description: 'علاقه به مدرسه ویژه', example: 'yes' })
  @IsOptional()
  @IsString()
  eliteInterest?: string;

  @ApiPropertyOptional({ description: 'نیاز به کتاب کمک‌درسی', example: 'yes' })
  @IsOptional()
  @IsString()
  needsBooks?: string;

  @ApiPropertyOptional({ description: 'حداکثر معدل کل (فیلتر کمتر از)', example: '15' })
  @IsOptional()
  @IsString()
  avgMax?: string;

  @ApiPropertyOptional({
    description: 'کلید مهارت نرم برای فیلتر',
    example: 'selfAwareness',
    enum: ['selfAwareness', 'communication', 'emotionRegulation', 'responsibility', 'resilience', 'problemSolving', 'financialLiteracy'],
  })
  @IsOptional()
  @IsString()
  softSkill?: string;

  @ApiPropertyOptional({ description: 'حداکثر امتیاز مهارت نرم', example: '6' })
  @IsOptional()
  @IsString()
  softSkillMax?: string;

  @ApiPropertyOptional({ description: 'حداقل مجموع هزینه ثبت‌شده', example: '1000000' })
  @IsOptional()
  @IsString()
  spentMin?: string;

  @ApiPropertyOptional({ description: 'فیلتر شبا', enum: ['has', 'none'] })
  @IsOptional()
  @IsString()
  ibanHas?: string;

  @ApiPropertyOptional({ description: 'فیلتر اعضای یک برنامه', example: 'P1234567890' })
  @IsOptional()
  @IsString()
  programId?: string;

  @ApiPropertyOptional({ description: 'شماره صفحه', example: '1', default: '1' })
  @IsOptional()
  @IsString()
  page?: string;

  @ApiPropertyOptional({ description: 'تعداد در هر صفحه (حداکثر ۲۰۰)', example: '50', default: '50' })
  @IsOptional()
  @IsString()
  limit?: string;
}

export type StudentFilterQuery = StudentFilterDto;
