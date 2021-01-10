import React, {ReactElement} from 'react';
import {Text, TextInput, View, Platform } from 'react-native';
import styled from 'styled-components';
import Styles from '../styles/base';
import Palette from '../styles/palette';
import {withProps} from '../helpers';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const BaseContainer = React.memo(styled(View)`
  flex: 1;
`);

BaseContainer.displayName = 'BaseContainer';

export const MainContainer = React.memo(styled(BaseContainer)`
  background-color: ${Palette.lightest};
  padding: 10px;
  padding-bottom: ${Platform.OS == 'ios' ? '25px' : '8px'};
`);

MainContainer.displayName = 'MainContainer';

export const Container = React.memo(styled(BaseContainer)`
  background-color: transparent;
  padding: 0px;
  justify-content: center;
  text-align: center;
`);

Container.displayName = 'Container';

export const BaseText = React.memo(withProps()(styled(Text))`
  color: ${({darkMode}) => (darkMode ? Palette.darkest : Palette.lightest)};
  text-align: ${({center}) => (center ? 'center' : 'auto')};
  flex-wrap: wrap;
  letter-spacing: 1.2px;
  text-align-vertical: center;
  font-size: ${({size}) => (size ? size + 'px' : '18px')};
`);

BaseText.displayName = 'BaseText';

export const SectionHeader = React.memo(styled(BaseText)`
  font-weight: bold;
  padding: 16px;
  text-transform: capitalize;
  background-color: ${Palette.accent};
`);

SectionHeader.displayName = 'SectionHeader';

export const SectionItem = React.memo(styled(BaseText)`
  padding: 16px;
  text-transform: capitalize;
  background-color: ${Palette.darkest};
  padding-left: 30px;
`);

SectionItem.displayName = 'SectionItem';

export const ListHeader = React.memo(styled(BaseText)`
  padding-left: 0px;
  padding-bottom: 10px;
  color: ${Palette.darkest};
`);

ListHeader.displayName = 'ListHeader';

export const SearchBox = React.memo(withProps()(styled(TextInput))`
  width: 100%;
  border-width: 2px;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 15px;
  margin-top: 15px;
  font-size: ${({size}) => (size !== undefined ? size + 'px' : '24px')};
  border-color: ${Palette.darkest};
`);

SearchBox.displayName = 'SearchBox';

export const ImageCard = React.memo(styled(View)`
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  margin: 10px;
  background-color: ${Palette.accent};
`);

ImageCard.displayName = 'ImageCard';

export const Button = React.memo(
  styled(TouchableOpacity)`
    margin-bottom: 5px;
    justify-content: center;
    align-items: center;
    background-color: ${Palette.brand};
    padding: 7px;
    margin: 5px;
  `,
);

Button.displayName = 'Button';
