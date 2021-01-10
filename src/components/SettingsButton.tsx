import {ReactElement, ReactNode} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import React from 'react';
import {RootState} from '../modules/rootState';
import {BaseText, Button} from './Core';

export interface ButtonProps {
  navigation: any
}
const SettingsButton = (props: ButtonProps): ReactElement => {
  const {navigation} = props;
  console.log(props);
  return (
    <Button onPress={() => navigation.navigation.navigate('SettingsScreen')}>
      <BaseText>Settings</BaseText>
    </Button>
  );
};

export default SettingsButton;
