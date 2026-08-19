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
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const analytics_service_1 = require("./analytics.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const student_filter_dto_1 = require("../common/dto/student-filter.dto");
const analytics_dto_1 = require("./dto/analytics.dto");
let AnalyticsController = class AnalyticsController {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    stats(query, user) {
        return this.analyticsService.getStats(query, user);
    }
    chart(query, user) {
        return this.analyticsService.getChart(query, user);
    }
    query(body, user) {
        return this.analyticsService.query(body.question ?? '', user);
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'آمار داشبورد',
        description: 'کاشی‌های آماری روی فهرست فیلترشده (تعداد، معدل، بورسیه، جنسیت، هزینه)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: analytics_dto_1.AnalyticsStatsResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_filter_dto_1.StudentFilterDto, Object]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "stats", null);
__decorate([
    (0, common_1.Get)('chart'),
    (0, swagger_1.ApiOperation)({
        summary: 'نمودار تحلیل',
        description: 'توزیع بر اساس groupBy روی فهرست فیلترشده',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: analytics_dto_1.AnalyticsChartResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analytics_dto_1.ChartQueryDto, Object]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "chart", null);
__decorate([
    (0, common_1.Post)('query'),
    (0, swagger_1.ApiOperation)({
        summary: 'پرسش از داده',
        description: 'موتور تحلیل ساختاریافته — الگوهای مشخص (کمترین/بیشترین معدل، درس ضعیف، ...)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: analytics_dto_1.AnalyticsQueryResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analytics_dto_1.AnalyticsQueryDto, Object]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "query", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, swagger_1.ApiTags)('Analytics'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('api/analytics'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map