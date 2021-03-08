import {
  SET_CURRENT_KEYBOARD,
} from '../actions/actionTypes';

const initialState = {};

export const utileReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENT_KEYBOARD:
      return setCurrentKeyboard(state, action.payload);
    default:
      return state;
  }
};

function setCurrentKeyboard(state, payload) {
  return {
    ...state,
    current_keyboard: payload,
  };
}

