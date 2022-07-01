import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, lastValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { getArrayOfEndpoints } from '../utils/getArrayOfEndpoints';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async getCharCounter(): Promise<object> {
    const timeNow = new Date().getTime();
    const arrayOfLocationsId = await getArrayOfEndpoints();
    const allLocationsData: Observable<string[]> = this.httpService
      .get(`https://rickandmortyapi.com/api/location/${arrayOfLocationsId[0]}`)
      .pipe(map((response: AxiosResponse) => response.data));
    const allEpisodesData: Observable<string[]> = this.httpService
      .get(`https://rickandmortyapi.com/api/episode/${arrayOfLocationsId[1]}`)
      .pipe(map((response: AxiosResponse) => response.data));
    const allCharactersData: Observable<string[]> = this.httpService
      .get(`https://rickandmortyapi.com/api/character/${arrayOfLocationsId[2]}`)
      .pipe(map((response: AxiosResponse) => response.data));
    const unwrapLocationData: any[] = await lastValueFrom(allLocationsData);
    const unwrapEpisodesData: any[] = await lastValueFrom(allEpisodesData);
    const unwrapCharactersData: any[] = await lastValueFrom(allCharactersData);

    const locationNames: string[] = unwrapLocationData.map(
      (location) => location.name,
    );
    const episodesNames: string[] = unwrapEpisodesData.map(
      (episode) => episode.name,
    );
    const charactersNames: string[] = unwrapCharactersData.map(
      (character) => character.name,
    );
    const charLCounter = (
      locationNames.join('').toLowerCase().match(/l/g) || []
    ).length;
    const charECounter = (
      episodesNames.join('').toLowerCase().match(/e/g) || []
    ).length;
    const charCCounter = (
      charactersNames.join('').toLowerCase().match(/c/g) || []
    ).length;
    const totalTime = (new Date().getTime() - timeNow) / 1000

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
