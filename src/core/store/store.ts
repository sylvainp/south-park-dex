import {createStore, action, createTypedHooks, persist} from 'easy-peasy';
import {cartman} from '../themes/theme';
import StoreModel from './store.model';
import AsyncStorage from '@react-native-async-storage/async-storage';

// @ts-ignore
window.requestIdleCallback = null;
export const store = createStore<StoreModel>(
  persist(
    {
      theme: cartman,
      updateTheme: action((state, payload) => {
        state.theme = payload;
      }),
    },
    {
      allow: ['theme'],
      storage: {
        async getItem(key) {
          const value: string | null = await AsyncStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem(key, data) {
          AsyncStorage.setItem(key, JSON.stringify(data));
        },

        removeItem(key) {
          console.log('removeItem', {key});
          AsyncStorage.removeItem(key);
        },
      },
    },
  ),
);

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
// export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
