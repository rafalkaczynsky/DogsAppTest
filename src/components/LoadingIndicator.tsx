import React, { ReactElement } from "react";
import { ActivityIndicator } from "react-native";
import Palette from "../styles/palette";
import { Container } from "./Core";

export const LoadingIndicator = (): ReactElement => (
    <Container>
      <ActivityIndicator color={Palette.brand} size={'large'} />
    </Container>
);

export default LoadingIndicator;