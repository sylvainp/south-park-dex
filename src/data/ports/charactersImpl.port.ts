import CharactersEntity from '../../domain/entities/characters.entity';
import {CharactersPort} from '../../domain/ports/characters.port';
import ListAllCharactersResponse from '../../domain/usecases/listAllCharacters/listAllCharacters.response';
import SouthParkApiAdpter from '../adapters/spapi.adapter';
import GetCharactersResponseApiModel from '../models/getCharactersResponse.api.model';

export default class CharactersImplPort implements CharactersPort {
  private _characters: CharactersEntity[] = [];

  constructor(private spapiAdapter: SouthParkApiAdpter) {}

  public get characters(): CharactersEntity[] {
    return this._characters;
  }

  async getAllCharacters(): Promise<Error | ListAllCharactersResponse> {
    try {
      const response: GetCharactersResponseApiModel =
        await this.spapiAdapter.getAllCharacters();
      this._characters = [
        ...this._characters,
        ...response.data.map(
          item =>
            new CharactersEntity(
              item.id,
              item.name,
              item.age,
              item.sex,
              item.hair_color,
              item.occupation,
              item.grade,
              item.religion,
              item.family,
            ),
        ),
      ];

      return {
        characters: this._characters,
        hasMorePage: response.meta.current_page !== response.meta.last_page,
      };
    } catch (error) {
      if (error instanceof Error) {
        return Promise.resolve(error);
      }
      return Promise.resolve(new Error(JSON.stringify(error)));
    }
  }
}
