import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const jwtService = new JwtService({});
    const authToken = request.headers.authorization.replace('Bearer ', '');
    const payload = jwtService.decode(authToken);

    return payload;
  },
);