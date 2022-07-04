import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { rickAndMortyApiService } from '../utils/rickAndMortyApiService'
import { Character, Episode } from './interfaces/responses.interface'

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async getCharCounter(): Promise<object> {
    const timeNow = new Date().getTime()
    const rickAndMortyApi = new rickAndMortyApiService(this.httpService)
    const [locationNames, episodesNames, charactersNames] =
      await rickAndMortyApi.getNames()
    const charLCounter = (
      locationNames.join('').toLowerCase().match(/l/g) || []
    ).length
    const charECounter = (
      episodesNames.join('').toLowerCase().match(/e/g) || []
    ).length
    const charCCounter = (
      charactersNames.join('').toLowerCase().match(/c/g) || []
    ).length
    const totalTime = (new Date().getTime() - timeNow) / 1000

    const inTime = totalTime <= 3 ? true : false

    return {
      exercise_name: 'Char counter',
      time: totalTime + 's',
      in_time: inTime,
      results: [
        {
          char: 'l',
          count: charLCounter,
          resource: 'location',
        },
        {
          char: 'e',
          count: charECounter,
          resource: 'episode',
        },
        {
          char: 'c',
          count: charCCounter,
          resource: 'character',
        },
      ],
    }
  }

  async getEpisodesLocations() {
    const timeNow = new Date().getTime()
    const rickAndMortyApi = new rickAndMortyApiService(this.httpService)
    const { unwrapEpisodesData, unwrapCharactersData } =
      await rickAndMortyApi.getEpisodes()

    const charactersOfEachEpisodeId = unwrapEpisodesData.map(
      (episode: Episode) => {
        return episode.characters.map((character) => {
          const characterId = character.split('/').pop()
          return characterId
        })
      }
    )
    const charactersOriginNames: string[] = unwrapCharactersData.map(
      (character: Character) => character.origin.name
    )

    const charactersOriginNamesOfEachEpisode = charactersOfEachEpisodeId.map(
      (charactersOfAnEpisode) => {
        return charactersOfAnEpisode.map((characterId) => {
          return charactersOriginNames[characterId - 1]
        })
      }
    )

    const charactersOriginNamesOfEachEpisodeNoRepetitions =
      charactersOriginNamesOfEachEpisode.map((charactersOfAnEpisode) => {
        return [...new Set(charactersOfAnEpisode)]
      })

    const result = unwrapEpisodesData.map((episode: Episode, index) => {
      return {
        name: episode.name,
        episode: episode.episode,
        location: charactersOriginNamesOfEachEpisodeNoRepetitions[index],
      }
    })

    const totalTime = (new Date().getTime() - timeNow) / 1000

    const inTime = totalTime <= 3 ? true : false

    return {
      exercise_name: 'Episode locations',
      time: totalTime + 's',
      in_time: inTime,
      results: result,
    }
  }
}
