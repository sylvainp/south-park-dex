import GetCharactersResponseApiModel from '../models/getCharactersResponse.api.model';

export default class SouthParkApiAdpter {
  private readonly baseurl: string = 'https://spapi.dev/api';
  private currentPage: number = 1;
  async getAllCharacters(): Promise<GetCharactersResponseApiModel> {
    try {
      const fetchResponse = await fetch(
        `${this.baseurl}/characters?page=${this.currentPage}`,
      );
      const response = await fetchResponse.json();
      this.currentPage++;
      // console.log(
      //   `${response.data.map((item: any) => `[${item.id}]${item.name}`)}`,
      // );
      return response;
    } catch (error) {
      // console.error({error});
      return Promise.reject(error);
    }
  }
}
