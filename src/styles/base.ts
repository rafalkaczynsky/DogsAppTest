import {StyleSheet} from 'react-native';
import Palette from './palette';

const singlePadding = 16;
const doublePadding = singlePadding * 2;
const singleMargin = 8;
const doubleMargin = singleMargin * 2;
const halfMargin = singleMargin / 2;
const halfPadding = singlePadding / 2;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: Palette.lightest,
    padding: halfPadding,
  },
  baseText: {
    color: Palette.lightest,
    fontSize: 18,
    letterSpacing: 1.2,
    padding: halfPadding,
  },
  appHeader: {
    backgroundColor: Palette.brand,
  },
  appHeaderTitle: {
    fontSize: 25,
    color: Palette.lightest,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    backgroundColor: Palette.accent,
  },
  sectionItem: {
    textTransform: 'capitalize',
    backgroundColor: Palette.darkest,
    paddingLeft: doublePadding,
  },
  searchBox: {
    borderColor: Palette.darkest,
    borderWidth: 2,
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    marginTop: 15,
    fontSize: 24,
  },
  listHeader: {
    color: Palette.accent,
    paddingLeft: 0,
  },
  itemSeparator: {
    backgroundColor: Palette.lightest,
    height: 1,
    width: '100%',
  },
});

export default styles;

// Background Color: appBackground Blue: brand
// Section Head: darkest Section Item: lightest
// Base Font Sizes: Title: 24 Sections: 18
