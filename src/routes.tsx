import React from 'react';

import {
  createStackNavigator,
  createAppContainer,
  NavigationParams,
} from 'react-navigation';
import SettingsButton from './components/SettingsButton';
import MainScreen from './containers/MainScreen';
import SettingsScreen from './containers/SettingsScreen';
import SubBreedsScreen from './containers/SubBreedsScreen';
import {ReactElement} from 'react';
import {findRouteNameFromNavigator} from './utils/utils';
import {AppHeader} from './components/Header';

const RootStackNavigation = createStackNavigator(
  {
    MainSearchScreen: {
      screen: MainScreen,
    },
    SubBreedsScreen: {
      screen: SubBreedsScreen,
    },
    SettingsScreen: {
      screen: SettingsScreen,
    },
  },
  {
    defaultNavigationOptions: ({screenProps, navigation}) => {
      const activeRouteName: string = findRouteNameFromNavigator(navigation)
        .routeName;
      let header: ReactElement | null = null;

      switch (activeRouteName) {
        case 'MainSearchScreen':
          header = (
            <AppHeader
              title={'Doggy McDogFace'}
              rightElement={<SettingsButton navigation={navigation} />}
            />
          );
          break;
        case 'SubBreedsScreen':
          const title: string | undefined =
            navigation.state.params.selectedSubBreed;
          header = (
            <AppHeader navigation={navigation} backButton title={title} />
          );
          break;
        case 'SettingsScreen':
          header = (
            <AppHeader navigation={navigation} backButton title={'Settings'} />
          );
          break;
        default:
          break;
      }
      return {
        header,
      };
    },
  },
);

export const AppNavigator = createAppContainer(RootStackNavigation);
