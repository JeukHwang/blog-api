import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Epic1minModule } from './epic1min/epic1min.module';
import { PrismaModule } from './prisma/prisma.module';
import { MakeMeSayModule } from './make-me-say/make-me-say.module';
import { Go2whereModule } from './go2where/go2where.module';
import { Go2wehreService } from './go2wehre/go2wehre.service';

@Module({
  imports: [
    PrismaModule,
    Epic1minModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.NODE_EMAILER_ID,
          pass: process.env.NODE_EMAILER_PASSWORD,
        },
      },
    }),
    MakeMeSayModule,
    Go2whereModule,
  ],
  controllers: [AppController],
  providers: [AppService, Go2wehreService],
})
export class AppModule {}
