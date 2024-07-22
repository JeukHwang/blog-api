import { Test, TestingModule } from '@nestjs/testing';
import { Go2whereService } from './go2where.service';

describe('Go2whereService', () => {
  let service: Go2whereService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Go2whereService],
    }).compile();

    service = module.get<Go2whereService>(Go2whereService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
