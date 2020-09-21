import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import {
  ListRequestParams,
  recalculatePaginationAfterDeletion,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { PartnerContact } from 'models/partnerContact'
import { Roles } from 'api/swagger/coupon'
import { message } from 'antd'
import i18n from 'app/i18n'
import { FeatureState } from 'models/featureState'

interface State {
  editorOpen: boolean
  listState: FeatureState
  editorState: FeatureState
  deleteState: FeatureState
  contacts: PartnerContact[]
  editedContact?: PartnerContact
  listParams: ListRequestParams
  listConstraintParams?: ListRequestParams
  loadingList: boolean
  loadingEditor: boolean
  error: string
}

const initialState: State = {
  editorOpen: false,
  listState: FeatureState.Initial,
  editorState: FeatureState.Initial,
  deleteState: FeatureState.Initial,
  contacts: [],
  listParams: {
    pageSize: 10
  },
  loadingList: false,
  loadingEditor: false,
  error: ''
}
const slice = createSlice({
  name: 'partnerContactList',
  initialState,
  reducers: {
    reset: () => initialState,
    resetListParams(state) {
      state.listParams = initialState.listParams
    },
    setListState(state, action: PayloadAction<FeatureState>) {
      state.listState = action.payload
    },
    setDeleteState(state, action: PayloadAction<FeatureState>) {
      state.deleteState = action.payload
    },
    setListConstraints(state, action: PayloadAction<ListRequestParams>) {
      state.listConstraintParams = action.payload
    },
    getContactsSuccess(
      state,
      action: PayloadAction<{ contacts: PartnerContact[]; listParams: ListRequestParams }>
    ) {
      state.contacts = action.payload.contacts
      state.listParams = action.payload.listParams
      state.listState = FeatureState.Success
    },
    deleteContactSuccess() {
      message.success(i18n.t('common.message.delete-success'), 5)
    }
  }
})
const { getContactsSuccess, deleteContactSuccess } = slice.actions
const { reset, resetListParams, setListState, setDeleteState, setListConstraints } = slice.actions

const getContacts = (params: ListRequestParams = {}): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setListState(FeatureState.Loading))

    const state = getState().partnerContactList
    const partnerId = state.listConstraintParams?.partnerId
    if (!partnerId || isNaN(partnerId)) {
      throw Error('Invalid partner id: ' + partnerId)
    }

    const revisedParams = reviseListRequestParams(state.listParams, params)
    const { result, ...pagination } = await api.coupon.partnerContacts.getPartnerPartnerContact({
      ...revisedParams,
      ...state.listConstraintParams
    })
    dispatch(
      getContactsSuccess({
        contacts: result as PartnerContact[],
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(setListState(FeatureState.Error))
  }
}

const resetContactFilters = (): AppThunk => async dispatch => {
  dispatch(resetListParams())
  dispatch(getContacts())
}

const deleteContact = (id: number, role: Roles): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setDeleteState(FeatureState.Loading))
    const state = getState().partnerContactList
    //  TODO: Integrate new delete endpoint
    await api.coupon.auth.updatePartnerContactState({
      id,
      partnerContactStateDto: {
        role: role,
        isActive: false
      }
    })
    dispatch(deleteContactSuccess())
    const newPage = recalculatePaginationAfterDeletion(state.listParams)
    dispatch(getContacts({ page: newPage }))
    return { id }
  } catch (err) {
    dispatch(setDeleteState(FeatureState.Loading))
    return { id, error: true }
  }
}

export const partnerContactListReducer = slice.reducer

export const partnerContactListActions = {
  reset,
  setListConstraints,
  getContacts,
  resetContactFilters,
  deleteContact
}
