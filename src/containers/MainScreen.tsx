import React, {useState, useEffect, ReactNode, ReactElement} from 'react';
import {View, TextInput, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {RootState} from '../modules/rootState';
import {GroupedBreedList, Container, BaseText} from '../components';
import {getAllDogs} from '../modules/dogs';
import {Breed} from '../models';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Palette from '../styles/palette';
import styles from '../styles/base';

interface MainScreenProps {
  dogs: Breed[];
  isLoading: boolean;
  error: string;
  getAllDogs: any;
  navigation: any; // Todo: Check for proper type
}

const MainScreen = (props: MainScreenProps): ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    props.getAllDogs();
  }, []);

  const handleSubBreedPressed = (item: string) => {
    props.navigation.navigate('SubBreedsScreen', {selectedSubBreed: item});
  };

  const renderSearchBox = () => (
    <TextInput
      style={styles.searchBox}
      placeholder={'Search for dogs ...'}
      onChangeText={(txt) => setSearchTerm(txt)}
    />
  );

  const renderSubBreadItem = ({item}: {item: String}): ReactNode => (
    <TouchableOpacity onPress={() => handleSubBreedPressed(item)}>
      <BaseText style={styles.sectionItem}>{item}</BaseText>
    </TouchableOpacity>
  );

  const renderBreedHeader = ({
    section: {breedName},
  }: {
    section: {breedName: String};
  }): ReactElement => (
    <BaseText style={styles.sectionHeader}>{breedName}</BaseText>
  );

  const renderItemSeparator = (): ReactNode => (
    <View style={styles.itemSeparator} />
  );

  const renderListHeader = (): ReactNode => (
    <BaseText style={styles.listHeader}>Results: </BaseText>
  );

  const renderList = () => (
    <GroupedBreedList
      styles={{backgroundColor: 'yellow'}}
      groupedDogs={props.dogs}
      searchTerm={searchTerm}
      renderSectionHeader={renderBreedHeader}
      renderItem={renderSubBreadItem}
      keyExtractor={(item: any) => item}
      ItemSeparatorComponent={renderItemSeparator}
      ListHeaderComponent={renderListHeader}
    />
  );

  const renderLoading = (): ReactNode => (
    <ActivityIndicator color={Palette.brand} size={'large'} />
  );

  return (
    <Container>
      {renderSearchBox()}
      {props.isLoading && renderLoading()}
      {renderList()}
    </Container>
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
