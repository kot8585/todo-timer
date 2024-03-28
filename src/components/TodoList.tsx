import React from 'react';
import {SectionList, StyleSheet, Text} from 'react-native';
import {CategoryType, TodoType} from '../../api/types';
import Category from './Category';
import Todo from './Todo';
import useTodo from '../hooks/useTodos';
import useSelectedDateStore from '../store/selecteDateStore';

type TodoListProps = {
  categoryHandlePress?: (category: CategoryType) => void;
  todoHandlePress: (todo: TodoType) => void;
  showDotsIcon: boolean;
};

export default function TodoList({
  categoryHandlePress,
  todoHandlePress,
  showDotsIcon,
}: TodoListProps) {
  const selectedDate = useSelectedDateStore(state => state.selectedDate);

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
    <SectionList
      sections={data}
      keyExtractor={index => index.title}
      renderItem={({item}) => (
        <Todo
          todo={item}
          todoHandlePress={todoHandlePress}
          showDotsIcon={showDotsIcon}
        />
      )}
      renderSectionHeader={({section}) => (
        <Category
          category={section}
          handlePress={categoryHandlePress}
          showDotsIcon={true}
        />
      )}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 15,
    width: '100%',
  },
});
