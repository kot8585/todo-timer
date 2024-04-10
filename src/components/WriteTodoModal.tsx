import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import {TodoType} from '../api/types';
import {Colors} from '../assets/color';
import useSelectedDateStore from '../store/selecteDateStore';
import useTodo from '../hooks/useTodos';
import {convertLocalToUtc} from '../utils/formatDateTime';

type WriteTodoModal = {
  visible: boolean;
  setShowTodoModal: React.Dispatch<React.SetStateAction<boolean>>;
  categoryIdx: number;
  categoryColor: string;
  todo?: TodoType;
};

export default function WriteTodoModal({
  visible,
  setShowTodoModal,
  categoryIdx,
  categoryColor,
  todo,
}: WriteTodoModal) {
  const selectedDate = useSelectedDateStore(state => state.selectedDate);
  const {createTodoMutation, updateTodoMutation} = useTodo(selectedDate);
  //
  const [form, setForm] = useState({
    title: todo ? todo.title : '',
    categoryIdx: todo ? todo.categoryIdx : undefined,
  });

  const handleSubmit = () => {
    // 카테고리명은 어떻게 가져오지?
    todo
      ? updateTodoMutation.mutate({
          ...todo,
          title: form.title,
          categoryIdx: form.categoryIdx,
        })
      : createTodoMutation.mutate({
          ...form,
          userUid: 'WouU7QJQKrTyvYXWgXLrgyyf9dh1',
          startDate: convertLocalToUtc(selectedDate),
          categoryIdx: categoryIdx,
          // 일단 todoColor는 catgory를 따라가도록 할게. 나중에 설정할 수 있도록 해야함
          color: categoryColor,
        });
    //이거 성공하면 뭐해야되지?
    setShowTodoModal(false);
  };

  const handleChangeText = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };
  return (
    <Modal visible={visible} transparent={true}>
      <Pressable
        onPress={() => {
          setShowTodoModal(false);
        }}
        style={styles.background}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.underWhiteBox}>
          <TextInput
            placeholder="할일 입력"
            value={form.title}
            onChangeText={(text: string) => handleChangeText('title', text)}
            onSubmitEditing={handleSubmit}
            autoComplete="off"
            autoFocus
            enterKeyHint="done"
            placeholderTextColor={Colors.light.bodyInActive}
            style={styles.input}
          />
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  underWhiteBox: {
    width: '100%',
    backgroundColor: Colors.light.background,
    elevation: 2,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    alignItems: 'flex-end',
    padding: 10,
  },
  input: {
    width: '100%',
  },
});
