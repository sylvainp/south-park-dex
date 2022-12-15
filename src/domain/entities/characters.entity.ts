export default class CharactersEntity {
  constructor(
    private id: number,
    private name: string,
    private age: number | null | undefined,
    private sex: string,
    private hair_color: string,
    private occupation: string,
    private grade: string | null,
    private religion: string,
    private family: string | null,
  ) {}
}
