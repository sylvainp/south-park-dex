import SouthParkApiAdpter from '../../src/data/adapters/spapi.adapter';
import CharactersApiModel from '../../src/data/models/characters.api.model';
import GetCharactersResponseApiModel from '../../src/data/models/getCharactersResponse.api.model';
import CharactersEntity from '../../src/domain/entities/characters.entity';
import {CharactersPort} from '../../src/domain/ports/characters.port';
import ListAllCharactersResponse from '../../src/domain/usecases/listAllCharacters/listAllCharacters.response';
import useConfigMock from '../mock/MockConfigurationContext';

describe('CharactersImplPort', () => {
  let spapiAdapter: SouthParkApiAdpter;
  let port: CharactersPort;
  beforeAll(() => {
    const {southParkApiAdapter, charactersPort} = useConfigMock();
    spapiAdapter = southParkApiAdapter;
    port = charactersPort;
  });

  describe('getAllCharacters', () => {
    test('function must call south park api adapter', async () => {
      expect.assertions(1);
      const mockResult = require('../mock/datas/characters_page_1.json');
      jest
        .spyOn(spapiAdapter, 'getAllCharacters')
        .mockResolvedValue(mockResult);
      await port.getAllCharacters();
      expect(spapiAdapter.getAllCharacters).toHaveBeenCalledTimes(1);
    });

    test('function must return a ListAllCharactersResponse build from GetCharactersResponseApiModel return by south park api model', async () => {
      expect.assertions(1);
      const mockCharactersPage1 = {
        ...require('../mock/datas/characters_page_1.json'),
      };
      const expectedResult: ListAllCharactersResponse = {
        hasMorePage:
          mockCharactersPage1.meta.current_page !==
          mockCharactersPage1.meta.last_page,
        characters: mockCharactersPage1.data.map(
          (item: CharactersApiModel) =>
            new CharactersEntity(
              item.id,
              item.name,
              item.age,
              item.sex,
              item.hair_color,
              item.occupation,
              item.grade,
              item.religion,
              item.family,
            ),
        ),
      };
      jest
        .spyOn(spapiAdapter, 'getAllCharacters')
        .mockResolvedValue(mockCharactersPage1);
      const result: ListAllCharactersResponse | Error =
        await port.getAllCharacters();
      expect(result).toStrictEqual(expectedResult);
    });

    test('function must return all characters returned by each spapi paginated response', async () => {
      expect.assertions(2);
      const mockCharactersPage1 = {
        ...require('../mock/datas/characters_page_1.json'),
      };
      const mockCharactersPage2 = {
        ...require('../mock/datas/characters_page_2.json'),
      };

      jest
        .spyOn(spapiAdapter, 'getAllCharacters')
        .mockResolvedValueOnce(mockCharactersPage1)
        .mockResolvedValueOnce(mockCharactersPage2);
      const response1: ListAllCharactersResponse | Error =
        await port.getAllCharacters();
      expect(
        (response1 as ListAllCharactersResponse).characters.length,
      ).toStrictEqual(10);
      const response2: ListAllCharactersResponse | Error =
        await port.getAllCharacters();
      expect(
        (response2 as ListAllCharactersResponse).characters.length,
      ).toStrictEqual(20);
    });

    test('function must return the error returned by south park api adapter', async () => {
      expect.assertions(2);
      const expectedError = new Error('unable to fetch api');
      jest
        .spyOn(spapiAdapter, 'getAllCharacters')
        .mockRejectedValue(expectedError);
      const result: ListAllCharactersResponse | Error =
        await port.getAllCharacters();
      expect(result instanceof Error).toBe(true);
      expect(result).toStrictEqual(expectedError);
    });

    test('function must return an error build from returned error string throw by south park api adapter', async () => {
      expect.assertions(2);
      const apiError = {code: 404, message: 'not found'};
      const expectedError = new Error(JSON.stringify(apiError));
      jest.spyOn(spapiAdapter, 'getAllCharacters').mockRejectedValue(apiError);
      const result: ListAllCharactersResponse | Error =
        await port.getAllCharacters();
      expect(result instanceof Error).toBe(true);
      expect(result).toStrictEqual(expectedError);
    });
  });
});
