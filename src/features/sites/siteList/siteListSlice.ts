import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Site } from 'models/site'
import {
  ListRequestParams,
  reviseListRequestParams,
  storableListRequestParams,
  recalculatePaginationAfterDeletion
} from 'hooks/useTableUtils'
import { FeatureState } from 'models/featureState'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { downloadBlobAsCsv } from 'services/file-reader'

export interface SiteFeatureConfig {
  shrinks: boolean
  routeRoot: string
  routeExit: string
}

interface State {
  sites: Site[]
  listState: FeatureState
  deleteState: FeatureState
  listParams: ListRequestParams
  listConstraintParams?: ListRequestParams
  config: SiteFeatureConfig
}

const initialState: State = {
  sites: [],
  listState: FeatureState.Initial,
  deleteState: FeatureState.Initial,
  listParams: {
    pageSize: 10
  },
  config: {
    shrinks: true,
    routeRoot: '/sites/editor',
    routeExit: '/sites'
  }
}

const slice = createSlice({
  name: 'siteList',
  initialState,
  reducers: {
    reset: () => initialState,
    resetListParams(state) {
      state.listParams = initialState.listParams
    },
    setListState(state, action: PayloadAction<FeatureState>) {
      state.listState = action.payload
    },
    setFeatureConfig(state, action: PayloadAction<SiteFeatureConfig>) {
      state.config = action.payload
    },
    setDeleteState(state, action: PayloadAction<FeatureState>) {
      state.deleteState = action.payload
    },
    setListConstraints(state, action: PayloadAction<ListRequestParams>) {
      state.listConstraintParams = action.payload
    },
    getSitesSuccess(
      state,
      action: PayloadAction<{ sites: Site[]; listParams: ListRequestParams }>
    ) {
      state.sites = action.payload.sites
      state.listParams = action.payload.listParams
      state.listState = FeatureState.Success
    },
    deleteSiteSuccess(state) {
      state.deleteState = FeatureState.Success
    }
  }
})

const { setDeleteState, setListState, setFeatureConfig, resetListParams } = slice.actions
const { deleteSiteSuccess, getSitesSuccess } = slice.actions
const { reset, setListConstraints } = slice.actions

const getSites = (params: ListRequestParams = {}): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setListState(FeatureState.Loading))
    const { listConstraintParams, listParams } = getState().siteList
    if (isNaN(listConstraintParams?.partnerId)) {
      throw Error('Invalid partner id: ' + listConstraintParams?.partnerId)
    }

    const revisedParams = reviseListRequestParams(listParams, params)
    const { result, ...pagination } = await api.coupon.sites.getSites({
      ...revisedParams,
      ...listConstraintParams
    })

    dispatch(
      getSitesSuccess({
        sites: result as Site[],
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(setListState(FeatureState.Error))
  }
}

const resetSiteFilters = (): AppThunk => async dispatch => {
  dispatch(resetListParams())
  dispatch(getSites())
}

const deleteSite = (id: number): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setDeleteState(FeatureState.Loading))
    await api.coupon.sites.deleteSite({ id })
    dispatch(deleteSiteSuccess())
    const { listParams } = getState().siteList
    const newPage = recalculatePaginationAfterDeletion(listParams)
    dispatch(getSites({ page: newPage }))
    return { id }
  } catch (err) {
    dispatch(setDeleteState(FeatureState.Error))
    return { id, error: err.toString() }
  }
}

const exportSites = (): AppThunk => async (dispatch, getState) => {
  const { listParams, listConstraintParams } = getState().siteList

  try {
    const file = await api.coupon.sites.exportSites({
      ...listParams,
      ...listConstraintParams
    })
    downloadBlobAsCsv(file)
  } catch (err) {
    console.log(err)
    return { error: err.toString() }
  }
}

export const siteListReducer = slice.reducer

export const siteListActions = {
  reset,
  setListConstraints,
  setFeatureConfig,
  getSites,
  resetSiteFilters,
  deleteSite,
  exportSites
}
