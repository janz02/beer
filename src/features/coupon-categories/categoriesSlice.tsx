import { createSlice } from '@reduxjs/toolkit';

const TEMP_DATA: CouponCategoryData[] = [
  {
    id: 'kdflksd',
    name: 'fsdfé',
  },
  {
    id: 'kdflksdwqe',
    name: 'fsdfé ewq',
  },
  {
    id: 'kdflksdf',
    name: 'fsdfé',
  },
  {
    id: 'kdflkfdsdwqe',
    name: 'fsdfé fds ewq',
  },
  {
    id: 'kddfflfksd',
    name: 'fsdfé',
  },
  {
    id: 'kdflksdwqe',
    name: 'fsdfé ewq sfd',
  },
  {
    id: 'kdfldfffksd',
    name: 'fsdfé sd',
  },
  {
    id: 'kdffflksdwqe',
    name: 'fsdféd dsf ewq',
  },
];

export interface CouponCategoryData {
  id: string;
  name: string;
}

interface CouponCategoriesState {
  categories: CouponCategoryData[];
  loading: boolean;
  error: string;
}

const initialState: CouponCategoriesState = {
  categories: [
    ...TEMP_DATA,
    ...TEMP_DATA,
    ...TEMP_DATA,
    ...TEMP_DATA,
    ...TEMP_DATA,
    ...TEMP_DATA,
    ...TEMP_DATA,
    ...TEMP_DATA,
    ...TEMP_DATA,
    ...TEMP_DATA,
    ...TEMP_DATA,
    ...TEMP_DATA,
  ].map((d, i) => ({ ...d, name: `${i}\t - ${d.name}` })),
  loading: false,
  error: '',
};

const couponCategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
});

export const {} = couponCategoriesSlice.actions;

export default couponCategoriesSlice.reducer;
