import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  beers: undefined,
  isLoading: false,
  hasErrors: false,
};

export const beerListSlice = createSlice({
  name: "beerList",
  initialState,
  reducers: {
    reset: () => initialState,
    getBeersRequest: (state) => {
      state.beers = [];
      state.isLoading = true;
    },
    getBeersSuccess: (state, { payload }) => {
      state.beers = payload.beers;
      state.isLoading = false;
      state.hasErrors = false;
    },
    getBeersFailure: (state) => {
      state.isLoading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  reset,
  getBeersRequest,
  getBeersSuccess,
  getBeersFailure,
} = beerListSlice.actions;

export const getBeers = (filter) => {
  return async (dispatch) => {
    dispatch(getBeersRequest());

    fetch(`https://api.punkapi.com/v2/beers?${filter ?? ""}`)
      .then((resp) => {
        return resp.json();
      })
      .then((beers) => {
        dispatch(getBeersSuccess({ beers }));
      })
      .catch((error) => {
        dispatch(getBeersFailure());
      });
  };
};

export const resetBeers = reset;

export const beerListReducer = beerListSlice.reducer;
