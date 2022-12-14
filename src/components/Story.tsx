import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {RootStackParamList} from '../types';

export const Story: React.FC = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('StoryDetailsModal', {
          id: item.id,
          title: item.title,
        })
      }>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.summary}>{item.summary}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    paddingHorizontal: 20,
  },
  flatlistContainer: {
    paddingVertical: 20,
  },
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
