import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/users.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SuperAdminGuard } from '../common/guards/super-admin.guard';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { AuthService } from '../auth/auth.service';

@ApiTags('Users')
@ApiBearerAuth('JWT')
@Controller('api/users')
@UseGuards(JwtAuthGuard, SuperAdminGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('roles/permissions')
  @ApiOperation({
    summary: 'ماتریس دسترسی همه نقش‌ها',
    description: 'فقط super_admin — برای مدیریت مجوز کاربران',
  })
  @ApiResponse({ status: 200, description: 'لیست نقش‌ها با permissions' })
  listRolePermissions() {
    return this.authService.listAllRolePermissions();
  }

  @Get()
  @ApiOperation({ summary: 'فهرست کاربران', description: 'همه کاربران پنل با نقش و permissions' })
  @ApiResponse({ status: 200, type: [UserResponseDto] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'جزئیات کاربر' })
  @ApiParam({ name: 'id', description: 'UUID کاربر' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'ایجاد کاربر', description: 'تخصیص نقش و رمز به کاربر جدید' })
  @ApiResponse({ status: 201, type: UserResponseDto })
  create(@Body() dto: CreateUserDto, @CurrentUser() user: AuthUser) {
    return this.usersService.create(dto, user);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'ویرایش کاربر',
    description: 'تغییر نقش، وضعیت فعال، نام، رمز',
  })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.usersService.update(id, dto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'غیرفعال‌سازی کاربر', description: 'soft delete — isActive=false' })
  @ApiParam({ name: 'id' })
  deactivate(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.usersService.deactivate(id, user);
  }
}
