import axios, { AxiosResponse } from 'axios';

export const getArrayOfEndpoints = async (): Promise<any> => {
  const response: any = await axios.all([
    axios.get('https://rickandmortyapi.com/api/location/'),
    axios.get('https://rickandmortyapi.com/api/episode/'),
    axios.get('https://rickandmortyapi.com/api/character/'),
  ]);
  const locationsCount = response[0].data.info.count;
  const episodeCount = response[1].data.info.count;
  const characterCount = response[2].data.info.count;
  const endpointOfLocationsIds: number[] = Array.from(
    { length: locationsCount },
    (_, i) => i + 1,
  );
  const endpointOfEpisodeIds: number[] = Array.from(
    { length: episodeCount },
    (_, i) => i + 1,
  );
  const endpointOfCharacterIds: number[] = Array.from(
    { length: characterCount },
    (_, i) => i + 1,
  );

  return [endpointOfLocationsIds, endpointOfEpisodeIds, endpointOfCharacterIds];
};
