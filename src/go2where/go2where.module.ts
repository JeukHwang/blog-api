import { Module } from '@nestjs/common';
import { Go2whereService } from './go2where.service';
import { Go2whereController } from './go2where.controller';

@Module({
  providers: [Go2whereService],
  controllers: [Go2whereController]
})
export class Go2whereModule {}
