"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Harkat Tashil API')
        .setDescription(`REST API for **پنل تسهیل — بنیاد حرکت انسانی**

## نقش‌های کاربری
| نقش | دسترسی |
|-----|--------|
| \`super_admin\` | **همه چیز** — read/write/delete + مدیریت کاربران |
| \`manager\` | فقط مشاهده (read-only) |
| \`facilitator\` | ویرایش همه دانش‌آموزان |
| \`supporter\` | فقط دانش‌آموزان تخصیص‌یافته |

## احراز هویت
1. \`POST /api/auth/login\` با نام کاربری و رمز
2. توکن JWT را در **Authorize** وارد کنید: \`Bearer <token>\`

## حساب‌های آزمایشی
| کاربر | رمز | نقش |
|-------|-----|-----|
| admin | admin1234 | super_admin |
| homa | homa1234 | manager |
| elahe | elahe1234 | facilitator |
| mahsa | mahsa1234 | supporter |
| narges | narges1234 | supporter |`)
        .setVersion('0.1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token from POST /api/auth/login',
    }, 'JWT')
        .addTag('Auth', 'احراز هویت و نشست')
        .addTag('Students', 'فهرست و مدیریت دانش‌آموزان')
        .addTag('Profile', 'پروفایل کامل دانش‌آموز')
        .addTag('Programs', 'برنامه‌های گروهی')
        .addTag('Analytics', 'داشبورد تحلیل و گزارش')
        .addTag('Users', 'مدیریت کاربران (super_admin)')
        .addTag('Lookups', 'داده‌های مرجع (lookup)')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        operationIdFactory: (controllerKey, methodKey) => methodKey,
    });
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        customSiteTitle: 'Harkat API Docs',
        swaggerOptions: {
            persistAuthorization: true,
            docExpansion: 'list',
            filter: true,
            showRequestDuration: true,
        },
    });
}
//# sourceMappingURL=swagger.config.js.map