import {combineReducers} from 'redux';
import login from './login';
import reminder from './reminders';

const rootReducer = combineReducers({
  login,
  reminder,
})

export default rootReducer;