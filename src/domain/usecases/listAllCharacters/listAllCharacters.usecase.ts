import Usecase from '../../../core/usecase/usecase';
import UsecaseResponse from '../../../core/usecase/usecase.response';
import CharactersEntity from '../../entities/characters.entity';
import {CharactersPort} from '../../ports/characters.port';

export default class ListAllCharactersUsecase extends Usecase<
  null,
  CharactersEntity[]
> {
  constructor(private port: CharactersPort) {
    super();
  }
  async call(): Promise<UsecaseResponse<CharactersEntity[]>> {
    const response: CharactersEntity[] | Error =
      await this.port.getAllCharacters();
    if (response instanceof Error) {
      return UsecaseResponse.fromError(response);
    }

    return UsecaseResponse.fromData(response);
  }
}
