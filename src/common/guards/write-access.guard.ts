import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { canWrite } from '../auth/permissions';
import { AuthUser } from '../decorators/current-user.decorator';

@Injectable()
export class WriteAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest<{ user: AuthUser }>();
    if (!canWrite(user)) {
      throw new ForbiddenException('شما فقط دسترسی مشاهده دارید');
    }
    return true;
  }
}
