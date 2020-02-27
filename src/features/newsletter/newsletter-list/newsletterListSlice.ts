import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Pagination, calculatePagination, recalculatePagination } from 'models/pagination'
import { AppThunk } from 'app/store'
import { NewsletterPreviewData } from 'models/newsletter'
import { api } from 'api'
import { history } from 'router/router'

interface NewsletterListState {
  templates: NewsletterPreviewData[]
  error: string
  loading: boolean
  pagination: Pagination
  // TODO: integrate segments
  segments: any[]
}

const initialState: NewsletterListState = {
  error: '',
  loading: false,
  templates: [],
  pagination: {
    pageSize: 10
  },
  segments: [
    {
      id: '1',
      name: 'Old people with dogs'
    },
    {
      id: '2',
      name: 'Young people with cats'
    }
  ]
}

const newsletterListSlice = createSlice({
  name: 'newsLetterList',
  initialState,
  reducers: {
    createTemplateRequest() {},
    createTemplateSuccess() {},
    createTemplateFail(state, action: PayloadAction<string>) {},
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

export default newsletterListSlice.reducer

export const sendNewsletterEmail = (email: string, templateId: number): AppThunk => async () => {
  try {
    await api.emailSender.sendEmails({
      sendEmailsDto: {
        recipients: [email],
        emailTemplateId: templateId
      }
    })
    return true
  } catch (err) {
    return false
  }
}

export const getNewsletterTemplates = (params: any = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(getTemplatesRequest())
    const oldPagination = getState().newsletterList.pagination
    const pagination = calculatePagination(params, oldPagination)
    const response = await api.emailTemplates.getTemplates({
      pageSize: pagination.pageSize,
      page: pagination.page
    })
    dispatch(
      getTemplatesSuccess({
        templates: response.result as any,
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
    dispatch(getTemplatesFail(err.toString()))
  }
}

export const deleteNewsletterTemplate = (id: number): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(deleteTemplateRequest())
    await api.emailTemplates.deleteTemplate({ id })
    dispatch(deleteTemplateSuccess())
    const oldPagination = getState().newsletterList.pagination
    const newPage = recalculatePagination(oldPagination)
    dispatch(getNewsletterTemplates({ page: newPage }))
    return { id }
  } catch (err) {
    dispatch(deleteTemplateFail(err.toString()))
  }
}

export const createNewsletterTemplate = (name: string): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(createTemplateRequest())
    const id = await api.emailTemplates.createTemplate({
      createEmailTemplateDto: {
        name,
        content: `<div style="height: 10%; text-align: center; padding: 1rem">${name}</div>`
      }
    })
    dispatch(createTemplateSuccess())
    history.push(`newsletter/editor/${id.id}`)
  } catch (err) {
    dispatch(createTemplateFail(err.toString()))
  }
}
