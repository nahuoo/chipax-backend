import { Test, TestingModule } from '@nestjs/testing';
import { CharCounterController } from './char-counter.controller';

describe('CharCounterController', () => {
  let controller: CharCounterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharCounterController],
    }).compile();

    controller = module.get<CharCounterController>(CharCounterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
