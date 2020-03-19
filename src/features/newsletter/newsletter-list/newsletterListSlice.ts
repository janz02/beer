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
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'

interface NewsletterListState {
  templates: NewsletterPreview[]
  error: string
  loading: boolean
  loadingCreate: boolean
  listParams: ListRequestParams
  segments: Segment[]
}

const initialState: NewsletterListState = {
  error: '',
  loading: false,
  loadingCreate: false,
  templates: [],
  listParams: {
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
      action: PayloadAction<{ templates: any[]; listParams: ListRequestParams }>
    ) {
      state.templates = action.payload.templates
      state.listParams = action.payload.listParams
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
    const revisedParams = reviseListRequestParams(getState().newsletterList.listParams, params)
    const { result, ...pagination } = await api.emailTemplates.getTemplates(revisedParams)
    const templates = result?.map(t => ({ ...t, modifiedAt: moment(t.modifiedAt) }))
    dispatch(
      getTemplatesSuccess({
        templates: templates as NewsletterPreview[],
        listParams: storableListRequestParams(revisedParams, pagination)
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
    const newPage = recalculatePaginationAfterDeletion(getState().newsletterList.listParams)
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
