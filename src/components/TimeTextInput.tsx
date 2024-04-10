import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {Colors} from '../assets/color';
import dayjs from 'dayjs';

type TodoTimeline = {
  todoIdx?: string;
  todoColor: string;
  todoTitle: string;
  date: dayjs.Dayjs;
  startHour: string;
  startMinute: string;

  endHour: string;
  endMinute: string;
};

type TimeTextInputProps = {
  form: TodoTimeline;
  setForm: Dispatch<SetStateAction<TodoTimeline>>;
};

export default function TimeTextInput({form, setForm}: TimeTextInputProps) {
  const handleChangeText = (name: string, value: string) => {
    setForm({...form, [name]: value});
  };

  return (
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
  );
}

const styles = StyleSheet.create({
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
    padding: 10,
  },

  button: {
    backgroundColor: '#808080',
    borderColor: Colors.light.borderDefault,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
