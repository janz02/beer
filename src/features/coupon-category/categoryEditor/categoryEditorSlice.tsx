import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { Category } from 'models/category';
import api from 'api';
import { GetCategoriesRequest } from 'api/swagger';

interface CouponCategoryEditorState {
  id?: number;
  category?: Category | null;
  loading: boolean;
  error: string;
}

const initialState: CouponCategoryEditorState = {
  loading: false,
  error: '',
};

const couponCategoryEditorSlice = createSlice({
  name: '@category-editor',
  initialState,
  reducers: {
    getCategoryRequest(state) {
      state.loading = true;
    },
    getCategorySuccess(state, action: PayloadAction<Category>) {
      state.category = action.payload;
      state.loading = false;
      state.error = '';
    },
    getCategoryFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearEditor(state) {
      state.category = null;
    },
    saveCategoryRequest(state) {
      state.loading = true;
    },
    saveCategorySuccess(state, action: PayloadAction<Category>) {
      state.loading = false;
      state.error = '';
    },
    saveCategoryFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  clearEditor,
  getCategoryRequest,
  getCategorySuccess,
  getCategoryFail,
  saveCategoryRequest,
  saveCategorySuccess,
  saveCategoryFail,
} = couponCategoryEditorSlice.actions;

export default couponCategoryEditorSlice.reducer;

export const getCategory = (params: GetCategoriesRequest): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(getCategoryRequest());
  try {
    const response = await api.categories.getCategories(params);
    dispatch(getCategorySuccess(response as Category));
  } catch (err) {
    dispatch(getCategoryFail(err.toString()));
  }
};
