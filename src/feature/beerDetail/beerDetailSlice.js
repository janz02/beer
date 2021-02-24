import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  beer: {},
  isLoading: false,
  hasErrors: false,
};

export const beerDetailSlice = createSlice({
  name: "beerDetail",
  initialState,
  reducers: {
    reset: () => initialState,
    getBeerRequest: (state) => {
      state.beerLoading = true;
    },
    getBeerSuccess: (state, { payload }) => {
      Object.assign(state.beer, payload);
      state.isLoading = false;
      state.hasErrors = false;
    },
    getBeerFailure: (state) => {
      state.isLoading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  reset,
  getBeerRequest,
  getBeerSuccess,
  getBeerFailure,
} = beerDetailSlice.actions;

export const getBeer = (id) => {
  return async (dispatch) => {
    dispatch(getBeerRequest());

    fetch(`https://api.punkapi.com/v2/beers/${id}`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        const beer = data[0];
        dispatch(getBeerSuccess(beer));
      })
      .catch((error) => {
        dispatch(getBeerFailure());
      });
  };
};
export const resetBeer = reset;
export const beerDetailReducer = beerDetailSlice.reducer;
