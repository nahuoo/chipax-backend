import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, lastValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { getArrayOfLocationsId } from '../utils/getArrayOfLocationsId';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async getCharCounter(): Promise<number> {
    const arrayOfLocationsId = await getArrayOfLocationsId();
    const allLocationsData: Observable<string[]> = this.httpService
      .get(`https://rickandmortyapi.com/api/location/${arrayOfLocationsId}`)
      .pipe(map((response: AxiosResponse) => response.data));
    const unwrapLocationData: any[] = await lastValueFrom(allLocationsData);
    const locationNames: string[] = unwrapLocationData.map(
      (location) => location.name,
    );
    const charLCounter = (
      locationNames.join('').toLowerCase().match(/l/g) || []
    ).length;

    return charLCounter;
  }
}
