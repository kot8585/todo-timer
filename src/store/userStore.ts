import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {create} from 'zustand';

interface UserStoreType {
  user: FirebaseAuthTypes.User | null;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStoreType>(set => ({
  user: null,
  setUser: user => set({user}),

  clearUser: () => set({user: null}),
}));

export default useUserStore;
