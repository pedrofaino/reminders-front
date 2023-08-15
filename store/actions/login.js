import api from "@/pages/api/api";
import allActions from ".";
import { Diplomata } from "next/font/google";

const register = (email,password,rePassword) =>{
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "LOADING_LOGIN", payload: true });
      await api
        .post("auth/register", {
          email: email,
          password: password,
          repassword: rePassword,
        })
        .then((res) => {
          dispatch(allActions.loginActions.setTime());
          dispatch({ type: "SAVE_EMAIL", payload: email})
          dispatch({ type: "SAVE_TOKEN", payload: res.data.token });
          dispatch({ type: "SAVE_EXPIRESIN", payload: res.data.expiresIn });
          dispatch({ type: "LOADING_LOGIN", payload: false });
        })
        .catch(function (error) {
          dispatch({ type: "LOADING_LOGIN", payload: false });
          dispatch({
            type: "SAVE_ERROR",
            payload: error.response.data.message,
          });
        });
    } catch (e) {
      dispatch({ type: "LOADING_LOGIN", payload: false });
    }
  };
}

const login = (email, password) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "LOADING_LOGIN", payload: true });
      await api
        .post("auth/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          dispatch(allActions.loginActions.setTime());
          dispatch({ type: "SAVE_EMAIL", payload: email})
          dispatch({ type: "SAVE_TOKEN", payload: res.data.token });
          dispatch({ type: "SAVE_EXPIRESIN", payload: res.data.expiresIn });
          dispatch({ type: "LOADING_LOGIN", payload: false });
        })
        .catch(function (error) {
          dispatch({ type: "LOADING_LOGIN", payload: false });
          dispatch({ type: "SAVE_ERROR", payload: error.response.data.error });
        });
    } catch (e) {
      dispatch({ type: "LOADING_LOGIN", payload: false });
    }
  };
};

const confirmation = (email) =>{
  return async (dispatch, getState) =>{
    try {
      dispatch({ type: "LOADING_LOGIN", payload: true });
      await api
        .post("auth/confirmation",{
          email: email,
        })
        .then((res)=>{
          dispatch({ type: "SAVE_TOKEN", payload: res.data.token });
          dispatch({ type: "SAVE_EXPIRESIN", payload: res.data.expiresIn });
          dispatch({ type: "LOADING_LOGIN", payload: false });
        })
        .catch(function (error) {
          dispatch({ type: "LOADING_LOGIN", payload: false });
          dispatch({
            type: "SAVE_ERROR",
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      console.log(error)
      dispatch({ type: "LOADING_LOGIN", payload: false });
    }
  }
}

const setTime = () => {
  return async (dispatch, getState) => {
    try {
      const expiresIn = getState().login.expiresIn;
      setTimeout(() => {
        dispatch(allActions.loginActions.refreshToken());
      }, expiresIn * 1000 - 6000);
    } catch (e) {
      console.log(e);
    }
  };
};

const refreshToken = () => {
  return async (dispatch) => {
    try {
      await api
        .get("auth/refresh")
        .then((res) => {
          dispatch({type:"SAVE_EMAIL",payload:res.data.email})
          dispatch({ type: "LOADING_LOGIN", payload: true });
          setTime();
          dispatch({ type: "SAVE_TOKEN", payload: res.data.token });
          dispatch({ type: "SAVE_EXPIRESIN", payload: res.data.expiresIn });
        })
        .catch(function (e) {
          dispatch({ type: "LOADING_LOGIN", payload: false });
          dispatch({
            type: "SAVE_ERROR",
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      dispatch({ type: "LOADING_LOGIN", payload: false });
    }
  };
};

const logout = () => {
  return async (dispatch) => {
    try {
      await api.get("auth/logout").then((res) => {
        dispatch({ type: "LOADING_LOGIN", payload: true });
        dispatch({ type: "DELETE_TOKEN", payload: null });
        dispatch({
          type: "SAVE_ERROR",
          payload: error.response.data.message,
        });
      });
    } catch (error) {
      dispatch({ type: "LOADING_LOGIN", payload: false });
    }
  };
};

const showProfileModal = (state) =>{
  return async (dispatch,getState) =>{
    dispatch({type:"SHOW_PROFILE_MODAL", payload:state});
  }
}



export default {
  register,
  login,
  refreshToken,
  setTime,
  logout,
  confirmation,
  showProfileModal
};
