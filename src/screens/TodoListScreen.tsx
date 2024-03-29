import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {CategoryType, TodoType} from '../../api/types';
import TodoList from '../components/TodoList';
import WriteTodoModal from '../components/WriteTodoModal';

export default function TodoListScreen() {
  const navigation = useNavigation();

  //category.tsx에서 가져옴
  const [showTodoModal, setShowTodoModal] = useState(false);
  const clickedCategoryRef = useRef<CategoryType>();
  const categoryHandlePress = (category: CategoryType) => {
    console.log('클릭되었지: ', category.idx);
    clickedCategoryRef.current = category;
    setShowTodoModal(true);
  };

  //Todo.tsx에서 가져옴
  //TODO: Tap만 옆으로 가게 하기
  const todoHandlePress = (todo: TodoType) => {
    navigation.push('TimerScreen', todo);
  };

  return (
    <View>
      <TodoList
        categoryHandlePress={categoryHandlePress}
        todoHandlePress={todoHandlePress}
        showDotsIcon={true}
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
