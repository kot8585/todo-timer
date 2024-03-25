import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../assets/color';
import useTodo from '../hooks/useTodos';
import CustomModal from './CustomModal';
import dayjs from 'dayjs';
import {useMutation} from 'react-query';
import {createTimeline} from '../../api/timeline';

type CreateTimelineModalProps = {
  visible: boolean;
  setModalVisible: (value: boolean) => void;
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
}: CreateTimelineModalProps) {
  // 이거 모달을 보여줄때만 필요한거라  모달 안보여주면 가져올 필요없는데
  const {
    getAllTodos: {data: todos},
  } = useTodo();

  const [form, setForm] = useState({
    todoIdx: undefined,
    todoColor: '#696969',
    todoTitle: '작성된 할일이 없습니다',
    date: '2024-03-12',
    startHour: '05',
    startMinute: '00',
    endHour: '06',
    endMinute: '00',
  });

  //데이터를 useQuery로 가져와서 데이터가 있으면 첫번째 아이템으로 todo 화면을 세팅해주기
  //근데 이게 처음에만 ㅐㅎ야되는데.....어떻게 처음에만 세ㅇ팅을 할 수 있지?
  useEffect(() => {
    console.log(
      '--------------------------------form이 바뀔때도 불리면 안되는데',
    );
    if (todos && todos.length > 0) {
      setForm(prevForm => ({
        ...prevForm,
        todoIdx: todos[0].idx,
        todoColor: todos[0].color,
        todoTitle: todos[0].title,
      }));
    }
  }, [todos]);

  const handleChangeText = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };
  const createTimelineMutation = useMutation(createTimeline, {
    onError: (error, variables, context) => {
      // 오류 발생 시 처리
      console.log('useMutation 에러', error);
    },
    onSuccess: (data, variables, context) => {
      // 성공 시 처리
      console.log('useMutation 성공', data);
    },
  });
  const handleSubmit = async () => {
    // createTimeline 객체 만들기
    // mutate 요청
    //TODO: elapsedTime이 1분 이하일 경우 추가하지 않도록 하기s
    const startHour = parseInt(form.startHour);
    const startDateTime = dayjs(calculateDate('2024-03-25', startHour))
      .hour(startHour)
      .minute(parseInt(form.startMinute));

    const endHour = parseInt(form.endHour);
    const endDateTime = dayjs(calculateDate('2024-03-25', endHour))
      .hour(endHour)
      .minute(parseInt(form.endHour));

    const CreateTimelineRequest = {
      todoIdx: form.todoIdx,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      elapsedTime: endDateTime.diff(startDateTime, 'second'),
      action: 'stop',
    };

    createTimelineMutation.mutate(CreateTimelineRequest);
  };

  const handleTodoPress = () => {
    // useQuery로 가져온 todo 모달로 보여주기
    // 그 다음 투두가 선택되면 form의 todoIdx, todoColor, todoTitle 바꿔주기
    // 근데 만약 작성된 투두가 없다면 투두가 없어요. "투두"탭으로 가서 투두를 작성해주세요라고 보여주기
  };
  return (
    <CustomModal visible={visible} setModalVisible={setModalVisible}>
      <View style={styles.container}>
        <Text style={styles.headerText}>시간기록 추가</Text>
        <Pressable onPress={handleTodoPress} style={styles.todo}>
          <View
            style={{
              backgroundColor: todos ? todos[0].color : '#696969',
              width: 25,
              height: 25,
              borderRadius: 25,
              marginRight: 8,
              marginLeft: 4,
            }}
          />
          <Text style={{fontSize: 16}}>
            {todos ? todos[0].title : '할일을 선택해주세요'}
          </Text>
          <View style={{flexGrow: 1}} />
          <Icon name="chevron-right" size={24} color={'#808080'} />
        </Pressable>
        <View style={styles.time}>
          <TextInput
            keyboardType="numeric"
            style={[styles.inputTime, styles.timeText]}
            value={form.startHour}
            onChangeText={(text: string) => handleChangeText('startHour', text)}
          />
          <Text style={styles.timeText}>:</Text>
          <TextInput
            keyboardType="numeric"
            style={[styles.inputTime, styles.timeText]}
            value={form.startMinute}
            onChangeText={(text: string) =>
              handleChangeText('startMinute', text)
            }
          />
          <Text style={[styles.timeText, styles.timeMid]}>ㅡ</Text>
          <TextInput
            keyboardType="numeric"
            style={[styles.inputTime, styles.timeText]}
            placeholder={form.endHour}
            value={form.endHour}
            onChangeText={(text: string) => handleChangeText('endHour', text)}
          />
          <Text style={styles.timeText}>:</Text>
          <TextInput
            keyboardType="numeric"
            style={[styles.inputTime, styles.timeText]}
            value={form.endMinute}
            onChangeText={(text: string) => handleChangeText('endMinute', text)}
          />
        </View>
        <Pressable onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>추가</Text>
        </Pressable>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  container: {alignItems: 'center', gap: 8, width: '100%'},

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
});
