import { Module } from '@nestjs/common';
import { CharCounterController } from './char-counter.controller';
import { CharCounterService } from './char-counter.service';

@Module({
  controllers: [CharCounterController],
  providers: [CharCounterService]
})
export class CharCounterModule {}
