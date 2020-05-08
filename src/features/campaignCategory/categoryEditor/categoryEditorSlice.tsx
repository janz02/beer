import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { Category } from 'models/category'
import { api } from 'api'
import { GetCategoryRequest } from 'api/swagger'
import { categoryListActions } from '../categoryList/categoryListSlice'
import { message } from 'antd'
import i18n from 'app/i18n'
import { FeatureState } from 'models/featureState'

interface CouponCategoryEditorState {
  id?: number
  category?: Category | null
  editorState: FeatureState
}

const initialState: CouponCategoryEditorState = {
  editorState: FeatureState.Initial
}

const categoryEditorSlice = createSlice({
  name: 'categoryEditor',
  initialState,
  reducers: {
    resetCategoryEditor: () => initialState,
    setEditorState: (state, action: PayloadAction<FeatureState>) => {
      state.editorState = action.payload
    },
    getCategorySuccess(state, action: PayloadAction<Category>) {
      state.category = action.payload
      state.editorState = FeatureState.Success
    },
    saveCategorySuccess(state, action: PayloadAction<Category>) {
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
    const response = await api.categories.getCategory(params)
    dispatch(getCategorySuccess(response as Category))
  } catch (err) {
    dispatch(setEditorState(FeatureState.Error))
  }
}

const saveCategory = (category: Category): AppThunk => async dispatch => {
  dispatch(setEditorState(FeatureState.Loading))

  let id = category?.id
  try {
    if (id && !isNaN(id)) {
      await api.categories.updateCategory({
        id,
        categoryDto: {
          name: category.name
        }
      })
    } else {
      const { id: newId } = await api.categories.createCategory({
        categoryDto: {
          name: category.name
        }
      })
      id = newId
    }
    dispatch(saveCategorySuccess({ ...category, id }))
    dispatch(categoryListActions.getCategories())
    return true
  } catch (err) {
    dispatch(setEditorState(FeatureState.Error))
    return false
  }
}

export const categoryEditorActions = {
  resetCategoryEditor,
  getCategory,
  saveCategory
}

export const categoryEditorReducer = categoryEditorSlice.reducer
