import React, { ReactElement } from 'react';
import { View } from 'react-native';
import Styles from '../styles/base'

const Container = React.memo(
  ({ children, style }) => (
    <View style={[Styles.appContainer, style]}>
      {children}
    </View>
  )
);

export default Container;
