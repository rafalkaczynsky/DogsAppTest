import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import { persistReducer, persistStore, Persistor } from 'redux-persist';
import appReducer from './reducers';
import { persistConfig } from './persist';

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
const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = createStore(persistedReducer, {}, composeWithDevTools(middleware));
export let persistor: Persistor | undefined = persistStore(store);
