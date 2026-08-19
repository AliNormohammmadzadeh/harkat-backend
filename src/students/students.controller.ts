import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { StudentsService } from './students.service';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { WriteAccessGuard } from '../common/guards/write-access.guard';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { StudentFilterDto } from '../common/dto/student-filter.dto';
import {
  CreateStudentDto,
  FamilyHealthDto,
  HouseholdMemberDto,
  ImportStudentsDto,
  MpiFlagsDto,
  PaginatedStudentsResponseDto,
  TagGroupDto,
  UpdateProfileStatusDto,
  UpdateStudentSummaryDto,
} from './dto/students.dto';

@ApiTags('Students', 'Profile')
@ApiBearerAuth('JWT')
@Controller('api/students')
@UseGuards(JwtAuthGuard)
export class StudentsController {
  constructor(
    private studentsService: StudentsService,
    private profileService: ProfileService,
  ) {}

  @Get()
  @ApiTags('Students')
  @ApiOperation({
    summary: 'فهرست دانش‌آموزان',
    description: 'جستجو، فیلتر پیشرفته و صفحه‌بندی. پشتیبان فقط دانش‌آموزان تخصیص‌یافته را می‌بیند.',
  })
  @ApiResponse({ status: 200, type: PaginatedStudentsResponseDto })
  findAll(@Query() query: StudentFilterDto, @CurrentUser() user: AuthUser) {
    return this.studentsService.findAll(query, user);
  }

  @Get('import/template')
  @ApiTags('Students')
  @ApiOperation({ summary: 'قالب import', description: 'سربرگ‌ها و نمونه رکورد برای import دسته‌ای' })
  @ApiResponse({ status: 200, description: 'headers + sample object' })
  importTemplate() {
    return this.studentsService.getImportTemplate();
  }

  @Get('export')
  @ApiTags('Students')
  @ApiOperation({
    summary: 'خروجی دانش‌آموزان',
    description: 'خروجی JSON فهرست فیلترشده (همان فیلترهای GET /students)',
  })
  @ApiResponse({ status: 200, description: 'فایل JSON' })
  async export(
    @Query() query: StudentFilterDto,
    @CurrentUser() user: AuthUser,
    @Res() res: Response,
  ) {
    const data = await this.studentsService.getFilteredForExport(query, user);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=students-export.json');
    res.send(JSON.stringify(data, null, 2));
  }

  @Post('import')
  @UseGuards(WriteAccessGuard)
  @ApiTags('Students')
  @ApiOperation({ summary: 'import دسته‌ای', description: 'افزودن چند دانش‌آموز از آرایه JSON/CSV-parsed' })
  @ApiResponse({ status: 201, description: '{ imported, ids }' })
  @ApiResponse({ status: 403, description: 'مدیر تیم فقط مشاهده دارد' })
  import(@Body() body: ImportStudentsDto, @CurrentUser() user: AuthUser) {
    return this.studentsService.importStudents(body.records ?? [], user);
  }

  @Post()
  @UseGuards(WriteAccessGuard)
  @ApiTags('Students')
  @ApiOperation({ summary: 'افزودن دستی دانش‌آموز', description: 'ایجاد رکورد جدید با is_custom=true' })
  @ApiResponse({ status: 201, description: 'دانش‌آموز ایجاد شد' })
  create(@Body() dto: CreateStudentDto, @CurrentUser() user: AuthUser) {
    return this.studentsService.createManual(dto as Record<string, unknown>, user);
  }

