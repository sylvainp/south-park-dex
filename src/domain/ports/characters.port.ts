import CharactersEntity from '../entities/characters.entity';

export interface CharactersPort {
  getAllCharacters(): Promise<CharactersEntity[] | Error>;
}
