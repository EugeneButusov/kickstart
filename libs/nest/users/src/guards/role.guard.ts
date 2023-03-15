import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../types/role.enum';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!allowedRoles) {
      throw new HttpException('Not allowed for any role', HttpStatus.FORBIDDEN);
    }
    const { user } = context.switchToHttp().getRequest();
    if (!allowedRoles.includes(user.role)) {
      throw new HttpException(
        'Not allowed for the role assigned with the current user',
        HttpStatus.FORBIDDEN
      );
    }
    return true;
  }
}
