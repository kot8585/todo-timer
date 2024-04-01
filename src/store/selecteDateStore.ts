import dayjs from 'dayjs';
import {create} from 'zustand';
import {getToday} from '../utils/formatDateTime';

interface SelectedDateStoreType {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  setToday: (date: string) => void;
}

const useSelectedDateStore = create<SelectedDateStoreType>(set => ({
  selectedDate: getToday(),
  setSelectedDate: selectedDate => set({selectedDate}),
  setToday: () => set({selectedDate: getToday()}),
}));

export default useSelectedDateStore;
