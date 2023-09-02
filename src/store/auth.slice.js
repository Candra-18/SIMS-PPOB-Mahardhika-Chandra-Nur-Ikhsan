import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { alertActions } from "store";
import { history, fetchWrapper } from "services";
import axios from "axios";

const name = "auth";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const slice = createSlice({ name, initialState, reducers });

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

function createInitialState() {
  return {
    value: JSON.parse(localStorage.getItem("auth")),
  };
}

function createReducers() {
  return {
    setAuth,
  };

  function setAuth(state, action) {
    state.value = action.payload;
  }
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}`;

  return {
    login: login(),
    logOut: logOut(),
    register: register(),
  };

  function login() {
    return createAsyncThunk(`${name}/login`, async function ({ username, password }, { dispatch }) {
      console.log(username);
      console.log(password);
      dispatch(alertActions.clear());
      try {
        console.log(baseUrl, "Coba ini");
        const user = await axios.post(`${baseUrl}/login`, { email: username, password });
        console.log("masukk");
        console.log(user);
        dispatch(authActions.setAuth(user.data.data));
        console.log("ini dataku", user.data.data.token);
        localStorage.setItem("tokenjwt", JSON.stringify(user.data.data.token));
        const { from } = history.location.state || { from: { pathname: "/" } };
        history.navigate(from);
      } catch (error) {
        console.log(error.response.data);
        dispatch(alertActions.error(error.response.data));
      }
    });
  }

  function logOut() {
    return createAsyncThunk(`${name}/logout`, function (arg, { dispatch }) {
      dispatch(authActions.setAuth(null));
      localStorage.removeItem("tokenjwt");
      history.navigate("/login");
    });
  }

  function register() {
    return createAsyncThunk(`${name}/registration`, async function ({ email, fName, lName, password, Cpassword }, { dispatch }) {
      if (password != Cpassword) {
        dispatch(alertActions.error("Password tidak sama"));
      }
      dispatch(alertActions.clear());
      try {
        console.log(baseUrl, "Coba ini");
        const user = await axios.post(`${baseUrl}/registration`, { email, first_name: fName, last_name: lName, password });
        console.log("masukk");
        console.log(user);
        dispatch(alertActions.error("Sukses Registrasi"));
      } catch (error) {
        console.log(error.response.data);
        dispatch(alertActions.error(error.response.data));
      }
    });
  }
}
