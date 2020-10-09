import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { CampaignCategory } from 'models/campaign/campaignCategory'
import { api } from 'api'
import { GetCategoryRequest } from 'api/swagger/coupon'
import { campaignCategoryListActions } from '../categoryList/campaignCategoryListSlice'
import { message } from 'antd'
import i18n from 'app/i18n'
import { FeatureState } from 'models/featureState'

interface CouponCategoryEditorState {
  id?: number
  category?: CampaignCategory | null
  editorState: FeatureState
}

const initialState: CouponCategoryEditorState = {
  editorState: FeatureState.Initial
}

const categoryEditorSlice = createSlice({
  name: 'campaignCategoryEditor',
  initialState,
  reducers: {
    resetCategoryEditor: () => initialState,
    setEditorState: (state, action: PayloadAction<FeatureState>) => {
      state.editorState = action.payload
    },
    getCategorySuccess(state, action: PayloadAction<CampaignCategory>) {
      state.category = action.payload
      state.editorState = FeatureState.Success
    },
    saveCategorySuccess(state, action: PayloadAction<CampaignCategory>) {
      message.success(i18n.t('common.message.save-success'), 5)
      state.category = action.payload
      state.editorState = FeatureState.Success
    }
  }
})

const { setEditorState, getCategorySuccess, saveCategorySuccess } = categoryEditorSlice.actions

const { resetCategoryEditor } = categoryEditorSlice.actions

const getCategory = (params: GetCategoryRequest): AppThunk => async dispatch => {
  dispatch(setEditorState(FeatureState.Loading))
  try {
    const response = await api.coupon.categories.getCategory(params)
    dispatch(getCategorySuccess(response as CampaignCategory))
  } catch (err) {
    dispatch(setEditorState(FeatureState.Error))
  }
}

const saveCategory = (category: CampaignCategory): AppThunk => async dispatch => {
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
    dispatch(campaignCategoryListActions.getCategories())
    return true
  } catch (err) {
    dispatch(setEditorState(FeatureState.Error))
    return false
  }
}

export const campaignCategoryEditorActions = {
  resetCategoryEditor,
  getCategory,
  saveCategory
}

export const campaignCategoryEditorReducer = categoryEditorSlice.reducer
