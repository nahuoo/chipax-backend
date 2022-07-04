import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello() {
    return {
      char_counter: '/api/char-counter',
      episode_locations: '/api/episodes-locations',
    }
  }
}
