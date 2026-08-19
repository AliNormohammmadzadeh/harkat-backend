import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ProgramsService } from './programs.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { WriteAccessGuard } from '../common/guards/write-access.guard';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { StudentFilterDto } from '../common/dto/student-filter.dto';
import {
  AttendanceResponseDto,
  CreateProgramDto,
  CreateProgramFromFilterDto,
  ProgramResponseDto,
  SetProgramMembersDto,
  UpdateProgramDto,
} from './dto/programs.dto';

@ApiTags('Programs')
@ApiBearerAuth('JWT')
@Controller('api/programs')
@UseGuards(JwtAuthGuard)
export class ProgramsController {
  constructor(private programsService: ProgramsService) {}

  @Get()
  @ApiOperation({ summary: 'فهرست برنامه‌ها' })
  @ApiQuery({ name: 'search', required: false, description: 'جستجو در نام برنامه' })
  @ApiResponse({ status: 200, type: [ProgramResponseDto] })
  findAll(@Query('search') search?: string) {
    return this.programsService.findAll(search);
  }

  @Post('from-filter')
  @UseGuards(WriteAccessGuard)
  @ApiOperation({
    summary: 'ایجاد برنامه از فیلتر',
    description: 'اعضا = نتیجه فیلتر فعلی فهرست دانش‌آموزان',
  })
  @ApiResponse({ status: 201, type: ProgramResponseDto })
  createFromFilter(
    @Query() query: StudentFilterDto,
    @Body() dto: CreateProgramFromFilterDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.programsService.createFromFilter(query, dto, user);
  }

  @Post()
  @UseGuards(WriteAccessGuard)
  @ApiOperation({
    summary: 'ایجاد برنامه',
    description: 'اگر cost > 0 باشد، بودجه بین اعضا تقسیم و به finance ثبت می‌شود',
  })
  @ApiResponse({ status: 201, type: ProgramResponseDto })
  create(@Body() dto: CreateProgramDto, @CurrentUser() user: AuthUser) {
    return this.programsService.create(dto, user);
  }

  @Get(':id/export')
  @ApiOperation({ summary: 'خروجی اعضای برنامه', description: 'فایل JSON اعضا' })
  @ApiParam({ name: 'id', example: 'P1234567890' })
  async export(@Param('id') id: string, @Res() res: Response) {
    const data = await this.programsService.exportMembers(id);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=program-${id}-members.json`);
    res.send(JSON.stringify(data, null, 2));
  }

  @Get(':id/members')
  @ApiOperation({ summary: 'اعضای برنامه', description: 'لیست اعضا + حضور/غیاب' })
  @ApiParam({ name: 'id', example: 'P1234567890' })
  getMembers(@Param('id') id: string) {
    return this.programsService.getMembers(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'جزئیات برنامه' })
  @ApiParam({ name: 'id', example: 'P1234567890' })
  @ApiResponse({ status: 200, type: ProgramResponseDto })
  @ApiResponse({ status: 404, description: 'برنامه یافت نشد' })
  findOne(@Param('id') id: string) {
    return this.programsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(WriteAccessGuard)
  @ApiOperation({
    summary: 'ویرایش برنامه',
    description: 'با تغییر بودجه، هزینه‌های قبلی برنامه حذف و مجدداً ثبت می‌شوند',
  })
  @ApiParam({ name: 'id', example: 'P1234567890' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProgramDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.programsService.update(id, dto, user);
  }

  @Delete(':id')
  @UseGuards(WriteAccessGuard)
  @ApiOperation({ summary: 'حذف برنامه', description: 'هزینه‌های مرتبط با برنامه نیز حذف می‌شوند' })
  @ApiParam({ name: 'id', example: 'P1234567890' })
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.programsService.delete(id, user);
  }

  @Put(':id/members')
  @UseGuards(WriteAccessGuard)
  @ApiOperation({ summary: 'تعیین اعضای برنامه', description: 'جایگزینی کامل لیست اعضا' })
  @ApiParam({ name: 'id', example: 'P1234567890' })
  setMembers(
    @Param('id') id: string,
    @Body() body: SetProgramMembersDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.programsService.setMembers(id, body.ids ?? [], user);
  }

  @Put(':id/attendance/:studentId')
  @UseGuards(WriteAccessGuard)
  @ApiOperation({ summary: 'ثبت حضور/غیاب', description: 'toggle — هر فراخوانی وضعیت را معکوس می‌کند' })
  @ApiParam({ name: 'id', example: 'P1234567890' })
  @ApiParam({ name: 'studentId', example: 'S1' })
  @ApiResponse({ status: 200, type: AttendanceResponseDto })
  toggleAttendance(
    @Param('id') id: string,
    @Param('studentId') studentId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.programsService.toggleAttendance(id, studentId, user);
  }
}
