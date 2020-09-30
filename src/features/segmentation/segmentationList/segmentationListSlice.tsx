import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import {
  ListRequestParams,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { CampaignSegmentation } from 'models/campaign/campaignSegmentation'
import moment from 'moment'

interface SegmentationListState {
  segmentations: CampaignSegmentation[]
  error: boolean
  loading: boolean
  listParams: ListRequestParams
}

const initialState: SegmentationListState = {
  error: false,
  loading: false,
  segmentations: [],
  listParams: {
    pageSize: 10
  }
}

const segmentationListSlice = createSlice({
  name: 'segmentationList',
  initialState,
  reducers: {
    resetSegmentationList: () => initialState,
    resetListParams(state) {
      state.listParams = initialState.listParams
    },
    getSegmentationRequest(state) {
      state.loading = true
    },
    getSegmentationSuccess(
      state,
      action: PayloadAction<{
        segmentations: CampaignSegmentation[]
        listParams: ListRequestParams
      }>
    ) {
      state.segmentations = action.payload.segmentations
      state.listParams = action.payload.listParams
      state.loading = false
      state.error = false
    },
    getSegmentationFail(state) {
      state.loading = false
      state.error = true
    }
  }
})

const {
  resetListParams,
  getSegmentationRequest,
  getSegmentationSuccess,
  getSegmentationFail
} = segmentationListSlice.actions
export const { resetSegmentationList } = segmentationListSlice.actions

export const segmentationListReducer = segmentationListSlice.reducer

export const getSegmentations = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(getSegmentationRequest())

    const revisedParams = reviseListRequestParams(getState().segmentationList.listParams, params)

    const { items, ...pagination } = await api.campaignEditor.segmentations.getSegmentations(
      revisedParams
    )

    dispatch(
      getSegmentationSuccess({
        segmentations: (items as CampaignSegmentation[]).map((x: CampaignSegmentation) => ({
          ...x,
          createdDate: moment(x.createdDate)
        })),
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(getSegmentationFail())
  }
}

export const resetSegmentationFilters = (): AppThunk => async dispatch => {
  dispatch(resetListParams())
  dispatch(getSegmentations())
}
