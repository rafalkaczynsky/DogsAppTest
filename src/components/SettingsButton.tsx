import {ReactElement} from 'react';
import React from 'react';
import {BaseText, Button} from './Core';

export interface ButtonProps {
  navigation: any
}
const SettingsButton = (props: ButtonProps): ReactElement => {
  const {navigation} = props;
  return (
    <Button onPress={() => navigation.navigate('SettingsScreen')}>
      <BaseText>Settings</BaseText>
    </Button>
  );
};

export default SettingsButton;
