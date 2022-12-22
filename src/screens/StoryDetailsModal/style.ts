import styled from 'styled-components/native';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const StyledScrollView = styled.ScrollView`
  padding: 20px;
`;

export const AuthorText = styled.Text`
  font-size: 16px;
  color: grey;
  margin-bottom: 20px;
  font-style: italic;
`;
export const BaseText = styled.Text`
  font-size: 16px;
  line-height: 25px;
  text-align: justify;
`;

export const SummaryText = styled(BaseText)`
  margin-bottom: 20px;
`;
