import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getLogInUser} from '../../lib/auth';
import TodoList from '../components/TodoList';

export default function HomeScreen() {
  const user = getLogInUser();
  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <TodoList uid={user?.uid} />
    </SafeAreaView>
  );
}
