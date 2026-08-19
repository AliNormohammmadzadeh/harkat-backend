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
exports.ProgramsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const programs_service_1 = require("./programs.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const write_access_guard_1 = require("../common/guards/write-access.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const student_filter_dto_1 = require("../common/dto/student-filter.dto");
const programs_dto_1 = require("./dto/programs.dto");
let ProgramsController = class ProgramsController {
    constructor(programsService) {
        this.programsService = programsService;
    }
    findAll(search) {
        return this.programsService.findAll(search);
    }
    createFromFilter(query, dto, user) {
        return this.programsService.createFromFilter(query, dto, user);
    }
    create(dto, user) {
        return this.programsService.create(dto, user);
    }
    async export(id, res) {
        const data = await this.programsService.exportMembers(id);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename=program-${id}-members.json`);
        res.send(JSON.stringify(data, null, 2));
    }
    getMembers(id) {
        return this.programsService.getMembers(id);
    }
    findOne(id) {
        return this.programsService.findOne(id);
    }
    update(id, dto, user) {
        return this.programsService.update(id, dto, user);
    }
    remove(id, user) {
        return this.programsService.delete(id, user);
    }
    setMembers(id, body, user) {
        return this.programsService.setMembers(id, body.ids ?? [], user);
    }
    toggleAttendance(id, studentId, user) {
        return this.programsService.toggleAttendance(id, studentId, user);
    }
};
exports.ProgramsController = ProgramsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'فهرست برنامه‌ها' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'جستجو در نام برنامه' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [programs_dto_1.ProgramResponseDto] }),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProgramsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('from-filter'),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'ایجاد برنامه از فیلتر',
        description: 'اعضا = نتیجه فیلتر فعلی فهرست دانش‌آموزان',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, type: programs_dto_1.ProgramResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_filter_dto_1.StudentFilterDto,
        programs_dto_1.CreateProgramFromFilterDto, Object]),
    __metadata("design:returntype", void 0)
], ProgramsController.prototype, "createFromFilter", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'ایجاد برنامه',
        description: 'اگر cost > 0 باشد، بودجه بین اعضا تقسیم و به finance ثبت می‌شود',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, type: programs_dto_1.ProgramResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [programs_dto_1.CreateProgramDto, Object]),
    __metadata("design:returntype", void 0)
], ProgramsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id/export'),
    (0, swagger_1.ApiOperation)({ summary: 'خروجی اعضای برنامه', description: 'فایل JSON اعضا' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'P1234567890' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "export", null);
__decorate([
    (0, common_1.Get)(':id/members'),
    (0, swagger_1.ApiOperation)({ summary: 'اعضای برنامه', description: 'لیست اعضا + حضور/غیاب' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'P1234567890' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProgramsController.prototype, "getMembers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'جزئیات برنامه' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'P1234567890' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: programs_dto_1.ProgramResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'برنامه یافت نشد' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProgramsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'ویرایش برنامه',
        description: 'با تغییر بودجه، هزینه‌های قبلی برنامه حذف و مجدداً ثبت می‌شوند',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'P1234567890' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, programs_dto_1.UpdateProgramDto, Object]),
    __metadata("design:returntype", void 0)
], ProgramsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, swagger_1.ApiOperation)({ summary: 'حذف برنامه', description: 'هزینه‌های مرتبط با برنامه نیز حذف می‌شوند' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'P1234567890' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProgramsController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(':id/members'),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, swagger_1.ApiOperation)({ summary: 'تعیین اعضای برنامه', description: 'جایگزینی کامل لیست اعضا' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'P1234567890' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, programs_dto_1.SetProgramMembersDto, Object]),
    __metadata("design:returntype", void 0)
], ProgramsController.prototype, "setMembers", null);
__decorate([
    (0, common_1.Put)(':id/attendance/:studentId'),
    (0, common_1.UseGuards)(write_access_guard_1.WriteAccessGuard),
    (0, swagger_1.ApiOperation)({ summary: 'ثبت حضور/غیاب', description: 'toggle — هر فراخوانی وضعیت را معکوس می‌کند' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 'P1234567890' }),
    (0, swagger_1.ApiParam)({ name: 'studentId', example: 'S1' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: programs_dto_1.AttendanceResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('studentId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ProgramsController.prototype, "toggleAttendance", null);
exports.ProgramsController = ProgramsController = __decorate([
    (0, swagger_1.ApiTags)('Programs'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('api/programs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [programs_service_1.ProgramsService])
], ProgramsController);
//# sourceMappingURL=programs.controller.js.map