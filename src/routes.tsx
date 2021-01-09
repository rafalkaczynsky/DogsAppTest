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
      navigationOptions: (navigation) => {
        const headerTitle = navigation.navigation.getParam('selectedSubBreed');

        return {
          title: headerTitle,
        };
      },
    },
  },
  {},
);

export const AppNavigator = createAppContainer(RootStackNavigation);
