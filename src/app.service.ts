import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { Mail } from './app.dto';
dotenv.config();

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  getDatePublicly(): string {
    return `Public Date | ${new Date().toISOString()}`;
  }

  getPingPublicly(data: JSON): string {
    return `Public Ping | ${JSON.stringify(data)}`;
  }

  sendMail(mail: Mail) {
    this.mailerService.sendMail({
      subject: `Jeuk Hwang Blog | ${mail.title}`,
      html: mail.body,
      from: process.env.NODE_EMAILER_ID,
      to: process.env.NODE_EMAILER_ID,
    });
  }
}
