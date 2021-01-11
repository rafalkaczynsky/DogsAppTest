import React, {
  useState,
  useEffect,
  ReactNode,
  ReactElement,
  useCallback,
} from 'react';
import {View, RefreshControl,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {RootState} from '../modules/rootState';
import {GroupedBreedList, LoadingIndicator} from '../components';
import {
  SectionHeader,
  SectionItem,
  ListHeader,
  SearchBox,
  MainContainer,
  BaseContainer,
} from '../components/Core';
import {getAllDogs} from '../modules/dogs';
import {Breed} from '../models';
import styles from '../styles/base';

interface MainScreenProps {
  fontSize: number;
  dogs: Breed[];
  isLoading: boolean;
  error: string;
  navigation: any;
  getAllDogs: () => Promise<string[]>;
}
// This component is a home screen of our App.
// MainScreen is displaying list of dogs grouped by breed with its subreeds
const MainScreen = (props: MainScreenProps): ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const {getAllDogs, isLoading, dogs, navigation, fontSize} = props;

  useEffect(() => {
    !dogs.length ? getAllDogs() : null;
  }, []);

  /**
   * This method is handling processes when onRefresh is pulled down
   * Is fetching main breed list from API
   */
  const handleOnRefresh = () => {
    setRefreshing(true);
    getAllDogs()
      .then((res) => setRefreshing(false))
      .catch((error) => {
        alert(error);
        setRefreshing(false);
      });
  };
  /**
   * @param {item} string selected sub breed name
   * This method is triggered when sub breed item is pressed
   * Once pressed navigate to SubBreedsScreen
   */
  const handleSubBreedPressed = (item: string) => {
    navigation.navigate('SubBreedsScreen', {selectedSubBreed: item});
  };

  const onRefresh = useCallback(handleOnRefresh, []);
  const keyExtractor = (item: any) => item;
  /**
   * Render Methods of MainScreen component
   */

  const renderSearchBox = () => (
    <SearchBox
      size={fontSize}
      placeholder={'Search for dogs ...'}
      onChangeText={(txt) => setSearchTerm(txt)}
    />
  );

  const renderSubBreadItem = ({item}: {item: string}): ReactNode => (
    <TouchableOpacity onPress={() => handleSubBreedPressed(item)}>
      <SectionItem size={fontSize}>{item}</SectionItem>
    </TouchableOpacity>
  );

  const renderBreedHeader = ({
    section: {breedName},
  }: {
    section: {breedName: String};
  }): ReactElement => (
    <SectionHeader size={fontSize}>{breedName}</SectionHeader>
  );

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
        keyExtractor={keyExtractor}
        initialNumToRender={10}
        ItemSeparatorComponent={renderItemSeparator}
        ListHeaderComponent={renderListHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </BaseContainer>
  );

  const renderLoading = (): ReactElement => <LoadingIndicator/>

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
  fontSize: state.settings.fontSize,
});

const mapDispatchToProps = (dispatch: any) => ({
  getAllDogs: () => dispatch(getAllDogs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
