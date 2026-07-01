import { createMMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

export const storage = createMMKV({
  id: 'voice-vault',
});

export const mmkvZustandStorage: StateStorage = {
  setItem: (key, value) => storage.set(key, value),
  getItem: (key) => storage.getString(key) ?? null,
  removeItem: (key) => storage.remove(key),
};
