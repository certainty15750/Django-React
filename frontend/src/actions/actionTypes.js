export const SET_TASK_TYPE = 'set_task_type';
export const SET_ELEMENT_CATEGORY = 'set_element_category';
export const CLICK_GO_BUTTON = 'click_go_button';
export const SAVE_TASKS = 'save_tasks';
export const COUNT_OF_TASK = 'count_of_task';
export const PAGE_INDEX = 'page_index';
export const MAX_PAGE_NUMBER = 'max_page_number';
export const SET_CACHE_IMAGES = 'set_cache_images';

// auth action types
export const AUTH_CHECK = 'AUTH_CHECK';
export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_RESET_PASSWORD = 'AUTH_RESET_PASSWORD';
export const AUTH_USER = 'AUTH_USER';

//center position
export const CENTER_POSITION = 'CENTER_POSITION';
export const OPEN_NOTIFICATION = 'OPEN_NOTIFICATION';

export const SET_CURRENT_KEYBOARD = 'SET_CURRENT_KEYBOARD';



export function authCheck() {
  return {
    type: AUTH_CHECK,
  }
}

export function authLogin(payload) {
  return {
    type: AUTH_LOGIN,
    payload,
  };
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT,
  }
}

export function authResetPassword() {
  return {
    type: AUTH_RESET_PASSWORD,
  }
}

export function authUser(payload) {
  return {
    type: AUTH_USER,
    payload
  }
}

export function setCenterPosition(payload) {
  return {
    type: CENTER_POSITION,
    payload
  }
}

export function openNotification(payload) {
  return {
    type: OPEN_NOTIFICATION,
    payload
  }
}

export function setCurrentKeyboard(payload) {
  return {
    type: SET_CURRENT_KEYBOARD,
    payload
  }
}

