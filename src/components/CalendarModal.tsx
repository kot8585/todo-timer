import dayjs from 'dayjs';
import React from 'react';
import {Calendar} from 'react-native-calendars';
import useSelectedDateStore from '../store/selecteDateStore';
import CustomModal from './CustomModal';

type CalendarModalProps = {
  visible: boolean;
  setModalVisible: (value: boolean) => void;
};

export default function CalendarModal({
  visible,
  setModalVisible,
}: CalendarModalProps) {
  const selectedDate = useSelectedDateStore(state => state.selectedDate).format(
    'YYYY-MM-DD',
  );

  const setDate = useSelectedDateStore(state => state.setSelectedDate);
  const setSelectedDate = (dateString: string) => {
    console.log(`setSelectedDate : ${dateString}`);
    const formatDate = dayjs(dateString).set('hour', 5);
    setDate(formatDate);
  };

  return (
    <CustomModal
      visible={visible}
      setModalVisible={setModalVisible}
      position={'middle'}>
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
        monthFormat={'yyyy.MM'}
      />
    </CustomModal>
  );
}
