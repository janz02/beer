import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { Category } from 'models/category';
import api from 'api';
import { ListCategoriesRequest } from 'api/swagger';

interface Pagination {
  page: number;
  from: number;
  to: number;
  size: number;
  pageSize: number;
}

interface CouponCategoryListState {
  categories: Category[];
  pagination?: Pagination;
  loading: boolean;
  error: string;
}

const initialState: CouponCategoryListState = {
  categories: [],
  loading: false,
  error: '',
};

const couponCategoryListSlice = createSlice({
  name: 'category-list',
  initialState,
  reducers: {
    getCategoriesRequest(state) {
      state.loading = true;
    },
    getCategoriesSuccess(
      state,
      action: PayloadAction<{ categories: Category[]; pagination: Pagination }>
    ) {
      state.categories = action.payload.categories;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = '';
    },
    getCategoriesFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFail,
} = couponCategoryListSlice.actions;

export default couponCategoryListSlice.reducer;

export const getCategories = (
  params: ListCategoriesRequest = {}
): AppThunk => async (dispatch, getState) => {
  dispatch(getCategoriesRequest());
  try {
    const pageSize =
      params.pageSize ?? getState().categoryList.pagination?.pageSize! ?? 10;

    const response = await api.categories.listCategories({
      pageSize,
      ...params,
    });

    dispatch(
      getCategoriesSuccess({
        categories: response.result as Category[],
        pagination: {
          page: response.page!,
          from: response.from!,
          size: response.size!,
          to: response.to!,
          pageSize,
        },
      })
    );
  } catch (err) {
    dispatch(getCategoriesFail(err.toString()));
  }
};
