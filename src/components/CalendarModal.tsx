import React, {useState} from 'react';
import {Calendar} from 'react-native-calendars';
import CustomModal from './CustomModal';
import useSelectedDateStore from '../store/selecteDateStore';

type CalendarModalProps = {
  visible: boolean;
  setModalVisible: (value: boolean) => void;
};

export default function CalendarModal({
  visible,
  setModalVisible,
}: CalendarModalProps) {
  const selectedDate = useSelectedDateStore(state => state.selectedDate);
  const setSelectedDate = useSelectedDateStore(state => state.setSelectedDate);
  return (
    <CustomModal visible={visible} setModalVisible={setModalVisible}>
      <Calendar
        onDayPress={day => {
          setSelectedDate(day.dateString);
          setModalVisible(false);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'orange',
          },
        }}
      />
    </CustomModal>
  );
}
