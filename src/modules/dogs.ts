import produce from 'immer';
import {Breed} from '../models';

export enum DogsTypeKeys {
  GET_DOGS_ATTEMPT = 'dogs/GET_DOGS_ATTEMPT',
  GET_DOGS_SUCCESS = 'dogs/GET_DOGS_SUCCESS',
  GET_DOGS_FAILED = 'dogs/GET_DOGS_FAILED',
  //...
}

export interface State {
  dogs: Breed[];
  isLoading: boolean;
  error: string;
}

export const DogsInitialState = {
  dogs: [],
  isLoading: false,
  error: '',
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

export type DogsActionTypes =
  | GetDogsAttemptAction
  | GetDogsSuccessAction
  | GetDogsFailedAction;

export default function (
  state: State = DogsInitialState,
  action: DogsActionTypes,
): State {
  return produce(state, (draft) => {
    switch (action.type) {
      case DogsTypeKeys.GET_DOGS_ATTEMPT:
        draft.isLoading = true;
        draft.error = '';
        return draft;
      case DogsTypeKeys.GET_DOGS_SUCCESS:
        draft.isLoading = false;
        draft.error = '';
        draft.dogs = [...action.payload];
        return draft;
      case DogsTypeKeys.GET_DOGS_FAILED:
        draft.isLoading = false;
        draft.error = action.payload;
        return draft;
    }
  });
}

const getAllDogsUrl = 'https://dog.ceo/api/breeds/list/all';

export const getAllDogsApi = (): Promise<any> => {
  return fetch(getAllDogsUrl);
};

export const getAllDogs = () => (dispatch: any, getState: any) => {
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
              data: dogs[breedKey],
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