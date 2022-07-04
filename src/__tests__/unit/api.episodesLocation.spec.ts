import { Test, TestingModule } from '@nestjs/testing'
import { ApiService } from '../../api/api.service'
import { HttpModule } from '@nestjs/axios'

describe('ApiService method getEpisodesLocaation', () => {
  let service
  let episodesLocations

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ApiService],
    }).compile()
    service = module.get<ApiService>(ApiService)
    episodesLocations = await service.getEpisodesLocations()
  })

  it('should be defined and return all 51 episodes', () => {
    expect(service).toBeDefined()
    expect(episodesLocations).not.toBe(undefined)
    expect(episodesLocations.results.length).toEqual(51)
  })
})
