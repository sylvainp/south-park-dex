import {useState} from 'react';
import {useConfig} from '../../core/context/ConfigurationContext';
import CharactersEntity from '../entities/characters.entity';

const useCharacters = () => {
  const {listAllCharactersUsecase} = useConfig();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [allCharacters, setAllCharacters] = useState<CharactersEntity[] | null>(
    null,
  );
  const listAllCharacters = async () => {
    setLoading(true);
    const response = await listAllCharactersUsecase.call();
    if (response.data) {
      setAllCharacters(response.data);
      setError(null);
    } else {
      setAllCharacters(null);
      setError(response.error);
    }
    setLoading(false);
  };

  return {isLoading, error, allCharacters, listAllCharacters};
};

export default useCharacters;
