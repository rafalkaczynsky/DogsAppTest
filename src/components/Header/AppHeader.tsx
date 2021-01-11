import React from 'react';
import {NavigationScreenProp} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import {ReactElement, ReactNode} from 'react';
import {connect} from 'react-redux';
import {RootState} from '../../modules/rootState';
import {BaseText, Button, Container} from '../Core';
import BasicHeader from './BasicHeader';
import Palette from '../../styles/palette';
import { normalize } from '../../utils/utils';

type HeaderElement = ReactElement | ReactNode | null;

export interface AppHeaderProps {
  navigation: NavigationScreenProp<any>;
  backButton?: boolean | null;
  fontSize: number;
  title: string | undefined;
  children?: HeaderElement;
  leftElement?: HeaderElement;
  rightElement?: HeaderElement;
}
const AppHeader = (props: AppHeaderProps): ReactElement => {
  const {
    title,
    backButton,
    leftElement,
    rightElement,
    fontSize,
    navigation,
  } = props;

  const renderLeft = (): HeaderElement =>
    leftElement ? <Container alignType={"flex-start"}>{leftElement}</Container> : <Container />;
  const renderRight = (): HeaderElement =>
    rightElement ? <Container alignType={"flex-end"}>{rightElement}</Container> : <Container />;
  const renderTitle = (): HeaderElement => (
    <BaseText size={normalize(fontSize, 1.33)}>{title}</BaseText>
  );

  const renderBackButton = () => (
    <Container alignType={"flex-start"}>
      <Button onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-outline" size={30} color={Palette.lightest} />
      </Button>
    </Container>
  );
  return (
    <BasicHeader>
      {backButton ? renderBackButton() : renderLeft()}
      {renderTitle()}
      {renderRight()}
    </BasicHeader>
  );
};

const mapStateToProps = (state: RootState) => ({
  fontSize: state.settings.fontSize,
});

const mapDispatchToProps = (dispatch: any) => ({
  //...
});

export default connect(mapStateToProps)(React.memo(AppHeader));
