import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto, MeResponseDto, OkResponseDto } from './dto/auth.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'ورود به پنل',
    description: 'احراز هویت با نام کاربری و رمز. توکن JWT برای سایر endpointها استفاده می‌شود.',
  })
  @ApiResponse({ status: 200, description: 'ورود موفق', type: LoginResponseDto })
  @ApiResponse({ status: 401, description: 'نام کاربری یا رمز اشتباه' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.username, dto.password);
  }

  @Post('logout')
  @ApiOperation({
    summary: 'خروج',
    description: 'خروج از نشست (سمت کلاینت توکن JWT حذف می‌شود).',
  })
  @ApiResponse({ status: 200, type: OkResponseDto })
  logout() {
    return { ok: true };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'اطلاعات کاربر جاری', description: 'بازیابی نشست از JWT' })
  @ApiResponse({ status: 200, type: MeResponseDto })
  @ApiResponse({ status: 401, description: 'توکن نامعتبر' })
  me(@CurrentUser() user: AuthUser) {
    return this.authService.me(user.id);
  }

  @Get('permissions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'دسترسی‌های کاربر جاری',
    description: 'مجوزهای effectives بر اساس نقش — canRead, canWrite, canManageUsers, ...',
  })
  @ApiResponse({ status: 200, description: 'RolePermissions object' })
  permissions(@CurrentUser() user: AuthUser) {
    return this.authService.getPermissionsForRole(user.role);
  }
}
