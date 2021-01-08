import produce from 'immer';

enum DogsTypeKeys {
  GET_DOGS_ATTEMPT = 'dogs/GET_DOGS_ATTEMPT',
  //...
}

interface DogsInitialState {
  dogs: any[];
  isLoading: boolean;
}

const DogsInitialState = {
  dogs: [],
  isLoading: false,
};

export interface GetDogsAttemptAction {
  type: DogsTypeKeys.GET_DOGS_ATTEMPT;
}

type DogsActionTypes = GetDogsAttemptAction;

export default function (
  state: DogsInitialState = DogsInitialState,
  action: DogsActionTypes,
): DogsInitialState {
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