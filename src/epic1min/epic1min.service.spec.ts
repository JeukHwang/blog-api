import { Test, TestingModule } from '@nestjs/testing';
import { Epic1minService } from './epic1min.service';

describe('Epic1minService', () => {
  let service: Epic1minService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Epic1minService],
    }).compile();

    service = module.get<Epic1minService>(Epic1minService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
