import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import {AppNavigator} from './routes';

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

export default App;
