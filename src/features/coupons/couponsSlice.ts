import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import api from 'api';
import { Category } from 'models/category';

type couponsState = {
  categories?: Category[];
  error: string | null;
  loading: boolean;
};

const initialState: couponsState = {
  error: null,
  loading: false,
};

const couponsSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    listCategoriesSuccess(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;

      state.loading = false;
      state.error = null;
    },
    setLoadingStart(state) {
      state.loading = true;
    },
    setLoadingFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  listCategoriesSuccess,
  setLoadingStart,
  setLoadingFailed,
} = couponsSlice.actions;

export default couponsSlice.reducer;

export const listCategories = (): AppThunk => async (dispatch) => {
  dispatch(setLoadingStart());

  try {
    const categories = await api.categories.listCategories({});
    dispatch(
      listCategoriesSuccess(
        categories.result!.map((x) => ({ id: x.id, name: x.name } as Category)),
      ),
    );
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()));
  }
};
