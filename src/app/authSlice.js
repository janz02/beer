import { createSlice } from "@reduxjs/toolkit";
import { resetBeers } from "../feature/beerList/beerListSlice";
import { resetBeer } from "../feature/beerDetail/beerDetailSlice";
import { history } from "../App";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: "",
    isLoading: false,
    hasErrors: false,
  },
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.hasErrors = false;
    },
    loginSuccess: (state, { payload }) => {
      state.username = payload;
      state.isLoading = false;
      state.hasErrors = false;
    },
    loginFailure: (state) => {
      state.isLoading = false;
      state.hasErrors = true;
    },
    logoutRequest: (state) => {
      state.username = "";
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
} = authSlice.actions;

export const login = (username) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    fetch(`https://yesno.wtf/api`)
      .then((resp) => {
        return resp.json();
      })

      .then((data) => {
        if (data.answer === "yes") {
          dispatch(loginSuccess(username));
          history.push("/beers");
        } else {
          dispatch(loginFailure());
        }
      })

      .catch((error) => {
        dispatch(loginFailure());
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(resetBeer());
    dispatch(resetBeers());
    dispatch(logoutRequest());
    history.push("/login");
  };
};

export const authReducer = authSlice.reducer;
