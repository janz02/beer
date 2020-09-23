import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import {
  ListRequestParams,
  Pagination,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { BpHistoryItem } from 'models/bpHistoryItem'

interface BpHistoryListState {
  bpHistoryItems: BpHistoryItem[]
  error: boolean
  loading: boolean
  listParams: ListRequestParams
}

const initialState: BpHistoryListState = {
  error: false,
  loading: false,
  bpHistoryItems: [],
  listParams: {
    pageSize: 10
  }
}

const bpHistoryListSlice = createSlice({
  name: 'bpHistoryList',
  initialState,
  reducers: {
    resetBpHistoryList: () => initialState,
    resetListParams(state) {
      state.listParams = initialState.listParams
    },
    getBpHistoryListRequest(state) {
      state.loading = true
    },
    getBpHistoryListSuccess(
      state,
      action: PayloadAction<{ bpHistoryItems: BpHistoryItem[]; listParams: ListRequestParams }>
    ) {
      state.bpHistoryItems = action.payload.bpHistoryItems
      state.listParams = action.payload.listParams
      state.loading = false
      state.error = false
    },
    getBpHistoryListFail(state) {
      state.loading = false
      state.error = true
    }
  }
})

const {
  resetListParams,
  getBpHistoryListRequest,
  getBpHistoryListSuccess,
  getBpHistoryListFail
} = bpHistoryListSlice.actions
export const { resetBpHistoryList } = bpHistoryListSlice.actions

export const bpHistoryListReducer = bpHistoryListSlice.reducer

export const getBpHistory = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(getBpHistoryListRequest())

    const revisedParams: ListRequestParams = reviseListRequestParams(
      getState().bpHistoryList.listParams,
      params
    )

    const { items, ...pagination } = await api.campaignEditor.campaignResults.getEvents({})

    dispatch(
      getBpHistoryListSuccess({
        bpHistoryItems: items as BpHistoryItem[],
        listParams: storableListRequestParams(revisedParams, {
          ...pagination,
          size: pagination.totalCount
        } as Pagination)
      })
    )
  } catch (err) {
    dispatch(getBpHistoryListFail())
  }
}

export const resetBpHistoryFilters = (): AppThunk => async dispatch => {
  dispatch(resetListParams())
  dispatch(getBpHistory())
}
