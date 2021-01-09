import React, {useState, useEffect, ReactNode, ReactElement} from 'react';
import {View, TextInput, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {RootState} from '../modules/rootState';
import {GroupedBreedList} from '../components';
import {
  SectionHeader,
  SectionItem,
  ListHeader,
  Container,
  SearchBox,
} from '../components/Core';
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
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    props.getAllDogs();
  }, []);

  const handleSubBreedPressed = (item: string) => {
    props.navigation.navigate('SubBreedsScreen', {selectedSubBreed: item});
  };

  const renderSearchBox = () => (
    <SearchBox
      placeholder={'Search for dogs ...'}
      onChangeText={(txt) => setSearchTerm(txt)}
    />
  );

  const renderSubBreadItem = ({item}: {item: String}): ReactNode => (
    <TouchableOpacity onPress={() => handleSubBreedPressed(item)}>
      <SectionItem size={'18px'}>{item}</SectionItem>
    </TouchableOpacity>
  );

  const renderBreedHeader = ({
    section: {breedName},
  }: {
    section: {breedName: String};
  }): ReactElement => <SectionHeader size={'24px'}>{breedName}</SectionHeader>;

  const renderItemSeparator = (): ReactNode => (
    <View style={styles.itemSeparator} />
  );

  const renderListHeader = (): ReactNode => (
    <ListHeader size={'18px'}>Results: </ListHeader>
  );

  const renderList = () => (
    <View style={{flex: 1}}>
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
    </View>
  );

  const renderLoading = (): ReactNode => (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator color={Palette.brand} size={'large'} />
    </View>
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
  isLoading: state.dogs.isLoadingDogs,
  error: state.dogs.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  getAllDogs: () => dispatch(getAllDogs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
