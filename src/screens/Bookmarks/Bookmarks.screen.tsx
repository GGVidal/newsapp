import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, ListRenderItem} from 'react-native';
import {useQuery} from 'urql';
import {BOOKMARKS_QUERY} from '../../queries/allBookmarks.graphql';
import {
  AllBookmarksQuery,
  AllBookmarksQueryVariables,
} from '../../graphql/__generated__/operationTypes';
import {NewsFlatlist} from '../../components/NewsFlatlist/NewsFlatlist';
import {NewsListItem} from '../../components/NewsListItem/NewsListItem';

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
  // interface BookmarksProps {
  //   id: string | undefined;
  //   story: {
  //     id: string;
  //     title: string;
  //     summary: string;
  //     bookmarkId?: string | null;
  //   };
  // }

  // interface ListItemProps {
  //   story?: StoryProps;
  //   bookmark?: BookmarksProps;
  // }

  const renderItem: ListRenderItem<any> = ({item}) => {
    const itemObj = {
      id: item?.id,
      title: item?.story?.title,
      summary: item?.story?.summary,
      bookmarkId: item?.story.bookmarkId,
      cta: 'remove',
    };
    return <NewsListItem {...itemObj} />;
  };

  return (
    <NewsFlatlist
      refreshing={isRefreshing}
      onRefresh={handleRefreshBookmarks}
      data={data?.bookmarks}
      renderItem={renderItem}
    />
  );
};
