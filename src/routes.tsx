import React from 'react';

import {
  createStackNavigator,
  createAppContainer,
  NavigationParams,
} from 'react-navigation';
import SettingsButton from './components/SettingsButton';
import {BaseText} from './components/Core';
import MainScreen from './containers/MainScreen';
import SettingsScreen from './containers/SettingsScreen';
import SubBreedsScreen from './containers/SubBreedsScreen';
import styles from './styles/base';
import Palette from './styles/palette';
import {ReactElement} from 'react';
import {findRouteNameFromNavigator} from './utils/utils';
import {AppHeader} from './components/Header';

const RootStackNavigation = createStackNavigator(
  {
    MainSearchScreen: {
      screen: MainScreen,
      // navigationOptions: (navigation: any) => ({
      //   title: 'Main Screen',
      //   headerRight: (
      //     <SettingsButton navigation={navigation}/>
      //   )
      // }),
    },
    SubBreedsScreen: {
      screen: SubBreedsScreen,
      // navigationOptions: (navigation: any) => {
      //   const headerTitle = navigation.navigation.getParam('selectedSubBreed');
      //   return {
      //     title: headerTitle,
      //   };
      // },
    },
    SettingsScreen: {
      screen: SettingsScreen,
      // navigationOptions: () => ({
      //   title: 'Settings',
      // }),
    },
  },
  {
    defaultNavigationOptions: ({screenProps, navigation}) => {
      console.log(navigation);
      const activeRouteName: string = findRouteNameFromNavigator(navigation)
        .routeName;
      let header: ReactElement | null = null;

      switch (activeRouteName) {
        case 'MainSearchScreen':
          header = (
            <AppHeader
              title={'Mc DoggyApp'}
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
