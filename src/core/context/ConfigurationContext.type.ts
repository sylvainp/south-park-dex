import SouthParkApiAdpter from '../../data/adapters/spapi.adapter';
import {CharactersPort} from '../../domain/ports/characters.port';
import ListAllCharactersUsecase from '../../domain/usecases/listAllCharacters/listAllCharacters.usecase';

export type ConfigurationContextType = {
  // adapters
  southParkApiAdapter: SouthParkApiAdpter;
  // ports
  charactersPort: CharactersPort;
  // usecase
  listAllCharactersUsecase: ListAllCharactersUsecase;
};
