import {StyleSheet} from 'react-native';
import Palette from './palette';

const singlePadding = 16;
const doublePadding = singlePadding * 2;
const singleMargin = 8;
const doubleMargin = singleMargin * 2;
const halfMargin = singleMargin / 2;
const halfPadding = singlePadding / 2;

const styles = StyleSheet.create({
  appHeader: {
    backgroundColor: Palette.brand,
  },
  appHeaderTitle: {
    fontSize: 24,
    color: Palette.lightest,
    textTransform: 'capitalize',
    fontWeight: 'bold',
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
