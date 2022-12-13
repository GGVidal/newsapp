import {useRoute, RouteProp} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useQuery} from 'urql';
import {STORY_BY_ID} from '../queries/storiesById.graphql';
import {RootStackParamList} from '../types';
import {
  StoryByIdQuery,
  StoryByIdQueryVariables,
} from '../graphql/__generated__/operationTypes';

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
      <View style={styles.container}>
        <ActivityIndicator color="grey" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.container}>
        <Text>Something went wrong {error.message}</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.author}>by {data?.story?.author}</Text>
      <Text>{data?.story?.summary}</Text>
      <Text>{data?.story?.text}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  scrollView: {
    padding: 20,
  },
  author: {
    fontStyle: 'italic',
    fontSize: 16,
    color: 'grey',
    marginBottom: 20,
  },
  summary: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 25,
    textAlign: 'justify',
  },
  text: {
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'justify',
  },
});
