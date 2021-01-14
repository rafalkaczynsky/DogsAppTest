export const getAllDogsUrl: string = 'https://dog.ceo/api/breeds/list/all';
export const getSubBreedImageUrl = (subBreed: string): string =>
  `https://dog.ceo/api/breed/${subBreed}/images/random/2`;
