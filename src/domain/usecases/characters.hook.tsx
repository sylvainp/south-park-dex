import {useState} from 'react';
import {useConfig} from '../../core/context/ConfigurationContext';
import UsecaseResponse from '../../core/usecase/usecase.response';
import CharactersEntity from '../entities/characters.entity';
import ListAllCharactersResponse from './listAllCharacters/listAllCharacters.response';

const useCharacters = () => {
  const {listAllCharactersUsecase} = useConfig();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [allCharacters, setAllCharacters] = useState<CharactersEntity[] | null>(
    null,
  );
  let hasMorePage = true;

  const listAllCharacters = async () => {
    if (!hasMorePage || isLoading) {
      return;
    }

    setLoading(true);
    const response: UsecaseResponse<ListAllCharactersResponse> =
      await listAllCharactersUsecase.call();
    if (response.data) {
      setAllCharacters(response.data.characters);
      setError(null);
      hasMorePage = response.data.hasMorePage;
    } else {
      // setAllCharacters(null);
      setError(response.error);
    }
    setLoading(false);
  };

  return {isLoading, error, allCharacters, listAllCharacters};
};

export default useCharacters;
