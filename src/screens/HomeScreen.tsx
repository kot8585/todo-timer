import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TodoList from '../components/TodoList';
import TimelineScreen from './TimelineScreen';

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>달력</Text>
      <Tab.Navigator
        initialRouteName="TodoList"
        screenOptions={{
          tabBarLabelStyle: {fontSize: 12},
          tabBarItemStyle: {width: 100},
          tabBarStyle: {backgroundColor: 'powderblue'},
        }}>
        <Tab.Screen name="TodoList" component={TodoList} />
        <Tab.Screen name="Timeline" component={TimelineScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
