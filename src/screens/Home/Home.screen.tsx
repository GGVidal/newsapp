import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  View,
  ListRenderItem,
} from 'react-native';
import {useQuery} from 'urql';
import {STORIES_QUERY} from '../../queries/stories.graphql';
import {
  AllStoriesQuery,
  AllStoriesQueryVariables,
} from '../../graphql/__generated__/operationTypes';
import {Story} from '../../components/Story/Story';
import {StoryProps} from '../../components/Story';
import {NewsFlatlist} from '../../components/NewsFlatlist/NewsFlatlist';
import {NewsListItem} from '../../components/NewsListItem/NewsListItem';

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

  const renderItem: ListRenderItem<any> = ({item}) => {
    const itemObj = {
      id: item?.id,
      title: item?.title,
      summary: item?.summary,
      bookmarkId: item?.bookmarkId,
      cta: 'add',
    };
    return <NewsListItem {...itemObj} />;
  };
  return (
    <SafeAreaView>
      <NewsFlatlist
        refreshing={isRefreshing}
        onRefresh={handleRefreshStories}
        data={data?.stories}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};
