import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class WriteAccessGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
