import React, {NamedExoticComponent} from 'react';
import {
  Text,
  TextInput,
  View,
  Platform,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import styled from 'styled-components';
import Palette from '../styles/palette';
import {withProps} from '../helpers';
import {Header} from 'react-navigation';

type MemoizedStyledElement = NamedExoticComponent<any> & {readonly type: any};

export const BaseContainer: MemoizedStyledElement = React.memo(styled(View)`
  flex: 1;
`);

BaseContainer.displayName = 'BaseContainer';

export const MainContainer: MemoizedStyledElement = React.memo(styled(
  BaseContainer,
)`
  background-color: ${Palette.lightest};
  padding: 10px;
  padding-bottom: ${Platform.OS == 'ios' ? '25px' : '8px'};
`);

MainContainer.displayName = 'MainContainer';

export const Container: MemoizedStyledElement = React.memo(withProps()(
  styled(BaseContainer),
)`
  background-color: transparent;
  padding: 0px;
  justify-content: center;
  align-items: ${({alignType}) => (alignType ? alignType : 'center')};
`);

Container.displayName = 'Container';

export const BaseText: MemoizedStyledElement = React.memo(withProps()(
  styled(Text),
)`
  color: ${({darkMode}) => (darkMode ? Palette.darkest : Palette.lightest)};
  text-align: ${({center}) => (center ? 'center' : 'auto')};
  flex-wrap: wrap;
  letter-spacing: 1.2px;
  text-align-vertical: center;
  font-size: ${({size}) => (size ? size + 'px' : '18px')};
`);

BaseText.displayName = 'BaseText';

export const SectionHeader: MemoizedStyledElement = React.memo(styled(BaseText)`
  font-weight: bold;
  padding: 16px;
  text-transform: capitalize;
  background-color: ${Palette.accent};
`);

export const HeaderTitle: MemoizedStyledElement = React.memo(styled(BaseText)`
  text-transform: capitalize;
`);

HeaderTitle.displayName = 'HeaderTitle';

export const SectionItem: MemoizedStyledElement = React.memo(styled(BaseText)`
  padding: 16px;
  text-transform: capitalize;
  background-color: ${Palette.darkest};
  padding-left: 30px;
`);

SectionItem.displayName = 'SectionItem';

export const ListHeader: MemoizedStyledElement = React.memo(styled(BaseText)`
  padding-left: 0px;
  padding-bottom: 10px;
  color: ${Palette.darkest};
`);

ListHeader.displayName = 'ListHeader';

export const SearchBox: MemoizedStyledElement = React.memo(withProps()(
  styled(TextInput),
)`
  width: 100%;
  border-width: 2px;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 15px;
  margin-top: 15px;
  font-size: ${({size}: {size: string}) =>
    size ? size + 'px' : '24px'};
  border-color: ${Palette.darkest};
`);

SearchBox.displayName = 'SearchBox';

export const ImageCard: MemoizedStyledElement = React.memo(styled(View)`
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  margin: 10px;
  background-color: ${Palette.accent};
`);

ImageCard.displayName = 'ImageCard';

export const Button: MemoizedStyledElement = React.memo(
  styled(TouchableOpacity)`
    margin-bottom: 5px;
    justify-content: center;
    background-color: ${Palette.brand};
    padding: 7px;
    margin: 5px;
    align-items: flex-start;
  `,
);

Button.displayName = 'Button';

export const HeaderContainer: MemoizedStyledElement = React.memo(
  styled(View)`
    background-color: ${Palette.brand};
    padding-top: ${Platform.OS == 'ios' ? '10px' :'0px'};
    min-height: ${Header.HEIGHT + 'px'};
  `,
);

HeaderContainer.displayName = 'HeaderContainer';

export const HeaderContent: MemoizedStyledElement = React.memo(
  styled(View)`
    min-height: ${Header.HEIGHT + 'px'};
    background-color: ${Palette.brand};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
);

HeaderContent.displayName = 'HeaderContent';



