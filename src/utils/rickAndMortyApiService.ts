import { Observable, lastValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { getArrayOfEndpoints } from './getArrayOfEndpoints';
import { HttpService } from '@nestjs/axios';

export class rickAndMortyApiService {
  constructor(private readonly httpService: HttpService) {}

  getNames = async (): Promise<any> => {
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
    return [locationNames, episodesNames, charactersNames];
  };

  getEpisodes = async (): Promise<any> => {
    const arrayOfDataId = await getArrayOfEndpoints();
    const allEpisodesData: Observable<string[]> = this.httpService
      .get(`https://rickandmortyapi.com/api/episode/${arrayOfDataId[1]}`)
      .pipe(map((response: AxiosResponse) => response.data));
    const allCharactersData: Observable<string[]> = this.httpService
      .get(`https://rickandmortyapi.com/api/character/${arrayOfDataId[2]}`)
      .pipe(map((response: AxiosResponse) => response.data));
    const unwrapEpisodesData: any[] = await lastValueFrom(allEpisodesData);
    const unwrapCharactersData: any[] = await lastValueFrom(allCharactersData);

    return { unwrapEpisodesData, unwrapCharactersData };
  };
}
