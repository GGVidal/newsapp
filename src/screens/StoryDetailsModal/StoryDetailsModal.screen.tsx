import {useRoute, RouteProp} from '@react-navigation/native';
import React from 'react';
import {Text, ActivityIndicator} from 'react-native';
import {useQuery} from 'urql';
import {STORY_BY_ID} from '../../queries/storiesById.graphql';
import {RootStackParamList} from '../../types';
import {
  StoryByIdQuery,
  StoryByIdQueryVariables,
} from '../../graphql/__generated__/operationTypes';
import {
  AuthorText,
  BaseText,
  Container,
  StyledScrollView,
  SummaryText,
} from './style';

export const StoryDetailsModal: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'StoryDetailsModal'>>();
  const [{data, fetching, error}] = useQuery<
    StoryByIdQuery,
    StoryByIdQueryVariables
  >({
    query: STORY_BY_ID,
    variables: {id: route.params.id},
  });

  if (fetching) {
    return (
      <Container>
        <ActivityIndicator color="grey" />
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <Text>Something went wrong {error.message}</Text>
      </Container>
    );
  }
  return (
    <StyledScrollView>
      <AuthorText>by {data?.story?.author}</AuthorText>
      <SummaryText>{data?.story?.summary}</SummaryText>
      <BaseText>{data?.story?.text}</BaseText>
    </StyledScrollView>
  );
};
