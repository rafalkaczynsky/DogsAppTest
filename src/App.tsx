import React, {useEffect, useState} from 'react';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './store';
import {AppNavigator} from './routes';
import {ActivityIndicator} from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size={'large'} />}
        persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
