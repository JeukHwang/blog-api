import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { HttpService } from '@nestjs/axios';
import { Video } from '@prisma/client';
import axios, { AxiosError, AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';
import { parse, toSeconds } from 'iso8601-duration';
import { catchError, firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

dotenv.config();

export type VideoPublic = Pick<Video, 'id' | 'viewCount' | 'duration'>;
type YoutubeResponse =
  | {
      status: 'data';
      data: {
        id: string;
        viewCount: number;
        duration: number;
        isEpic1min: boolean;
      }[];
    }
  | {
      status: 'error';
      data: {
        id: string;
      }[];
      error: AxiosError;
    };
export type Response = {
  success: string[];
  failure: string[];
  error: [string[], AxiosError][];
};

@Injectable()
export class Epic1minService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
    private readonly mailerService: MailerService,
  ) {}

  async getAllVideos(option: string): Promise<VideoPublic[]> {
    const videos = await this.prismaService.video.findMany();
    const videoPublics = videos.map((video) => ({
      id: video.id,
      viewCount: video.viewCount,
      duration: video.duration,
    }));
    switch (option) {
      case 'viewCount':
        return videoPublics.sort((a, b) => {
          return b.viewCount - a.viewCount;
        });
      case 'duration':
        return videoPublics.sort((a, b) => {
          return a.duration - b.duration;
        });
      case 'density':
      default:
        return videoPublics.sort((a, b) => {
          return b.viewCount / b.duration - a.viewCount / a.duration;
        });
    }
  }

  // https://developers.google.com/youtube/v3/docs/videos/list
  private async ids2data(ids: string[]): Promise<YoutubeResponse> {
    const key = process.env.GOOGLE_API_KEY;
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${ids.join(
      ',',
    )}&key=${key}`;
    try {
      const response = (await firstValueFrom(
        this.httpService.get(url).pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
      )) as AxiosResponse;
      const data = response.data.items.map((item) => {
        const viewCount = parseInt(item.statistics.viewCount);
        const duration = toSeconds(parse(item.contentDetails.duration));
        const isEpic1min = duration <= 60 && viewCount >= 1000_0000;
        return {
          id: item.id,
          viewCount,
          duration,
          isEpic1min,
        };
      });
      return { status: 'data', data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { status: 'error', data: ids.map((id) => ({ id })), error };
      } else {
        throw error;
      }
    }
  }

  private async updateVideos(ids: string[]): Promise<Response> {
    const response = await this.ids2data(ids);
    switch (response.status) {
      case 'data': {
        for (const data of response.data) {
          if (data.isEpic1min) {
            await this.prismaService.video.upsert({
              create: {
                id: data.id,
                viewCount: data.viewCount,
                duration: data.duration,
              },
              update: { viewCount: data.viewCount, duration: data.duration },
              where: { id: data.id },
            });
          } else {
            await this.prismaService.video.delete({ where: { id: data.id } });
          }
        }
        return {
          success: response.data
            .filter((data) => data.isEpic1min)
            .map((data) => data.id),
          failure: response.data
            .filter((data) => !data.isEpic1min)
            .map((data) => data.id),
          error: [],
        };
      }
      case 'error': {
        this.mailerService.sendMail({
          subject: `Epic1min | Update report - ${response.data.length} URL`,
          html: [
            `Check and do manually`,
            ``,
            `URL`,
            ...response.data.map(
              (data) => `- https://www.youtube.com/watch?v=${data.id}`,
            ),
            ``,
            `Error`,
            `${JSON.stringify(response.error.toJSON(), null, 2)}`,
          ].join('<br>'),
          from: process.env.NODE_EMAILER_ID,
          to: process.env.NODE_EMAILER_ID,
        });
        return { success: [], failure: [], error: [[ids, response.error]] };
      }
    }
  }

  async registerVideo(id: string): Promise<Response> {
    return await this.updateVideos([id]);
  }

  async updateAllVideos(): Promise<Response> {
    const n = 50;
    const videos = await this.prismaService.video.findMany();
    const reports = { success: [], failure: [], error: [] };
    for (let i = 0; i < videos.length; i += n) {
      const ids = videos.slice(i, i + n).map((video) => video.id);
      const report = await this.updateVideos(ids);
      reports.success.push(...report.success);
      reports.failure.push(...report.failure);
      reports.error.push(...report.error);
    }
    return reports;
  }
}
