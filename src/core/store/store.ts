import {createStore, action, createTypedHooks} from 'easy-peasy';
import {cartman} from '../themes/theme';
import StoreModel from './store.model';

export const store = createStore<StoreModel>({
  theme: cartman,
  updateTheme: action((state, payload) => {
    state.theme = payload;
  }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
// export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
