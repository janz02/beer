import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { Partner } from 'models/partner'
import { api } from 'api'
import { PartnerDto } from 'api/swagger'
import { history } from 'router/router'
import {
  ListRequestParams,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { Site } from 'models/site'

interface PartnerEditorState {
  partner?: Partner
  sites?: Site[]
  contacts?: any[]
  siteListParams: ListRequestParams
  contactListParams: ListRequestParams
  error: boolean
  errorSites: boolean
  errorContact: boolean
  loading: boolean
  loadingSites: boolean
  loadingContact: boolean
}

const initialState: PartnerEditorState = {
  siteListParams: {
    pageSize: 10
  },
  contactListParams: {
    pageSize: 10
  },
  error: false,
  errorSites: false,
  errorContact: false,
  loading: false,
  loadingSites: false,
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
    getPartnerSitesRequest(state) {
      state.loadingSites = true
    },
    getPartnerSitesSuccess(
      state,
      action: PayloadAction<{ sites: Site[]; listParams: ListRequestParams }>
    ) {
      state.sites = action.payload.sites
      state.siteListParams = action.payload.listParams
      state.loadingSites = false
      state.errorContact = false
    },
    getPartnerSitesFail(state) {
      state.loadingSites = false
      state.errorContact = true
    },
    resetPartnerSites(state) {
      state.sites = []
      state.siteListParams = {
        pageSize: 10
      }
      state.loadingSites = false
      state.errorSites = false
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
    }
  }
})

const { getPartnerSuccess, getParnterFail, getPartnerRequest } = partnerEditorSlice.actions
const { savePartnerSuccess, saveParnterFail, savePartnerRequest } = partnerEditorSlice.actions
const {
  getPartnerSitesRequest,
  getPartnerSitesSuccess,
  getPartnerSitesFail,
  resetPartnerSites
} = partnerEditorSlice.actions
const {
  getPartnerContactsRequest,
  getPartnerContactsSuccess,
  getPartnerContactsFail,
  resetPartnerContacts
} = partnerEditorSlice.actions

export const { resetPartnerEditor } = partnerEditorSlice.actions

export const partnerEditorReducer = partnerEditorSlice.reducer

export const getPartnerSites = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(getPartnerSitesRequest())
    const id = getState().partnerEditor.partner?.id
    const revisedParams = reviseListRequestParams(getState().partnerEditor.siteListParams, params)
    if (id) {
      const { result, ...pagination } = await api.sites.getSites({
        ...revisedParams,
        partnerId: id
      })
      dispatch(
        getPartnerSitesSuccess({
          sites: result as Site[],
          listParams: storableListRequestParams(revisedParams, pagination)
        })
      )
    } else {
      dispatch(resetPartnerSites())
    }
  } catch (err) {
    dispatch(getPartnerSitesFail())
  }
}

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
  } catch (err) {
    dispatch(saveParnterFail())
  }
}
