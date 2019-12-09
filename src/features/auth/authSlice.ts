import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  loggedIn: boolean;
};

let initialState: AuthState = {
  loggedIn: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.loggedIn = action.payload;
    },
  },
});

export const { setLoggedIn } = authSlice.actions;

export default authSlice.reducer;
