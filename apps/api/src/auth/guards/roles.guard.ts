import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { jwtDecode } from '@travel-manager/functions';

import { Role } from '../decorators/role.enum';
import { Token } from '../types/token.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token: string = request.headers['authorization'].split(' ')[1];
    const decodedToken: Token = jwtDecode(token);

    const { user } = context.switchToHttp().getRequest();
    return requireRoles.some((role) => decodedToken.roles.includes(role));
  }
}
