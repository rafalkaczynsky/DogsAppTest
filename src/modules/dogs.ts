import produce from 'immer';

export enum DogsTypeKeys {
  GET_DOGS_ATTEMPT = 'dogs/GET_DOGS_ATTEMPT',
  //...
}

export interface State {
  dogs: any[];
  isLoading: boolean;
}

export const DogsInitialState = {
  dogs: [],
  isLoading: false,
};

export interface GetDogsAttemptAction {
  type: DogsTypeKeys.GET_DOGS_ATTEMPT;
}

export type DogsActionTypes = GetDogsAttemptAction;

export default function (
  state: State = DogsInitialState,
  action: DogsActionTypes,
): State {
  return produce(state, (draft) => {
    switch (action.type) {
      case DogsTypeKeys.GET_DOGS_ATTEMPT:
        draft.isLoading = false;
        return draft;
    }
  });
};

export const getDogs = () => (dispatch: any, getState: any) => {
  dispatch({type: DogsTypeKeys.GET_DOGS_ATTEMPT});
  // ....
};