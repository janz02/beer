import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { Partner } from 'models/partner'
import { api } from 'api'
import { PartnerDto } from 'api/swagger'
import { history } from 'router/router'
import { ListRequestParams } from 'hooks/useTableUtils'
import i18n from 'app/i18n'
import { message } from 'antd'

interface PartnerEditorState {
  partner?: Partner
  contacts?: any[]
  contactListParams: ListRequestParams
  error: boolean
  errorSites: boolean
  errorContact: boolean
  loading: boolean
  loadingContact: boolean
}

const initialState: PartnerEditorState = {
  contactListParams: {
    pageSize: 10
  },
  error: false,
  errorSites: false,
  errorContact: false,
  loading: false,
  loadingContact: false
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
    savePartnerRequest(state, action: PayloadAction<Partner>) {
      state.loading = true
    },
    savePartnerSuccess(state) {
      state.loading = false
      state.error = false
    },
    saveParnterFail(state) {
      state.loading = false
      state.error = true
    },
    getPartnerContactsRequest(state) {
      state.loadingContact = true
    },
    getPartnerContactsSuccess(
      state,
      action: PayloadAction<{ contacts: any[]; listParams: ListRequestParams }>
    ) {
      state.contacts = action.payload.contacts
      state.contactListParams = action.payload.listParams
      state.loadingContact = false
      state.errorContact = false
    },
    getPartnerContactsFail(state) {
      state.loadingContact = false
      state.errorContact = true
    },
    resetPartnerContacts(state) {
      state.contacts = []
      state.contactListParams = {
        pageSize: 10
      }
      state.loadingContact = false
      state.errorContact = false
    },
    deletePartnerRequest() {},
    deletePartnerSuccess() {},
    deletePartnerFail() {}
  }
})

const { getPartnerSuccess, getParnterFail, getPartnerRequest } = partnerEditorSlice.actions
const { deletePartnerRequest, deletePartnerSuccess, deletePartnerFail } = partnerEditorSlice.actions
const { savePartnerSuccess, saveParnterFail, savePartnerRequest } = partnerEditorSlice.actions
const {
  getPartnerContactsRequest,
  getPartnerContactsSuccess,
  getPartnerContactsFail,
  resetPartnerContacts
} = partnerEditorSlice.actions

export const { resetPartnerEditor } = partnerEditorSlice.actions

export const partnerEditorReducer = partnerEditorSlice.reducer

export const getPartnerContacts = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(getPartnerContactsRequest())
    const id = getState().partnerEditor.partner?.id
    // const revisedParams = reviseListRequestParams(
    //   getState().partnerEditor.contactListParams,
    //   params
    // )
    if (id) {
      // TODO: integrrate
      // const { result, ...pagination } = await api.sites.getSites({
      //   ...revisedParams,
      //   partnerId: id
      // })
      dispatch(
        getPartnerContactsSuccess({
          contacts: [] as any[],
          listParams: {} // storableListRequestParams(revisedParams, pagination)
        })
      )
    } else {
      dispatch(resetPartnerContacts())
    }
  } catch (err) {
    dispatch(getPartnerContactsFail())
  }
}

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
    dispatch(savePartnerRequest(data))

    console.log({ data })

    if (partner?.id) {
      console.log('UPDATE')

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
      console.log('CREATE')

      history.push(`/partners/${response.id}`)
    }
    dispatch(savePartnerSuccess())
    message.success(i18n.t('common.message.save-success'), 5)
  } catch (err) {
    dispatch(saveParnterFail())
  }
}

export const deletePartner = (id: number): AppThunk => async (dispatch, getState) => {
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
