import { Test, TestingModule } from '@nestjs/testing';
import { MakeMeSayService } from './make-me-say.service';

describe('MakeMeSayService', () => {
  let service: MakeMeSayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MakeMeSayService],
    }).compile();

    service = module.get<MakeMeSayService>(MakeMeSayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
