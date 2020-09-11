import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { couponApi } from 'api'
import {
  ListRequestParams,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { UserAccess, UserType } from 'models/user'
import { message } from 'antd'
import i18n from 'app/i18n'
import { Roles } from 'api/coupon-api/models'
import { FeatureState } from 'models/featureState'
import { getPartners } from 'features/partners/partnerList/partnerListSlice'

interface State {
  nkmUsers: UserAccess[]
  partnerUsers: UserAccess[]
  nkmListParams: ListRequestParams
  partnerListParams: ListRequestParams
  editedUser?: UserAccess
  editorState: FeatureState
  nkmListState: FeatureState
  partnerListState: FeatureState
  editorOpen: boolean
  editedUserType?: UserType
}

const initialState: State = {
  nkmUsers: [],
  partnerUsers: [],
  nkmListParams: {
    pageSize: 10
  },
  partnerListParams: {
    pageSize: 10
  },
  editorState: FeatureState.Initial,
  nkmListState: FeatureState.Initial,
  partnerListState: FeatureState.Initial,
  editorOpen: false
}

const slice = createSlice({
  name: 'userAccess',
  initialState,
  reducers: {
    reset: () => initialState,
    openEditor(state, action: PayloadAction<UserType>) {
      state.editedUserType = action.payload
      state.editorOpen = true
    },
    closeEditor(state) {
      state.editorOpen = false
    },
    setNkmListState(state, action: PayloadAction<FeatureState>) {
      state.nkmListState = action.payload
    },
    setPartnerListState(state, action: PayloadAction<FeatureState>) {
      state.partnerListState = action.payload
    },
    setEditorState(state, action: PayloadAction<FeatureState>) {
      state.editorState = action.payload
    },
    clearUserAccessEditor(state) {
      state.editedUser = undefined
      state.editorState = FeatureState.Initial
      state.editedUserType = undefined
    },
    getNkmUsersSuccess(
      state,
      action: PayloadAction<{ users: UserAccess[]; listParams: ListRequestParams }>
    ) {
      state.nkmUsers = action.payload.users
      state.nkmListParams = action.payload.listParams
      state.nkmListState = FeatureState.Success
    },
    getPartnerUsersSuccess(
      state,
      action: PayloadAction<{ users: UserAccess[]; listParams: ListRequestParams }>
    ) {
      state.partnerUsers = action.payload.users
      state.partnerListParams = action.payload.listParams
      state.partnerListState = FeatureState.Success
    },
    getUserSuccess(state, action: PayloadAction<UserAccess>) {
      state.editedUser = action.payload
      state.editorState = FeatureState.Success
    },
    saveUserSuccess(state) {
      state.editorState = FeatureState.Success
    }
  }
})
const { openEditor, closeEditor } = slice.actions
const { setEditorState, setNkmListState, setPartnerListState } = slice.actions
const { clearUserAccessEditor, reset } = slice.actions
const {
  getNkmUsersSuccess,
  getPartnerUsersSuccess,
  getUserSuccess,
  saveUserSuccess
} = slice.actions

const getNkmUsers = (
  params: ListRequestParams = {},
  ignoreCurrentParams = false
): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setNkmListState(FeatureState.Loading))
    const revisedParams = ignoreCurrentParams
      ? params
      : reviseListRequestParams(getState().userAccess.nkmListParams, params)
    const { result, ...pagination } = await couponApi.auth.getNkmPartnerContacts(revisedParams)

    dispatch(
      getNkmUsersSuccess({
        users: result as UserAccess[],
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(setNkmListState(FeatureState.Error))
  }
}

const resetNkmUsersFilters = (): AppThunk => getNkmUsers(initialState.nkmListParams, true)

const getPartnerUsers = (
  params: ListRequestParams = {},
  ignoreCurrentParams = false
): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setPartnerListState(FeatureState.Loading))
    const revisedParams = ignoreCurrentParams
      ? params
      : reviseListRequestParams(getState().userAccess.partnerListParams, params)
    const { result, ...pagination } = await couponApi.auth.getPartnerContacts(revisedParams)

    dispatch(
      getPartnerUsersSuccess({
        users: result as UserAccess[],
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(setPartnerListState(FeatureState.Error))
  }
}

const resetPartnerUsersFilters = (): AppThunk => getPartners(initialState.partnerListParams, true)

const inspectUserAccess = (userType: UserType, id: number): AppThunk => async dispatch => {
  try {
    dispatch(openEditor(userType))
    const response = await couponApi.auth.getPartnerContactState({ id })
    dispatch(getUserSuccess({ ...response } as UserAccess))
  } catch (err) {
    dispatch(setEditorState(FeatureState.Error))
  }
}

const saveUserAccess = (role: Roles, isActive: boolean): AppThunk => async (dispatch, getState) => {
  try {
    const id = getState().userAccess.editedUser?.id
    const type = getState().userAccess.editedUserType
    if (!id) return
    dispatch(setEditorState(FeatureState.Loading))
    await couponApi.auth.updatePartnerContactState({
      id,
      partnerContactStateDto: { role, isActive }
    })
    message.success(i18n.t('user-access.msg.change-succesful'))
    dispatch(saveUserSuccess())
    type === UserType.NKM && dispatch(getNkmUsers())
    type === UserType.PARTNER && dispatch(getPartnerUsers())
    return true
  } catch (err) {
    dispatch(setEditorState(FeatureState.Error))
    return false
  }
}

export const userAccessReducer = slice.reducer

export const userAccessActions = {
  saveUserAccess,
  inspectUserAccess,
  getNkmUsers,
  resetNkmUsersFilters,
  getPartnerUsers,
  resetPartnerUsersFilters,
  closeEditor,
  clearUserAccessEditor,
  reset
}
