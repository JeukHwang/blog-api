import { Controller, Get, Query } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { Epic1minService, Response, VideoPublic } from './epic1min.service';
dotenv.config();

@Controller('epic1min')
export class Epic1minController {
  constructor(private readonly epic1minService: Epic1minService) {}

  @Get('/')
  async getVideos(@Query('option') option: string): Promise<VideoPublic[]> {
    return await this.epic1minService.getAllVideos(option);
  }

  @Get('/register')
  async registerVideo(@Query('id') id: string): Promise<Response> {
    return await this.epic1minService.registerVideo(id);
  }

  @Get('/admin/update/')
  async updateAllVideos(@Query('token') token: string): Promise<Response> {
    if (token !== process.env.ADMIN_TOKEN) {
      throw new Error('Invalid token');
    }
    return await this.epic1minService.updateAllVideos();
  }
}
