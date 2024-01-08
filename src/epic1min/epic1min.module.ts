import { Module } from '@nestjs/common';
import { Epic1minService } from './epic1min.service';
import { Epic1minController } from './epic1min.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [HttpModule, PrismaModule],
  providers: [Epic1minService, PrismaService],
  controllers: [Epic1minController]
})
export class Epic1minModule {}
