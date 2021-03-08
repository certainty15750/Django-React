import {
  CENTER_POSITION,
} from '../actions/actionTypes';

const initialState = {
  centerPosition_x: 315,
  centerPosition_y: 215
};

export const centerTaskReducer = (state = initialState, action) => {
  switch(action.type) {
    case CENTER_POSITION:
      return setPosition(state, action.payload);
    default:
      return state;
  }
};

function setPosition(state, payload) {
  return {
    ...state,
    centerPosition_x: payload.x,
    centerPosition_y: payload.y
  };
}

