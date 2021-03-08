
import { getMe } from "../actions/ChildrenApi";
import {
  AUTH_CHECK,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_RESET_PASSWORD,
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case AUTH_LOGIN:
      return login(state, action.payload);
    case AUTH_CHECK:
      return checkAuth(state);
    case AUTH_LOGOUT:
      return logout(state);
    case AUTH_RESET_PASSWORD:
      return resetPassword(state);
    default:
      return state;
  }
}

function login(state, payload) {
  localStorage.setItem('access_token', payload);

  return {
    ...state, isAuthenticated: true,
  }
}

function checkAuth(state) {
  state = Object.assign({}, state, {
    isAuthenticated: !!localStorage.getItem('access_token')
  });
  if (state.isAuthenticated) {
    getMe().then((resp) => {
      return login(state, resp.token);
    }).catch((error) => {
      return logout(state);
    })
  }

  return state;
}

function logout(state) {
  localStorage.removeItem('access_token');

  return {
    ...state, isAuthenticated: false
  }
}

function resetPassword(state) {
  return {
    ...state, resetPassword: true,
  }
}


