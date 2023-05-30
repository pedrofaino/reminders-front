const initialState = {loading: false, reminders: [], currentReminder:null}
const reminderReducer = (state = initialState, action) => {
  switch(action.type){
      case "IS_LOADING_REMINDERS":
        return {
          ...state,
          loading: action.payload
        }
      case "SAVE_REMINDERS":
        return {
          ...state,
          reminders: action.payload,
        }
      case "SAVE_CURRENT_REMINDER":
        return {
          ...state,
          currentReminder: action.payload,
        }
      default: 
          return state
  }
}

export default reminderReducer;