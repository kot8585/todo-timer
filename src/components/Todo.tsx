import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TodoType} from '../../api/types';
import {Colors} from '../assets/color';
import useTodo from '../hooks/useTodos';
import CustomModal from './CustomModal';
import WriteTodoModal from './WriteTodoModal';
import useSelectedDateStore from '../store/selecteDateStore';
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

  const {deleteTodoMutation} = useTodo(selectedDate);

  return (
    <View>
      <Pressable
        onPress={() => todoHandlePress(todo)}
        style={styles.todoContainer}>
        <View style={styles.todoColor(todo.color)} />
        <DefaultText text={todo.title} style={styles.todoText} />
        <View style={{flexGrow: 1}} />
        {showDotsIcon && (
          <Pressable
            onPress={() => {
              setShowEditDeleteModal(true);
            }}>
            <Icon name="dots-vertical" size={16} style={styles.icon} />
          </Pressable>
        )}
        {/* 시간은 어떻게 보여주지!!! */}
      </Pressable>
      {showEditDeleteModal && (
        <CustomModal
          visible={showEditDeleteModal}
          setModalVisible={setShowEditDeleteModal}>
          <Pressable
            onPress={() => {
              setShowEditDeleteModal(false);
              setShowTodoModal(true);
              // 수정 컴포넌트 보여주기 근데 Todo정보를 어떻게 넘겨주지..!
            }}>
            <Text style={styles.buttonText}>수정하기</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setShowEditDeleteModal(false);
              setConfirmDeleteModal(true);
            }}>
            <Text style={styles.buttonText}>삭제하기</Text>
          </Pressable>
        </CustomModal>
      )}

      {/* 이거 TodoListScreen에서만 필요한건데 상위로 빼내야할까...? */}
      {showConfirmDeleteModal && (
        <CustomModal
          visible={showConfirmDeleteModal}
          setModalVisible={setConfirmDeleteModal}>
          <Text style={styles.buttonText}>할일을 삭제하시겠어요?</Text>

          <View style={styles.buttons}>
            <Pressable
              onPress={() => {
                console.log('할일 삭제');
                deleteTodoMutation.mutate(todo.idx);
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>확인</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setConfirmDeleteModal(false);
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>취소</Text>
            </Pressable>
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
    paddingVertical: 10,
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
    ...Platform.select({
      android: {lineHeight: 17},
    }),
  },
  icon: {
    color: Colors.light.captionDefault,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.light.bodyDefault,
  },
  buttons: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 8,
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
