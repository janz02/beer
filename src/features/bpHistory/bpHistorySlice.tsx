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
import { BpHistoryTemplate } from 'models/bpHistoryTemplate'
import moment from 'moment'

interface BpHistoryState {
  bpHistoryItems: BpHistoryItem[]
  error: boolean
  loading: boolean
  listParams: ListRequestParams
  template: BpHistoryTemplate | null
}

const initialState: BpHistoryState = {
  error: false,
  loading: false,
  bpHistoryItems: [],
  listParams: {
    pageSize: 10
  },
  template: null
}

const bpHistorySlice = createSlice({
  name: 'bpHistoryList',
  initialState,
  reducers: {
    resetBpHistory: () => initialState,
    resetListParams(state) {
      state.listParams = initialState.listParams
    },
    getBpHistoryRequest(state) {
      state.loading = true
    },
    getBpHistorySuccess(
      state,
      action: PayloadAction<{ bpHistoryItems: BpHistoryItem[]; listParams: ListRequestParams }>
    ) {
      state.bpHistoryItems = action.payload.bpHistoryItems
      state.listParams = action.payload.listParams
      state.loading = false
      state.error = false
    },
    getBpHistoryFail(state) {
      state.loading = false
      state.error = true
    },
    getBpHistoryTemplateSuccess(state, action: PayloadAction<{ template: BpHistoryTemplate }>) {
      state.template = action.payload.template
      state.loading = false
      state.error = false
    },
    getBpHistoryTemplateFail(state) {
      state.loading = false
      state.error = true
    },
    clearTemplate(state) {
      state.template = initialState.template
    }
  }
})

const {
  resetListParams,
  getBpHistoryRequest,
  getBpHistorySuccess,
  getBpHistoryFail,
  getBpHistoryTemplateSuccess,
  getBpHistoryTemplateFail
} = bpHistorySlice.actions

export const { clearTemplate } = bpHistorySlice.actions

export const bpHistoryReducer = bpHistorySlice.reducer

export const getBpHistory = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(getBpHistoryRequest())

    const revisedParams: ListRequestParams = reviseListRequestParams(
      getState().bpHistory.listParams,
      params
    )

    const { items, ...pagination } = await api.campaignEditor.campaignResults.getEvents(
      revisedParams
    )

    dispatch(
      getBpHistorySuccess({
        bpHistoryItems: (items as BpHistoryItem[]).map((el: BpHistoryItem) => ({
          ...el,
          createdDate: moment(el.createdDate)
        })),
        listParams: storableListRequestParams(revisedParams, {
          ...pagination,
          size: pagination.totalCount
        } as Pagination)
      })
    )
  } catch (err) {
    dispatch(getBpHistoryFail())
  }
}

export const resetBpHistoryFilters = (): AppThunk => async dispatch => {
  dispatch(resetListParams())
  dispatch(clearTemplate())
  dispatch(getBpHistory())
}

export const getBpHistoryTemplateById = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(getBpHistoryRequest())

    const template: BpHistoryTemplate = await api.campaignEditor.templates.getTemplateById({ id })

    dispatch(getBpHistoryTemplateSuccess({ template }))
  } catch (err) {
    dispatch(getBpHistoryTemplateFail())
  }
}
