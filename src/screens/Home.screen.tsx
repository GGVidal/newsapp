import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {useQuery} from 'urql';
import {STORIES_QUERY} from '../queries/stories.graphql';
import {
  AllStoriesQuery,
  AllStoriesQueryVariables,
} from '../graphql/__generated__/operationTypes';
import {Story} from '../components/Story';

export const HomeScreen: React.FC = () => {
  const [{data, error, fetching}, refreshStories] = useQuery<
    AllStoriesQuery,
    AllStoriesQueryVariables
  >({query: STORIES_QUERY});

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshStories = useCallback(() => {
    setIsRefreshing(true);
    refreshStories({requestPolicy: 'network-only'});
  }, [refreshStories]);

  useEffect(() => {
    if (!fetching) {
      setIsRefreshing(false);
    }
  }, [fetching]);

  if (fetching && !isRefreshing) {
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
    <SafeAreaView>
      <FlatList
        refreshing={isRefreshing}
        onRefresh={handleRefreshStories}
        contentContainerStyle={styles.flatlistContainer}
        data={data?.stories}
        style={styles.flatlist}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => (
          <Story
            cta="add"
            id={item.id}
            title={item.title}
            bookmarkId={item.bookmarkId}
            summary={item.summary}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    paddingHorizontal: 20,
  },
  flatlistContainer: {
    paddingVertical: 20,
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    marginBottom: 14,
  },
});
