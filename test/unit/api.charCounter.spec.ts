import { Test, TestingModule } from '@nestjs/testing'
import { ApiService } from '../../src/api/api.service'

describe('ApiService method charCounter', async () => {
  let service: ApiService
  const charCounter: any = await service.getCharCounter()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiService],
    }).compile()
    service = module.get<ApiService>(ApiService)
  })

  it('should be defined and return 82, 88 and 494', () => {
    expect(service).toBeDefined()
    expect(charCounter).not.toBe(undefined)
    expect(charCounter.results[0].count).toEqual(82)
    expect(charCounter.results[1].count).toEqual(88)
    expect(charCounter.results[2].count).toEqual(494)
  })
})
