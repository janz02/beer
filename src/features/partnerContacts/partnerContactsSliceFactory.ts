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
import { Roles } from 'api/swagger'
import { message } from 'antd'
import i18n from 'app/i18n'

export interface PartnerContactsState {
  contacts: PartnerContact[]
  editedContact?: PartnerContact
  listParams: ListRequestParams
  listConstraintParams?: ListRequestParams
  loadingList: boolean
  loadingEditor: boolean
  error: string
}

type TakenCommonSliceActions<T> = Pick<
  CommonSliceActions<T>,
  'getList' | 'clearEditor' | 'reset' | 'saveItem' | 'getItem' | 'setListConstraints'
>
export interface PartnerContactsSliceActions extends TakenCommonSliceActions<PartnerContact> {
  deleteItem: (id: number, role: Roles) => AppThunk
}

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
      saveItemRequest(state) {
        state.loadingEditor = true
      },
      saveItemSuccess(state) {
        state.loadingEditor = false
        state.error = ''
        message.success(i18n.t('user-access.msg.change-succesful'), 5)
      },
      saveItemFail(state, action: PayloadAction<string>) {
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
        message.success(i18n.t('common.message.delete-success'), 5)
      },
      deleteItemFail(state) {
        state.loadingList = false
      }
    }
  })
  const { getListSuccess, getListRequest, getListFail } = slice.actions
  const { getItemSuccess, getItemRequest, getItemFail } = slice.actions
  const { deleteItemRequest, deleteItemSuccess, deleteItemFail } = slice.actions
  const { saveItemRequest, saveItemSuccess, saveItemFail } = slice.actions
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
      const contact = await api.partnerContacts.getOnePartnerContact({ id })

      // FIX: User without role can come with role: 0, caused by the AD sync according to the BE
      if ((contact.role as any) === 0) delete contact.role

      dispatch(getItemSuccess(contact))
    } catch (err) {
      dispatch(getItemFail(err.toString()))
    }
  }

  const clearEditor = (): AppThunk => async dispatch => {
    dispatch(_clearEditor())
  }

  const saveItem = (id: number, data: PartnerContact): AppThunk => async dispatch => {
    try {
      const state = ((await dispatch(getSliceState())) as any) as PartnerContactsState
      dispatch(saveItemRequest())

      // TODO: consider joning these updates into one endpoint
      await api.partnerContacts.updatePartnerContact({
        id,
        partnerContactDto: {
          name: data.name,
          email: data.email,
          phone: data.phone
        }
      })
      await api.auth.updatePartnerContactInfo({
        id,
        partnerContactStateDto: {
          role: data.role!,
          isActive: state.editedContact?.isActive
        }
      })
      dispatch(saveItemSuccess())
      dispatch(getList())
      return { id }
    } catch (err) {
      dispatch(saveItemFail(err.toString()))
      return { id, error: true }
    }
  }

  const deleteItem = (id: number, role: Roles): AppThunk => async dispatch => {
    try {
      dispatch(deleteItemRequest())
      const state = ((await dispatch(getSliceState())) as any) as PartnerContactsState
      await api.auth.updatePartnerContactInfo({
        id,
        partnerContactStateDto: {
          role: role,
          isActive: false
        }
      })
      dispatch(deleteItemSuccess())
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
