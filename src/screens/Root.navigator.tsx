import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabNavigator} from './BottomTabs.navigator';
import {StoryDetailsModal} from './StoryDetailsModal/StoryDetailsModal.screen';
import {RootStackParamList} from '../types';

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Navigator>
      <Screen
        options={{headerShown: false}}
        name="BottomTabs"
        component={BottomTabNavigator}
      />
      <Screen
        options={({route}) => ({
          presentation: 'modal',
          title: route.params.title,
        })}
        name="StoryDetailsModal"
        component={StoryDetailsModal}
      />
    </Navigator>
  );
};
