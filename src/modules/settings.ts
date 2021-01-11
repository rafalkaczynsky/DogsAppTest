import produce from 'immer';

export enum SettingsTypeKeys {
  INCREASE_FONT_SIZE = 'settings/INCREASE_FONT_SIZE',
  DECREASE_FONT_SIZE = 'settings/DECREASE_FONT_SIZE',
}

export interface State {
    fontSize: number;
}

export const SettingsInitialState = {
  fontSize: 18,
};

export interface IncreaseFontSizeAction {
  type: SettingsTypeKeys.INCREASE_FONT_SIZE;
}

export interface DecreaseFontSizeAction {
  type: SettingsTypeKeys.DECREASE_FONT_SIZE;
}

export type SettingsActionTypes =
  | IncreaseFontSizeAction
  | DecreaseFontSizeAction;

export default function (
  state: State = SettingsInitialState,
  action: SettingsActionTypes,
): State {
  return produce(state, (draft) => {
    switch (action.type) {
      case SettingsTypeKeys.INCREASE_FONT_SIZE:
        draft.fontSize =
          draft.fontSize < 22 ? draft.fontSize + 2 : draft.fontSize;
        return draft;
      case SettingsTypeKeys.DECREASE_FONT_SIZE:
        draft.fontSize =
          draft.fontSize > 12 ? draft.fontSize - 2 : draft.fontSize;
        return draft;
    }
  });
}

export const increaseFontSize = () => (dispatch: any) => {
  dispatch({type: SettingsTypeKeys.INCREASE_FONT_SIZE});
};

export const decreaseFontSize = () => (dispatch: any) => {
  dispatch({type: SettingsTypeKeys.DECREASE_FONT_SIZE});
};
