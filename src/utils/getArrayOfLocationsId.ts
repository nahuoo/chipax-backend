import axios, { AxiosResponse } from 'axios';

export const getArrayOfLocationsId = async (): Promise<number[]> => {
  const response: AxiosResponse = await axios.get('https://rickandmortyapi.com/api/location/');
  const locationsCount = response.data.info.count;
  //create array from 0 to locationsCount
  const endpointOfLocationsIds: number[] = Array.from(
    { length: locationsCount },
    (_, i) => i+1,
  );
  return endpointOfLocationsIds;
};
