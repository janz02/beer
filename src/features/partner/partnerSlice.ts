import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { Partner } from 'models/partner'
import { message } from 'antd'
import i18n from 'app/i18n'

interface PartnerState {
  partner?: Partner
  error: string | null
  loading: boolean
}

const initialState: PartnerState = {
  error: null,
  loading: false
}

const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
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

export const {
  getPartnersSuccess,
  updatePartnerSuccess,
  setLoadingStart,
  setLoadingFailed
} = partnerSlice.actions

export default partnerSlice.reducer

export const getPartners = (): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  const partner: Partner = {
    id: 1,
    name: 'Partner 1',
    active: true,
    majorPartner: true,
    address: 'Example address',
    companyRegisterNumber: '321-3123-31313',
    vatNumber: 2132132131
  }
  dispatch(getPartnersSuccess(partner))
}

export const updatePartners = (partner: Partner): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  // TODO: integrate
  dispatch(updatePartnerSuccess())
}
