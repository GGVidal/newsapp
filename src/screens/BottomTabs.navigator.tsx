import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {BottomTabParamList} from '../types';
import {BookmarksScreen} from './Bookmarks/Bookmarks.screen';
import {HomeScreen} from './Home/Home.screen';

const {Navigator, Screen} = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator: React.FC = () => {
  return (
    <Navigator>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Bookmarks" component={BookmarksScreen} />
    </Navigator>
  );
};
