"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const students_service_1 = require("./students.service");
const profile_service_1 = require("./profile.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const write_access_guard_1 = require("../common/guards/write-access.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const student_filter_dto_1 = require("../common/dto/student-filter.dto");
const students_dto_1 = require("./dto/students.dto");
let StudentsController = class StudentsController {
    constructor(studentsService, profileService) {
        this.studentsService = studentsService;
        this.profileService = profileService;
    }
    findAll(query, user) {
        return this.studentsService.findAll(query, user);
    }
    importTemplate() {
        return this.studentsService.getImportTemplate();
    }
    async export(query, user, res) {
        const data = await this.studentsService.getFilteredForExport(query, user);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=students-export.json');
        res.send(JSON.stringify(data, null, 2));
    }
    import(body, user) {
        return this.studentsService.importStudents(body.records ?? [], user);
    }
    create(dto, user) {
        return this.studentsService.createManual(dto, user);
    }
    findOne(id, user) {
        return this.studentsService.findOne(id, user);
    }
    updateSummary(id, dto, user) {
        return this.studentsService.updateSummary(id, dto, user);
    }
    remove(id, user) {
        return this.studentsService.deleteStudent(id, user);
    }
    getProfile(id, user) {
        return this.profileService.getProfile(id, user);
    }
    saveProfile(id, state, user) {
        return this.profileService.saveProfile(id, state, user);
    }
    async uploadPhoto(id, file, photoBase64, user) {
        const photoUrl = photoBase64 ?? (file ? `data:${file.mimetype};base64,${file.buffer.toString('base64')}` : '');
        return this.profileService.updatePhoto(id, photoUrl, user);
    }
    updateStatus(id, body, user) {
        return this.profileService.updateStatus(id, body.status, body.reason ?? '', user);
    }
    getPrograms(id, user) {
        return this.studentsService.getStudentPrograms(id, user);
    }
    addHouseholdMember(id, dto, user) {
        return this.profileService.addHouseholdMember(id, dto, user);
    }
    removeHouseholdMember(id, memberId, user) {
        return this.profileService.removeHouseholdMember(id, memberId, user);
    }
    addFamilyHealth(id, dto, user) {
        return this.profileService.addFamilyHealth(id, dto, user);
    }
    removeFamilyHealth(id, recordId, user) {
        return this.profileService.removeFamilyHealth(id, recordId, user);
    }
    setMpi(id, body, user) {
        return this.profileService.setMpiFlags(id, body.deps, user);
    }
    setCircumstances(id, circ, user) {
        return this.profileService.setFamilyCircumstances(id, circ, user);
    }
    setTags(id, group, body, user) {
        return this.profileService.setTags(id, group, body.values ?? [], user);
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiTags)('Students'),
    (0, swagger_1.ApiOperation)({
        summary: 'فهرست دانش‌آموزان',
        description: 'جستجو، فیلتر پیشرفته و صفحه‌بندی. پشتیبان فقط دانش‌آموزان تخصیص‌یافته را می‌بیند.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: students_dto_1.PaginatedStudentsResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_filter_dto_1.StudentFilterDto, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('import/template'),
    (0, swagger_1.ApiTags)('Students'),
    (0, swagger_1.ApiOperation)({ summary: 'قالب import', description: 'سربرگ‌ها و نمونه رکورد برای import دسته‌ای' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'headers + sample object' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "importTemplate", null);
__decorate([
    (0, common_1.Get)('export'),
    (0, swagger_1.ApiTags)('Students'),
    (0, swagger_1.ApiOperation)({
        summary: 'خروجی دانش‌آموزان',
        description: 'خروجی JSON فهرست فیلترشده (همان فیلترهای GET /students)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'فایل JSON' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_filter_dto_1.StudentFilterDto, Object, Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "export", null);
__decorate([
    (0, common_1.Post)('import'),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, swagger_1.ApiTags)('Students'),
    (0, swagger_1.ApiOperation)({ summary: 'import دسته‌ای', description: 'افزودن چند دانش‌آموز از آرایه JSON/CSV-parsed' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '{ imported, ids }' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'مدیر تیم فقط مشاهده دارد' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [students_dto_1.ImportStudentsDto, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "import", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, swagger_1.ApiTags)('Students'),
    (0, swagger_1.ApiOperation)({ summary: 'افزودن دستی دانش‌آموز', description: 'ایجاد رکورد جدید با is_custom=true' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'دانش‌آموز ایجاد شد' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [students_dto_1.CreateStudentDto, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiTags)('Students'),
    (0, swagger_1.ApiOperation)({ summary: 'جزئیات overview', description: 'نمای خلاصه قبل از پروفایل کامل' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'S1' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Student list item' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'یافت نشد' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/summary'),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, swagger_1.ApiTags)('Students'),
    (0, swagger_1.ApiOperation)({ summary: 'به‌روزرسانی فیلدهای فهرست' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'S1' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, students_dto_1.UpdateStudentSummaryDto, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "updateSummary", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, swagger_1.ApiTags)('Students'),
    (0, swagger_1.ApiOperation)({ summary: 'حذف دانش‌آموز' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'S1' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '{ ok: true }' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/profile'),
    (0, swagger_1.ApiTags)('Profile'),
    (0, swagger_1.ApiOperation)({
        summary: 'پروفایل کامل',
        description: 'بارگذاری کل state پروفایل (معادل localStorage در پروتوتایپ)',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'S1' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)(':id/profile'),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, swagger_1.ApiTags)('Profile'),
    (0, swagger_1.ApiOperation)({
        summary: 'ذخیره پروفایل کامل',
        description: 'ذخیره خودکار کل state — همه تب‌ها و زیرمجموعه‌ها',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'S1' }),
    (0, swagger_1.ApiBody)({
        description: 'Full profile state object (same shape as GET response)',
        schema: { type: 'object' },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "saveProfile", null);
__decorate([
    (0, common_1.Patch)(':id/profile/photo'),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo')),
    (0, swagger_1.ApiTags)('Profile'),
    (0, swagger_1.ApiOperation)({ summary: 'آپلود عکس پروفایل' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'S1' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiBody)({
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
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)('photo')),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, Object]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "uploadPhoto", null);
__decorate([
    (0, common_1.Patch)(':id/profile/status'),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, swagger_1.ApiTags)('Profile'),
    (0, swagger_1.ApiOperation)({ summary: 'تغییر وضعیت دانش‌آموز', description: 'تحت حمایت / بورسیه / توقف / حذف' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'S1' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, students_dto_1.UpdateProfileStatusDto, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)(':id/programs'),
    (0, swagger_1.ApiTags)('Profile'),
    (0, swagger_1.ApiOperation)({ summary: 'ماموریت‌ها', description: 'برنامه‌هایی که دانش‌آموز عضو آن‌هاست' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'S1' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "getPrograms", null);
__decorate([
    (0, common_1.Post)(':id/household-members'),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, swagger_1.ApiTags)('Profile'),
    (0, swagger_1.ApiOperation)({ summary: 'افزودن عضو خانوار' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'S1' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, students_dto_1.HouseholdMemberDto, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "addHouseholdMember", null);
__decorate([
    (0, common_1.Delete)(':id/household-members/:memberId'),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, swagger_1.ApiTags)('Profile'),
    (0, swagger_1.ApiOperation)({ summary: 'حذف عضو خانوار' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'S1' }),
    (0, swagger_1.ApiParam)({ name: 'memberId', description: 'UUID عضو' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('memberId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "removeHouseholdMember", null);
__decorate([
    (0, common_1.Post)(':id/family-health'),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, swagger_1.ApiTags)('Profile'),
    (0, swagger_1.ApiOperation)({ summary: 'افزودن رکورد سلامت خانواده' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'S1' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, students_dto_1.FamilyHealthDto, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "addFamilyHealth", null);
__decorate([
    (0, common_1.Delete)(':id/family-health/:recordId'),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, swagger_1.ApiTags)('Profile'),
    (0, swagger_1.ApiOperation)({ summary: 'حذف رکورد سلامت خانواده' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'S1' }),
    (0, swagger_1.ApiParam)({ name: 'recordId', description: 'UUID رکورد' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('recordId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "removeFamilyHealth", null);
__decorate([
    (0, common_1.Put)(':id/mpi-flags'),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, swagger_1.ApiTags)('Profile'),
    (0, swagger_1.ApiOperation)({ summary: 'شاخص‌های MPI', description: '۱۰ شاخص محرومیت چندبُعدی' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'S1' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, students_dto_1.MpiFlagsDto, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "setMpi", null);
__decorate([
    (0, common_1.Put)(':id/family-circumstances'),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, swagger_1.ApiTags)('Profile'),
    (0, swagger_1.ApiOperation)({
        summary: 'شرایط خانواده',
        description: 'separated, singleParent, prison, deceased, addiction, abuse',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'S1' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            additionalProperties: { type: 'boolean' },
            example: { separated: false, singleParent: true, prison: false },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "setCircumstances", null);
__decorate([
    (0, common_1.Put)(':id/tags/:group'),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, swagger_1.ApiTags)('Profile'),
    (0, swagger_1.ApiOperation)({
        summary: 'تگ‌های پروفایل',
        description: 'weakSubjects | strongSubjects | barriers | externalAid | eliteSchools | ...',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'S1' }),
    (0, swagger_1.ApiParam)({
        name: 'group',
        example: 'weakSubjects',
        description: 'نام گروه تگ',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('group')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, students_dto_1.TagGroupDto, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "setTags", null);
exports.StudentsController = StudentsController = __decorate([
    (0, swagger_1.ApiTags)('Students', 'Profile'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('api/students'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [students_service_1.StudentsService,
        profile_service_1.ProfileService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map