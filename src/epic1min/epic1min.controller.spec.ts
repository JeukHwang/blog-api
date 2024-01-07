import { Test, TestingModule } from '@nestjs/testing';
import { Epic1minController } from './epic1min.controller';

describe('Epic1minController', () => {
  let controller: Epic1minController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Epic1minController],
    }).compile();

    controller = module.get<Epic1minController>(Epic1minController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
