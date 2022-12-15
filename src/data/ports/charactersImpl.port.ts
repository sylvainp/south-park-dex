import CharactersEntity from '../../domain/entities/characters.entity';
import {CharactersPort} from '../../domain/ports/characters.port';
import SouthParkApiAdpter from '../adapters/spapi.adapter';

export default class CharactersImplPort implements CharactersPort {
  constructor(private spapiAdapter: SouthParkApiAdpter) {}
  async getAllCharacters(): Promise<Error | CharactersEntity[]> {
    try {
      const response = await this.spapiAdapter.getAllCharacters();
      return response.map(
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
      );
    } catch (error) {
      console.error({error});
      if (error instanceof Error) {
        return Promise.resolve(error);
      }
      return Promise.resolve(new Error(JSON.stringify(error)));
    }
  }
}
