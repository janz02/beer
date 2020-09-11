import { AppThunk } from 'app/store'
import { Newsletter } from 'models/newsletter'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api } from 'api2'
import moment from 'moment'
import { message } from 'antd'
import i18n from 'app/i18n'
import { Segment } from 'models/segment'
import { FeatureState } from 'models/featureState'
import { delay } from 'services/temp/delay'

export enum NewsletterTemplateContentState {
  Initial = 'Initial',
  Modified = 'Modified'
}

interface State {
  openSegmentEmail: boolean
  openTestEmail: boolean
  openRevert: boolean
  openDiscard: boolean
  templateContentState: NewsletterTemplateContentState
  templateState: FeatureState
  saveState: FeatureState
  restoreState: FeatureState
  emailState: FeatureState
  segmentState: FeatureState
  currentTemplateVersionId?: number
  targetTemplateVersionId?: number
  template?: Newsletter
  segments: Segment[]
  log?: any
}

const initialState: State = {
  openSegmentEmail: false,
  openTestEmail: false,
  openRevert: false,
  openDiscard: false,
  templateContentState: NewsletterTemplateContentState.Initial,
  templateState: FeatureState.Initial,
  saveState: FeatureState.Initial,
  restoreState: FeatureState.Initial,
  emailState: FeatureState.Initial,
  segmentState: FeatureState.Initial,
  segments: []
}

const slice = createSlice({
  name: 'newsletterEditor',
  initialState,
  reducers: {
    reset: () => initialState,
    openSegmentEmailModal(state) {
      state.openSegmentEmail = true
    },
    closeSegmentEmailModal(state) {
      state.openSegmentEmail = false
    },
    openTestEmailModal(state) {
      state.openTestEmail = true
    },
    closeTestEmailModal(state) {
      state.openTestEmail = false
    },
    openRevertModal(state) {
      state.openRevert = true
    },
    closeRevertModal(state) {
      state.openRevert = false
    },
    openDiscardModal(state, action: PayloadAction<number>) {
      state.targetTemplateVersionId = action.payload
      state.openDiscard = true
    },
    closeDiscardModal(state) {
      state.openDiscard = false
    },
    setTemplateContentState(state, action: PayloadAction<NewsletterTemplateContentState>) {
      state.templateContentState = action.payload
    },
    setTemplateState(state, action: PayloadAction<FeatureState>) {
      state.templateState = action.payload
    },
    setSaveState(state, action: PayloadAction<FeatureState>) {
      state.saveState = action.payload
    },
    setRestoreState(state, action: PayloadAction<FeatureState>) {
      state.restoreState = action.payload
    },
    setEmailState(state, action: PayloadAction<FeatureState>) {
      state.emailState = action.payload
    },
    setSegmentState(state, action: PayloadAction<FeatureState>) {
      state.segmentState = action.payload
    },
    clearNewsletterTemplate(state) {
      const localStorageKeys = ['gjs-html', 'gjs-css', 'gjs-assets', 'gjs-styles']
      localStorageKeys.forEach(key => localStorage.removeItem(key))
      state.template = undefined
      state.currentTemplateVersionId = undefined
      state.templateState = FeatureState.Initial
    },
    switchNewsletterVersion(state, action: PayloadAction<number>) {
      state.currentTemplateVersionId = action.payload
    },
    getTemplateSuccess(state, action: PayloadAction<Newsletter>) {
      state.template = action.payload
      state.currentTemplateVersionId = action.payload.history?.[0]?.id
      state.templateState = FeatureState.Success
    },
    getSegmentsSuccess(state, action: PayloadAction<Segment[]>) {
      state.segments = action.payload
      state.segmentState = FeatureState.Success
    },
    // For finding the bug in grapes.js
    logGrapesjsEvent(state, action: PayloadAction<any>) {
      state.log = action.payload
    }
  }
})

