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

interface SiteListState {
  sites: Site[]
  listParams: ListRequestParams
  listConstraintParams?: ListRequestParams
  loading: boolean
  errorList: string
  errorDeletion: string
}

const initialState: SiteListState = {
  sites: [],
  listParams: {
    pageSize: 10
  },
  loading: false,
  errorList: '',
  errorDeletion: ''
}

const siteListSlice = createSlice({
  name: 'siteList',
  initialState,
  reducers: {
    resetSiteList: () => initialState,
    setSitesListConstraints(state, action: PayloadAction<ListRequestParams>) {
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

const { getSitesRequest, getSitesSuccess, getSitesFail } = siteListSlice.actions
const { deleteSiteRequest, deleteSiteSuccess, deleteSiteFail } = siteListSlice.actions
export const { resetSiteList, setSitesListConstraints } = siteListSlice.actions

export const siteListReducer = siteListSlice.reducer

export const getSites = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(getSitesRequest())

    const { listConstraintParams } = getState().siteList

    let selfPartnerId
    if (!listConstraintParams?.partnerId) {
      // TODO: integrate, remove partner get because it will be on the JWT.
      const partner = await api.partner.getSelfPartner()
      selfPartnerId = partner.id
    }

    const revisedParams = reviseListRequestParams(getState().siteList.listParams, params)

    const { result, ...pagination } = await api.sites.getSites({
      ...revisedParams,
      partnerId: selfPartnerId,
      ...listConstraintParams
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

export const deleteSite = (id: number): AppThunk => async (dispatch, getState) => {
  dispatch(deleteSiteRequest())
  try {
    await api.sites.deleteSite({ id })
    dispatch(deleteSiteSuccess())
    const newPage = recalculatePaginationAfterDeletion(getState().siteList.listParams)
    dispatch(getSites({ page: newPage }))
    return { id }
  } catch (err) {
    dispatch(deleteSiteFail(err.toString()))
    return { id, error: err.toString() }
  }
}
