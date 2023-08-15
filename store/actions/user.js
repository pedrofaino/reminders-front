import api from "@/pages/api/api";
import allActions from ".";
import { all } from "axios";

const getUser = (email) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().login.token;
      dispatch({ type: "LOADING_USER", payload: true });
      await api
        .get(`user/info/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch({ type: "SAVE_CURRENT_USER", payload: res.data });
          dispatch({ type: "LOADING_USER", payload: false });
        })
        .catch(function (e) {
          dispatch({ type: "LOADING_USER", payload: false });
          dispatch({
            type: "SAVE_ERROR",
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOADING_USER", payload: false });
    }
  };
};

const updateUser = (id, name, lastName, email) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().login.token;
      dispatch({ type: "LOADING_USER", payload: true });
      await api.patch(
        `user/user/${id}`,
        {
          name: name,
          lastName: lastName,
          email: email,
        },
        { headers: { Authorization: `Bearer ${token}` } })
        .then((res)=>{
          dispatch({ type: "SAVE_CURRENT_USER", payload: res.data });
          dispatch({ type: "LOADING_USER", payload: false });
        })
        .catch(function (e) {
          dispatch({
            type: "SAVE_ERROR",
            payload: error.response.data.message,
          });          
          dispatch({ type: "LOADING_USER", payload: false });
        });
    } catch (error) {
      console.log(error)
      dispatch({ type: "LOADING_USER", payload: false });
    }
  };
};

export default {
  getUser,
  updateUser
};
