import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
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

type CreateTimelineModalProps = {
  visible: boolean;
  setModalVisible: (value: boolean) => void;
  //timline 생성할때만 값이 있음
  clickedTime?: string;
  //timline 수정할때만 값이 있음
  updateTimeline?: TimelineType;
};

// TODO: 디자인이 뭔가 이상....
//

function calculateDate(date: string, hour: number) {
  const dateFormat = dayjs(date);
  if (hour < 5) {
    return dateFormat.add(1, 'day');
  }
  return dateFormat;
}

export default function CreateTimelineModal({
  visible,
  setModalVisible,
  clickedTime,
  updateTimeline,
}: CreateTimelineModalProps) {
  const [showTodoListModal, setShowTodoListModal] = useState(false);
  const selectedDate = useSelectedDateStore(state => state.selectedDate);

  // 이거 모달을 보여줄때만 필요한거라  모달 안보여주면 가져올 필요없는데
  // 수정일때도 바로 query 날릴 필요 없음
  const {
    getAllTodos: {data: todos},
  } = useTodo(selectedDate);

  const [form, setForm] = useState({
    todoIdx: updateTimeline ? updateTimeline.todoIdx : undefined,
    todoColor: updateTimeline ? updateTimeline.todoColor : '#696969',
    todoTitle: updateTimeline
      ? updateTimeline.todoTitle
      : '작성된 할일이 없습니다',
    date: selectedDate,
    startHour: updateTimeline ? updateTimeline.startHour.toString() : '',
    startMinute: updateTimeline ? updateTimeline.startMinute.toString() : '',
    endHour: updateTimeline ? updateTimeline.endHour.toString() : '',
    endMinute: updateTimeline ? updateTimeline.endMinute.toString() : '',
  });

  //데이터를 useQuery로 가져와서 데이터가 있으면 첫번째 아이템으로 todo 화면을 세팅해주기
  //근데 이게 처음에만 ㅐㅎ야되는데.....어떻게 처음에만 세ㅇ팅을 할 수 있지?
  useEffect(() => {
    if (clickedTime) {
      if (todos && todos.length > 0 && todos[0].data.length > 0) {
        setForm(prevForm => ({
          ...prevForm,
          todoIdx: todos[0].idx,
          todoColor: todos[0].color,
          todoTitle: todos[0].data[0].title,
        }));
      }
    }
  }, [todos, clickedTime]);

  const handleChangeText = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };
  const {
    createTimelineMutation,
    updateTimelineMutation,
    deleteTimelineMutation,
  } = useTimeline(selectedDate);

  // 이거를 add나 update로 바꿔야하는데 말이지
  const handleSubmit = async () => {
    //TODO: executionTime이 1분 이하일 경우 추가하지 않도록 하기s
    const startHour = parseInt(form.startHour);
    const startDateTime = dayjs(calculateDate(selectedDate, startHour))
      .hour(startHour)
      .minute(parseInt(form.startMinute));

    const endHour = parseInt(form.endHour);
    const endDateTime = dayjs(calculateDate(selectedDate, endHour))
      .hour(endHour)
      .minute(parseInt(form.endMinute));

    const CreateTimelineRequest = {
      todoIdx: form.todoIdx,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      executionTime: endDateTime.diff(startDateTime, 'second'),
      action: 'stop',
    };

    console.log('CreateTimelineRequest', CreateTimelineRequest);
    createTimelineMutation.mutate(CreateTimelineRequest);
    setModalVisible(false);
  };

  const handleUpdate = async () => {
    //TODO: executionTime이 1분 이하일 경우 추가하지 않도록 하기s
    const startHour = parseInt(form.startHour);
    const startDateTime = dayjs(calculateDate(selectedDate, startHour))
      .hour(startHour)
      .minute(parseInt(form.startMinute));

    const endHour = parseInt(form.endHour);
    const endDateTime = dayjs(calculateDate(selectedDate, endHour))
      .hour(endHour)
      .minute(parseInt(form.endHour));

    const UpdateTimelineRequest = {
      idx: updateTimeline!.idx,
      todoIdx: form.todoIdx,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      executionTime: endDateTime.diff(startDateTime, 'second'),
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
    <View>
      <CustomModal visible={visible} setModalVisible={setModalVisible}>
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
              keyboardType="numeric"
              style={[styles.inputTime, styles.timeText]}
              placeholder={
                clickedTime
                  ? (parseInt(clickedTime) + 1).toString()
                  : updateTimeline!.startHour.toString()
              }
              value={form.startHour}
              onChangeText={(text: string) =>
                handleChangeText('startHour', text)
              }
            />
            <Text style={styles.timeText}>:</Text>
            <TextInput
              keyboardType="numeric"
              placeholder="00"
              value={form.startMinute}
              onChangeText={(text: string) =>
                handleChangeText('startMinute', text)
              }
              style={[styles.inputTime, styles.timeText]}
            />
            <Text style={[styles.timeText, styles.timeMid]}>ㅡ</Text>
            <TextInput
              keyboardType="numeric"
              placeholder={
                clickedTime
                  ? (parseInt(clickedTime) + 1).toString()
                  : updateTimeline!.endHour.toString()
              }
              value={form.endHour}
              onChangeText={(text: string) => handleChangeText('endHour', text)}
              style={[styles.inputTime, styles.timeText]}
            />
            <Text style={styles.timeText}>:</Text>
            <TextInput
              keyboardType="numeric"
              placeholder="00"
              value={form.endMinute}
              onChangeText={(text: string) =>
                handleChangeText('endMinute', text)
              }
              style={[styles.inputTime, styles.timeText]}
            />
          </View>

          {clickedTime ? (
            <Pressable onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>추가</Text>
            </Pressable>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <Pressable onPress={() => handleDelete(updateTimeline!.idx)}>
                <Text>삭제하기</Text>
              </Pressable>
              <Pressable onPress={handleUpdate}>
                <Text>수정하기</Text>
              </Pressable>
            </View>
          )}
        </View>
      </CustomModal>
      {showTodoListModal && (
        <Modal visible={showTodoListModal} transparent={true}>
          {showTodoListModal && (
            <Pressable
              onPress={() => {
                setShowTodoListModal(false);
              }}
              style={styles.background}>
              <View style={styles.underWhiteBox}>
                <TodoList
                  todoHandlePress={todoHandlePress}
                  showDotsIcon={false}
                />
              </View>
            </Pressable>
          )}
        </Modal>
      )}
    </View>
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
  },
  todoColor: (backgroundColor: string) => ({
    backgroundColor: backgroundColor,
    width: 25,
    height: 25,
    borderRadius: 25,
    marginRight: 8,
    marginLeft: 4,
  }),
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  timeText: {fontSize: 20, fontWeight: 'bold', color: '#a4a4a4'},
  timeMid: {flexGrow: 1},

  inputTime: {
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    padding: 10,
  },
  button: {
    backgroundColor: '#808080',
    borderColor: Colors.light.borderDefault,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
