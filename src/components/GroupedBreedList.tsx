import React, {ReactNode, ReactElement, useEffect} from 'react';
import {SectionList, View, Text} from 'react-native';
import Palette from '../styles/palette';
import {BaseText} from './Core';

interface GroupedBreedList {
  styles?: any;
  groupedDogs: any;
  searchTerm: String;
  renderSectionHeader: ReactNode;
  renderItem: ReactNode;
  keyExtractor: (item: any) => void;
  initialNumToRender: number;
  ItemSeparatorComponent: ReactNode;
  ListHeaderComponent: ReactNode;
  refreshControl: ReactElement;
}

const GroupedBreedList = (props: GroupedBreedList): ReactElement => {
  const {groupedDogs, searchTerm} = props;

  const filteredDogs = () =>
    groupedDogs.reduce(
      (
        result: {breedName: any; data: any}[],
        sectionData: {breedName: any; data: any},
      ) => {
        const {breedName, data} = sectionData;

        const filteredData = data.filter((item: any) => {
          let searchDataItem = breedName;
          searchDataItem = item;

          return searchDataItem
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        });

        if (filteredData.length !== 0) {
          result.push({
            breedName,
            data: filteredData,
          });
        }

        return result;
      },
      [],
    );

  if (!groupedDogs || groupedDogs.length === 0) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <BaseText size={'18px'} color={Palette.darkest}>
          No results :(
        </BaseText>
      </View>
    );
  }
  return <SectionList {...props} sections={filteredDogs()} />;
};

export default GroupedBreedList;
