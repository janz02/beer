import { configureStore } from "@reduxjs/toolkit";
import { beerListReducer } from "../feature/beerList/beerListSlice";
import { beerDetailReducer } from "../feature/beerDetail/beerDetailSlice";
import { authReducer } from "../app/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    beerList: beerListReducer,
    beerDetail: beerDetailReducer,
  },
});
