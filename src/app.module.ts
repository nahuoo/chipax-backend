import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharCounterModule } from './char-counter/char-counter.module';

@Module({
  imports: [CharCounterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
