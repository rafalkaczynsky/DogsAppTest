import { combineReducers } from 'redux';
import dogsReducer from '../modules/dogs';

const appReducer = combineReducers({
    dogs: dogsReducer,
    //...
});

export default appReducer;