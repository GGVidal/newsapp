import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RootStackParamList} from '../types';
import {StorySummaryFieldsFragment} from '../graphql/__generated__/operationTypes';
import {useMutation} from 'urql';
import {ADD_BOOKMARK_MUTATION} from '../queries/addBookmarkMutation.graphql';
import {
  AddBookmarkMutation,
  AddBookmarkMutationVariables,
  RemoveBookmarkMutation,
  RemoveBookmarkMutationVariables,
} from '../graphql/__generated__/operationTypes';
import {REMOVE_BOOKMARK_MUTATION} from '../queries/removeBookmarkMutation.graphql';

interface StoryProps extends StorySummaryFieldsFragment {
  cta: 'add' | 'remove';
}

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
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('StoryDetailsModal', {
          id,
          title,
        })
      }>
      <View style={styles.row}>
        <Text style={styles.title}>
          {title} {bookmarkId ? '🔖' : ''}
        </Text>
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
      </View>
      <Text style={styles.summary}>{summary}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  summary: {
    fontSize: 18,
    color: 'grey',
    marginBottom: 30,
  },
  row: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
