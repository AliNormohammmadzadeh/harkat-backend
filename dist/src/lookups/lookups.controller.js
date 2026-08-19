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
exports.LookupsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lookups_1 = require("../common/constants/lookups");
let LookupsController = class LookupsController {
    grades() {
        return lookups_1.GRADES;
    }
    gradeLevels() {
        return lookups_1.GRADE_LEVELS;
    }
    studentStatuses() {
        return lookups_1.STUDENT_STATUSES;
    }
    softSkills() {
        return lookups_1.SOFT_SKILLS;
    }
    financeCategories() {
        return lookups_1.FINANCE_CATEGORIES;
    }
    serviceTypes() {
        return lookups_1.SERVICE_TYPES;
    }
    barriers() {
        return lookups_1.BARRIERS;
    }
    mpiIndicators() {
        return lookups_1.MPI_INDICATORS;
    }
};
exports.LookupsController = LookupsController;
__decorate([
    (0, common_1.Get)('grades'),
    (0, swagger_1.ApiOperation)({ summary: 'مقاطع تحصیلی', description: 'ابتدایی، متوسطه اول/دوم، ...' }),
    (0, swagger_1.ApiResponse)({ status: 200, schema: { type: 'array', items: { type: 'string' } } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LookupsController.prototype, "grades", null);
__decorate([
    (0, common_1.Get)('grade-levels'),
    (0, swagger_1.ApiOperation)({ summary: 'پایه‌ها به تفکیک مقطع' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            type: 'object',
            example: { 'متوسطه‌ی دوم': ['دهم', 'یازدهم', 'دوازدهم'] },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LookupsController.prototype, "gradeLevels", null);
__decorate([
    (0, common_1.Get)('student-statuses'),
    (0, swagger_1.ApiOperation)({ summary: 'وضعیت‌های دانش‌آموز' }),
    (0, swagger_1.ApiResponse)({ status: 200, schema: { type: 'array', items: { type: 'string' } } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LookupsController.prototype, "studentStatuses", null);
__decorate([
    (0, common_1.Get)('soft-skills'),
    (0, swagger_1.ApiOperation)({ summary: '۷ مهارت نرم', description: 'key + label' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: { key: { type: 'string' }, label: { type: 'string' } },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LookupsController.prototype, "softSkills", null);
__decorate([
    (0, common_1.Get)('finance-categories'),
    (0, swagger_1.ApiOperation)({ summary: 'دسته‌های هزینه' }),
    (0, swagger_1.ApiResponse)({ status: 200, schema: { type: 'array', items: { type: 'string' } } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LookupsController.prototype, "financeCategories", null);
__decorate([
    (0, common_1.Get)('service-types'),
    (0, swagger_1.ApiOperation)({ summary: 'انواع خدمت' }),
    (0, swagger_1.ApiResponse)({ status: 200, schema: { type: 'array', items: { type: 'string' } } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LookupsController.prototype, "serviceTypes", null);
__decorate([
    (0, common_1.Get)('barriers'),
    (0, swagger_1.ApiOperation)({ summary: 'موانع تحصیلی' }),
    (0, swagger_1.ApiResponse)({ status: 200, schema: { type: 'array', items: { type: 'string' } } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LookupsController.prototype, "barriers", null);
__decorate([
    (0, common_1.Get)('mpi-indicators'),
    (0, swagger_1.ApiOperation)({ summary: '۱۰ شاخص MPI', description: 'name, dimension, weight' }),
    (0, swagger_1.ApiResponse)({ status: 200, schema: { type: 'array', items: { type: 'object' } } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LookupsController.prototype, "mpiIndicators", null);
exports.LookupsController = LookupsController = __decorate([
    (0, swagger_1.ApiTags)('Lookups'),
    (0, common_1.Controller)('api/lookups')
], LookupsController);
//# sourceMappingURL=lookups.controller.js.map