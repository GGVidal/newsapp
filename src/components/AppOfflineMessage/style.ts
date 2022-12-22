import styled from 'styled-components/native';
import {ContainerProps} from '.';

export const Container = styled.View<ContainerProps>`
  background-color: black;
  justify-content: center;
  align-items: center;
  padding-vertical: 20px;
  padding-bottom: ${({paddingBottom}) => `${paddingBottom}px`};
  margin-top: ${({marginTop}) => `${marginTop}px`};
`;

export const OfflineText = styled.Text`
  color: white;
`;
