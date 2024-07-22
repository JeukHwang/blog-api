import { Body, Controller, Get, Post } from '@nestjs/common';
import { MakeMeSayService } from './make-me-say.service';

@Controller('make-me-say')
export class MakeMeSayController {
  constructor(private readonly makeMeSayService: MakeMeSayService) {}

  @Post('/')
  async getQuery(@Body() body: { query: string }): Promise<any> {
    // return await this.makeMeSayService.queryGPT(body.query);
  }

  @Get('/leaderboard')
  async sendLeaderboard(): Promise<any> {
    // return await this.makeMeSayService.getAllVideos();
    return void 0;
  }
}
