import api from "@/pages/api/api";

const getReminders = () =>{
    return async (dispatch, getState) => {
        try {
            console.log("entro al get reminders");  
            const token = getState().login.token;
            dispatch({ type: 'IS_LOADING_REMINDERS', payload: true });
            await api
              .get("reminders/", {headers :{"Authorization":`Bearer ${token}`}})
              .then((res) => {
                dispatch({ type: "SAVE_REMINDERS", payload: res.data.reminders});
                console.log("response data:",res.data.reminders);
                dispatch({ type: "IS_LOADING_REMINDERS", payload: false });
                })
              .catch(function (error) {
                dispatch({ type: "IS_LOADING_REMINDERS", payload: false });
                dispatch({
                  type: "SAVE_ERROR",
                  payload: error.response.data.message,
                });
              });
          } catch (e) {
            dispatch({ type: "IS_LOADING_REMINDERS", payload: false });
            console.log(e)
          }
    }
}

export default {
    getReminders,
  };