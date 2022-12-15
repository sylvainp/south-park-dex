import {Theme} from '../themes/theme';
import {Action} from 'easy-peasy';

export default interface StoreModel {
  theme: Theme;
  updateTheme: Action<StoreModel, Theme>;
}
