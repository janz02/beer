import { createSlice } from '@reduxjs/toolkit'

import { Pagination } from 'models/pagination'
import { AppThunk } from 'app/store'
import { NewsletterPreviewData } from 'models/newsletter'

interface NewsletterListState {
  templates: NewsletterPreviewData[]
  error: string
  pagination?: Pagination
  // TODO: integrate segments
  segments: any[]
}

const initialState: NewsletterListState = {
  pagination: {
    pageSize: 10
  },
  error: '',
  templates: [
    {
      id: 1,
      name: 'example template'
    },
    {
      id: 2,
      name: 'example template 2'
    }
  ],
  segments: [
    {
      id: 1,
      name: 'Old people with dogs'
    },
    {
      id: 2,
      name: 'Young people with cats'
    }
  ]
}

const newsletterListSlice = createSlice({
  name: 'newsLetterList',
  initialState,
  reducers: {}
})

// const { getSitesRequest, getSitesSuccess, getSitesFail } = siteListSlice.actions
// const { deleteSiteRequest, deleteSiteSuccess, deleteSiteFail } = siteListSlice.actions

export default newsletterListSlice.reducer

export const getNewsletterTemplates = (params: any = {}): AppThunk => async (
  dispatch,
  getState
) => {
  // TODO: integration
  console.log('GET list', params)
}

export const deleteNewsletterTemplate = (id: number, refreshList = true): AppThunk => async (
  dispatch,
  getState
) => {
  // TODO: integration
  console.log('DELETE', id)
  return { id }
}
