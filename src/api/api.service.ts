import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, lastValueFrom, map } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { response } from 'express';
import { getPages } from '../utils/getPages';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async getCharCounter(): Promise<any> {
    const locationPages = await getPages();
    const locations: string[] = [];
    const charCounterPromise = await Promise
      .all(locationPages.map((url) => axios.get(url)))
   /*  const temp = await
        axios.spread((...responses) => {
          locations.push(
            responses[0].data.results.map(
              (allLocationsFromThePage) => allLocationsFromThePage.name,
            ),
            responses[1].data.results.map(
              (allLocationsFromThePage) => allLocationsFromThePage.name,
            ),
            responses[2].data.results.map(
              (allLocationsFromThePage) => allLocationsFromThePage.name,
            ),
            responses[3].data.results.map(
              (allLocationsFromThePage) => allLocationsFromThePage.name,
            ),
            responses[4].data.results.map(
              (allLocationsFromThePage) => allLocationsFromThePage.name,
            ),
            responses[5].data.results.map(
              (allLocationsFromThePage) => allLocationsFromThePage.name,
            ),
            responses[6].data.results.map(
              (allLocationsFromThePage) => allLocationsFromThePage.name,
            ),
          );
        }),
     */
    //    return (locations.join('').toLowerCase().match(/l/g) || []).length;

console.log(charCounterPromise[0].data.results)
    return 0;
  }
}
