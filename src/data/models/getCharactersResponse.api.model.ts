import CharactersApiModel from './characters.api.model';

export default interface GetCharactersResponseApiModel {
  data: CharactersApiModel[];
  meta: {current_page: number; last_page: number};
}
