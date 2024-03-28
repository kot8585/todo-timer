import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import TimelineScreen from '../screens/TimelineScreen';
import TimerScreen from '../screens/TimerScreen';
import TodoListScreen from '../screens/TodoListScreen';

const Tab = createMaterialTopTabNavigator();

export default function MainTap() {
  return (
    <Tab.Navigator
      initialRouteName="TodoList"
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle: {
          justifyContent: 'space-between',
        },
        tabBarIndicatorStyle: {
          borderBottomColor: 'black', // 선택된 탭의 borderBottom 색상
          borderBottomWidth: 2, // 선택된 탭의 borderBottom 두께
        },
      }}
      sceneContainerStyle={{backgroundColor: 'white'}}>
      <Tab.Screen name="Timer" component={TimerScreen} />
      <Tab.Screen name="TodoList" component={TodoListScreen} />
      <Tab.Screen name="Timeline" component={TimelineScreen} />
    </Tab.Navigator>
  );
}
