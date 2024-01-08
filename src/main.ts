import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:5173', // for frontend in development
      'https://jeuk.io', // for frontend in production
    ],
    credentials: true,
  });
  const port = process.env.NODE_PORT || 3000;
  await app.listen(port);
}
bootstrap();
