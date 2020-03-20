import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { Partner } from 'models/partner'
import { message } from 'antd'
import i18n from 'app/i18n'
import { api } from 'api'

interface SelfPartnerState {
  partner?: Partner
  error: string | null
  loading: boolean
}

const initialState: SelfPartnerState = {
  error: null,
  loading: false
}

const selfPartnerSlice = createSlice({
  name: 'selfPartner',
  initialState,
  reducers: {
    resetSelfPartner: () => initialState,
    getPartnersSuccess(state, action: PayloadAction<Partner>) {
      state.partner = action.payload

      state.loading = false
      state.error = null
    },
    updatePartnerSuccess(state) {
      message.success(i18n.t('partner.save-partner-success'), 10)
      state.loading = false
      state.error = null
    },
    setLoadingStart(state) {
      state.loading = true
    },
    setLoadingFailed(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    }
  }
})

const {
  getPartnersSuccess,
  updatePartnerSuccess,
  setLoadingStart,
  setLoadingFailed
} = selfPartnerSlice.actions

export const { resetSelfPartner } = selfPartnerSlice.actions

export const selfPartnerReducer = selfPartnerSlice.reducer

export const getMyPartner = (): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  try {
    const partner = await api.partner.getSelfPartner()
    dispatch(
      getPartnersSuccess({
        ...partner
      })
    )
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}

export const updateMyPartner = (partner: Partner): AppThunk => async (dispatch, getState) => {
  dispatch(setLoadingStart())

  try {
    await api.partner.updateSelfPartner({
      partnerDto: {
        ...getState().selfPartner.partner,
        ...partner,
        registrationNumber: 'todo',
        taxNumber: 'todo',
        bankAccount: 'todo'
      }
    })

    dispatch(updatePartnerSuccess())
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}
