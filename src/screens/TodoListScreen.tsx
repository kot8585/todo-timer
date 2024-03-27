import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {CategoryType, TodoType} from '../../api/types';
import TodoList from '../components/TodoList';
import WriteTodoModal from '../components/WriteTodoModal';
import useTodo from '../hooks/useTodos';
import useSelectedDateStore from '../store/selecteDateStore';
import useUserStore from '../store/userStore';

export default function TodoListScreen() {
  const navigation = useNavigation();

  const user = useUserStore(state => state.user);
  const selectedDate = useSelectedDateStore(state => state.selectedDate);
  console.log('selectedDate', selectedDate);
  const {
    getAllTodos: {data, isLoading, error},
  } = useTodo(selectedDate);

  //category.tsx에서 가져옴
  const [showTodoModal, setShowTodoModal] = useState(false);
  const clickedCategoryRef = useRef<CategoryType>();
  const categoryHandlePress = (category: CategoryType) => {
    console.log('클릭되었지: ', category.idx);
    clickedCategoryRef.current = category;
    setShowTodoModal(true);
  };

  //Todo.tsx에서 가져옴
  const todoHandlePress = (todo: TodoType) => {
    navigation.push('TimerScreen', todo);
  };

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
      <TodoList
        data={data}
        categoryHandlePress={categoryHandlePress}
        todoHandlePress={todoHandlePress}
      />
      {showTodoModal && (
        <WriteTodoModal
          visible={showTodoModal}
          setShowTodoModal={setShowTodoModal}
          categoryIdx={clickedCategoryRef.current!.idx}
          categoryColor={clickedCategoryRef.current!.color}
        />
      )}
    </View>
  );
}
