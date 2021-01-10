import React from 'react';

import {createStackNavigator, createAppContainer} from 'react-navigation';
import SettingsButton from './components/SettingsButton';
import { BaseText } from './components/Core';
import MainScreen from './containers/MainScreen';
import SettingsScreen from './containers/SettingsScreen';
import SubBreedsScreen from './containers/SubBreedsScreen';
import styles from './styles/base';
import Palette from './styles/palette';


const RootStackNavigation = createStackNavigator(
  {
    MainSearchScreen: {
      screen: MainScreen,
      navigationOptions: (navigation) => ({
        title: 'Main Screen',
        headerRight: (
          <SettingsButton navigation={navigation}/>
        )
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
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: () => ({
        title: 'Settings',
      }),
    },
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
