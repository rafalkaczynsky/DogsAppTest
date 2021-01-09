import produce from 'immer';
import {Breed} from '../models';
import { RootState } from './rootState';

export enum DogsTypeKeys {
  GET_DOGS_ATTEMPT = 'dogs/GET_DOGS_ATTEMPT',
  GET_DOGS_SUCCESS = 'dogs/GET_DOGS_SUCCESS',
  GET_DOGS_FAILED = 'dogs/GET_DOGS_FAILED',
  GET_SUBBREED_IMAGE_ATTEMPT = 'dogs/GET_SUBBREED_ATTEMPT',
  GET_SUBBREED_IMAGE_SUCCESS = 'dogs/GET_SUBBREED_SUCCESS',
  GET_SUBBREED_IMAGE_FAILED = 'dogs/GET_SUBBREED_FAILED',
  CLEAR_CACHED_IMAGES = 'dogs/CLEAR_CACHED_IMAGES',
}

export interface State {
  dogs: Breed[];
  isLoadingDogs: boolean;
  isLoadingImage: boolean;
  error: string;
  subBreeds: string[];
}

export const DogsInitialState = {
  dogs: [],
  isLoadingDogs: false,
  isLoadingImage: false,
  error: '',
  subBreeds: [],
};

export interface GetDogsAttemptAction {
  type: DogsTypeKeys.GET_DOGS_ATTEMPT;
}

export interface GetDogsSuccessAction {
  type: DogsTypeKeys.GET_DOGS_SUCCESS;
  payload: Breed[];
}

export interface GetDogsFailedAction {
  type: DogsTypeKeys.GET_DOGS_FAILED;
  payload: string;
}

export interface GetSubBreedImageAttemptAction {
  type: DogsTypeKeys.GET_SUBBREED_IMAGE_ATTEMPT;
}

export interface GetSubBreedImageSuccessAction {
  type: DogsTypeKeys.GET_SUBBREED_IMAGE_SUCCESS;
  payload: string;
}

export interface GetSubBreedImageFailedAction {
  type: DogsTypeKeys.GET_SUBBREED_IMAGE_FAILED;
  payload: string;
}

export interface ClearCachedImagesAction {
  type: DogsTypeKeys.CLEAR_CACHED_IMAGES;
  payload: string;
}
export type DogsActionTypes =
  | GetDogsAttemptAction
  | GetDogsSuccessAction
  | GetDogsFailedAction
  | GetSubBreedImageAttemptAction
  | GetSubBreedImageSuccessAction
  | GetSubBreedImageFailedAction
  | ClearCachedImagesAction;

export default function (
  state: State = DogsInitialState,
  action: DogsActionTypes,
): State {
  return produce(state, (draft) => {
    switch (action.type) {
      case DogsTypeKeys.GET_DOGS_ATTEMPT:
        draft.isLoadingDogs = true;
        draft.error = '';
        return draft;
      case DogsTypeKeys.GET_DOGS_SUCCESS:
        draft.isLoadingDogs = false;
        draft.error = '';
        draft.dogs = [...action.payload];
        return draft;
      case DogsTypeKeys.GET_DOGS_FAILED:
        draft.isLoadingDogs = false;
        draft.error = action.payload;
        return draft;
      case DogsTypeKeys.GET_SUBBREED_IMAGE_ATTEMPT:
        draft.isLoadingImage = true;
        draft.error = '';
        return draft;
      case DogsTypeKeys.GET_SUBBREED_IMAGE_SUCCESS:
        draft.isLoadingImage = false;
        draft.error = '';
        draft.subBreeds = [...draft.subBreeds, action.payload];
        return draft;
      case DogsTypeKeys.GET_SUBBREED_IMAGE_FAILED:
        draft.isLoadingImage = false;
        draft.error = action.payload;
        return draft;
      case DogsTypeKeys.CLEAR_CACHED_IMAGES:
        draft.subBreeds = draft.subBreeds.filter((imageUrl) => {
          const breedFull = action.payload.split(' ');
          const mainBreed = breedFull[0];
          return !imageUrl.includes(mainBreed);
        });
        return draft;
    }
  });
}
// API endpoints
const getAllDogsUrl = 'https://dog.ceo/api/breeds/list/all';
const getSubBreedImageUrl = (subBreed: string): string =>
  `https://dog.ceo/api/breed/${subBreed}/images/random`;

// API
export const getSubBreedImageApi = (subBreed: string): Promise<any> => {
  console.log('URL ', getSubBreedImageUrl(subBreed));
  return fetch(getSubBreedImageUrl(subBreed));
};

export const getAllDogsApi = (): Promise<any> => {
  return fetch(getAllDogsUrl);
};

// Actions
export const getSubBreedImage = (subBreed: string) => (
  dispatch: any
) => {
  
  dispatch({type: DogsTypeKeys.GET_SUBBREED_IMAGE_ATTEMPT});

  const subBreedNew =
    subBreed.trim().split(' ')[1] + '/' + subBreed.trim().split(' ')[0];

  const subBreedImg = getSubBreedImageApi(subBreedNew)
    .then((response) => response.json())
    .then((json) => {
      if (json.status === 'success') {
        dispatch({
          type: DogsTypeKeys.GET_SUBBREED_IMAGE_SUCCESS,
          payload: json.message,
        });
      }
      return json;
    })
    .catch((error) => {
      dispatch({
        type: DogsTypeKeys.GET_SUBBREED_IMAGE_FAILED,
        error: error.message,
      });
    });
  return subBreedImg;
};

export const getAllDogs = () => (dispatch: any) => {
  dispatch({type: DogsTypeKeys.GET_DOGS_ATTEMPT});

  const dogs = getAllDogsApi()
    .then((response) => response.json())
    .then((json) => {
      if (json.status === 'success') {
        const dogs: any = json.message;
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

        dispatch({type: DogsTypeKeys.GET_DOGS_SUCCESS, payload: convertedDogs});
        return convertedDogs;
      }

      return json.message;
    })
    .catch((error) => {
      dispatch({type: DogsTypeKeys.GET_DOGS_FAILED, error: error.message});
    });
  return dogs;
};

export const clearCachedSubBreed = (subBreed: string) => (dispatch: any) => {
  dispatch({type: DogsTypeKeys.CLEAR_CACHED_IMAGES, payload: subBreed});
};
