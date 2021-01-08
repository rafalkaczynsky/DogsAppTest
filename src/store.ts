import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import appReducer from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';

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
const store = createStore(appReducer, {}, composeWithDevTools(middleware));

export default store;
