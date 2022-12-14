import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {RootStackParamList} from '../types';
import {StorySummaryFieldsFragment} from '../graphql/__generated__/operationTypes';
export const Story: React.FC<StorySummaryFieldsFragment> = ({
  id,
  summary,
  title,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('StoryDetailsModal', {
          id,
          title,
        })
      }>
      <Text style={styles.title}>{title}</Text>
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
    marginBottom: 10,
  },
  summary: {
    fontSize: 18,
    color: 'grey',
  },
});
