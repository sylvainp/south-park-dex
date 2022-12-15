import Usecase from '../../src/core/usecase/usecase';
import UsecaseResponse from '../../src/core/usecase/usecase.response';
import CharactersEntity from '../../src/domain/entities/characters.entity';
import {CharactersPort} from '../../src/domain/ports/characters.port';
import ListAllCharactersResponse from '../../src/domain/usecases/listAllCharacters/listAllCharacters.response';
import ListAllCharactersUsecase from '../../src/domain/usecases/listAllCharacters/listAllCharacters.usecase';
import useConfigMock from '../mock/MockConfigurationContext';

describe('ListAllCharacters', () => {
  let usecase: ListAllCharactersUsecase;
  let port: CharactersPort;

  beforeAll(() => {
    const {listAllCharactersUsecase, charactersPort} = useConfigMock();
    usecase = listAllCharactersUsecase;
    port = charactersPort;
  });

  test('call function must call port function', async () => {
    expect.assertions(1);
    jest
      .spyOn(port, 'getAllCharacters')
      .mockResolvedValue({characters: [], hasMorePage: false});
    await usecase.call();
    expect(port.getAllCharacters).toHaveBeenCalledTimes(1);
  });

  test('call function must return a UsecaseResponse with data returned by port', async () => {
    expect.assertions(2);
    const expectedResponse: ListAllCharactersResponse = {
      characters: [
        new CharactersEntity(
          1,
          'kyle',
          10,
          'male',
          'red',
          'Student',
          null,
          'Judaism',
          'https://spapi.dev/api/families/1',
        ),
      ],
      hasMorePage: false,
    };
    jest.spyOn(port, 'getAllCharacters').mockResolvedValue(expectedResponse);

    const response: UsecaseResponse<ListAllCharactersResponse> =
      await usecase.call();
    expect(response.error).toBeNull();
    expect(response.data).toStrictEqual(expectedResponse);
  });

  test('call function must return usecaseResponse with error returned by port', async () => {
    expect.assertions(2);
    const expectedResponse = new Error('Unable to fetch data');
    jest.spyOn(port, 'getAllCharacters').mockResolvedValue(expectedResponse);
    const response: UsecaseResponse<ListAllCharactersResponse> =
      await usecase.call();
    expect(response.data).toBeNull();
    expect(response.error).toStrictEqual(expectedResponse);
  });
});
