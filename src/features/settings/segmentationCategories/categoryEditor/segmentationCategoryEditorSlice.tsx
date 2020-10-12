import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { SegmentationCategory } from 'models/campaign/segmentationCategory'
import { api } from 'api'
import { GetCategoryRequest } from 'api/swagger/coupon'
import { segmentationCategoryListActions } from '../categoryList/segmentationCategoryListSlice'
import { message } from 'antd'
import i18n from 'app/i18n'
import { FeatureState } from 'models/featureState'

interface CouponCategoryEditorState {
  id?: number
  category?: SegmentationCategory | null
  editorState: FeatureState
}

const initialState: CouponCategoryEditorState = {
  editorState: FeatureState.Initial
}

const categoryEditorSlice = createSlice({
  name: 'segmentationCategoryEditor',
  initialState,
  reducers: {
    resetCategoryEditor: () => initialState,
    setEditorState: (state, action: PayloadAction<FeatureState>) => {
      state.editorState = action.payload
    },
    getCategorySuccess(state, action: PayloadAction<SegmentationCategory>) {
      state.category = action.payload
      state.editorState = FeatureState.Success
    },
    saveCategorySuccess(state, action: PayloadAction<SegmentationCategory>) {
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
    const response = await api.campaignEditor.segmentationCategories.getSegmentationCategory(params)
    dispatch(getCategorySuccess(response as SegmentationCategory))
  } catch (err) {
    dispatch(setEditorState(FeatureState.Error))
  }
}

const saveCategory = (category: SegmentationCategory): AppThunk => async dispatch => {
  dispatch(setEditorState(FeatureState.Loading))

  let id = category?.id
  try {
    if (id && !isNaN(id)) {
      await api.campaignEditor.segmentationCategories.updateSegmentationCategory({
        id,
        updateSegmentationCategoryCommand: { id, name: category.name }
      })
    } else {
      id = await api.campaignEditor.segmentationCategories.createSegmentationCategory({
        createSegmentationCategoryCommand: { name: category.name }
      })
    }

    dispatch(saveCategorySuccess({ ...category, id }))
    dispatch(segmentationCategoryListActions.getCategories())
    return true
  } catch (err) {
    dispatch(setEditorState(FeatureState.Error))
    return false
  }
}

export const segmentationCategoryEditorActions = {
  resetCategoryEditor,
  getCategory,
  saveCategory
}

export const segmentationCategoryEditorReducer = categoryEditorSlice.reducer
