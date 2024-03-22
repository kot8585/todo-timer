import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMutation} from 'react-query';
import {deleteTodo} from '../../api/todo';
import {TodoType} from '../../api/types';
import {Colors} from '../assets/color';
import CustomModal from './CustomModal';
import WriteTodoModal from './WriteTodoModal';

type TodoProps = {
  todo: TodoType;
};

export default function Todo({todo}: TodoProps) {
  const navigation = useNavigation();
  const [showEditDeleteModal, setShowEditDeleteModal] = useState(false);
  const [showConfirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState(false);

  const deleteTodoMutation = useMutation(deleteTodo, {
    onError: (error, variables, context) => {
      // 오류 발생 시 처리
      console.log('useMutation 에러', error);
    },
    onSuccess: (data, variables, context) => {
      // 성공 시 처리
      console.log('useMutation 성공', data);
    },
  });

  return (
    <View>
      <Pressable
        onPress={() => navigation.push('TimerScreen', todo)}
        style={{
          flexDirection: 'row',
          borderBottomColor: '#DADADA',
          borderBottomWidth: 1,
        }}>
        <Text style={{fontSize: 16}}>{todo.title}</Text>
        <Pressable
          onPress={() => {
            setShowEditDeleteModal(true);
          }}>
          <Icon name="dots-vertical" size={16} />
        </Pressable>
        {/* 시간은 어떻게 보여주지!!! */}
      </Pressable>

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

      <WriteTodoModal
        visible={showTodoModal}
        setShowTodoModal={setShowTodoModal}
        categoryIdx={todo.categoryIdx}
        todo={todo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
