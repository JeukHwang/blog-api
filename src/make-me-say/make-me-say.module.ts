import { Module } from '@nestjs/common';
import { MakeMeSayService } from './make-me-say.service';
import { MakeMeSayController } from './make-me-say.controller';

@Module({
  providers: [MakeMeSayService],
  controllers: [MakeMeSayController],
})
export class MakeMeSayModule {}
