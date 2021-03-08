import {SAVE_TASKS, COUNT_OF_TASK, PAGE_INDEX, MAX_PAGE_NUMBER, SET_CACHE_IMAGES} from '../actions/actionTypes'
const initialState = {answer_index: 0, page_index: 1, count_of_task:0, cache_images: [], tasks:[]};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TASKS:
      state.tasks = action.payload;
      return state;
    case COUNT_OF_TASK:
      state.count_of_task = action.payload;
      return state;
    case PAGE_INDEX:
      state.page_index = action.payload;
      return state;
    case MAX_PAGE_NUMBER:
      state.max_page_number = action.payload;
      return state;
    case SET_CACHE_IMAGES:
      state.cache_images = action.payload;
      return state;
    default:
      return state;
  }
}