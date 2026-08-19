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
exports.StudentFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class StudentFilterDto {
}
exports.StudentFilterDto = StudentFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'جستجو در نام، شماره پرونده، یا شبا' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentFilterDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'جنسیت', example: 'دختر' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentFilterDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'مقطع تحصیلی', example: 'متوسطه‌ی دوم' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentFilterDto.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'پایه تحصیلی', example: 'یازدهم' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentFilterDto.prototype, "gradeLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'وضعیت دانش‌آموز', example: 'تحت حمایت' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentFilterDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'وضعیت اقتصادی (۱–۴)', example: '2' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentFilterDto.prototype, "economic", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'تحصیلات پدر (۰–۷)', example: '3' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentFilterDto.prototype, "fatherEdu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'تحصیلات مادر (۰–۷)', example: '3' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentFilterDto.prototype, "motherEdu", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'میزان همراهی خانواده (۱–۵)', example: '3' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentFilterDto.prototype, "parentInvolvement", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'موانع تحصیلی (چند مقداری)', isArray: true, type: String }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], StudentFilterDto.prototype, "barriers", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'دروس ضعیف (چند مقداری)', isArray: true, type: String }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], StudentFilterDto.prototype, "weakSubjects", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'علاقه به مدرسه ویژه', example: 'yes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentFilterDto.prototype, "eliteInterest", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'نیاز به کتاب کمک‌درسی', example: 'yes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentFilterDto.prototype, "needsBooks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'حداکثر معدل کل (فیلتر کمتر از)', example: '15' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentFilterDto.prototype, "avgMax", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'کلید مهارت نرم برای فیلتر',
        example: 'selfAwareness',
        enum: ['selfAwareness', 'communication', 'emotionRegulation', 'responsibility', 'resilience', 'problemSolving', 'financialLiteracy'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentFilterDto.prototype, "softSkill", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'حداکثر امتیاز مهارت نرم', example: '6' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentFilterDto.prototype, "softSkillMax", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'حداقل مجموع هزینه ثبت‌شده', example: '1000000' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentFilterDto.prototype, "spentMin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'فیلتر شبا', enum: ['has', 'none'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentFilterDto.prototype, "ibanHas", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'فیلتر اعضای یک برنامه', example: 'P1234567890' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentFilterDto.prototype, "programId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'شماره صفحه', example: '1', default: '1' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentFilterDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'تعداد در هر صفحه (حداکثر ۲۰۰)', example: '50', default: '50' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentFilterDto.prototype, "limit", void 0);
//# sourceMappingURL=student-filter.dto.js.map