  @Get(':id')
  @ApiTags('Students')
  @ApiOperation({ summary: 'جزئیات overview', description: 'نمای خلاصه قبل از پروفایل کامل' })
  @ApiParam({ name: 'id', example: 'S1' })
  @ApiResponse({ status: 200, description: 'Student list item' })
  @ApiResponse({ status: 404, description: 'یافت نشد' })
  findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.studentsService.findOne(id, user);
  }

  @Patch(':id/summary')
  @UseGuards(WriteAccessGuard)
  @ApiTags('Students')
  @ApiOperation({ summary: 'به‌روزرسانی فیلدهای فهرست' })
  @ApiParam({ name: 'id', example: 'S1' })
  updateSummary(
    @Param('id') id: string,
    @Body() dto: UpdateStudentSummaryDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.studentsService.updateSummary(id, dto as Record<string, unknown>, user);
  }

  @Delete(':id')
  @UseGuards(WriteAccessGuard)
  @ApiTags('Students')
  @ApiOperation({ summary: 'حذف دانش‌آموز' })
  @ApiParam({ name: 'id', example: 'S1' })
  @ApiResponse({ status: 200, description: '{ ok: true }' })
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.studentsService.deleteStudent(id, user);
  }

  @Get(':id/profile')
  @ApiTags('Profile')
  @ApiOperation({
    summary: 'پروفایل کامل',
    description: 'بارگذاری کل state پروفایل (معادل localStorage در پروتوتایپ)',
  })
  @ApiParam({ name: 'id', example: 'S1' })
  getProfile(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.profileService.getProfile(id, user);
  }

  @Put(':id/profile')
  @UseGuards(WriteAccessGuard)
  @ApiTags('Profile')
  @ApiOperation({
    summary: 'ذخیره پروفایل کامل',
    description: 'ذخیره خودکار کل state — همه تب‌ها و زیرمجموعه‌ها',
  })
  @ApiParam({ name: 'id', example: 'S1' })
  @ApiBody({
    description: 'Full profile state object (same shape as GET response)',
    schema: { type: 'object' },
  })
  saveProfile(
    @Param('id') id: string,
    @Body() state: Record<string, unknown>,
    @CurrentUser() user: AuthUser,
  ) {
    return this.profileService.saveProfile(id, state, user);
  }

  @Patch(':id/profile/photo')
  @UseGuards(WriteAccessGuard)
  @UseInterceptors(FileInterceptor('photo'))
  @ApiTags('Profile')
  @ApiOperation({ summary: 'آپلود عکس پروفایل' })
  @ApiParam({ name: 'id', example: 'S1' })
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiBody({
    schema: {
      oneOf: [
        {
          type: 'object',
          properties: {
            photo: { type: 'string', format: 'binary', description: 'فایل تصویر' },
          },
        },
        {
          type: 'object',
          properties: {
            photo: { type: 'string', description: 'Base64 data URL' },
          },
        },
      ],
    },
  })
  async uploadPhoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('photo') photoBase64: string,
    @CurrentUser() user: AuthUser,
  ) {
    const photoUrl = photoBase64 ?? (file ? `data:${file.mimetype};base64,${file.buffer.toString('base64')}` : '');
    return this.profileService.updatePhoto(id, photoUrl, user);
  }

  @Patch(':id/profile/status')
  @UseGuards(WriteAccessGuard)
  @ApiTags('Profile')
  @ApiOperation({ summary: 'تغییر وضعیت دانش‌آموز', description: 'تحت حمایت / بورسیه / توقف / حذف' })
  @ApiParam({ name: 'id', example: 'S1' })
  updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateProfileStatusDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.profileService.updateStatus(id, body.status, body.reason ?? '', user);
  }

  @Get(':id/programs')
  @ApiTags('Profile')
  @ApiOperation({ summary: 'ماموریت‌ها', description: 'برنامه‌هایی که دانش‌آموز عضو آن‌هاست' })
  @ApiParam({ name: 'id', example: 'S1' })
  getPrograms(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.studentsService.getStudentPrograms(id, user);
  }

  @Post(':id/household-members')
  @UseGuards(WriteAccessGuard)
  @ApiTags('Profile')
  @ApiOperation({ summary: 'افزودن عضو خانوار' })
  @ApiParam({ name: 'id', example: 'S1' })
  addHouseholdMember(
    @Param('id') id: string,
    @Body() dto: HouseholdMemberDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.profileService.addHouseholdMember(id, dto as Record<string, string>, user);
  }

  @Delete(':id/household-members/:memberId')
  @UseGuards(WriteAccessGuard)
  @ApiTags('Profile')
  @ApiOperation({ summary: 'حذف عضو خانوار' })
  @ApiParam({ name: 'id', example: 'S1' })
  @ApiParam({ name: 'memberId', description: 'UUID عضو' })
  removeHouseholdMember(
    @Param('id') id: string,
    @Param('memberId') memberId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.profileService.removeHouseholdMember(id, memberId, user);
  }

  @Post(':id/family-health')
  @UseGuards(WriteAccessGuard)
  @ApiTags('Profile')
  @ApiOperation({ summary: 'افزودن رکورد سلامت خانواده' })
  @ApiParam({ name: 'id', example: 'S1' })
  addFamilyHealth(
    @Param('id') id: string,
    @Body() dto: FamilyHealthDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.profileService.addFamilyHealth(id, dto as Record<string, string>, user);
  }

  @Delete(':id/family-health/:recordId')
  @UseGuards(WriteAccessGuard)
  @ApiTags('Profile')
  @ApiOperation({ summary: 'حذف رکورد سلامت خانواده' })
  @ApiParam({ name: 'id', example: 'S1' })
  @ApiParam({ name: 'recordId', description: 'UUID رکورد' })
  removeFamilyHealth(
    @Param('id') id: string,
    @Param('recordId') recordId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.profileService.removeFamilyHealth(id, recordId, user);
  }

  @Put(':id/mpi-flags')
  @UseGuards(WriteAccessGuard)
  @ApiTags('Profile')
  @ApiOperation({ summary: 'شاخص‌های MPI', description: '۱۰ شاخص محرومیت چندبُعدی' })
  @ApiParam({ name: 'id', example: 'S1' })
  setMpi(@Param('id') id: string, @Body() body: MpiFlagsDto, @CurrentUser() user: AuthUser) {
    return this.profileService.setMpiFlags(id, body.deps, user);
  }

  @Put(':id/family-circumstances')
  @UseGuards(WriteAccessGuard)
  @ApiTags('Profile')
  @ApiOperation({
    summary: 'شرایط خانواده',
    description: 'separated, singleParent, prison, deceased, addiction, abuse',
  })
  @ApiParam({ name: 'id', example: 'S1' })
  @ApiBody({
    schema: {
      type: 'object',
      additionalProperties: { type: 'boolean' },
      example: { separated: false, singleParent: true, prison: false },
    },
  })
  setCircumstances(
    @Param('id') id: string,
    @Body() circ: Record<string, boolean>,
    @CurrentUser() user: AuthUser,
  ) {
    return this.profileService.setFamilyCircumstances(id, circ, user);
  }

  @Put(':id/tags/:group')
  @UseGuards(WriteAccessGuard)
  @ApiTags('Profile')
  @ApiOperation({
    summary: 'تگ‌های پروفایل',
    description: 'weakSubjects | strongSubjects | barriers | externalAid | eliteSchools | ...',
  })
  @ApiParam({ name: 'id', example: 'S1' })
  @ApiParam({
    name: 'group',
    example: 'weakSubjects',
    description: 'نام گروه تگ',
  })
  setTags(
    @Param('id') id: string,
    @Param('group') group: string,
    @Body() body: TagGroupDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.profileService.setTags(id, group, body.values ?? [], user);
  }
}
