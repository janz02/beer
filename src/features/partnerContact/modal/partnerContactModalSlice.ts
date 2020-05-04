import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { PartnerContact } from 'models/partnerContact'
import { message } from 'antd'
import i18n from 'app/i18n'
import { FeatureState } from 'models/featureState'
import { partnerContactListActions } from '../list/partnerContactListSlice'

interface State {
  editingSelf: boolean
  editorOpen: boolean
  emailOpen: boolean
  editorState: FeatureState
  emailState: FeatureState
  contact?: PartnerContact
}

const initialState: State = {
  editingSelf: false,
  editorOpen: false,
  emailOpen: false,
  editorState: FeatureState.Initial,
  emailState: FeatureState.Initial
}

const slice = createSlice({
  name: 'partnerContactModal',
  initialState,
  reducers: {
    reset: () => initialState,
    openEditor(state) {
      state.editorOpen = true
    },
    closeEditor(state) {
      state.editorOpen = false
    },
    openEmail(state) {
      state.emailOpen = true
    },
    closeEmail(state) {
      state.emailOpen = false
    },
    clearContactData(state) {
      state.contact = undefined
      state.editingSelf = false
      state.editorState = FeatureState.Initial
    },
    setEditorState(state, action: PayloadAction<FeatureState>) {
      state.editorState = action.payload
    },
    setEmailState(state, action: PayloadAction<FeatureState>) {
      state.emailState = action.payload
    },
    getContactSuccess(
      state,
      action: PayloadAction<{ contact: PartnerContact; editingSelf: boolean }>
    ) {
      state.contact = action.payload.contact
      state.editingSelf = action.payload.editingSelf
      state.editorState = FeatureState.Success
    },
    saveContactSuccess(state) {
      state.editorOpen = false
      state.editorState = FeatureState.Success
      message.success(i18n.t('common.message.save-success'), 5)
    },
    sendEmailSuccess(state) {
      state.emailOpen = false
      state.emailState = FeatureState.Success
      message.success(i18n.t('common.message.email-sent'), 5)
    }
  }
})
const { closeEditor, openEditor } = slice.actions
const { setEditorState } = slice.actions
const { reset, clearContactData, getContactSuccess } = slice.actions
const { saveContactSuccess } = slice.actions

const inspectContact = (id: number): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(openEditor())
    dispatch(setEditorState(FeatureState.Loading))
    const contact = await api.partnerContacts.getOnePartnerContact({ id })

    // FIX: User without role can come with role: 0, caused by the AD sync according to the BE
    if ((contact.role as any) === 0) delete contact.role

    const selfId = getState().auth.userData.id
    const editingSelf = selfId === contact.id

    dispatch(getContactSuccess({ contact, editingSelf }))
  } catch (err) {
    dispatch(setEditorState(FeatureState.Error))
  }
}

const saveContact = (id: number, data: PartnerContact): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setEditorState(FeatureState.Loading))

    // TODO: consider joning these updates into one endpoint
    await api.partnerContacts.updatePartnerContact({
      id,
      partnerContactDto: {
        name: data.name,
        email: data.email,
        phone: data.phone
      }
    })

    const savingSelf = getState().partnerContactModal.editingSelf
    if (!savingSelf && typeof data.role === 'string') {
      await api.auth.updatePartnerContactInfo({
        id,
        partnerContactStateDto: {
          role: data.role!,
          isActive: data.isActive
        }
      })
    }
    dispatch(saveContactSuccess())
    dispatch(partnerContactListActions.getContacts())
  } catch (err) {
    dispatch(setEditorState(FeatureState.Error))
  }
}

export const partnerContactModalReducer = slice.reducer

export const partnerContactModalActions = {
  reset,
  openEditor,
  closeEditor,
  clearContactData,
  saveContact,
  inspectContact
}
