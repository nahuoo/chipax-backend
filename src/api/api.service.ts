import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { rickAndMortyApiService } from '../utils/rickAndMortyApiService';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async getCharCounter(): Promise<object> {
    const timeNow = new Date().getTime();
    const rickAndMortyApi = new rickAndMortyApiService(this.httpService);
    const [locationNames, episodesNames, charactersNames] =
      await rickAndMortyApi.getNames();
    const charLCounter = (
      locationNames.join('').toLowerCase().match(/l/g) || []
    ).length;
    const charECounter = (
      episodesNames.join('').toLowerCase().match(/e/g) || []
    ).length;
    const charCCounter = (
      charactersNames.join('').toLowerCase().match(/c/g) || []
    ).length;
    const totalTime = (new Date().getTime() - timeNow) / 1000;

    const inTime = totalTime <= 3 ? true : false;

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
    };
  }
}
