import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useQuery} from 'urql';
import {BOOKMARKS_QUERY} from '../queries/allBookmarks.graphql';
import {
  AllBookmarksQuery,
  AllBookmarksQueryVariables,
} from '../graphql/__generated__/operationTypes';
import {Story} from '../components/Story';

export const BookmarksScreen: React.FC = () => {
  const [{data, fetching, error}] = useQuery<
    AllBookmarksQuery,
    AllBookmarksQueryVariables
  >({query: BOOKMARKS_QUERY});
  console.log('GG FETCHING', data);
  if (fetching) {
    return (
      <View>
        <ActivityIndicator color="grey" />
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <Text>Something went wrong {error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.flatlistContainer}
      style={styles.flatlist}
      data={data?.bookmarks}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({item: {story}}) => (
        <Story id={story.id} title={story.title} summary={story.summary} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingVertical: 20,
  },
  flatlist: {
    paddingHorizontal: 20,
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    marginBottom: 14,
  },
});
