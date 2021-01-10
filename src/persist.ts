import AsyncStorage from '@react-native-async-storage/async-storage';
interface Persist {
  storage: any;
  key: string;
}

export const persistConfig: Persist = {
  key: 'root',
  storage: AsyncStorage,
};
