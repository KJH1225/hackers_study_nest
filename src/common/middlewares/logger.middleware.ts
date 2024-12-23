import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("LoggerMiddleware");

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`before: ${req.ip} ${req.method} ${req.originalUrl}`);
    res.on('finish', () => {
      this.logger.log(`after: ${req.ip} ${req.method} ${req.originalUrl} ${res.statusCode}`);
    });
    next();
  }
}
