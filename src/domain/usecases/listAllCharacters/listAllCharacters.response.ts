import CharactersEntity from '../../entities/characters.entity';

export default interface ListAllCharactersResponse {
  characters: CharactersEntity[];
  hasMorePage: boolean;
}
