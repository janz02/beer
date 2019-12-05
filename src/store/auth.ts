import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: true,
  },
  reducers: {
    setLoggedIn(state, action) {
      state.loggedIn = action.payload.loggedIn;
    },
  },
});

export const { setLoggedIn } = authSlice.actions;

export default authSlice.reducer;
