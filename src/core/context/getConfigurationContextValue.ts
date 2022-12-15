import SouthParkApiAdpter from '../../data/adapters/spapi.adapter';
import CharactersImplPort from '../../data/ports/charactersImpl.port';
import {CharactersPort} from '../../domain/ports/characters.port';
import ListAllCharactersUsecase from '../../domain/usecases/listAllCharacters/listAllCharacters.usecase';
import {ConfigurationContextType} from './ConfigurationContext.type';

const getConfigurationContextValue = (): ConfigurationContextType => {
  const southParkApiAdapter: SouthParkApiAdpter = new SouthParkApiAdpter();
  const charactersPort: CharactersPort = new CharactersImplPort(
    southParkApiAdapter,
  );

  const listAllCharactersUsecase: ListAllCharactersUsecase =
    new ListAllCharactersUsecase(charactersPort);

  return {
    southParkApiAdapter,
    charactersPort,
    listAllCharactersUsecase,
  };
};

export default getConfigurationContextValue;
