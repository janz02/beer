import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { Partner } from 'models/partner'
import { message } from 'antd'
import i18n from 'app/i18n'
import { api } from 'api'

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

export const getPartners = (): AppThunk => async (dispatch, getState) => {
  dispatch(setLoadingStart())

  try {
    const id = getState().auth.userData.partnerId
    if (id) {
      const partner = await api.partner.getPartners({ id })
      dispatch(
        getPartnersSuccess({
          ...partner
        })
      )
    }
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}

export const updatePartners = (partner: Partner): AppThunk => async (dispatch, getState) => {
  dispatch(setLoadingStart())

  try {
    const id = getState().auth.userData.partnerId
    if (id) {
      await api.partner.updatePartners({
        id,
        partnerDto: {
          ...getState().partner.partner,
          ...partner
        }
      })

      dispatch(updatePartnerSuccess())
    }
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}
