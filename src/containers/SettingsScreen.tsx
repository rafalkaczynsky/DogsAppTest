import React, {
    ReactElement, useCallback,
  } from 'react';
  import {connect} from 'react-redux';
  import {RootState} from '../modules/rootState';

  import {
    MainContainer,
    BaseText,
    Button
  } from '../components/Core';
import { decreaseFontSize, increaseFontSize } from '../modules/settings';
import Palette from '../styles/palette';
  
  interface MainScreenProps {
    increaseFontSize:()=> void;
    decreaseFontSize: () => void;
    fontSize: number;
  }
  
  const SettingsScreen = (props: MainScreenProps): ReactElement => {
    const {increaseFontSize, decreaseFontSize, fontSize} = props;

    const renderButton = (txt:string, callback: ()=> void) => (
      <Button onPress={callback}>
        <BaseText center>{txt}</BaseText>
      </Button>
    )

    return (
      <MainContainer>
        {renderButton('Increase (max: 30)', increaseFontSize)}
        {renderButton('Decrease (min: 10)', decreaseFontSize)}
        <BaseText size={fontSize} center darkMode>Current Font Size: {fontSize}</BaseText>

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
  

  