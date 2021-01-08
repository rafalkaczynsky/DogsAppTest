import thunk from "redux-thunk";
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import { createLogger } from "redux-logger";
import produce from "immer";

enum DogsTypeKeys {
  GET_DOGS_ATTEMPT = "dogs/GET_DOGS_ATTEMPT",
  //...
}

interface DogsInitialState {
  dogs: any[],
  isLoading: boolean
}

const DogsInitialState = {
  dogs: [],
  isLoading: false
}

export interface GetDogsAttemptAction {
  type: DogsTypeKeys.GET_DOGS_ATTEMPT;
}

type DogsActionTypes = GetDogsAttemptAction;

const DogsReducer = function(
  state: DogsInitialState = DogsInitialState,
  action: DogsActionTypes
): DogsInitialState {
  return produce(state, (draft) => {
    switch (action.type) {
      case DogsTypeKeys.GET_DOGS_ATTEMPT:
        draft.isLoading = false;
        return draft
    }
  });
}

const reducer = combineReducers({
  dogs: DogsReducer,
  //...
})

export const showPersonNameAction = () => (dispatch: any, getState: any) => {
  dispatch({ type: DogsTypeKeys.GET_DOGS_ATTEMPT});
};

function getInitialState() {
  const initState = {
    dogs: DogsInitialState,
    //...
  };
  return initState;
}

const isDebuggingInChrome = __DEV__ ? true : false;

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true,
});

let allMiddleware = [thunk];

if (__DEV__) {
    allMiddleware.push(logger);
}

const middleware = applyMiddleware(...allMiddleware);

const store = createStore(
  reducer,
  getInitialState(),
  compose(middleware)
);

export default store;
