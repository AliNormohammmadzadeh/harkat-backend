import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProgramDto {
  @ApiProperty({ example: 'تقویت ریاضی پایه نهم', description: 'نام برنامه' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'کلاس تقویتی ریاضی برای دانش‌آموزان پایه نهم' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 5000000, description: 'بودجه کل — بین اعضا تقسیم و به عنوان هزینه ثبت می‌شود' })
  @IsOptional()
  @IsNumber()
  cost?: number;

  @ApiPropertyOptional({
    type: [String],
    example: ['S1', 'S2'],
    description: 'شناسه دانش‌آموزان عضو برنامه',
  })
  @IsOptional()
  @IsArray()
  ids?: string[];

  @ApiPropertyOptional({ example: '1404/05/22', description: 'تاریخ ایجاد (شمسی)' })
  @IsOptional()
  @IsString()
  createdAt?: string;
}

export class UpdateProgramDto {
  @ApiPropertyOptional({ example: 'تقویت ریاضی پایه نهم' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 5000000 })
  @IsOptional()
  @IsNumber()
  cost?: number;

  @ApiPropertyOptional({ type: [String], example: ['S1', 'S2'] })
  @IsOptional()
  @IsArray()
  ids?: string[];
}

export class SetProgramMembersDto {
  @ApiProperty({ type: [String], example: ['S1', 'S2', 'S3'], description: 'لیست کامل شناسه اعضا' })
  @IsArray()
  ids: string[];
}

export class CreateProgramFromFilterDto {
  @ApiProperty({ example: 'برنامه فیلتر دختران یازدهم' })
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 3000000 })
  @IsOptional()
  @IsNumber()
  cost?: number;
}

export class AttendanceResponseDto {
  @ApiProperty({ example: 'P1234567890' })
  programId: string;

  @ApiProperty({ example: 'S1' })
  studentId: string;

  @ApiProperty({ example: true })
  isPresent: boolean;
}

export class ProgramResponseDto {
  @ApiProperty({ example: 'P1234567890' })
  id: string;

  @ApiProperty({ example: 'تقویت ریاضی' })
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty({ example: 5000000 })
  cost: number;

  @ApiProperty({ type: [String] })
  ids: string[];

  @ApiPropertyOptional({ example: '1404/05/22' })
  createdAt?: string;

  @ApiPropertyOptional({ example: 25 })
  memberCount?: number;
}
