import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {RootState} from '../modules/rootState';

interface SubBreedsScreenProps {
  //..
}

const SubBreedsScreen = (props: SubBreedsScreenProps) => {
  return (
    <View>
      <Text>Sub breeds Screen</Text>
    </View>
  );
};

const mapStateToProps = (state: RootState) => ({
  //..
});

const mapDispatchToProps = (dispatch: any) => ({
  //..
});

export default connect(mapStateToProps, mapDispatchToProps)(SubBreedsScreen);

const styles = StyleSheet.create({
  //..
});
