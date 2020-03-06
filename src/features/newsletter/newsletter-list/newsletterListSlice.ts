import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from 'app/store'
import { NewsletterPreview } from 'models/newsletter'
import { api } from 'api'
import { history } from 'router/router'
import moment from 'moment'
import { Segment } from 'models/segment'
import { message } from 'antd'
import i18n from 'app/i18n'
import {
  ListRequestParams,
  recalculatePaginationAfterDeletion,
  Pagination
} from 'hooks/useTableUtils'

interface NewsletterListState {
  templates: NewsletterPreview[]
  error: string
  loading: boolean
  pagination: Pagination
  segments: Segment[]
}

const initialState: NewsletterListState = {
  error: '',
  loading: false,
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
    createTemplateRequest() {},
    createTemplateSuccess() {},
    createTemplateFail(state, action: PayloadAction<string>) {},
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
    },
    getSegmentsRequest() {},
    getSegmentsSuccess(state, action: PayloadAction<Segment[]>) {
      state.segments = action.payload
    },
    getSegmentsFail(state, action: PayloadAction<string>) {}
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
const { sendEmailRequest, sendEmailSuccess, sendEmailFail } = newsletterListSlice.actions
const { getSegmentsRequest, getSegmentsSuccess, getSegmentsFail } = newsletterListSlice.actions

export const newsletterListReducer = newsletterListSlice.reducer

export const sendNewsletterEmailToSegment = (
  segmentId: string,
  templateId: number
): AppThunk => async dispatch => {
  try {
    dispatch(sendEmailRequest())
    // TODO: segments should be instead of recipients, the api only works with email now
    // await api.emailSender.sendEmails({
    //   sendEmailsDto: {
    //     recipients: [segmentId],
    //     emailTemplateId: templateId
    //   }
    // })
    dispatch(sendEmailSuccess())
    message.success(i18n.t('common.message.email-sent'), 5)
    return true
  } catch (err) {
    dispatch(sendEmailFail(err.toString()))
    return false
  }
}

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
  } catch (err) {
    dispatch(createTemplateFail(err.toString()))
  }
}

// TODO: consider lazy loading
export const getSegmentsForEmail = (): AppThunk => async dispatch => {
  try {
    dispatch(getSegmentsRequest())
    const response = await api.segments.getSegments({
      pageSize: 10000
    })
    const segments: any = response.result?.map(s => ({ ...s, id: '' + s.id }))
    dispatch(getSegmentsSuccess(segments ?? []))
  } catch (err) {
    dispatch(getSegmentsFail(err.toString()))
  }
}
