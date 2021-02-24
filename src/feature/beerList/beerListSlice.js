import { createSlice } from "@reduxjs/toolkit";

export const beerListSlice = createSlice({
  name: "beerList",
  initialState: {
    beers: undefined,
    isLoading: false,
    hasErrors: false,
    filter: "",
  },
  reducers: {
    getBeersRequest: (state) => {
      state.beers = [];
      state.isLoading = true;
      state.filter = "";
    },
    getBeersSuccess: (state, {payload}) => {
      state.beers = payload.beers;
      state.isLoading = false;
      state.hasErrors = false;
      state.filter = payload.filter;
    },
    getBeersFailure: (state) => {
      state.isLoading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  getBeersRequest,
  getBeersSuccess,
  getBeersFailure,
} = beerListSlice.actions;

export function getBeers(filter) {
  return async (dispatch) => {
    dispatch(getBeersRequest());

    fetch(`https://api.punkapi.com/v2/beers?${filter??""}`)
      .then((resp) => {
        return resp.json();
      })
      .then((beers) => {
        dispatch(getBeersSuccess({beers, filter}));
      })
      .catch((error) => {
        dispatch(getBeersFailure());
      });
  };
}

export const beerListReducer = beerListSlice.reducer;
