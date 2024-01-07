import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test/public-date')
  getDatePublicly(): string {
    return this.appService.getDatePublicly();
  }

  @Post('/test/public-ping')
  getPingPublicly(@Body() body: JSON): string {
    return this.appService.getPingPublicly(body);
  }
}
