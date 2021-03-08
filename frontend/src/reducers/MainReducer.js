import { combineReducers } from 'redux'
import { authReducer } from './Auth';
import { filterReducer } from './FilterReducer'
import { taskReducer } from "./TaskReducer";
import { centerTaskReducer } from './CenterTaskReducer'
import { notificationReducer } from './NotificationReducer';
import { utileReducer } from './UtileReducer';


export default combineReducers({
  authReducer,
  filterReducer,
  taskReducer,
  centerTaskReducer,
  notificationReducer,
  utileReducer
});