import { createSlice, PayloadAction } from '@reduxjs/toolkit';


let initialState = {
  isLoading: false,
  isLoggedIn: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    loginRequest(state, action: PayloadAction<any>) {
      state.isLoading = true
      console.log('action', {action}, authSlice.actions.loginRequest.toString());
    },
  },
});


// export const loginRequest = (
//   org: string,
//   repo: string
// ): AppThunk => async dispatch => {
//   try {
//     const repoDetails = await getRepoDetails(org, repo)
//     dispatch(getRepoDetailsSuccess(repoDetails))
//   } catch (err) {
//     dispatch(getRepoDetailsFailed(err.toString()))
//   }
// }



export const { setLoggedIn, loginRequest } = authSlice.actions;


export default authSlice.reducer;
