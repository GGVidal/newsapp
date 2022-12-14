import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {ActivityIndicator, Alert, Pressable, Text} from 'react-native';
import {RootStackParamList} from '../../types';
import {useMutation} from 'urql';
import {ADD_BOOKMARK_MUTATION} from '../../queries/addBookmarkMutation.graphql';
import {
  AddBookmarkMutation,
  AddBookmarkMutationVariables,
  RemoveBookmarkMutation,
  RemoveBookmarkMutationVariables,
} from '../../graphql/__generated__/operationTypes';
import {REMOVE_BOOKMARK_MUTATION} from '../../queries/removeBookmarkMutation.graphql';
import {Row, Summary, Title} from './style';
import {StoryProps} from '.';

export const Story: React.FC<StoryProps> = ({
  id,
  summary,
  title,
  bookmarkId,
  cta,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [{fetching: isAddingBookmark}, addBookmark] = useMutation<
    AddBookmarkMutation,
    AddBookmarkMutationVariables
  >(ADD_BOOKMARK_MUTATION);

  const [{fetching: isRemovingBookmark}, removeBookmark] = useMutation<
    RemoveBookmarkMutation,
    RemoveBookmarkMutationVariables
  >(REMOVE_BOOKMARK_MUTATION);

  const handleAddBookmark = useCallback(async () => {
    const result = await addBookmark({storyId: id});
    if (result.error && result.error.message.includes('You are offline!')) {
      Alert.alert(
        'You are offline',
        'Please connect to the internet to add this story to your bookmarks',
      );
    }
  }, [addBookmark, id]);

  const handleRemoveBookmark = useCallback(async () => {
    const result = await removeBookmark({bookmarkId: bookmarkId as string});
    if (result.error && result.error.message.includes('You are offline!')) {
      Alert.alert(
        'You are offline',
        'Please connect to the internet to remove this bookmark',
      );
    }
  }, [removeBookmark, bookmarkId]);

  console.log('GG COMPONENTS', id, summary, bookmarkId, title, cta);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('StoryDetailsModal', {
          id,
          title,
        })
      }>
      <Row>
        <Title>
          {title} {bookmarkId ? '????' : ''}
        </Title>
        {!bookmarkId && !isAddingBookmark && cta === 'add' && (
          <Pressable onPress={handleAddBookmark}>
            <Text>Add Bookmark</Text>
          </Pressable>
        )}
        {bookmarkId && !isRemovingBookmark && cta === 'remove' && (
          <Pressable onPress={handleRemoveBookmark}>
            <Text>Remove Bookmark</Text>
          </Pressable>
        )}
        {isAddingBookmark || (isRemovingBookmark && <ActivityIndicator />)}
      </Row>
      <Summary>{summary}</Summary>
    </Pressable>
  );
};
