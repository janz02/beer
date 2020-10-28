import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { CouponCampaignCategory } from 'models/couponCampaignCategory'
import { api } from 'api'
import { GetCategoryRequest } from 'api/swagger/coupon'
import { couponCampaignCategoryListActions } from '../categoryList/couponCampaignCategoryListSlice'
import { message } from 'antd'
import i18n from 'app/i18n'
import { FeatureState } from 'models/featureState'

interface CouponCampaignCategoryEditorState {
  id?: number
  category?: CouponCampaignCategory | null
  editorState: FeatureState
}

const initialState: CouponCampaignCategoryEditorState = {
  editorState: FeatureState.Initial
}

const couponCampaignCategoryEditorSlice = createSlice({
  name: 'couponCampaignCategoryEditor',
  initialState,
  reducers: {
    resetCategoryEditor: () => initialState,
    setEditorState: (state, action: PayloadAction<FeatureState>) => {
      state.editorState = action.payload
    },
    getCategorySuccess(state, action: PayloadAction<CouponCampaignCategory>) {
      state.category = action.payload
      state.editorState = FeatureState.Success
    },
    saveCategorySuccess(state, action: PayloadAction<CouponCampaignCategory>) {
      message.success(i18n.t('common.message.save-success'), 5)
      state.category = action.payload
      state.editorState = FeatureState.Success
    }
  }
})

const {
  setEditorState,
  getCategorySuccess,
  saveCategorySuccess
} = couponCampaignCategoryEditorSlice.actions

const { resetCategoryEditor } = couponCampaignCategoryEditorSlice.actions

const getCategory = (params: GetCategoryRequest): AppThunk => async dispatch => {
  dispatch(setEditorState(FeatureState.Loading))
  try {
    const response = await api.coupon.categories.getCategory(params)
    dispatch(getCategorySuccess(response as CouponCampaignCategory))
  } catch (err) {
    dispatch(setEditorState(FeatureState.Error))
  }
}

const saveCategory = (category: CouponCampaignCategory): AppThunk => async dispatch => {
  dispatch(setEditorState(FeatureState.Loading))

  let id = category?.id
  try {
    if (id && !isNaN(id)) {
      await api.coupon.categories.updateCategory({
        id,
        categoryDto: {
          name: category.name
        }
      })
    } else {
      const { id: newId } = await api.coupon.categories.createCategory({
        categoryDto: {
          name: category.name
        }
      })
      id = newId
    }
    dispatch(saveCategorySuccess({ ...category, id }))
    dispatch(couponCampaignCategoryListActions.getCategories())
    return true
  } catch (err) {
    dispatch(setEditorState(FeatureState.Error))
    return false
  }
}

export const couponCampaignCategoryEditorActions = {
  resetCategoryEditor,
  getCategory,
  saveCategory
}

export const couponCampaignCategoryEditorReducer = couponCampaignCategoryEditorSlice.reducer
