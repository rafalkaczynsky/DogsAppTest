import { State as DogsState } from './dogs';
import { State as Settings } from './settings';

export interface RootState {
  dogs: DogsState;
  settings: Settings;
}