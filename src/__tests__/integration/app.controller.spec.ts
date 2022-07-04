import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../app.controller';
import { AppService } from '../../app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get(AppController);
  });

  describe('root', () => {
    it('should return the api endpoints', () => {
      expect(appController.getHello()).toBe({
        char_counter: '/api/char-counter',
        episode_locations: '/api/episodes-locations',
      })
    });
  });
});
