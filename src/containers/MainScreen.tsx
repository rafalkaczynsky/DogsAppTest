import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {RootState} from '../modules/rootState';

interface MainScreenProps {
  //..
}

const MainScreen = (props: MainScreenProps) => {
  return (
    <View>
      <Text>Main Screen</Text>
    </View>
  );
};

const mapStateToProps = (state: RootState) => ({
  //..
});

const mapDispatchToProps = (dispatch: any) => ({
  //..
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

const styles = StyleSheet.create({
  //..
});
