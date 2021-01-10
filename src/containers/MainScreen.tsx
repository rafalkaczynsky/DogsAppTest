import React, {
  useState,
  useEffect,
  ReactNode,
  ReactElement,
  useCallback,
} from 'react';
import {View, ActivityIndicator, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {RootState} from '../modules/rootState';
import {GroupedBreedList} from '../components';
import {
  SectionHeader,
  SectionItem,
  ListHeader,
  Container,
  SearchBox,
  MainContainer,
  BaseContainer,
} from '../components/Core';
import {getAllDogs} from '../modules/dogs';
import {Breed} from '../models';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Palette from '../styles/palette';
import styles from '../styles/base';

interface MainScreenProps {
  fontSize: number;
  dogs: Breed[];
  isLoading: boolean;
  error: string;
  navigation: any; // Todo: Check for proper type
  getAllDogs: () => Promise<string[]>;
}

const MainScreen = (props: MainScreenProps): ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const {getAllDogs, isLoading, dogs, navigation, fontSize} = props;

  useEffect(() => {
    !dogs.length ? getAllDogs() : null;
  }, []);

  const handleOnRefresh = () => {
    setRefreshing(true);
    getAllDogs()
      .then((res) => setRefreshing(false))
      .catch((error) => {
        alert(error);
        setRefreshing(false);
      });
  };
  const handleSubBreedPressed = (item: string) => {
    navigation.navigate('SubBreedsScreen', {selectedSubBreed: item});
  };

  const onRefresh = useCallback(handleOnRefresh, []);

  const renderSearchBox = () => (
    <SearchBox
      size={fontSize}
      placeholder={'Search for dogs ...'}
      onChangeText={(txt) => setSearchTerm(txt)}
    />
  );

  const renderSubBreadItem = ({item}: {item: String}): ReactNode => (
    <TouchableOpacity onPress={() => handleSubBreedPressed(item)}>
      <SectionItem size={fontSize}>{item}</SectionItem>
    </TouchableOpacity>
  );

  const renderBreedHeader = ({
    section: {breedName},
  }: {
    section: {breedName: String};
  }): ReactElement => <SectionHeader size={fontSize}>{breedName}</SectionHeader>;

  const renderItemSeparator = (): ReactNode => (
    <View style={styles.itemSeparator} />
  );

  const renderListHeader = (): ReactNode => (
    <ListHeader size={fontSize}>Results: </ListHeader>
  );

  const renderList = (): ReactElement => (
    <BaseContainer>
      <GroupedBreedList
        styles={{backgroundColor: 'yellow'}}
        groupedDogs={dogs}
        searchTerm={searchTerm}
        renderSectionHeader={renderBreedHeader}
        renderItem={renderSubBreadItem}
        keyExtractor={(item: any) => item}
        initialNumToRender={10}
        ItemSeparatorComponent={renderItemSeparator}
        ListHeaderComponent={renderListHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </BaseContainer>
  );

  const renderLoading = (): ReactNode => (
    <Container>
      <ActivityIndicator color={Palette.brand} size={'large'} />
    </Container>
  );

  return (
    <MainContainer>
      {renderSearchBox()}
      {isLoading && !refreshing && renderLoading()}
      {renderList()}
    </MainContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  dogs: state.dogs.dogs,
  isLoading: state.dogs.isLoadingDogs,
  error: state.dogs.error,
  fontSize: state.settings.fontSize
});

const mapDispatchToProps = (dispatch: any) => ({
  getAllDogs: () => dispatch(getAllDogs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