const {
  setTemplateState,
  setSaveState,
  setRestoreState,
  setEmailState,
  setSegmentState,
  setTemplateContentState
} = slice.actions
const { getTemplateSuccess } = slice.actions
const { getSegmentsSuccess } = slice.actions
const { clearNewsletterTemplate, switchNewsletterVersion, reset } = slice.actions
const { logGrapesjsEvent } = slice.actions
const {
  openSegmentEmailModal,
  closeSegmentEmailModal,
  openTestEmailModal,
  closeTestEmailModal,
  openRevertModal,
  closeRevertModal,
  openDiscardModal,
  closeDiscardModal
} = slice.actions

const getNewsletterTemplate = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(setTemplateState(FeatureState.Loading))
    const response = await api.emailTemplates.getEmailTemplate({
      id
    })
    await delay({}, 1000)
    // throw Error()
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
    dispatch(setTemplateState(FeatureState.Error))
  }
}

const saveNewsletterTemplateVersion = (content: string): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setSaveState(FeatureState.Loading))
    const id = getState().newsletterEditor.template?.id
    if (!id) {
      return
    }
    await api.emailTemplates.saveEmailTemplateVersion({
      id: id,
      emailTemplateVersionDto: {
        content
      }
    })
    dispatch(setSaveState(FeatureState.Success))
    dispatch(getNewsletterTemplate(id))
  } catch (err) {
    dispatch(setSaveState(FeatureState.Error))
  }
}

const restoreNewsletterTemplateVersion = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setRestoreState(FeatureState.Loading))
    const { template, currentTemplateVersionId } = getState().newsletterEditor
    const id = template?.id
    const version = template?.history?.find(h => h.id === currentTemplateVersionId)?.version
    if (id === undefined || version === undefined) return
    await api.emailTemplates.restoreEmailTemplateVersion({
      id: id,
      version: version
    })
    dispatch(setRestoreState(FeatureState.Success))
    dispatch(closeRevertModal())
    dispatch(getNewsletterTemplate(id))
  } catch (err) {
    dispatch(setRestoreState(FeatureState.Error))
  }
}

const sendNewsletterEmailExample = (email: string, subject: string): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(setEmailState(FeatureState.Loading))
    const templateId = getState().newsletterEditor.template?.id
    await api.emailSender.sendTestEmail({
      sendEmailsDto: {
        recipients: [email],
        emailTemplateId: templateId,
        emailSubject: subject
      }
    })
    dispatch(setEmailState(FeatureState.Success))
    dispatch(closeTestEmailModal())
    message.success(i18n.t('common.message.email-sent'), 5)
  } catch (err) {
    dispatch(setEmailState(FeatureState.Error))
  }
}

const getSegmentsForEmail = (): AppThunk => async dispatch => {
  try {
    dispatch(setSegmentState(FeatureState.Loading))
    const response = await api.segments.getSegments({
      pageSize: -1
    })
    const segments: any = response.result?.map(s => ({ ...s, id: '' + s.id }))
    dispatch(getSegmentsSuccess(segments ?? []))
  } catch (err) {
    dispatch(setSegmentState(FeatureState.Error))
  }
}

const sendNewsletterEmailToSegment = (segmentId: number, subject: string): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    const templateId = getState().newsletterEditor.template?.id
    dispatch(setEmailState(FeatureState.Loading))
    await api.emailSender.sendEmailToSegment({
      sendEmailToSegmentDto: {
        emailSubject: subject,
        emailTemplateId: templateId,
        segmentId: segmentId
      }
    })
    dispatch(setEmailState(FeatureState.Success))
    dispatch(closeSegmentEmailModal())
    message.success(i18n.t('common.message.email-sent'), 5)
  } catch (err) {
    dispatch(setEmailState(FeatureState.Error))
  }
}

export const newsletterEditorReducer = slice.reducer

export const newsletterEditorActions = {
  logGrapesjsEvent,
  reset,
  clearNewsletterTemplate,
  switchNewsletterVersion,
  openSegmentEmailModal,
  closeSegmentEmailModal,
  openTestEmailModal,
  closeTestEmailModal,
  openRevertModal,
  closeRevertModal,
  openDiscardModal,
  closeDiscardModal,
  setTemplateContentState,
  getNewsletterTemplate,
  sendNewsletterEmailToSegment,
  sendNewsletterEmailExample,
  getSegmentsForEmail,
  restoreNewsletterTemplateVersion,
  saveNewsletterTemplateVersion
}
