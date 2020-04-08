import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { Partner } from 'models/partner'
import { api } from 'api'
import { PartnerDto, PartnerState } from 'api/swagger'
import { history } from 'router/router'
import i18n from 'app/i18n'
import { message } from 'antd'

interface PartnerEditorState {
  partner?: Partner
  error: boolean
  loading: boolean
  loadingState: boolean
}

const initialState: PartnerEditorState = {
  error: false,
  loading: false,
  loadingState: false
}

const partnerEditorSlice = createSlice({
  name: 'partnerEditor',
  initialState,
  reducers: {
    resetPartnerEditor: () => initialState,
    getPartnerRequest(state) {
      state.loading = true
    },
    getPartnerSuccess(state, action: PayloadAction<Partner>) {
      state.partner = action.payload
      state.loading = false
      state.error = false
    },
    getParnterFail(state) {
      state.loading = false
      state.error = true
    },
    savePartnerRequest(state) {
      state.loading = true
    },
    savePartnerSuccess(state) {
      state.loading = false
      state.error = false
    },
    savePartnerFail(state) {
      state.loading = false
      state.error = true
    },
    deletePartnerRequest() {},
    deletePartnerSuccess() {},
    deletePartnerFail() {},
    setPartnerStateRequest(state) {
      state.loadingState = true
    },
    setPartnerStateSuccess(state) {
      state.loadingState = false
    },
    setPartnerStateFail(state) {
      state.loadingState = false
    }
  }
})

const { getPartnerSuccess, getParnterFail, getPartnerRequest } = partnerEditorSlice.actions
const { deletePartnerRequest, deletePartnerSuccess, deletePartnerFail } = partnerEditorSlice.actions
const { savePartnerSuccess, savePartnerFail, savePartnerRequest } = partnerEditorSlice.actions
const {
  setPartnerStateRequest,
  setPartnerStateSuccess,
  setPartnerStateFail
} = partnerEditorSlice.actions

export const { resetPartnerEditor } = partnerEditorSlice.actions

export const partnerEditorReducer = partnerEditorSlice.reducer

export const getPartner = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(getPartnerRequest())
    const partner = await api.partner.getPartner({ id })
    dispatch(getPartnerSuccess(partner))
  } catch (err) {
    dispatch(getParnterFail())
  }
}

export const savePartner = (data: Partner): AppThunk => async (dispatch, getState) => {
  try {
    const partner = getState().partnerEditor.partner
    dispatch(savePartnerRequest())

    if (partner?.id) {
      await api.partner.updatePartner({
        id: partner.id,
        partnerDto: {
          ...partner,
          ...data
        } as PartnerDto
      })
      dispatch(getPartner(partner.id))
    } else {
      const response = await api.partner.createPartner({ partnerDto: data as PartnerDto })

      history.push(`/partners/${response.id}`)
    }
    dispatch(savePartnerSuccess())
    message.success(i18n.t('common.message.save-success'), 5)
  } catch (err) {
    dispatch(savePartnerFail())
  }
}

export const deletePartner = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(deletePartnerRequest())
    await api.partner.deletePartner({ id })
    dispatch(deletePartnerSuccess())
    message.success(i18n.t('common.message.delete-success'), 5)
    history.push(`/partners`)
    return { id }
  } catch (err) {
    dispatch(deletePartnerFail())
    return { id, error: true }
  }
}

export const setPartnerState = (id: number, state: PartnerState): AppThunk => async dispatch => {
  try {
    dispatch(setPartnerStateRequest())
    await api.partner.activatePartner({
      id,
      activatePartnerDto: {
        state
      }
    })
    dispatch(setPartnerStateSuccess())
    id && dispatch(getPartner(id))
    return { id }
  } catch (err) {
    dispatch(setPartnerStateFail())
    return { id, error: true }
  }
}
