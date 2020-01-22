import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { ListCategoriesRequest } from 'api/swagger'
import { Pagination, calculatePagination, recalculatePagination } from 'models/pagination'
import { Site } from 'models/site'

interface SiteState {
  sites: Site[]
  pagination?: Pagination
  loadingList: boolean
  loadingEditor: boolean
  errorList: string
  errorEditor: string
  errorDeletion: string
}

const initialState: SiteState = {
  sites: [],
  pagination: {
    pageSize: 10
  },
  loadingList: false,
  loadingEditor: false,
  errorList: '',
  errorEditor: '',
  errorDeletion: ''
}

const siteSlice = createSlice({
  name: '@sites',
  initialState,
  reducers: {
    getSitesRequest(state) {
      state.loadingList = true
    },
    getSitesSuccess(state, action: PayloadAction<{ sites: Site[]; pagination: Pagination }>) {
      state.sites = action.payload.sites
      state.pagination = action.payload.pagination
      state.loadingList = false
      state.errorList = ''
    },
    getSitesFail(state, action: PayloadAction<string>) {
      state.loadingList = false
      state.errorList = action.payload
    },
    deleteSiteRequest(state) {
      state.loadingList = true
    },
    deleteSiteSuccess(state) {
      state.loadingList = false
      state.errorDeletion = ''
    },
    deleteSiteFail(state, action: PayloadAction<string>) {
      state.loadingList = false
      state.errorDeletion = action.payload
    }
  }
})

const { getSitesRequest, getSitesSuccess, getSitesFail } = siteSlice.actions
const { deleteSiteRequest, deleteSiteSuccess, deleteSiteFail } = siteSlice.actions

export default siteSlice.reducer

export const getSites = (params: ListCategoriesRequest = {}): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(getSitesRequest())
  try {
    const oldPagination = getState().categoryList.pagination

    const pagination = calculatePagination(
      { pageSize: params.pageSize, page: params.page },
      oldPagination
    )
    const response = await api.sites.listSites({
      pageSize: pagination.pageSize,
      page: pagination.page
    })
    dispatch(
      getSitesSuccess({
        sites: response.result as Site[],
        pagination: {
          page: response.page,
          from: response.from,
          size: response.size,
          to: response.to,
          pageSize: pagination.pageSize
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
    await api.sites.deleteSites({ id })
    if (refreshList) {
      const oldPagination = getState().sites.pagination
      const newPage = recalculatePagination(oldPagination)
      dispatch(getSites({ page: newPage }))
    }
    dispatch(deleteSiteSuccess())
    return ''
  } catch (err) {
    dispatch(deleteSiteFail(err.toString()))
    return err.toString()
  }
}
