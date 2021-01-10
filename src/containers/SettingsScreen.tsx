import React, {
    ReactElement, useCallback,
  } from 'react';
  import {connect} from 'react-redux';
  import {RootState} from '../modules/rootState';

  import {
    MainContainer,
    BaseText,
    Button,
    Container
  } from '../components/Core';
import { decreaseFontSize, increaseFontSize } from '../modules/settings';
  
  interface SettingsScreenProps {
    increaseFontSize:()=> void;
    decreaseFontSize: () => void;
    fontSize: number;
  }
  
// This component is a settings screen of our App.
// SettingScren is giving an direct access to customize an app
// Work in progress ...
  const SettingsScreen = (props: SettingsScreenProps): ReactElement => {
    const {increaseFontSize, decreaseFontSize, fontSize} = props;

    const renderButton = (txt:string, callback: ()=> void) => (
      <Button onPress={callback}>
        <BaseText center>{txt}</BaseText>
      </Button>
    )

    const renderFontSizeLabel = (): ReactElement => (
      <Container>
        <BaseText size={fontSize} center darkMode>Current Font Size: {fontSize}</BaseText>
      </Container>
    )

    return (
      <MainContainer>
        {renderButton('Increase (max: 30)', increaseFontSize)}
        {renderButton('Decrease (min: 10)', decreaseFontSize)}
        {renderFontSizeLabel()}
      </MainContainer>
    );
  };
  
  const mapStateToProps = (state: RootState) => ({
    fontSize: state.settings.fontSize
  });
  
  const mapDispatchToProps = (dispatch: any) => ({
    increaseFontSize: ()=> dispatch(increaseFontSize()),
    decreaseFontSize: ()=> dispatch(decreaseFontSize())
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
  

  