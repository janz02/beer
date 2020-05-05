import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { PartnerContact } from 'models/partnerContact'
import { message } from 'antd'
import i18n from 'app/i18n'
import { FeatureState } from 'models/featureState'
import { partnerContactListActions } from '../list/partnerContactListSlice'
import { delay } from 'services/temp/delay'

interface State {
  editingSelf: boolean
  editorOpen: boolean
  inviterOpen: boolean
  editorState: FeatureState
  inviterState: FeatureState
  contact?: PartnerContact
  inviterPartnerId?: number
}

const initialState: State = {
  editingSelf: false,
  editorOpen: false,
  inviterOpen: false,
  editorState: FeatureState.Initial,
  inviterState: FeatureState.Initial
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
    openInviter(state, action: PayloadAction<{ partnerId: number }>) {
      state.inviterOpen = true
      state.inviterPartnerId = action.payload.partnerId
    },
    closeInviter(state) {
      state.inviterOpen = false
      state.inviterPartnerId = undefined
    },
    clearContactData(state) {
      state.contact = undefined
      state.editingSelf = false
      state.editorState = FeatureState.Initial
    },
    setEditorState(state, action: PayloadAction<FeatureState>) {
      state.editorState = action.payload
    },
    setInviterState(state, action: PayloadAction<FeatureState>) {
      state.inviterState = action.payload
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
    sendInvitatonSuccess(state) {
      state.inviterOpen = false
      state.inviterState = FeatureState.Success
      message.success(i18n.t('common.message.email-sent'), 5)
    }
  }
})
const { closeEditor, openEditor, closeInviter, openInviter } = slice.actions
const { setEditorState, setInviterState } = slice.actions
const { reset, clearContactData, getContactSuccess } = slice.actions
const { saveContactSuccess, sendInvitatonSuccess } = slice.actions

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

const sendInvitation = (email: string): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setInviterState(FeatureState.Loading))
    const partnerId = getState().partnerContactModal.inviterPartnerId
    // TODO: integrate
    // await api.partnerContacts.sendInvitation({ partnerId, email })
    await delay({}, 1000)
    console.log({ partnerId, email })

    dispatch(sendInvitatonSuccess())
  } catch (err) {
    dispatch(setInviterState(FeatureState.Error))
  }
}

export const partnerContactModalReducer = slice.reducer

export const partnerContactModalActions = {
  reset,
  closeEditor,
  clearContactData,
  openInviter,
  closeInviter,
  sendInvitation,
  saveContact,
  inspectContact
}
