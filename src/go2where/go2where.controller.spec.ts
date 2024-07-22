import { Test, TestingModule } from '@nestjs/testing';
import { Go2whereController } from './go2where.controller';

describe('Go2whereController', () => {
  let controller: Go2whereController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Go2whereController],
    }).compile();

    controller = module.get<Go2whereController>(Go2whereController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
