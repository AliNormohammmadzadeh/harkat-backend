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
exports.PaginatedStudentsResponseDto = exports.TagGroupDto = exports.MpiFlagsDto = exports.FamilyHealthDto = exports.HouseholdMemberDto = exports.UpdateProfileStatusDto = exports.ImportStudentsDto = exports.UpdateStudentSummaryDto = exports.CreateStudentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateStudentDto {
}
exports.CreateStudentDto = CreateStudentDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '9999', description: 'شماره پرونده' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "caseNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'مریم' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'احمدی' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'دختر' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'متوسطه‌ی دوم' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'دهم' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "gradeLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'ریاضی-فیزیک' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "major", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'مدرسه نمونه' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "school", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'تحت حمایت' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "studentStatus", void 0);
class UpdateStudentSummaryDto {
}
exports.UpdateStudentSummaryDto = UpdateStudentSummaryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1381' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStudentSummaryDto.prototype, "caseNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStudentSummaryDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStudentSummaryDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStudentSummaryDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStudentSummaryDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStudentSummaryDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStudentSummaryDto.prototype, "gradeLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStudentSummaryDto.prototype, "major", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStudentSummaryDto.prototype, "school", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 18.5 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateStudentSummaryDto.prototype, "overallAvg", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'تحت حمایت' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStudentSummaryDto.prototype, "studentStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateStudentSummaryDto.prototype, "economicStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateStudentSummaryDto.prototype, "decile", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateStudentSummaryDto.prototype, "fatherEdu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateStudentSummaryDto.prototype, "motherEdu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'یادداشت محرمانه سلامت روان' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStudentSummaryDto.prototype, "mentalHealthNote", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStudentSummaryDto.prototype, "evaluatorSuggestion", void 0);
class ImportStudentsDto {
}
exports.ImportStudentsDto = ImportStudentsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
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
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ImportStudentsDto.prototype, "records", void 0);
class UpdateProfileStatusDto {
}
exports.UpdateProfileStatusDto = UpdateProfileStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'توقف', description: 'وضعیت جدید دانش‌آموز' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'انتقال محل سکونت', description: 'دلیل (برای توقف/حذف)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileStatusDto.prototype, "reason", void 0);
class HouseholdMemberDto {
}
exports.HouseholdMemberDto = HouseholdMemberDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'علی' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HouseholdMemberDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'برادر' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HouseholdMemberDto.prototype, "relation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '14' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HouseholdMemberDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HouseholdMemberDto.prototype, "note", void 0);
class FamilyHealthDto {
}
exports.FamilyHealthDto = FamilyHealthDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'پدر' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FamilyHealthDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'دیابت' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FamilyHealthDto.prototype, "healthType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FamilyHealthDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FamilyHealthDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FamilyHealthDto.prototype, "desc", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '500000' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FamilyHealthDto.prototype, "cost", void 0);
class MpiFlagsDto {
}
exports.MpiFlagsDto = MpiFlagsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [Boolean],
        description: '۱۰ شاخص MPI — true = محروم',
        example: [false, false, true, false, false, false, false, false, false, false],
    }),
    __metadata("design:type", Array)
], MpiFlagsDto.prototype, "deps", void 0);
class TagGroupDto {
}
exports.TagGroupDto = TagGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        example: ['ریاضی', 'فیزیک'],
        description: 'مقادیر تگ انتخاب‌شده',
    }),
    __metadata("design:type", Array)
], TagGroupDto.prototype, "values", void 0);
class PaginatedStudentsResponseDto {
}
exports.PaginatedStudentsResponseDto = PaginatedStudentsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'array', items: { type: 'object' } }),
    __metadata("design:type", Array)
], PaginatedStudentsResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { total: 527, page: 1, limit: 50, pages: 11 },
    }),
    __metadata("design:type", Object)
], PaginatedStudentsResponseDto.prototype, "meta", void 0);
//# sourceMappingURL=students.dto.js.map