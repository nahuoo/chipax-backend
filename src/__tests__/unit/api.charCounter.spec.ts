import { Test, TestingModule } from '@nestjs/testing'
import { ApiService } from '../../api/api.service'
import { HttpModule } from '@nestjs/axios'

describe('ApiService method charCounter', () => {
  let service
  let charCounter
  const expected = {
    exercise_name: 'Char counter',
    time: 1 + 's',
    in_time: true,
    results: [
      {
        char: 'l',
        count: Number,
        resource: 'location',
      },
      {
        char: 'e',
        count: 3,
        resource: 'episode',
      },
      {
        char: 'c',
        count: 3,
        resource: 'character',
      },
    ],
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ApiService],
    }).compile()
    service = module.get(ApiService)
    charCounter = await service.getCharCounter()
  })

  it('should be defined and return 82, 88 and 494', () => {
    expect(service).toBeDefined()
    expect(service.getCharCounter()).not.toBe(undefined)
    expect(charCounter.results[0].count).toEqual(82)
    expect(charCounter.results[1].count).toEqual(88)
    expect(charCounter.results[2].count).toEqual(494)
    expect(charCounter).toHaveProperty('time')
  })
})
