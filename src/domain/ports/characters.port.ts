import CharactersEntity from '../entities/characters.entity';
import ListAllCharactersResponse from '../usecases/listAllCharacters/listAllCharacters.response';

export interface CharactersPort {
  getAllCharacters(): Promise<ListAllCharactersResponse | Error>;
}
