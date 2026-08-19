import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { canManageUsers } from '../auth/permissions';
import { AuthUser } from '../decorators/current-user.decorator';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest<{ user: AuthUser }>();
    if (!canManageUsers(user)) {
      throw new ForbiddenException('فقط مدیر کل سیستم به این بخش دسترسی دارد');
    }
    return true;
  }
}
