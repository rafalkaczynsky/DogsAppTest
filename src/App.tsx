import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';

const MyApp = () => {
  return (
    <View>
      <Text>Dogs App</Text>
    </View>
  );
};

const App = () => (
  <Provider store={store}>
    <MyApp />
  </Provider>
);

const styles = StyleSheet.create({
  //..
});

export default App;
