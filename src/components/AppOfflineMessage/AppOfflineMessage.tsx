import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Container, OfflineText} from './style';

export const AppOfflineMessage: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <Container paddingBottom={insets.bottom} marginTop={-insets.bottom / 2}>
      <OfflineText>You are offline</OfflineText>
    </Container>
  );
};
