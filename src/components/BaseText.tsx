import React, {ReactElement} from 'react';
import {Text} from 'react-native';
import Styles from '../styles/base';

const BaseText = React.memo(({children, style}) => (
  <Text style={[Styles.baseText, style]}>{children}</Text>
));

export default BaseText;
