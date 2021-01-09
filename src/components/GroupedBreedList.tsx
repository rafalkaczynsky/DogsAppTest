import React, {ReactNode, ReactElement, useEffect} from 'react';
import {SectionList, View, Text} from 'react-native';

interface GroupedBreedList {
  styles?: any;
  groupedDogs: any;
  searchTerm: String;
  renderSectionHeader: ReactNode;
  renderItem: ReactNode;
  keyExtractor: any;
  ItemSeparatorComponent: ReactNode;
  ListHeaderComponent: ReactNode;
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
      <View>
        <Text>We're so sorry :( but no dogs found...</Text>
      </View>
    );
  }
  return <SectionList {...props} sections={filteredDogs()} />;
};

export default GroupedBreedList;
