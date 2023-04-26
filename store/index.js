import rootReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';
import reminderReducer from './reducers/reminders';
import loginReducer from './reducers/login';

const store = configureStore({
    reducer:rootReducer,
    reminders:reminderReducer,
    login:loginReducer
});


export default store;