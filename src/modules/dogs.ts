import produce from 'immer';
import {getAllDogsApi, getSubBreedImageApi} from '../api/repositories';
import {Breed} from '../models';
import { convertDogsArray, removeImagesBySubBreed, transformSubreedName } from '../utils/utils';
import {RootState} from './rootState';

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
        draft.subBreeds = [...draft.subBreeds, ...action.payload];
        return draft;
      case DogsTypeKeys.GET_SUBBREED_IMAGE_FAILED:
        draft.isLoadingImage = false;
        draft.error = action.payload;
        return draft;
      case DogsTypeKeys.CLEAR_CACHED_IMAGES:
        draft.subBreeds = removeImagesBySubBreed(draft.subBreeds, action.payload);
        return draft;
    }
  });
}

// Actions
export const getSubBreedImage = (subBreed: string) => (dispatch: any) => {
  dispatch({type: DogsTypeKeys.GET_SUBBREED_IMAGE_ATTEMPT});

  const subBreedNew = transformSubreedName(subBreed);
  const subBreedImg = getSubBreedImageApi(subBreedNew)
    .then((response) => response.json())
    .then((json) => {
      if (json.status === 'success') {
        dispatch({
          type: DogsTypeKeys.GET_SUBBREED_IMAGE_SUCCESS,
          payload: json.message,
        });
      }
      return json.message;
    })
    .catch((error) => {
      dispatch({
        type: DogsTypeKeys.GET_SUBBREED_IMAGE_FAILED,
        payload: error.message,
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
        const convertedDogsArray = convertDogsArray(dogs);

        dispatch({type: DogsTypeKeys.GET_DOGS_SUCCESS, payload: convertedDogsArray});
        return convertedDogsArray;
      }

      return json.message;
    })
    .catch((error) => {
      dispatch({type: DogsTypeKeys.GET_DOGS_FAILED, payload: error.message});
    });
  return dogs;
};

export const clearCachedSubBreed = (subBreed: string) => (dispatch: any) => {
  dispatch({type: DogsTypeKeys.CLEAR_CACHED_IMAGES, payload: subBreed});
};
