import Usecase from '../../../core/usecase/usecase';
import UsecaseResponse from '../../../core/usecase/usecase.response';
import CharactersEntity from '../../entities/characters.entity';
import {CharactersPort} from '../../ports/characters.port';
import ListAllCharactersResponse from './listAllCharacters.response';

export default class ListAllCharactersUsecase extends Usecase<
  null,
  ListAllCharactersResponse
> {
  constructor(private port: CharactersPort) {
    super();
  }
  async call(): Promise<UsecaseResponse<ListAllCharactersResponse>> {
    const response: ListAllCharactersResponse | Error =
      await this.port.getAllCharacters();
    if (response instanceof Error) {
      return UsecaseResponse.fromError(response);
    }

    return UsecaseResponse.fromData(response);
  }
}
