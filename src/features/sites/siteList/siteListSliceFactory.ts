import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { Site } from 'models/site'
import {
  ListRequestParams,
  recalculatePaginationAfterDeletion,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { SliceFactoryUtils, SliceFactoryProps, CommonSliceActions } from 'models/reusableFeature'

export interface SiteListState {
  sites: Site[]
  listParams: ListRequestParams
  listConstraintParams?: ListRequestParams
  loading: boolean
  errorList: string
  errorDeletion: string
}

export type SiteListSliceActions = Pick<
  CommonSliceActions<Site>,
  'getList' | 'reset' | 'deleteItem' | 'setListConstraints'
>

interface SiteListSliceFactoryUtils extends SliceFactoryUtils<SiteListState> {
  actions: SiteListSliceActions
}

const siteListSliceFactory = (props: SliceFactoryProps): SiteListSliceFactoryUtils => {
  const { name, getSliceState } = props

  const initialState: SiteListState = {
    sites: [],
    listParams: {
      pageSize: 10
    },
    loading: false,
    errorList: '',
    errorDeletion: ''
  }
  const slice = createSlice({
    name,
    initialState,
    reducers: {
      _reset: () => initialState,
      _setListConstraints(state, action: PayloadAction<ListRequestParams>) {
        state.listConstraintParams = action.payload
      },
      getListRequest(state) {
        state.loading = true
      },
      getListSuccess(
        state,
        action: PayloadAction<{ sites: Site[]; listParams: ListRequestParams }>
      ) {
        state.sites = action.payload.sites
        state.listParams = action.payload.listParams
        state.loading = false
        state.errorList = ''
      },
      getListFail(state, action: PayloadAction<string>) {
        state.loading = false
        state.errorList = action.payload
      },
      deleteItemRequest(state) {
        state.loading = true
      },
      deleteItemSuccess(state) {
        state.loading = false
        state.errorDeletion = ''
      },
      deleteItemFail(state, action: PayloadAction<string>) {
        state.loading = false
        state.errorDeletion = action.payload
      }
    }
  })
  const { getListRequest, getListSuccess, getListFail } = slice.actions
  const { deleteItemRequest, deleteItemSuccess, deleteItemFail } = slice.actions
  const { _reset, _setListConstraints } = slice.actions

  const reducer = slice.reducer

  const getList = (params: ListRequestParams = {}): AppThunk => async dispatch => {
    try {
      dispatch(getListRequest())

      const state = ((await dispatch(getSliceState())) as any) as SiteListState

      let constraints: ListRequestParams = {}
      if (state.listConstraintParams) {
        constraints = { ...state.listConstraintParams }
      } else {
        const partner = await api.partner.getSelfPartner()
        constraints.partnerId = partner.id
      }

      if (isNaN(constraints.partnerId)) {
        throw Error('Invalid partner id: ' + constraints.partnerId)
      }
      const revisedParams = reviseListRequestParams(state.listParams, params)
      const { result, ...pagination } = await api.sites.getSites({
        ...revisedParams,
        ...constraints
      })
      dispatch(
        getListSuccess({
          sites: result as Site[],
          listParams: storableListRequestParams(revisedParams, pagination)
        })
      )
    } catch (err) {
      dispatch(getListFail(err.toString()))
    }
  }

  const deleteItem = (id: number): AppThunk => async dispatch => {
    dispatch(deleteItemRequest())
    try {
      await api.sites.deleteSite({ id })
      dispatch(deleteItemSuccess())
      const state = ((await dispatch(getSliceState())) as any) as SiteListState
      const newPage = recalculatePaginationAfterDeletion(state.listParams)
      dispatch(getList({ page: newPage }))
      return { id }
    } catch (err) {
      dispatch(deleteItemFail(err.toString()))
      return { id, error: err.toString() }
    }
  }

  const reset = (): AppThunk => async dispatch => {
    dispatch(_reset())
  }

  const setListConstraints = (params: ListRequestParams = {}): AppThunk => async dispatch => {
    dispatch(_setListConstraints(params))
  }

  return {
    reducer,
    actions: {
      deleteItem,
      getList,
      reset,
      setListConstraints
    }
  }
}

export const partnerSiteListSlice = siteListSliceFactory({
  name: 'partnerSiteList',
  getSliceState: (): AppThunk => async (_, getState) => {
    return getState().partnerSiteList
  }
})

export const siteListSlice = siteListSliceFactory({
  name: 'siteList',
  getSliceState: (): AppThunk => async (_, getState) => {
    return getState().siteList
  }
})
