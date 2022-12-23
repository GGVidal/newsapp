import {FlatList} from 'react-native';
import styled from 'styled-components/native';

export const StyledFlatlist = styled(FlatList)`
  padding-vertical: 20px;
  padding-horizontal: 15px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: black;
  margin-bottom: 14px;
`;
