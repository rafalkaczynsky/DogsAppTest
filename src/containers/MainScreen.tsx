import React, {useState, useEffect, ReactNode, ReactElement} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {RootState} from '../modules/rootState';
import {GroupedBreedList} from '../components';
import {getAllDogs} from '../modules/dogs';
import {Breed} from '../models';

interface MainScreenProps {
  dogs: Breed[];
  isLoading: boolean;
  error: string;
  getAllDogs: any;
}

const MainScreen = (props: MainScreenProps): ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    props.getAllDogs();
  }, []);

  const renderInput = () => (
    <TextInput
      style={{}}
      placeholder={'Search for dogs ...'}
      onChangeText={(txt) => setSearchTerm(txt)}
    />
  );

  const renderSubBreadItem = ({item}: {item: String}): ReactNode => (
    <Text
      style={{
        textTransform: 'capitalize',
      }}>
      {item}
    </Text>
  );

  const renderBreedHeader = ({
    section: {breedName},
  }: {
    section: {breedName: String};
  }): ReactNode => (
    <Text style={{fontWeight: 'bold', textTransform: 'capitalize'}}>
      {breedName}
    </Text>
  );

  const renderList = () => (
    <GroupedBreedList
      groupedDogs={props.dogs}
      searchTerm={searchTerm}
      renderSectionHeader={renderBreedHeader}
      renderItem={renderSubBreadItem}
      keyExtractor={(item: any) => item}
    />
  );

  if (props.isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      {renderInput()}
      {renderList()}
    </View>
  );
};

const mapStateToProps = (state: RootState) => ({
  dogs: state.dogs.dogs,
  isLoading: state.dogs.isLoading,
  error: state.dogs.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  getAllDogs: () => dispatch(getAllDogs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

const styles = StyleSheet.create({
  //..
});
