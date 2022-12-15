export default class CharactersEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly age: number | null | undefined,
    public readonly sex: string,
    public readonly hair_color: string,
    public readonly occupation: string,
    public readonly grade: string | null,
    public readonly religion: string,
    public readonly family: string | null,
  ) {}
}
