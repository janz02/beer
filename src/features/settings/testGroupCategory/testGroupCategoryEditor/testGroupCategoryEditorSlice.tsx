import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { message } from 'antd'
import i18n from 'app/i18n'
import { FeatureState } from 'models/featureState'
import { TestGroupCategory } from 'models/campaign/testGroupCategory'
import { testGroupCategoryListActions } from '../testGroupCategoryList/testGroupCategoryListSlice'
import { GetTestGroupCategoryRequest } from 'api/swagger/campaign-editor'

interface TestGroupCategoryEditorState {
  id?: number
  category?: TestGroupCategory | null
  editorState: FeatureState
}

const initialState: TestGroupCategoryEditorState = {
  editorState: FeatureState.Initial
}

const testGroupCategoryEditorSlice = createSlice({
  name: 'testGroupCategoryEditor',
  initialState,
  reducers: {
    resetCategoryEditor: () => initialState,
    setEditorState: (state, action: PayloadAction<FeatureState>) => {
      state.editorState = action.payload
    },
    getCategorySuccess(state, action: PayloadAction<TestGroupCategory>) {
      state.category = action.payload
      state.editorState = FeatureState.Success
    },
    saveCategorySuccess(state, action: PayloadAction<TestGroupCategory>) {
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
} = testGroupCategoryEditorSlice.actions

const { resetCategoryEditor } = testGroupCategoryEditorSlice.actions

const getCategory = (params: GetTestGroupCategoryRequest): AppThunk => async dispatch => {
  dispatch(setEditorState(FeatureState.Loading))
  try {
    const response = await api.campaignEditor.testGroupCategories.getTestGroupCategory(params)
    dispatch(getCategorySuccess(response as TestGroupCategory))
  } catch (err) {
    dispatch(setEditorState(FeatureState.Error))
  }
}

const saveCategory = (category: TestGroupCategory): AppThunk => async dispatch => {
  dispatch(setEditorState(FeatureState.Loading))

  let id = category?.id
  try {
    if (id && !isNaN(id)) {
      await api.campaignEditor.testGroupCategories.updateTestGroupCategory({
        id,
        nKMRTDCampaignEditorApplicationTestGroupCategoriesCommandsUpdateTestGroupCategoryUpdateTestGroupCategoryCommand: {
          id,
          name: category.name
        }
      })
    } else {
      const newId = await api.campaignEditor.testGroupCategories.createTestGroupCategory({
        nKMRTDCampaignEditorApplicationTestGroupCategoriesCommandsCreateTestGroupCategoryCreateTestGroupCategoryCommand: {
          name: category.name
        }
      })
      id = newId
    }
    dispatch(saveCategorySuccess({ ...category, id }))
    dispatch(testGroupCategoryListActions.getCategories())
    return true
  } catch (err) {
    dispatch(setEditorState(FeatureState.Error))
    return false
  }
}

export const testGroupCategoryEditorActions = {
  resetCategoryEditor,
  getCategory,
  saveCategory
}

export const testGroupCategoryEditorReducer = testGroupCategoryEditorSlice.reducer
