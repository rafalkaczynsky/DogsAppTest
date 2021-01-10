import {combineReducers} from 'redux';
import dogsReducer from '../modules/dogs';
import settingsReducer from '../modules/settings';

const appReducer = combineReducers({
  dogs: dogsReducer,
  settings: settingsReducer
  //...
});

export default appReducer;