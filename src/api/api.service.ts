import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, lastValueFrom, map } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { response } from 'express';
import { getArrayOfLocationsId } from '../utils/getArrayOfLocationsId';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async getCharCounter(): Promise<any> {
    const arrayOfLocationsId = await getArrayOfLocationsId();
    const allLocationsData = this.httpService
      .get(`https://rickandmortyapi.com/api/location/${arrayOfLocationsId}`)
      .pipe(map((response: AxiosResponse) => response.data));
    const unwrapLocationData = await lastValueFrom(allLocationsData);
    const locationNames = unwrapLocationData.map((location) => location.name);
    const charLCounter = (
      locationNames.join('').toLowerCase().match(/l/g) || []
    ).length;

    return charLCounter;
  }
}
