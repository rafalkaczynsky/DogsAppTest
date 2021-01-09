import React from 'react';

import {createStackNavigator, createAppContainer} from 'react-navigation';
import MainScreen from './containers/MainScreen';
import SubBreedsScreen from './containers/SubBreedsScreen';
import styles from './styles/base';
import Palette from './styles/palette';


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
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: styles.appHeader,
      headerTintColor: Palette.lightest,
      headerTitleStyle: styles.appHeaderTitle,
      headerBackTitle: ' '
    }
  },
);

export const AppNavigator = createAppContainer(RootStackNavigation);
