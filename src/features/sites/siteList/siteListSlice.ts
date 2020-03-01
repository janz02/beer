import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { Site } from 'models/site'
import {
  ListRequestParams,
  recalculatePaginationAfterDeletion,
  Pagination
} from 'hooks/useTableUtils'

interface SiteListState {
  sites: Site[]
  pagination: Pagination
  loading: boolean
  errorList: string
  errorDeletion: string
}

const initialState: SiteListState = {
  sites: [],
  pagination: {
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
    getSitesRequest(state) {
      state.loading = true
    },
    getSitesSuccess(state, action: PayloadAction<{ sites: Site[]; pagination: Pagination }>) {
      state.sites = action.payload.sites
      state.pagination = action.payload.pagination
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

export default siteListSlice.reducer

export const getSites = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(getSitesRequest())
  try {
    const oldPagination = getState().siteList.pagination
    // TODO: integrate, remove partner get because it will be on the JWT.
    const partner = await api.partner.getMyPartner()
    const { result, ...pagination } = await api.sites.getSites({
      pageSize: oldPagination.pageSize,
      page: oldPagination.page,
      ...params,
      partnerId: partner.id
    })
    dispatch(
      getSitesSuccess({
        sites: result as Site[],
        pagination: {
          ...pagination,
          pageSize: params.pageSize ?? oldPagination.pageSize
        }
      })
    )
  } catch (err) {
    dispatch(getSitesFail(err.toString()))
  }
}

export const deleteSite = (id: number, refreshList = true): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(deleteSiteRequest())
  try {
    await api.sites.deleteSite({ id })
    dispatch(deleteSiteSuccess())
    if (refreshList) {
      const newPage = recalculatePaginationAfterDeletion(getState().siteList.pagination)
      dispatch(getSites({ page: newPage }))
    }
    return { id }
  } catch (err) {
    dispatch(deleteSiteFail(err.toString()))
    return { id, error: err.toString() }
  }
}
