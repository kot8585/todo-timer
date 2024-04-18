import React, {useState} from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TodoType} from '../api/types';
import {Colors} from '../assets/color';
import useTodo from '../hooks/useTodos';
import useSelectedDateStore from '../store/selecteDateStore';
import {formatTime} from '../utils/formatDateTime';
import CustomModal from './CustomModal';
import WriteTodoModal from './WriteTodoModal';
import DefaultText from './ui/DefaultText';

type TodoProps = {
  todo: TodoType;
  todoHandlePress: (todo: TodoType) => void;
  showDotsIcon: boolean;
};

export default function Todo({todo, todoHandlePress, showDotsIcon}: TodoProps) {
  const selectedDate = useSelectedDateStore(state => state.selectedDate);

  const [showEditDeleteModal, setShowEditDeleteModal] = useState(false);
  const [showConfirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState(false);

  const {deleteTodoMutation, updateTodoMutation} = useTodo(selectedDate);

  const [offsetX] = useState(new Animated.Value(0));

  const onGestureEvent = event => {
    // offsetX 값 업데이트
    offsetX.setValue(event.nativeEvent.translationX / 2);
  };
  const onHandlerStateChange = event => {
    if (event.nativeEvent.state === State.END) {
      // offsetX 값이 0으로 애니메이션
      console.log('할일 완료');
      Animated.spring(offsetX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();

      todo.isCompleted = !todo.isCompleted;
      updateTodoMutation.mutate(todo);
    }
  };
  return (
    <View>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Pressable onPress={() => todoHandlePress(todo)}>
          <Animated.View
            style={[
              styles.todoContainer,
              {transform: [{translateX: offsetX}]},
            ]}>
            {/* <View style={styles.todoColor(todo.color)} /> */}
            {todo.isCompleted ? (
              <Text style={styles.completeTodoText}>{todo.title}</Text>
            ) : (
              <DefaultText text={todo.title} style={styles.todoText} />
            )}
            {/* <View style={{flexGrow: 1}} /> */}
            <Text style={styles.timeText}>
              {formatTime(todo.executionTime)}
            </Text>
            {showDotsIcon && (
              <Pressable
                onPress={() => {
                  setShowEditDeleteModal(true);
                }}
                hitSlop={5}>
                <Icon name="dots-vertical" size={18} style={styles.icon} />
              </Pressable>
            )}
          </Animated.View>
        </Pressable>
      </PanGestureHandler>
      {showEditDeleteModal && (
        <CustomModal
          visible={showEditDeleteModal}
          setModalVisible={setShowEditDeleteModal}
          position={'middle'}>
          <View style={styles.verticalButtons}>
            <Pressable
              onPress={() => {
                setShowEditDeleteModal(false);
                setShowTodoModal(true);
              }}
              hitSlop={10}>
              <DefaultText text="수정하기" />
            </Pressable>
            <Pressable
              onPress={() => {
                setShowEditDeleteModal(false);
                setConfirmDeleteModal(true);
              }}
              hitSlop={10}>
              <DefaultText text="삭제하기" />
            </Pressable>
          </View>
        </CustomModal>
      )}

      {/* 이거 TodoListScreen에서만 필요한건데 상위로 빼내야할까...? */}
      {showConfirmDeleteModal && (
        <CustomModal
          visible={showConfirmDeleteModal}
          setModalVisible={setConfirmDeleteModal}
          position={'middle'}
          whiteBoxStyle={{width: 300}}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>할일을 삭제하시겠어요?</Text>

            <View style={styles.horizontalButtons}>
              <Pressable
                onPress={() => {
                  setConfirmDeleteModal(false);
                }}
                style={styles.button}>
                <Text style={styles.buttonText}>취소</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  deleteTodoMutation.mutate(todo.idx);
                }}
                style={styles.button}>
                <Text style={styles.buttonText}>삭제</Text>
              </Pressable>
            </View>
          </View>
        </CustomModal>
      )}

      {showTodoModal && (
        <WriteTodoModal
          visible={showTodoModal}
          setShowTodoModal={setShowTodoModal}
          categoryIdx={todo.categoryIdx}
          todo={todo}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    borderBottomColor: '#DADADA',
    borderBottomWidth: 1,
    paddingVertical: 11,
    alignItems: 'center',
    gap: 5,
  },
  todoColor: (backgroundColor: string) => ({
    width: 5,
    backgroundColor: backgroundColor,
    height: '100%',
    borderRadius: 4,
  }),
  todoText: {
    flex: 1,
    flexWrap: 'wrap',
    ...Platform.select({
      android: {lineHeight: 22},
    }),
  },
  dotsIconButton: {
    backgroundColor: Colors.light.buttonDefault,
  },
  completeTodoText: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: Colors.light.bodyInActive,
    ...Platform.select({
      android: {lineHeight: 22},
    }),
  },
  timeText: {
    color: Colors.light.captionDefault,
    fontSize: 14,
    paddingLeft: 2,
  },
  icon: {
    color: Colors.light.captionDefault,
    paddingVertical: 2,
  },
  modalContainer: {
    // width: '100%',
    alignItems: 'center',
    paddingTop: 15,
    gap: 10,
    paddingBottom: 3,
  },
  modalText: {
    fontSize: 14,
    color: Colors.light.bodyDefault,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.light.bodyDefault,
  },
  horizontalButtons: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 8,
  },
  verticalButtons: {
    gap: 20,
    marginVertical: 4,
  },
  button: {
    backgroundColor: Colors.light.buttonDefault,
    borderColor: Colors.light.borderDefault,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
