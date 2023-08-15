import api from "@/pages/api/api";
import allActions from ".";
import { all } from "axios";

const getReminders = (search) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().login.token;
      dispatch({ type: "IS_LOADING_REMINDERS", payload: true });
      await api
        .get(`reminders/search?query=${search}`, { headers: { Authorization: `Bearer ${token}` }})
        .then((res) => {
          dispatch({ type: "SAVE_REMINDERS", payload: res.data.reminders });
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
      console.log(e);
    }
  };
};

const getReminder = (id) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().login.token;
      dispatch({ type: "IS_LOADING_REMINDERS", payload: true });
      await api
        .get(`reminders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch({ type: "SAVE_CURRENT_REMINDER", payload: res.data });
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
      console.log(e);
    }
  };
};

const createReminder = (description, date, when, email, other, yesterday,week) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().login.token;
      dispatch({ type: "IS_LOADING_REMINDERS", payload: true });
      await api
        .post(
          "reminders/",
          {
            description: description,
            date: date,
            when: when,
            email:email,
            other:other,
            yesterday:yesterday,
            week:week,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          dispatch({ type: "IS_LOADING_REMINDERS", payload: false });
        })
        .catch((error) => {
          dispatch({ type: "IS_LOADING_REMINDERS", payload: false });
          dispatch({
            type: "SAVE_ERROR",
            payload: error.response.data.message,
          });
        });
    } catch (e) {
      dispatch({ type: "IS_LOADING_REMINDERS", payload: false });
      dispatch({
        type: "SAVE_ERROR",
        payload: error.response.data.message,
      });
    }
  };
};

const deleteReminder = (id) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().login.token;
      dispatch({ type: "IS_LOADING_REMINDERS", payload: true });
      await api
        .delete(`reminders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(allActions.remindersActions.getReminders(""))
          dispatch({ type: "IS_LOADING_REMINDERS", payload: false });
        })
        .catch((error) => {
          dispatch({ type: "IS_LOADING_REMINDERS", payload: false });
          dispatch({
            type: "SAVE_ERROR",
            payload: error.response.data.message,
          });
        });
    } catch (e) {
      dispatch({ type: "IS_LOADING_REMINDERS", payload: false });
      dispatch({
        type: "SAVE_ERROR",
        payload: error.response.data.message,
      });
    }
  };
};

const updateReminder = (id, description, date, when,other,email, yesterday, week) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().login.token;
      dispatch({ type: "IS_LOADING_REMINDERS", payload: true });
      const response = await api.patch(`reminders/${id}`, {
        description: description,
        date: date,
        when: when,
        other:other,
        email:email,
        yesterday:yesterday,
        week:week
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(allActions.remindersActions.getReminders())
      dispatch({ type: "IS_LOADING_REMINDERS", payload: false });
    } catch (e) {
      dispatch({ type: "IS_LOADING_REMINDERS", payload: false });
      dispatch({
        type: "SAVE_ERROR",
        payload: e.response.data.message,
      });
    }
  };
};

export default {
  getReminders,
  getReminder,
  createReminder,
  deleteReminder,
  updateReminder,
};
