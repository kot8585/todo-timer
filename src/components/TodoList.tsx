import React from 'react';
import {SectionList, StyleSheet, Text} from 'react-native';
import {useQuery} from 'react-query';
import {getCategoryAndTodos} from '../../api/category';
import Category from './Category';
import Todo from './Todo';

type TodoListProps = {
  uid: string | undefined;
};

export default function TodoList({uid}: TodoListProps) {
  //react query로 데이터 가져와야돼.
  const result = useQuery('todos', getCategoryAndTodos);
  const {data, error, isLoading} = result;

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
      renderItem={({item}) => <Todo todo={item} />}
      renderSectionHeader={({section}) => <Category category={section} />}
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
