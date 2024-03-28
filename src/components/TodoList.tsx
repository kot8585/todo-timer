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

  // const {
  //   getAllTodos: {data, isLoading, error},
  // } = useTodo(selectedDate);

  // if (isLoading) {
  //   return <Text>로딩 중...</Text>;
  // }
  // if (error) {
  //   return <Text>에러 발생</Text>;
  // }
  // if (!data) {
  //   return <Text>아직 데이터 없음</Text>;
  // }
  const data = [
    {
      idx: 7,
      userUid: 'WouU7QJQKrTyvYXWgXLrgyyf9dh1',
      title: '회사 업무',
      color: '#bdb76b',
      createdAt: '2024-03-13T12:07:50.933Z',
      updatedAt: '2024-03-13T12:07:50.933Z',
      data: [
        {
          idx: 1,
          userUid: 'WouU7QJQKrTyvYXWgXLrgyyf9dh1',
          categoryIdx: 7,
          title: '북앱-에리 핸들링 개발',
          color: '#858C33',
          startDate: '2024-03-12T15:00:00.000Z',
          isCompleted: true,
          executionTime: 0,
          createdAt: '2024-03-13T12:21:17.055Z',
          updatedAt: '2024-03-27T06:51:17.000Z',
        },
        {
          idx: 2,
          userUid: 'WouU7QJQKrTyvYXWgXLrgyyf9dh1',
          categoryIdx: 7,
          title: '북앱-데이터베이스 수정하기',
          color: '#F76B6B',
          startDate: '2024-03-12T15:00:00.000Z',
          isCompleted: true,
          executionTime: 0,
          createdAt: '2024-03-13T12:46:20.622Z',
          updatedAt: '2024-03-25T09:06:45.813Z',
        },
      ],
    },
    {
      idx: 8,
      userUid: 'WouU7QJQKrTyvYXWgXLrgyyf9dh1',
      title: '개인플젝',
      color: '#858C33',
      createdAt: '2024-03-13T12:47:31.817Z',
      updatedAt: '2024-03-13T12:47:31.817Z',
      data: [
        {
          idx: 3,
          userUid: 'WouU7QJQKrTyvYXWgXLrgyyf9dh1',
          categoryIdx: 8,
          title: 'SEO 적용하기',
          color: '#F76B6B',
          startDate: '2024-03-12T15:00:00.000Z',
          isCompleted: true,
          executionTime: 0,
          createdAt: '2024-03-13T12:48:50.771Z',
          updatedAt: '2024-03-25T09:06:45.813Z',
        },
      ],
    },
  ];
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
    paddingHorizontal: 16,
    gap: 15,
    width: '100%',
  },
});
