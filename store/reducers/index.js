import {combineReducers} from 'redux';
import login from './login';
import reminder from './reminders';
import user from './user';

const rootReducer = combineReducers({
  login,
  reminder,
  user
})

export default rootReducer;