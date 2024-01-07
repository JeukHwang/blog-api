import { Module } from '@nestjs/common';
import { Epic1minService } from './epic1min.service';
import { Epic1minController } from './epic1min.controller';

@Module({
  providers: [Epic1minService],
  controllers: [Epic1minController]
})
export class Epic1minModule {}
