import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TodoList from '../components/TodoList';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <TodoList />
    </SafeAreaView>
  );
}
