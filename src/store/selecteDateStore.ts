import dayjs from 'dayjs';
import {create} from 'zustand';

interface SelectedDateStoreType {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  setToday: (date: string) => void;
}

const useSelectedDateStore = create<SelectedDateStoreType>(set => ({
  selectedDate: dayjs().format('YYYY-MM-DD'),
  setSelectedDate: selectedDate => set({selectedDate}),
  setToday: () => set({selectedDate: dayjs().format('YYYY-MM-DD')}),
}));

export default useSelectedDateStore;
