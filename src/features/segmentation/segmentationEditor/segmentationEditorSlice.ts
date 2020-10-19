import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { CampaignSegmentation } from 'models/campaign/campaignSegmentation'
import { history } from 'router/router'
import i18n from 'app/i18n'
import { message } from 'antd'
import { api } from 'api'
import { QueryBuilderField, SegmentationVm } from 'api/swagger/campaign-editor'
import { SegmentationCategory } from 'models/campaign/segmentationCategory'
import { SegmentationQuery } from 'models/campaign/segmentationQuery'

interface SegmentationEditorState {
  segmentation: CampaignSegmentation
  categories?: SegmentationCategory[]
  segmentationQuery?: SegmentationQuery
  fields?: QueryBuilderField[]
  error: boolean
  loading: boolean
  loadingDelete: boolean
}

const initialState: SegmentationEditorState = {
  segmentation: {},
  error: false,
  loading: false,
  loadingDelete: false
}

const segmentationEditorSlice = createSlice({
  name: 'segmentationEditor',
  initialState,
  reducers: {
    resetSegmentationEditor: () => initialState,
    getSegmentationRequest(state) {
      state.loading = true
    },
    getSegmentationSuccess(
      state,
      action: PayloadAction<
        [CampaignSegmentation, SegmentationCategory[], SegmentationQuery, QueryBuilderField[]]
      >
    ) {
      state.segmentation = action.payload[0]
      state.categories = action.payload[1]
      state.segmentationQuery = action.payload[2]
      state.fields = action.payload[3]
      state.loading = false
      state.error = false
    },
    getSegmentationFail(state) {
      state.loading = false
      state.error = true
    },
    saveSegmentationRequest(state) {
      state.loading = true
    },
    saveSegmentationSuccess(state) {
      state.loading = false
      state.error = false
    },
    saveSegmentationFail(state) {
      state.loading = false
      state.error = true
    },
    deleteSegmentationRequest(state) {
      state.loadingDelete = true
    },
    deleteSegmentationSuccess(state) {
      state.loadingDelete = false
    },
    deleteSegmentationFail(state) {
      state.loadingDelete = true
    }
  }
})

const {
  getSegmentationSuccess,
  getSegmentationFail,
  getSegmentationRequest,
  deleteSegmentationRequest,
  deleteSegmentationSuccess,
  deleteSegmentationFail,
  saveSegmentationSuccess,
  saveSegmentationFail,
  saveSegmentationRequest
} = segmentationEditorSlice.actions

export const { resetSegmentationEditor } = segmentationEditorSlice.actions

export const segmentationEditorReducer = segmentationEditorSlice.reducer

export const getSegmentation = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(getSegmentationRequest())
    const segmentation = await api.campaignEditor.segmentations.getSegmentation({ id })
    const segmentationQuery = await api.campaignEditor.segmentationQueries.getSegmentationQuery({
      segmentationId: id
    })
    const { fields } = await api.campaignEditor.segmentationQueries.getConfig()

    const {
      items: categories
    } = await api.campaignEditor.segmentationCategories.getSegmentationCategories({})
    dispatch(
      getSegmentationSuccess([
        segmentation as CampaignSegmentation,
        categories as SegmentationCategory[],
        segmentationQuery as SegmentationQuery,
        fields as QueryBuilderField[]
      ])
    )
  } catch (err) {
    dispatch(getSegmentationFail())
  }
}

export const saveSegmentation = (data: CampaignSegmentation): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    const { segmentation, segmentationQuery } = getState().segmentationEditor
    dispatch(saveSegmentationRequest())

    if (segmentation?.id) {
      await api.campaignEditor.segmentations.updateSegmentation({
        createUpdateSegmentationCommand: {
          ...segmentationQuery,
          ...segmentation,
          ...data
        } as SegmentationVm
      })

      dispatch(getSegmentation(segmentation.id))
    } else {
      await api.campaignEditor.segmentations.createSegmentation({
        createUpdateSegmentationCommand: {
          ...segmentationQuery,
          ...segmentation,
          ...data
        } as SegmentationVm
      })

      history.push(`/segmentations`)
    }
    dispatch(saveSegmentationSuccess())
    message.success(i18n.t('common.message.save-success'), 5)
  } catch (err) {
    console.log(err)
    dispatch(saveSegmentationFail())
  }
}

export const deleteSegmentation = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(deleteSegmentationRequest())
    // await api.campaignEditor.segmentations.delete({ id })
    dispatch(deleteSegmentationSuccess())
    message.success(i18n.t('common.message.delete-success'), 5)
    history.push(`/segmentations`)
    return { id }
  } catch (err) {
    dispatch(deleteSegmentationFail())
    return { id, error: true }
  }
}
