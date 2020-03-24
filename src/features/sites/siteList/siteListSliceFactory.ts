import { createSlice, PayloadAction, Reducer, AnyAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { Site } from 'models/site'
import {
  ListRequestParams,
  recalculatePaginationAfterDeletion,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'

export interface SiteListState {
  sites: Site[]
  listParams: ListRequestParams
  listConstraintParams?: ListRequestParams
  loading: boolean
  errorList: string
  errorDeletion: string
}

interface SliceFactoryProps {
  name: string
  getSliceState: () => AppThunk
}

interface SliceFactoryUtils<T> {
  reducer: Reducer<T, AnyAction>
}

export interface SiteListSliceActions {
  deleteSite: (id: number) => AppThunk
  getSites: (params?: ListRequestParams) => AppThunk
  resetSiteList: () => AppThunk
  setSitesListConstraints: (params?: ListRequestParams) => AppThunk
}

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
      _resetSiteList: () => initialState,
      _setSitesListConstraints(state, action: PayloadAction<ListRequestParams>) {
        state.listConstraintParams = action.payload
      },
      getSitesRequest(state) {
        state.loading = true
      },
      getSitesSuccess(
        state,
        action: PayloadAction<{ sites: Site[]; listParams: ListRequestParams }>
      ) {
        state.sites = action.payload.sites
        state.listParams = action.payload.listParams
        state.loading = false
        state.errorList = ''
      },
      getSitesFail(state, action: PayloadAction<string>) {
        state.loading = false
        state.errorList = action.payload
      },
      deleteSiteRequest(state) {
        state.loading = true
      },
      deleteSiteSuccess(state) {
        state.loading = false
        state.errorDeletion = ''
      },
      deleteSiteFail(state, action: PayloadAction<string>) {
        state.loading = false
        state.errorDeletion = action.payload
      }
    }
  })
  const { getSitesRequest, getSitesSuccess, getSitesFail } = slice.actions
  const { deleteSiteRequest, deleteSiteSuccess, deleteSiteFail } = slice.actions
  const { _resetSiteList, _setSitesListConstraints } = slice.actions

  const reducer = slice.reducer

  const getSites = (params: ListRequestParams = {}): AppThunk => async dispatch => {
    try {
      dispatch(getSitesRequest())

      const state = ((await dispatch(getSliceState())) as any) as SiteListState

      let constraints: ListRequestParams = {}
      if (state.listConstraintParams) {
        constraints = { ...state.listConstraintParams }
      } else {
        const partner = await api.partner.getSelfPartner()
        constraints.partnerId = partner.id
      }

      const revisedParams = reviseListRequestParams(state.listParams, params)
      const { result, ...pagination } = await api.sites.getSites({
        ...revisedParams,
        ...constraints
      })
      dispatch(
        getSitesSuccess({
          sites: result as Site[],
          listParams: storableListRequestParams(revisedParams, pagination)
        })
      )
    } catch (err) {
      dispatch(getSitesFail(err.toString()))
    }
  }

  const deleteSite = (id: number): AppThunk => async dispatch => {
    dispatch(deleteSiteRequest())
    try {
      await api.sites.deleteSite({ id })
      dispatch(deleteSiteSuccess())
      const state = ((await dispatch(getSliceState())) as any) as SiteListState
      const newPage = recalculatePaginationAfterDeletion(state.listParams)
      dispatch(getSites({ page: newPage }))
      return { id }
    } catch (err) {
      dispatch(deleteSiteFail(err.toString()))
      return { id, error: err.toString() }
    }
  }

  const resetSiteList = (): AppThunk => async dispatch => {
    dispatch(_resetSiteList())
  }

  const setSitesListConstraints = (params: ListRequestParams = {}): AppThunk => async dispatch => {
    dispatch(_setSitesListConstraints(params))
  }

  return {
    reducer,
    actions: {
      deleteSite,
      getSites,
      resetSiteList,
      setSitesListConstraints
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
