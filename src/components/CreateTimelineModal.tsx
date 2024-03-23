import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import CustomModal from './CustomModal';
import {Colors} from '../assets/color';
import useTodo from '../hooks/useTodos';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextButton from './TextButton';

type CreateTimelineModalProps = {
  visible: boolean;
  setModalVisible: (value: boolean) => void;
};

// TODO: 디자인이 뭔가 이상....
export default function CreateTimelineModal({
  visible,
  setModalVisible,
}: CreateTimelineModalProps) {
  // 이거 모달을 보여줄때만 필요한거라  모달 안보여주면 가져올 필요없는데
  const {
    getAllTodos: {data: todos},
  } = useTodo();
  return (
    <CustomModal visible={visible} setModalVisible={setModalVisible}>
      <View style={styles.container}>
        <Text style={styles.headerText}>시간기록 추가</Text>
        <View style={styles.todo}>
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
        </View>
        <View style={styles.time}>
          <TextInput
            keyboardType="numeric"
            style={[styles.inputTime, styles.timeText]}
            value={'05'}
          />
          <Text style={styles.timeText}>:</Text>
          <TextInput
            keyboardType="numeric"
            style={[styles.inputTime, styles.timeText]}
            value={'05'}
          />
          <Text style={[styles.timeText, styles.timeMid]}>ㅡ</Text>
          <TextInput
            keyboardType="numeric"
            style={[styles.inputTime, styles.timeText]}
            value={'05'}
          />
          <Text style={styles.timeText}>:</Text>
          <TextInput
            keyboardType="numeric"
            style={[styles.inputTime, styles.timeText]}
            value={'05'}
          />
        </View>
        <Pressable
          onPress={() => {
            console.log('타임라인 추가');
          }}
          style={styles.button}>
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
