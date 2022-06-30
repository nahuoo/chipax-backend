import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, lastValueFrom, map } from 'rxjs';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  getCharCounter(): any {
    const pages = lastValueFrom(
      this.httpService
        .get('https://rickandmortyapi.com/api/location')
        .pipe(map((response: AxiosResponse) => response.data.info.pages)),
    );
    const locations: any = [];
    axios
      .all([
        axios.get('https://rickandmortyapi.com/api/location?page=1'),
        axios.get('https://rickandmortyapi.com/api/location?page=2'),
        axios.get('https://rickandmortyapi.com/api/location?page=3'),
        axios.get('https://rickandmortyapi.com/api/location?page=4'),
        axios.get('https://rickandmortyapi.com/api/location?page=5'),
        axios.get('https://rickandmortyapi.com/api/location?page=6'),
        axios.get('https://rickandmortyapi.com/api/location?page=7'),
      ])
      .then(
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
      )
      .then(() => {
        console.log(
          (locations.join('').toLowerCase().match(/l/g) || []).length,
        );
      });

    return 0;
  }
}
