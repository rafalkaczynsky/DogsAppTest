export interface SubBread {
  name: string;
}

export interface Breed {
  name: string;
  subBreeds: SubBread[] | null;
}