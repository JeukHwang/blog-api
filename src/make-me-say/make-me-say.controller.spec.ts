import { Test, TestingModule } from '@nestjs/testing';
import { MakeMeSayController } from './make-me-say.controller';

describe('MakeMeSayController', () => {
  let controller: MakeMeSayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MakeMeSayController],
    }).compile();

    controller = module.get<MakeMeSayController>(MakeMeSayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
