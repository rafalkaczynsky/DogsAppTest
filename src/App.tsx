import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import MainScreen from './containers/MainScreen';

const App = () => (
  <Provider store={store}>
    <MainScreen />
  </Provider>
);

export default App;
