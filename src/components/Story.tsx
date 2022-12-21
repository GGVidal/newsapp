import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  ActivityIndicator,
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

  console.log('GG BOOKMARK ID', bookmarkId, isRemovingBookmark, cta)
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
          <Pressable onPress={() => addBookmark({storyId: id})}>
            <Text>Add Bookmark</Text>
          </Pressable>
        )}
        {bookmarkId && !isRemovingBookmark && cta === 'remove' && (
          <Pressable onPress={() => removeBookmark({bookmarkId})}>
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
