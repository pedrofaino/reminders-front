const initialState = { loading: false, currentUser: null };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_LOADING_USER":
      return {
        ...state,
        loading: action.payload,
      };
    case "SAVE_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SAVE_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "SAVE_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
