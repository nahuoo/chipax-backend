import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from '../../api/api.controller';
import { ApiService } from '../../api/api.service';
import { HttpModule } from '@nestjs/axios'

describe('ApiController', () => {
  let controller: ApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ApiController],
      providers: [ApiService],
    }).compile()

    controller = module.get(ApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
