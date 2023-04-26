const initialState = {loading: false, reminders: []}
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
      default: 
          return state
  }
}

export default reminderReducer;