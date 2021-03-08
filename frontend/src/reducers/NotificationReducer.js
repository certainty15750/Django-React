import {
  OPEN_NOTIFICATION,
} from '../actions/actionTypes';

const initialState = {
  notification_open: false,
  notification_message: '',
  notification_variant: 'success'
};

export const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case OPEN_NOTIFICATION:
      return openNotification(state, action.payload);
    default:
      return state;
  }
};

function openNotification(state, payload) {
  return {
    ...state,
    notification_open: payload.open,
    notification_message: payload.message,
    notification_variant: payload.variant
  };
}

