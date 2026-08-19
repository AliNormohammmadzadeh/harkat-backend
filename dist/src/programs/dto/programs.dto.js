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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramResponseDto = exports.AttendanceResponseDto = exports.CreateProgramFromFilterDto = exports.SetProgramMembersDto = exports.UpdateProgramDto = exports.CreateProgramDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateProgramDto {
}
exports.CreateProgramDto = CreateProgramDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'تقویت ریاضی پایه نهم', description: 'نام برنامه' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProgramDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'کلاس تقویتی ریاضی برای دانش‌آموزان پایه نهم' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProgramDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5000000, description: 'بودجه کل — بین اعضا تقسیم و به عنوان هزینه ثبت می‌شود' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProgramDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [String],
        example: ['S1', 'S2'],
        description: 'شناسه دانش‌آموزان عضو برنامه',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateProgramDto.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1404/05/22', description: 'تاریخ ایجاد (شمسی)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProgramDto.prototype, "createdAt", void 0);
class UpdateProgramDto {
}
exports.UpdateProgramDto = UpdateProgramDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'تقویت ریاضی پایه نهم' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProgramDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProgramDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5000000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProgramDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], example: ['S1', 'S2'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateProgramDto.prototype, "ids", void 0);
class SetProgramMembersDto {
}
exports.SetProgramMembersDto = SetProgramMembersDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], example: ['S1', 'S2', 'S3'], description: 'لیست کامل شناسه اعضا' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SetProgramMembersDto.prototype, "ids", void 0);
class CreateProgramFromFilterDto {
}
exports.CreateProgramFromFilterDto = CreateProgramFromFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'برنامه فیلتر دختران یازدهم' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProgramFromFilterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProgramFromFilterDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 3000000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProgramFromFilterDto.prototype, "cost", void 0);
class AttendanceResponseDto {
}
exports.AttendanceResponseDto = AttendanceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'P1234567890' }),
    __metadata("design:type", String)
], AttendanceResponseDto.prototype, "programId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'S1' }),
    __metadata("design:type", String)
], AttendanceResponseDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], AttendanceResponseDto.prototype, "isPresent", void 0);
class ProgramResponseDto {
}
exports.ProgramResponseDto = ProgramResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'P1234567890' }),
    __metadata("design:type", String)
], ProgramResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'تقویت ریاضی' }),
    __metadata("design:type", String)
], ProgramResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ProgramResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000000 }),
    __metadata("design:type", Number)
], ProgramResponseDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], ProgramResponseDto.prototype, "ids", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1404/05/22' }),
    __metadata("design:type", String)
], ProgramResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 25 }),
    __metadata("design:type", Number)
], ProgramResponseDto.prototype, "memberCount", void 0);
//# sourceMappingURL=programs.dto.js.map