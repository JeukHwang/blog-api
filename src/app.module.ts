import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { Epic1minModule } from './epic1min/epic1min.module';

@Module({
  imports: [PrismaModule, Epic1minModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
