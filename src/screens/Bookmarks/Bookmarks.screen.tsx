import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useQuery} from 'urql';
import {BOOKMARKS_QUERY} from '../../queries/allBookmarks.graphql';
import {
  AllBookmarksQuery,
  AllBookmarksQueryVariables,
} from '../../graphql/__generated__/operationTypes';
import {Story} from '../../components/Story/Story';
import {Separator, StyledFlatlist} from '../style';

export const BookmarksScreen: React.FC = () => {
  const [{data, fetching, error}, refreshBookmarks] = useQuery<
    AllBookmarksQuery,
    AllBookmarksQueryVariables
  >({query: BOOKMARKS_QUERY});

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshBookmarks = useCallback(() => {
    setIsRefreshing(true);
    refreshBookmarks({requestPolicy: 'network-only'});
  }, [refreshBookmarks]);

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
    <StyledFlatlist
      refreshing={isRefreshing}
      onRefresh={handleRefreshBookmarks}
      contentContainerStyle={styles.flatlistContainer}
      data={data?.bookmarks}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <Separator />}
      renderItem={({item: {story}}) => (
        <Story
          cta="remove"
          id={story.id}
          bookmarkId={story.bookmarkId}
          title={story.title}
          summary={story.summary}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingVertical: 20,
  },
});
