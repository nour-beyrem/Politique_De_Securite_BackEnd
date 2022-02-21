/* eslint-disable prettier/prettier */

import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    },
  );