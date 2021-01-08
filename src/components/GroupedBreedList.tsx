import React, {ReactNode, ReactElement} from 'react';
import {SectionList} from 'react-native';

interface GroupedBreedList {
  sections: any;
  searchTerm: String;
  renderSectionHeader: ReactNode;
  renderItem: ReactNode;
  keyExtractor: any;
}

const GroupedBreedList = (props: GroupedBreedList): ReactElement => {
  const {sections, searchTerm} = props;

  const filteredDogs = () => sections.reduce(
    (
      result: {breedName: any; data: any}[],
      sectionData: {breedName: any; data: any},
    ) => {
      const {breedName, data} = sectionData;

      const filteredData = data.filter((item: any) => {
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
    },
    [],
  );
  return <SectionList {...props} sections={filteredDogs()} />;
};

export default GroupedBreedList;
