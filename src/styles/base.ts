import {StyleSheet} from 'react-native';
import Palette from './palette';

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
  fastImage: {width: '100%', height: '100%'},
});

export default styles;
