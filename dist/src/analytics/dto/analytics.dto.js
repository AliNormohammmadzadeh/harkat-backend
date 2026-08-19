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
exports.AnalyticsQueryResponseDto = exports.AnalyticsChartResponseDto = exports.AnalyticsStatsResponseDto = exports.AnalyticsQueryDto = exports.ChartQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const student_filter_dto_1 = require("../../common/dto/student-filter.dto");
class ChartQueryDto extends student_filter_dto_1.StudentFilterDto {
}
exports.ChartQueryDto = ChartQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'بُعد نمودار',
        enum: ['grade', 'gender', 'status', 'economic', 'fatherEdu', 'motherEdu', 'eliteInterest', 'weakSubject'],
        example: 'grade',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChartQueryDto.prototype, "groupBy", void 0);
class AnalyticsQueryDto {
}
exports.AnalyticsQueryDto = AnalyticsQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '۱۰ دانش‌آموز با کمترین معدل',
        description: 'پرسش آماری ساختاریافته (نه چت‌بات آزاد)',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AnalyticsQueryDto.prototype, "question", void 0);
class AnalyticsStatsResponseDto {
}
exports.AnalyticsStatsResponseDto = AnalyticsStatsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            { label: 'تعداد دانش‌آموزان (در فیلتر فعلی)', value: 527 },
            { label: 'میانگین معدل کل', value: 17.85 },
        ],
    }),
    __metadata("design:type", Array)
], AnalyticsStatsResponseDto.prototype, "tiles", void 0);
class AnalyticsChartResponseDto {
}
exports.AnalyticsChartResponseDto = AnalyticsChartResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'مقطع تحصیلی' }),
    __metadata("design:type", String)
], AnalyticsChartResponseDto.prototype, "dimension", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            { label: 'متوسطه‌ی دوم', count: 200 },
            { label: 'متوسطه‌ی اول', count: 150 },
        ],
    }),
    __metadata("design:type", Array)
], AnalyticsChartResponseDto.prototype, "entries", void 0);
class AnalyticsQueryResponseDto {
}
exports.AnalyticsQueryResponseDto = AnalyticsQueryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AnalyticsQueryResponseDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AnalyticsQueryResponseDto.prototype, "caveat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'array', items: { type: 'object' } }),
    __metadata("design:type", Array)
], AnalyticsQueryResponseDto.prototype, "results", void 0);
//# sourceMappingURL=analytics.dto.js.map