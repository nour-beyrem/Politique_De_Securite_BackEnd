import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class SecondMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('in second midd');
    next();
  }
}
