import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import {
  ListRequestParams,
  recalculatePaginationAfterDeletion,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { SliceFactoryUtils, SliceFactoryProps, CommonSliceActions } from 'models/reusableFeature'
import { PartnerContact } from 'models/partnerContact'
import { delay } from 'services/temp/delay'

export interface PartnerContactsState {
  contacts: PartnerContact[]
  editedContact?: PartnerContact
  listParams: ListRequestParams
  listConstraintParams?: ListRequestParams
  loadingList: boolean
  loadingEditor: boolean
  error: string
}

export type PartnerContactsSliceActions = CommonSliceActions<PartnerContact>

interface PartnerContactsSliceFactoryUtils extends SliceFactoryUtils<PartnerContactsState> {
  actions: PartnerContactsSliceActions
}

const sliceFactory = (props: SliceFactoryProps): PartnerContactsSliceFactoryUtils => {
  const { name, getSliceState } = props

  const initialState: PartnerContactsState = {
    contacts: [],
    listParams: {
      pageSize: 10
    },
    loadingList: false,
    loadingEditor: false,
    error: ''
  }
  const slice = createSlice({
    name,
    initialState,
    reducers: {
      _reset: () => initialState,
      _setListConstraints(state, action: PayloadAction<ListRequestParams>) {
        state.listConstraintParams = action.payload
      },
      _clearEditor(state) {
        state.editedContact = undefined
        state.loadingEditor = false
      },
      getItemRequest(state) {
        state.loadingEditor = true
      },
      getItemSuccess(state, action: PayloadAction<PartnerContact>) {
        state.editedContact = action.payload
        state.loadingEditor = false
        state.error = ''
      },
      getItemFail(state, action: PayloadAction<string>) {
        state.loadingEditor = false
        state.error = action.payload
      },
      getListRequest(state) {
        state.loadingList = true
      },
      getListSuccess(
        state,
        action: PayloadAction<{ contacts: PartnerContact[]; listParams: ListRequestParams }>
      ) {
        state.contacts = action.payload.contacts
        state.listParams = action.payload.listParams
        state.loadingList = false
        state.error = ''
      },
      getListFail(state, action: PayloadAction<string>) {
        state.loadingList = false
        state.error = action.payload
      },
      deleteItemRequest(state) {
        state.loadingList = true
      },
      deleteItemSuccess(state) {
        state.loadingList = false
      },
      deleteItemFail(state) {
        state.loadingList = false
      }
    }
  })
  const { getListSuccess, getListRequest, getListFail } = slice.actions
  const { getItemSuccess, getItemRequest, getItemFail } = slice.actions
  const { deleteItemRequest, deleteItemSuccess, deleteItemFail } = slice.actions
  const { _reset, _setListConstraints, _clearEditor } = slice.actions

  const reducer = slice.reducer

  const getList = (params: ListRequestParams = {}): AppThunk => async dispatch => {
    try {
      dispatch(getListRequest())

      const state = ((await dispatch(getSliceState())) as any) as PartnerContactsState
      if (isNaN(state.listConstraintParams?.partnerId)) {
        throw Error('Invalid partner id: ' + state.listConstraintParams?.partnerId)
      }

      const revisedParams = reviseListRequestParams(state.listParams, params)
      const { result, ...pagination } = await api.partnerContacts.getPartnerPartnerContact({
        ...revisedParams,
        ...state.listConstraintParams
      })
      dispatch(
        getListSuccess({
          contacts: result as PartnerContact[],
          listParams: storableListRequestParams(revisedParams, pagination)
        })
      )
    } catch (err) {
      dispatch(getListFail(err.toString()))
    }
  }

  const getItem = (id: number): AppThunk => async dispatch => {
    try {
      dispatch(getItemRequest())
      const contact = await api.auth.getPartnerContactInfo({ id })
      dispatch(getItemSuccess(contact))
    } catch (err) {
      dispatch(getItemFail(err.toString()))
    }
  }

  const clearEditor = (): AppThunk => async dispatch => {
    dispatch(_clearEditor())
  }

  const saveItem = (id: number, data: PartnerContact): AppThunk => async dispatch => {
    // TODO: integrate
    await delay()
    console.log('save', { id, data })
  }

  const deleteItem = (id: number): AppThunk => async dispatch => {
    dispatch(deleteItemRequest())
    try {
      // TODO: integrate
      // await api.auth.updatePartnerContactInfo({ ?? })
      await delay()
      dispatch(deleteItemSuccess())
      const state = ((await dispatch(getSliceState())) as any) as PartnerContactsState
      const newPage = recalculatePaginationAfterDeletion(state.listParams)
      dispatch(getList({ page: newPage }))
      return { id }
    } catch (err) {
      dispatch(deleteItemFail())
      return { id, error: true }
    }
  }

  const reset = (): AppThunk => async dispatch => {
    dispatch(_reset())
  }

  const setListConstraints = (params: ListRequestParams = {}): AppThunk => async dispatch => {
    dispatch(_setListConstraints(params))
  }

  return {
    reducer,
    actions: {
      getItem,
      deleteItem,
      getList,
      reset,
      setListConstraints,
      clearEditor,
      saveItem
    }
  }
}

export const partnerContactsSlice = sliceFactory({
  name: 'partnerContacts',
  getSliceState: (): AppThunk => async (_, getState) => {
    return getState().partnerContacts
  }
})

export const contactsSlice = sliceFactory({
  name: 'contacts',
  getSliceState: (): AppThunk => async (_, getState) => {
    return getState().contacts
  }
})