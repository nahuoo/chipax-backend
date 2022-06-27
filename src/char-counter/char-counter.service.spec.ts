import { Test, TestingModule } from '@nestjs/testing';
import { CharCounterService } from './char-counter.service';

describe('CharCounterService', () => {
  let service: CharCounterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharCounterService],
    }).compile();

    service = module.get<CharCounterService>(CharCounterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
