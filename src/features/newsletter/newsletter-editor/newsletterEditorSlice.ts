// import { createSlice } from '@reduxjs/toolkit'

import { AppThunk } from 'app/store'
import { NewsletterData } from 'models/newsletter'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api } from 'api'
import moment from 'moment'

interface NewsletterEditorState {
  error: string
  currentTemplateVersionId?: number
  template?: NewsletterData
}

const initialState: NewsletterEditorState = {
  error: ''
}

const newsletterEditorSlice = createSlice({
  name: 'newsletterEditor',
  initialState,
  reducers: {
    saveTemplateVersionRequest(state) {},
    saveTemplateVersionSuccess(state) {},
    saveTemplateVersionFail(state, action: PayloadAction<string>) {},
    restoreTemplateVersionSuccess(state) {},
    restoreTemplateVersionFail(state, action: PayloadAction<string>) {},
    getTemplateSuccess(state, action: PayloadAction<NewsletterData>) {
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
    }
  }
})

const { saveTemplateVersionSuccess, saveTemplateVersionFail } = newsletterEditorSlice.actions
const { restoreTemplateVersionSuccess, restoreTemplateVersionFail } = newsletterEditorSlice.actions
const { getTemplateSuccess, getTemplateFail } = newsletterEditorSlice.actions
export const { clearNewsletterTemplate, switchNewsletterVersion } = newsletterEditorSlice.actions

export default newsletterEditorSlice.reducer

export const getNewsletterTemplate = (id: number): AppThunk => async (dispatch, getState) => {
  try {
    const response = await api.emailTemplates.getTemplate({
      id
    })
    const data: NewsletterData = {
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
    dispatch(saveTemplateVersionSuccess())
    dispatch(getNewsletterTemplate(id))
    return true
  } catch (err) {
    dispatch(saveTemplateVersionFail(err.toString()))
    return false
  }
}

export const restoreNewsletterTemplateVersion = (): AppThunk => async (dispatch, getState) => {
  try {
    const { template, currentTemplateVersionId } = getState().newsletterEditor
    const id = template?.id
    const version = template?.history?.find(h => h.id === currentTemplateVersionId)?.version
    if (id === undefined || version === undefined) return
    await api.emailTemplates.restoreTemplateVersion({
      id: id,
      version: version
    })
    dispatch(restoreTemplateVersionSuccess())
    dispatch(getNewsletterTemplate(id!))
  } catch (err) {
    dispatch(restoreTemplateVersionFail(err.toString()))
  }
}
