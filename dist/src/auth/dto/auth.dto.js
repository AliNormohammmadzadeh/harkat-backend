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
exports.OkResponseDto = exports.MeResponseDto = exports.LoginResponseDto = exports.LoginDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'elahe', description: 'نام کاربری (حروف کوچک)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'elahe1234', description: 'رمز عبور' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class LoginResponseDto {
}
exports.LoginResponseDto = LoginResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: 'uuid',
            username: 'elahe',
            name: 'الهه محمدی‌فرد',
            initials: 'ا.م',
            role: 'facilitator',
            roleLabel: 'تسهیلگر رشد',
        },
    }),
    __metadata("design:type", Object)
], LoginResponseDto.prototype, "user", void 0);
class MeResponseDto {
}
exports.MeResponseDto = MeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MeResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'elahe' }),
    __metadata("design:type", String)
], MeResponseDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'الهه محمدی‌فرد' }),
    __metadata("design:type", String)
], MeResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ا.م', nullable: true }),
    __metadata("design:type", Object)
], MeResponseDto.prototype, "initials", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['super_admin', 'manager', 'facilitator', 'supporter'] }),
    __metadata("design:type", String)
], MeResponseDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'تسهیلگر رشد' }),
    __metadata("design:type", String)
], MeResponseDto.prototype, "roleLabel", void 0);
class OkResponseDto {
}
exports.OkResponseDto = OkResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], OkResponseDto.prototype, "ok", void 0);
//# sourceMappingURL=auth.dto.js.map