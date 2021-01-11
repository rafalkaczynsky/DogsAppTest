import React from 'react';
import {StatusBar} from 'react-native';
import {ReactElement, ReactNode} from 'react';
import Palette from '../../styles/palette';
import {BaseText, HeaderContainer, HeaderContent} from '../Core';

export interface BasicHeaderProps {
  title?: string | undefined;
  children?: ReactElement | ReactNode;
}
const BasicHeader = (props: BasicHeaderProps): ReactElement => {
  const {title, children} = props;

  return (
    <HeaderContainer>
      {<StatusBar backgroundColor={Palette.brand} />}
      <HeaderContent>
        {children ? children : <BaseText>{title}</BaseText>}
      </HeaderContent>
    </HeaderContainer>
  );
};

export default React.memo(BasicHeader);
