import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BARRIERS,
  FINANCE_CATEGORIES,
  GRADE_LEVELS,
  GRADES,
  MPI_INDICATORS,
  SERVICE_TYPES,
  SOFT_SKILLS,
  STUDENT_STATUSES,
} from '../common/constants/lookups';

@ApiTags('Lookups')
@Controller('api/lookups')
export class LookupsController {
  @Get('grades')
  @ApiOperation({ summary: 'مقاطع تحصیلی', description: 'ابتدایی، متوسطه اول/دوم، ...' })
  @ApiResponse({ status: 200, schema: { type: 'array', items: { type: 'string' } } })
  grades() {
    return GRADES;
  }

  @Get('grade-levels')
  @ApiOperation({ summary: 'پایه‌ها به تفکیک مقطع' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      example: { 'متوسطه‌ی دوم': ['دهم', 'یازدهم', 'دوازدهم'] },
    },
  })
  gradeLevels() {
    return GRADE_LEVELS;
  }

  @Get('student-statuses')
  @ApiOperation({ summary: 'وضعیت‌های دانش‌آموز' })
  @ApiResponse({ status: 200, schema: { type: 'array', items: { type: 'string' } } })
  studentStatuses() {
    return STUDENT_STATUSES;
  }

  @Get('soft-skills')
  @ApiOperation({ summary: '۷ مهارت نرم', description: 'key + label' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: { key: { type: 'string' }, label: { type: 'string' } },
      },
    },
  })
  softSkills() {
    return SOFT_SKILLS;
  }

  @Get('finance-categories')
  @ApiOperation({ summary: 'دسته‌های هزینه' })
  @ApiResponse({ status: 200, schema: { type: 'array', items: { type: 'string' } } })
  financeCategories() {
    return FINANCE_CATEGORIES;
  }

  @Get('service-types')
  @ApiOperation({ summary: 'انواع خدمت' })
  @ApiResponse({ status: 200, schema: { type: 'array', items: { type: 'string' } } })
  serviceTypes() {
    return SERVICE_TYPES;
  }

  @Get('barriers')
  @ApiOperation({ summary: 'موانع تحصیلی' })
  @ApiResponse({ status: 200, schema: { type: 'array', items: { type: 'string' } } })
  barriers() {
    return BARRIERS;
  }

  @Get('mpi-indicators')
  @ApiOperation({ summary: '۱۰ شاخص MPI', description: 'name, dimension, weight' })
  @ApiResponse({ status: 200, schema: { type: 'array', items: { type: 'object' } } })
  mpiIndicators() {
    return MPI_INDICATORS;
  }
}
