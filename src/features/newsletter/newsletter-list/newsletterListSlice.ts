import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from 'app/store'
import { NewsletterPreview } from 'models/newsletter'
import { api } from 'api'
import { history } from 'router/router'
import moment from 'moment'
import { Segment } from 'models/segment'

import {
  ListRequestParams,
  recalculatePaginationAfterDeletion,
  Pagination
} from 'hooks/useTableUtils'

interface NewsletterListState {
  templates: NewsletterPreview[]
  error: string
  loading: boolean
  loadingCreate: boolean
  pagination: Pagination
  segments: Segment[]
}

const initialState: NewsletterListState = {
  error: '',
  loading: false,
  loadingCreate: false,
  templates: [],
  pagination: {
    pageSize: 10
  },
  segments: []
}

const newsletterListSlice = createSlice({
  name: 'newsLetterList',
  initialState,
  reducers: {
    resetNewsLetterList: () => initialState,
    createTemplateRequest(state) {
      state.loadingCreate = true
    },
    createTemplateSuccess(state) {
      state.loadingCreate = false
    },
    createTemplateFail(state, action: PayloadAction<string>) {
      state.loadingCreate = false
    },
    sendEmailRequest() {},
    sendEmailSuccess() {},
    sendEmailFail(state, action: PayloadAction<string>) {},
    deleteTemplateRequest() {},
    deleteTemplateSuccess() {},
    deleteTemplateFail(state, action: PayloadAction<string>) {},
    getTemplatesRequest(state) {
      state.loading = true
    },
    getTemplatesSuccess(
      state,
      action: PayloadAction<{ templates: any[]; pagination: Pagination }>
    ) {
      state.templates = action.payload.templates
      state.pagination = action.payload.pagination
      state.loading = false
      state.error = ''
    },
    getTemplatesFail(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    }
  }
})

const {
  createTemplateRequest,
  createTemplateSuccess,
  createTemplateFail
} = newsletterListSlice.actions
const { getTemplatesRequest, getTemplatesSuccess, getTemplatesFail } = newsletterListSlice.actions
const {
  deleteTemplateRequest,
  deleteTemplateSuccess,
  deleteTemplateFail
} = newsletterListSlice.actions

export const { resetNewsLetterList } = newsletterListSlice.actions

export const newsletterListReducer = newsletterListSlice.reducer

export const getNewsletterTemplates = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(getTemplatesRequest())
    const oldPagination = getState().newsletterList.pagination
    const { result, ...pagination } = await api.emailTemplates.getTemplates({
      page: oldPagination.page,
      pageSize: oldPagination.pageSize,
      ...params
    })
    const templates = result?.map(t => ({ ...t, modifiedAt: moment(t.modifiedAt) }))
    dispatch(
      getTemplatesSuccess({
        templates: templates as NewsletterPreview[],
        pagination: {
          ...pagination,
          pageSize: params.pageSize ?? oldPagination.pageSize
        }
      })
    )
  } catch (err) {
    dispatch(getTemplatesFail(err.toString()))
  }
}

export const deleteNewsletterTemplate = (id: number): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(deleteTemplateRequest())
    await api.emailTemplates.deleteTemplate({ id })
    dispatch(deleteTemplateSuccess())
    const newPage = recalculatePaginationAfterDeletion(getState().newsletterList.pagination)
    dispatch(getNewsletterTemplates({ page: newPage }))
    return { id }
  } catch (err) {
    dispatch(deleteTemplateFail(err.toString()))
  }
}

export const createNewsletterTemplate = (name: string): AppThunk => async dispatch => {
  try {
    dispatch(createTemplateRequest())
    const id = await api.emailTemplates.createTemplate({
      createEmailTemplateDto: {
        name,
        content: `<div style="height: 10%; text-align: center; padding: 1rem">${name}</div>`
      }
    })
    dispatch(createTemplateSuccess())
    history.push(`newsletter/${id.id}`)
    return true
  } catch (err) {
    dispatch(createTemplateFail(err.toString()))
    return false
  }
}
