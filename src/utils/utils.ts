import {Breed} from '../models';

export const removeImagesBySubBreed = (
  subBreeds: string[],
  subBreed: string,
): string[] =>
  subBreeds.filter((imageUrl) => {
    const breedFull = subBreed.split(' ');
    const mainBreed = breedFull[0];
    return !imageUrl.includes(mainBreed);
  });

export const transformSubreedName = (subBreed: string): string =>
  subBreed.trim().split(' ')[1] + '/' + subBreed.trim().split(' ')[0];

export const convertDogsArray = (dogs: string[]): Breed[] => {
  const dogsArray: string[] = Object.keys(dogs);

  const convertedDogs: Breed[] = dogsArray.reduce(
    (result: Breed[], breedKey: string) => {
      const breedItem: Breed = {
        breedName: breedKey,
        data: dogs[breedKey].map(
          (subBreed: string) => subBreed + ' ' + breedKey,
        ),
      };
      result.push(breedItem);
      return result;
    },
    [],
  );

  return convertedDogs;
};

export const hasData = (arr: any[]) => !arr.includes(undefined);
