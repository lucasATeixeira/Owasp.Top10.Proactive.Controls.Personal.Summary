import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

export const JwtPayload = createParamDecorator<JwtPayloadDto>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.jwtPayload;
  },
);
