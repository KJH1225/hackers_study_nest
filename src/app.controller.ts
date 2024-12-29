import { Controller, Get, Req, Body, Param } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
// import { CatsService } from './cats/cats.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get('/')
  getHello(
    @Req() req: Request, 
    @Body() body, 
    @Param() param: {id: number; name: string}
  ): string {
    return this.appService.getHello();
  }
}
