import React, {ReactNode, ReactElement, useEffect} from 'react';
import {SectionList, View, Text} from 'react-native';
import {Breed} from '../models';
import {BaseText, Container} from './Core';

interface GroupedBreedList {
  styles?: any;
  groupedDogs: Breed[];
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

  const filteredDogs = (): Breed[] =>
    groupedDogs.reduce((result: Breed[], sectionData: Breed) => {
      const {breedName, data} = sectionData;

      const filteredData = data.filter((item: string) => {
        let searchDataItem = breedName;
        searchDataItem = item;

        return searchDataItem.toLowerCase().includes(searchTerm.toLowerCase());
      });

      if (filteredData.length !== 0) {
        result.push({
          breedName,
          data: filteredData,
        });
      }

      return result;
    }, []);
  if (!groupedDogs || groupedDogs.length === 0) {
    return (
      <Container>
        <BaseText size={18} darkMode center>
          No results :(
        </BaseText>
      </Container>
    );
  }
  return <SectionList {...props} sections={filteredDogs()} />;
};

export default GroupedBreedList;
