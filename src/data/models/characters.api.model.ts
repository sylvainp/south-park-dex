export default interface CharactersApiModel {
  id: number;
  name: string;
  age?: number;
  sex: string;
  hair_color: string;
  occupation: string;
  grade?: any;
  religion: string;
  voiced_by?: any;
  created_at: Date;
  updated_at: Date;
  url: string;
  family: string;
  relatives: Relative[];
  episodes: string[];
}

export interface Relative {
  url: string;
  relation: string;
}
