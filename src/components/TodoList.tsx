import React from 'react';
import {SectionList, StyleSheet} from 'react-native';
import {CategoryType, TodoType} from '../../api/types';
import Category from './Category';
import Todo from './Todo';

type TodoListProps = {
  data: CategoryType[] | [];
  categoryHandlePress: (category: CategoryType) => void;
  todoHandlePress: (todo: TodoType) => void;
  showDotsIcon: boolean;
};

export default function TodoList({
  data,
  categoryHandlePress,
  todoHandlePress,
  showDotsIcon,
}: TodoListProps) {
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
        <Category category={section} handlePress={categoryHandlePress} />
      )}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    gap: 15,
  },
});
