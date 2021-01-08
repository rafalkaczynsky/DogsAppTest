import React, {useState, ReactNode, ReactElement} from 'react';
import {View, Text, StyleSheet, SectionList, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {RootState} from '../modules/rootState';
import {GroupedBreedList} from '../components';

interface MainScreenProps {
  //..
}

const MainScreen = (props: MainScreenProps): ReactElement => {
  const initialTempData = [
    {
      breedName: 'Breed 1',
      data: ['Super Breed 1', 'Awesome Breed 1', 'Small Breed 1'],
    },
    {
      breedName: 'Breed 2',
      data: ['Super Breed 2', 'Awesome Breed 2', 'Small Breed 2'],
    },
    {
      breedName: 'Breed 3',
      data: ['Super Breed 1', 'Awesome Breed 1', 'Small Breed 1'],
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(initialTempData);

  const renderInput = () => (
    <TextInput
      style={{}}
      placeholder={'Search for dogs ...'}
      onChangeText={(txt) => setSearchTerm(txt)}
    />
  );

  const renderSubBreadItem = ({item}: {item: String}): ReactNode => (
    <Text style={{backgroundColor: 'red'}}>{item}</Text>
  );

  const renderBreedHeader = ({
    section: {breedName},
  }: {
    section: {breedName: String};
  }): ReactNode => <Text style={{fontWeight: 'bold'}}>{breedName}</Text>;

  const renderList = () => (
    <GroupedBreedList
      sections={data}
      searchTerm={searchTerm}
      renderSectionHeader={renderBreedHeader}
      renderItem={renderSubBreadItem}
      keyExtractor={(item: any) => item}
    />
  );

  return (
    <View>
      {renderInput()}
      {renderList()}
    </View>
  );
};

const mapStateToProps = (state: RootState): MainScreenProps => ({
  //..
});

const mapDispatchToProps = (dispatch: any): MainScreenProps => ({
  //..
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

const styles = StyleSheet.create({
  //..
});
