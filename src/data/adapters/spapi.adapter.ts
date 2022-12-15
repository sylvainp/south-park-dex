import CharactersApiModel from '../models/characters.api.model';

export default class SouthParkApiAdpter {
  private readonly baseurl: string = 'https://spapi.dev/api';
  async getAllCharacters(): Promise<CharactersApiModel[]> {
    try {
      const fetchResponse = await fetch(`${this.baseurl}/characters`);
      const response = await fetchResponse.json();
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
