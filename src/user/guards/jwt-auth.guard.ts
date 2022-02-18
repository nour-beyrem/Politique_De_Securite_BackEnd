/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/* eslint-disable @typescript-eslint/no-unused-vars */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}