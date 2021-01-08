import React from 'react';

import {createStackNavigator, createAppContainer} from 'react-navigation';
// import { fromLeft, fromRight, zoomIn } from 'react-navigation-transitions';

import MainScreen from './containers/MainScreen';
import SubBreedsScreen from './containers/SubBreedsScreen';

const RootStackNavigation = createStackNavigator(
  {
    MainSearchScreen: {
      screen: MainScreen,
      navigationOptions: () => ({
        title: 'Main Screen',
      }),
    },
    SubBreedsScreen: {
      screen: SubBreedsScreen,
      navigationOptions: () => ({
        title: 'Sub Breeds Screen',
      }),
    },
  },
  {},
);

export const AppNavigator = createAppContainer(RootStackNavigation);
