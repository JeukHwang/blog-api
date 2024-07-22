import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

// https://github.com/googleapis/google-api-nodejs-client
// https://developers.google.com/safe-browsing/v4/lookup-api?hl=ko
@Injectable()
export class Go2whereService {
  async isURLSafe(query: string): Promise<string> {
    const safebrowsing = google.safebrowsing('v4');
    safebrowsing.threatHits.create(safebrowsing.threatHits.context);
  }
}
