import SouthParkApiAdpter from '../../src/data/adapters/spapi.adapter';
import CharactersEntity from '../../src/domain/entities/characters.entity';
import {CharactersPort} from '../../src/domain/ports/characters.port';
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

    test('function must return a CharacterEntity build from CharacterApiModel return by south park api model', async () => {
      expect.assertions(2);
      const mockCharacter10 = require('../mock/datas/character_10.json');
      const mockResult = [mockCharacter10.data];
      const expectedResult: CharactersEntity = new CharactersEntity(
        mockCharacter10.data.id,
        mockCharacter10.data.name,
        mockCharacter10.data.age,
        mockCharacter10.data.sex,
        mockCharacter10.data.hair_color,
        mockCharacter10.data.occupation,
        mockCharacter10.data.grade,
        mockCharacter10.data.religion,
        mockCharacter10.data.family,
      );
      jest
        .spyOn(spapiAdapter, 'getAllCharacters')
        .mockResolvedValue(mockResult);
      const result: CharactersEntity[] | Error = await port.getAllCharacters();
      expect(result instanceof Array).toBe(true);
      expect(result).toStrictEqual([expectedResult]);
    });

    test('function must return the error returned by south park api adapter', async () => {
      expect.assertions(2);
      const expectedError = new Error('unable to fetch api');
      jest
        .spyOn(spapiAdapter, 'getAllCharacters')
        .mockRejectedValue(expectedError);
      const result: CharactersEntity[] | Error = await port.getAllCharacters();
      expect(result instanceof Error).toBe(true);
      expect(result).toStrictEqual(expectedError);
    });
    test('function must return an error build from returned error string throw by south park api adapter', async () => {
      expect.assertions(2);
      const apiError = {code: 404, message: 'not found'};
      const expectedError = new Error(JSON.stringify(apiError));
      jest.spyOn(spapiAdapter, 'getAllCharacters').mockRejectedValue(apiError);
      const result: CharactersEntity[] | Error = await port.getAllCharacters();
      expect(result instanceof Error).toBe(true);
      expect(result).toStrictEqual(expectedError);
    });
  });
});
