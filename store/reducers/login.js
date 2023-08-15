const initialState = {loading: false, token: null, error:null, expiresIn:null, email:null, showModal:false}
const loginReducer = (state = initialState, action) => {
  switch(action.type){
      case "LOADING_LOGIN":
        return {
          ...state,
          loading: action.payload,
        };
      case "SAVE_TOKEN":
        return {
          ...state,
          token: action.payload
        };
      case "SAVE_EXPIRESIN":
        return{
          ...state,
          expiresIn:action.payload
        };
      case "SAVE_ERROR":
        return{
          ...state,
          error:action.payload
        };
      case "DELETE_TOKEN":
        return{
          ...state,
          token:null,
        };
      case "SAVE_EMAIL":
        return{
          ...state,
          email:action.payload
        };
      case "SHOW_PROFILE_MODAL":
        return{
          ...state,
          showModal:action.payload
        };
      default: 
          return state
  }
}

export default loginReducer