import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import useTodo from '../hooks/useTodos';
import useUserStore from '../store/userStore';
import Category from './Category';
import Todo from './Todo';
import useSelectedDateStore from '../store/selecteDateStore';

export default function TodoList() {
  const user = useUserStore(state => state.user);
  const selectedDate = useSelectedDateStore(state => state.selectedDate);
  console.log('selectedDate', selectedDate);
  const {
    getAllTodos: {data, isLoading, error},
  } = useTodo(selectedDate);

  if (isLoading) {
    return <Text>로딩 중...</Text>;
  }
  if (error) {
    return <Text>에러 발생</Text>;
  }
  if (!data) {
    return <Text>아직 데이터 없음</Text>;
  }

  return (
    <View>
      <Text>{user?.uid}</Text>
      <SectionList
        sections={data}
        keyExtractor={index => index.title}
        renderItem={({item}) => <Todo todo={item} />}
        renderSectionHeader={({section}) => <Category category={section} />}
        style={styles.container}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    gap: 15,
  },
});
