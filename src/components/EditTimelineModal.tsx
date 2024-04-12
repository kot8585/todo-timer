import dayjs from 'dayjs';
import React, {useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TimelineType, TodoType} from '../api/types';
import {Colors} from '../assets/color';
import useTimeline from '../hooks/useTimeline';
import useTodo from '../hooks/useTodos';
import useSelectedDateStore from '../store/selecteDateStore';
import CustomModal from './CustomModal';
import TodoList from './TodoList';
import Toast from 'react-native-toast-message';

type EditTimelineModalProps = {
  visible: boolean;
  setModalVisible: (value: boolean) => void;
  updateTimeline: TimelineType;
};

function calculateDate(date: string, hour: number) {
  const dateFormat = dayjs(date);
  console.log(dateFormat, '::::', hour);
  if (hour <= 5) {
    return dateFormat.add(1, 'day');
  }
  return dateFormat;
}

export default function EditTimelineModal({
  visible,
  setModalVisible,
  updateTimeline,
}: EditTimelineModalProps) {
  const [showTodoListModal, setShowTodoListModal] = useState(false);
  const selectedDate = useSelectedDateStore(state => state.selectedDate);

  const startHourRef = useRef<TextInput>();
  const startMinuteRef = useRef<TextInput>();
  const endHourRef = useRef<TextInput>();
  const endMinuteRef = useRef<TextInput>();

  const {
    getAllTodos: {data: todos},
  } = useTodo(selectedDate);

  const [form, setForm] = useState({
    todoIdx: updateTimeline.todoIdx,
    todoColor: updateTimeline.todoColor,
    todoTitle: updateTimeline.todoTitle,
    date: selectedDate,
    startHour: updateTimeline.startHour.toString().padStart(2, '0'),
    startMinute: updateTimeline.startMinute.toString().padStart(2, '0'),
    endHour: updateTimeline.endHour.toString().padStart(2, '0'),
    endMinute: updateTimeline.endMinute.toString().padStart(2, '0'),
  });

  const handleChangeText = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };
  const {updateTimelineMutation, deleteTimelineMutation} =
    useTimeline(selectedDate);

  const handleUpdate = async () => {
    if (!form.startHour) {
      startHourRef.current?.focus();
      return;
    }
    const startHour = parseInt(form.startHour, 10);
    if (startHour > 23 || startHour < 0 || isNaN(startHour)) {
      Toast.show({
        type: 'info',
        text1: '시간은 0 ~ 23까지 설정 가능해요',
        position: 'top',
      });
      return;
    }
    const endHour = parseInt(form.endHour, 10);
    if (endHour > 23 || endHour < 0 || isNaN(endHour)) {
      Toast.show({
        type: 'info',
        text1: '시간은 0 ~ 23까지 설정 가능해요',
        position: 'top',
      });
      return;
    }

    const startMinute = parseInt(form.startMinute, 10);
    const endMinute = parseInt(form.endMinute, 10);
    if (
      startMinute > 61 ||
      startMinute < 0 ||
      isNaN(startMinute) ||
      endMinute > 61 ||
      endMinute < 0 ||
      isNaN(endMinute)
    ) {
      Toast.show({
        type: 'info',
        text1: '시간은 0 ~ 60까지 설정 가능해요',
        position: 'top',
      });
      return;
    }
    if (!form.startMinute) {
      startMinuteRef.current?.focus();
      return;
    }
    if (!form.endHour) {
      endHourRef.current?.focus();
      return;
    }
    if (!form.endMinute) {
      endMinuteRef.current?.focus();
      return;
    }

    const startDateTime = dayjs(calculateDate(selectedDate, startHour))
      .hour(startHour)
      .minute(parseInt(form.startMinute));

    const endDateTime = dayjs(calculateDate(selectedDate, endHour))
      .hour(endHour)
      .minute(parseInt(form.endMinute));
    console.log(startDateTime, '::', endDateTime);
    //TODO: executionTime이 1분 이하일 경우 추가하지 않도록 하기s
    const executionTime = endDateTime.diff(startDateTime, 'second');
    console.log('executionTime', executionTime);
    if (executionTime < 60) {
      Toast.show({
        type: 'info',
        text1: '1분 이상의 시간만 저장할 수 있어요',
        position: 'top',
      });
      return;
    }

    const UpdateTimelineRequest = {
      idx: updateTimeline!.idx,
      todoIdx: form.todoIdx,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      executionTime: executionTime,
    };

    updateTimelineMutation.mutate(UpdateTimelineRequest);
    setModalVisible(false);
  };

  const handleDelete = (idx: number) => {
    deleteTimelineMutation.mutate(idx);
    Alert.alert('타임라인이 삭제되었습니다.');
    setModalVisible(false);
  };

  const handleTodoPress = () => {
    console.log('버튼눌림');
    setShowTodoListModal(true);
    console.log('showTodoListModal', showTodoListModal);
  };

  const todoHandlePress = (todo: TodoType) => {
    setForm(form => ({
      ...form,
      todoIdx: todo.idx,
      todoColor: todo.color,
      todoTitle: todo.title,
    }));
    setShowTodoListModal(false);
  };

  return (
    <CustomModal
      visible={visible}
      setModalVisible={setModalVisible}
      position={'middle'}>
      <View style={styles.container}>
        <Text style={styles.headerText}>시간기록 추가</Text>
        <Pressable onPress={handleTodoPress} style={styles.todo}>
          <View style={styles.todoColor(form.todoColor)} />
          <Text style={{fontSize: 16}}>{form.todoTitle}</Text>
          <View style={{flexGrow: 1}} />
          <Icon name="chevron-right" size={24} color={'#808080'} />
        </Pressable>
        <View style={styles.time}>
          <TextInput
            keyboardType="number-pad"
            style={[styles.inputTime, styles.timeText]}
            placeholder={updateTimeline!.startHour.toString()}
            value={form.startHour}
            placeholderTextColor="#a4a4a4"
            onChangeText={(text: string) => {
              handleChangeText('startHour', text);
              if (text.length >= 2) {
                startMinuteRef.current?.focus();
              }
            }}
            ref={startHourRef}
            autoFocus
            onSubmitEditing={() => startMinuteRef.current?.focus()}
          />
          <Text style={styles.timeText}>:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="00"
            value={form.startMinute}
            onChangeText={(text: string) => {
              handleChangeText('startMinute', text);
              if (text.length >= 2) {
                endHourRef.current?.focus();
              }
            }}
            ref={startMinuteRef}
            onSubmitEditing={() => endHourRef.current?.focus()}
            placeholderTextColor="#a4a4a4"
            style={[styles.inputTime, styles.timeText]}
          />
          <Text style={[styles.timeText, styles.timeMid]}>ㅡ</Text>
          <TextInput
            keyboardType="numeric"
            placeholder={updateTimeline!.endHour.toString()}
            value={form.endHour}
            ref={endHourRef}
            onSubmitEditing={() => endMinuteRef.current?.focus()}
            onChangeText={(text: string) => {
              handleChangeText('endHour', text);
              if (text.length >= 2) {
                endMinuteRef.current?.focus();
              }
            }}
            placeholderTextColor="#a4a4a4"
            style={[styles.inputTime, styles.timeText]}
          />
          <Text style={styles.timeText}>:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="00"
            value={form.endMinute}
            ref={endMinuteRef}
            onChangeText={(text: string) => handleChangeText('endMinute', text)}
            placeholderTextColor="#a4a4a4"
            style={[styles.inputTime, styles.timeText]}
          />
        </View>

        <View style={styles.buttons}>
          <Pressable
            onPress={() => handleDelete(updateTimeline!.idx)}
            style={styles.button}>
            <Text style={styles.buttonText}>삭제</Text>
          </Pressable>
          <Pressable onPress={handleUpdate} style={styles.button}>
            <Text style={styles.buttonText}>수정</Text>
          </Pressable>
        </View>
      </View>
      {showTodoListModal && (
        <CustomModal
          visible={showTodoListModal}
          setModalVisible={setShowTodoListModal}
          position={'under'}>
          <TodoList todoHandlePress={todoHandlePress} showDotsIcon={false} />
        </CustomModal>
      )}
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  container: {gap: 8, width: '100%'},

  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.bodyDefault,
    marginBottom: 8,
  },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 4,
  },
  todoColor: (backgroundColor: string) => ({
    backgroundColor: backgroundColor,
    width: 25,
    height: 25,
    borderRadius: 25,
    marginRight: 8,
    marginLeft: 2,
  }),
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  timeText: {fontSize: 20, fontWeight: 'bold', color: Colors.light.bodyDefault},
  timeMid: {flexGrow: 1},

  inputTime: {
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    padding: 12,
  },
  buttons: {flexDirection: 'row', justifyContent: 'space-around', gap: 10},
  button: {
    backgroundColor: '#808080',
    borderColor: Colors.light.borderDefault,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
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
    borderRadius: 8,
    alignItems: 'flex-end',
    padding: 12,
  },
});
