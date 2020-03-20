import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { Partner } from 'models/partner'
import { api } from 'api'

interface PartnerEditorState {
  partner?: Partner
  error: boolean
  loading: boolean
}

const initialState: PartnerEditorState = {
  partner: undefined,
  error: false,
  loading: false
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
    }
  }
})

const { getPartnerSuccess, getParnterFail, getPartnerRequest } = partnerEditorSlice.actions

export const { resetPartnerEditor } = partnerEditorSlice.actions

export const partnerEditorReducer = partnerEditorSlice.reducer

export const getPartner = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(getPartnerRequest())
    const partner = await api.partner.getPartner({ id })
    dispatch(getPartnerSuccess({ ...partner }))
  } catch (err) {
    dispatch(getParnterFail())
  }
}
