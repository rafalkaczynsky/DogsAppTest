import {PixelRatio} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {Breed} from '../models';

/**
 * @param {subBreeds} string[] list of all subBreeds images saved
 * @param {subBreed} string selected sub breed name
 * This method is removing all items form subBreeds list that are related
 * to selected sub breed
 */
export const removeImagesBySubBreed = (
  subBreeds: string[],
  subBreed: string,
): string[] =>
  subBreeds.filter((imageUrl) => {
    const breedFull = subBreed.split(' ');
    const mainBreed = breedFull[0];
    return !imageUrl.includes(mainBreed);
  });

/**
 * @param {subBreed} string selected sub breed name
 * This method is transforming sub breed name to the name needed for API calls
 */
export const transformSubreedName = (subBreed: string): string =>
  subBreed.trim().split(' ')[1] + '/' + subBreed.trim().split(' ')[0];

/**
 * @param {dogs} string[] selected sub breed name
 * This method is method converts dogs array fetched from API
 * to Array needed in APP
 */
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

export const findRouteNameFromNavigator = (
  navigation: NavigationScreenProp<any>,
) => {
  let route = navigation.state;
  while (route.routes) {
    route = route.routes[route.index];
  }
  return route;
};

export const normalize = (size: number, scale?: number): number => {
  const newSize: number = scale ? size * scale : size;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const setToMaxOfNChars = (str: string, n: number): string =>
  n >= str.length ? str : str.substring(0, n) + '...';
