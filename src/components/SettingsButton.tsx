import {ReactElement} from 'react';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import {Button} from './Core';
import Palette from '../styles/palette';

export interface ButtonProps {
  navigation: any
}
const SettingsButton = (props: ButtonProps): ReactElement => {
  const {navigation} = props;
  return (
    <Button onPress={() => navigation.navigate('SettingsScreen')}>
        <Icon name="settings-outline" size={30} color={Palette.lightest} />
    </Button>
  );
};

export default SettingsButton;
