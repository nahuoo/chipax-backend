import { Test, TestingModule } from '@nestjs/testing'
import { ApiService } from '../../src/api/api.service'

describe('ApiService method getEpisodesLocaation', async () => {
  let service: ApiService
  const episodesLocations: any = await service.getEpisodesLocations()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiService],
    }).compile()
    service = module.get<ApiService>(ApiService)
  })

  it('should be defined and return all 51 episodes', () => {
    expect(service).toBeDefined()
    expect(episodesLocations).not.toBe(undefined)
    expect(episodesLocations.results.length).toEqual(51)
  })
})
