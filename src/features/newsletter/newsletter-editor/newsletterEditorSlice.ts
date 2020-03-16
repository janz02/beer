// import { createSlice } from '@reduxjs/toolkit'

import { AppThunk } from 'app/store'
import { Newsletter } from 'models/newsletter'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api } from 'api'
import moment from 'moment'
import { message } from 'antd'
import i18n from 'app/i18n'
import { Segment } from 'models/segment'

interface NewsletterEditorState {
  error: string
  currentTemplateVersionId?: number
  template?: Newsletter
  loadingEmail?: boolean
  log?: any
  segments: Segment[]
}

const initialState: NewsletterEditorState = {
  loadingEmail: false,
  error: '',
  segments: []
}

const newsletterEditorSlice = createSlice({
  name: 'newsletterEditor',
  initialState,
  reducers: {
    saveTemplateVersionRequest() {},
    saveTemplateVersionSuccess() {},
    saveTemplateVersionFail(state, action: PayloadAction<string>) {},
    restoreTemplateVersionRequest() {},
    restoreTemplateVersionSuccess() {},
    restoreTemplateVersionFail(state, action: PayloadAction<string>) {},
    sendEmailRequest(state) {
      state.loadingEmail = true
    },
    sendEmailSuccess(state) {
      state.loadingEmail = false
    },
    sendEmailFail(state, action: PayloadAction<string>) {
      state.loadingEmail = false
    },
    getTemplateRequest() {},
    getTemplateSuccess(state, action: PayloadAction<Newsletter>) {
      state.template = action.payload
      state.currentTemplateVersionId = action.payload.history?.[0]?.id
    },
    getTemplateFail(state, action: PayloadAction<string>) {},
    clearNewsletterTemplate(state) {
      state.template = undefined
      state.currentTemplateVersionId = undefined
      state.error = ''
    },
    switchNewsletterVersion(state, action: PayloadAction<number>) {
      state.currentTemplateVersionId = action.payload
    },
    getSegmentsRequest() {},
    getSegmentsSuccess(state, action: PayloadAction<Segment[]>) {
      state.segments = action.payload
    },
    getSegmentsFail(state, action: PayloadAction<string>) {},
    // For finding the bug in grapes.js
    logGrapesjsEvent(state, action: PayloadAction<any>) {
      state.log = action.payload
    }
  }
})

const {
  saveTemplateVersionRequest,
  saveTemplateVersionSuccess,
  saveTemplateVersionFail
} = newsletterEditorSlice.actions
const {
  restoreTemplateVersionRequest,
  restoreTemplateVersionSuccess,
  restoreTemplateVersionFail
} = newsletterEditorSlice.actions
const { getTemplateRequest, getTemplateSuccess, getTemplateFail } = newsletterEditorSlice.actions
const { sendEmailRequest, sendEmailSuccess, sendEmailFail } = newsletterEditorSlice.actions
const { getSegmentsRequest, getSegmentsSuccess, getSegmentsFail } = newsletterEditorSlice.actions

export const { clearNewsletterTemplate, switchNewsletterVersion } = newsletterEditorSlice.actions
export const { logGrapesjsEvent } = newsletterEditorSlice.actions

export const newsletterEditorReducer = newsletterEditorSlice.reducer

export const getNewsletterTemplate = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(getTemplateRequest())
    const response = await api.emailTemplates.getTemplate({
      id
    })
    const data: Newsletter = {
      id: response.id,
      name: response.name,
      history: response.history
        ?.sort((a, b) => (a.version && b.version ? (a.version >= b.version ? -1 : 1) : 0))
        ?.map(h => ({
          ...h,
          modifiedAt: moment(h.modifiedAt)
        }))
    }
    dispatch(getTemplateSuccess(data))
  } catch (err) {
    dispatch(getTemplateFail(err.toString()))
  }
}

export const saveNewsletterTemplateVersion = (content: string): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(saveTemplateVersionRequest())
    const id = getState().newsletterEditor.template?.id
    if (!id) {
      return
    }
    await api.emailTemplates.saveTemplateVersion({
      id: id,
      emailTemplateVersionDto: {
        content
      }
    })
    await dispatch(saveTemplateVersionSuccess())
    await dispatch(getNewsletterTemplate(id))
  } catch (err) {
    dispatch(saveTemplateVersionFail(err.toString()))
  }
}

export const restoreNewsletterTemplateVersion = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(restoreTemplateVersionRequest())
    const { template, currentTemplateVersionId } = getState().newsletterEditor
    const id = template?.id
    const version = template?.history?.find(h => h.id === currentTemplateVersionId)?.version
    if (id === undefined || version === undefined) return
    await api.emailTemplates.restoreTemplateVersion({
      id: id,
      version: version
    })
    dispatch(restoreTemplateVersionSuccess())
    dispatch(getNewsletterTemplate(id))
  } catch (err) {
    dispatch(restoreTemplateVersionFail(err.toString()))
  }
}

export const sendNewsletterEmailExample = (email: string, subject: string): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(sendEmailRequest())
    const templateId = getState().newsletterEditor.template?.id
    await api.emailSender.sendTestEmail({
      sendEmailsDto: {
        recipients: [email],
        emailTemplateId: templateId,
        emailSubject: subject
      }
    })
    dispatch(sendEmailSuccess())
    message.success(i18n.t('common.message.email-sent'), 5)
    return true
  } catch (err) {
    dispatch(sendEmailFail(err.toString()))
    return false
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

export const sendNewsletterEmailToSegment = (
  segmentId: number,
  subject: string
): AppThunk => async (dispatch, getState) => {
  try {
    const templateId = getState().newsletterEditor.template?.id
    dispatch(sendEmailRequest())
    await api.emailSender.sendEmailToSegment({
      sendEmailToSegmentDto: {
        emailSubject: subject,
        emailTemplateId: templateId,
        segmentId: segmentId
      }
    })
    dispatch(sendEmailSuccess())
    message.success(i18n.t('common.message.email-sent'), 5)
    return true
  } catch (err) {
    dispatch(sendEmailFail(err.toString()))
    return false
  }
}
