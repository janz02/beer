import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { CampaignPermission } from 'models/campaignPermission'
import { CampaignAdGroup } from 'models/campaignAdGroup'
import { CampaignFunctionPermission } from 'models/campaignFunctionPermission'
import { CampaignUser } from 'models/campaignUser'
import { history } from 'router/router'
import i18n from 'app/i18n'
import { message } from 'antd'
import { api } from 'api'
import { PermissionModel } from 'api/swagger/campaign-editor'

interface PermissionEditorState {
  permission?: CampaignPermission
  campaignAdGroups?: CampaignAdGroup[]
  campaignUsers?: CampaignUser[]
  campaignFunctionPermissions?: CampaignFunctionPermission[]
  error: boolean
  loading: boolean
  loadingDelete: boolean
  loadingState: boolean
  loadingRegState: boolean
}

const initialState: PermissionEditorState = {
  error: false,
  loading: false,
  loadingDelete: false,
  loadingState: false,
  loadingRegState: false
}

const permissionEditorSlice = createSlice({
  name: 'permissionEditor',
  initialState,
  reducers: {
    resetPermissionEditor: () => initialState,
    getPermissionRequest(state) {
      state.loading = true
    },
    getPermissionSuccess(state, action: PayloadAction<CampaignPermission>) {
      state.permission = action.payload
      state.loading = false
      state.error = false
    },
    getPermissionFail(state) {
      state.loading = false
      state.error = true
    },
    getFunctionPermissionsSuccess(state, action: PayloadAction<CampaignFunctionPermission[]>) {
      state.loading = false
      state.campaignFunctionPermissions = action.payload
    },
    getAdGroupsSuccess(state, action: PayloadAction<CampaignAdGroup[]>) {
      state.loading = false
      state.campaignAdGroups = action.payload
    },
    getCampaignUsersSuccess(state, action: PayloadAction<CampaignUser[]>) {
      state.loading = false
      state.campaignUsers = action.payload
    },
    savePermissionRequest(state) {
      state.loading = true
    },
    savePermissionSuccess(state) {
      state.loading = false
      state.error = false
    },
    savePermissionFail(state) {
      state.loading = false
      state.error = true
    },
    deletePermissionRequest(state) {
      state.loadingDelete = true
    },
    deletePermissionSuccess(state) {
      state.loadingDelete = false
    },
    deletePermissionFail(state) {
      state.loadingDelete = true
    }
  }
})

const {
  getPermissionSuccess,
  getPermissionFail,
  getPermissionRequest,
  getAdGroupsSuccess,
  getCampaignUsersSuccess,
  getFunctionPermissionsSuccess
} = permissionEditorSlice.actions
const {
  deletePermissionRequest,
  deletePermissionSuccess,
  deletePermissionFail
} = permissionEditorSlice.actions
const {
  savePermissionSuccess,
  savePermissionFail,
  savePermissionRequest
} = permissionEditorSlice.actions

export const { resetPermissionEditor } = permissionEditorSlice.actions

export const permissionEditorReducer = permissionEditorSlice.reducer

export const getPermission = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(getPermissionRequest())
    const permission = await api.permissions.getPermission({ id })
    dispatch(getPermissionSuccess(permission))
  } catch (err) {
    dispatch(getPermissionFail())
  }
}

export const getFunctionPermissions = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(getPermissionRequest())
    const { items } = await api.accounts.getFunctionPermissions({
      //  _queryParameters: { permissionid: id.toString() }
    })
    dispatch(
      getFunctionPermissionsSuccess(items!.map(x => ({ ...x } as CampaignFunctionPermission)))
    )
  } catch (err) {
    dispatch(getPermissionFail())
  }
}

export const getAdGroups = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(getPermissionRequest())

    const { items } = await api.accounts.getAdGroups({
      // _queryParameters: { permissionid: id.toString() }
    })
    dispatch(getAdGroupsSuccess(items!.map(x => ({ ...x } as CampaignAdGroup))))
  } catch (err) {
    dispatch(getPermissionFail())
  }
}

export const getCampaignUsers = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(getPermissionRequest())
    const { items } = await api.accounts.getUsersForPermission({
      //  _queryParameters: { permissionid: id.toString() }
    })
    dispatch(getCampaignUsersSuccess(items!.map(x => ({ ...x } as CampaignUser))))
  } catch (err) {
    dispatch(getPermissionFail())
  }
}

export const savePermission = (data: CampaignPermission): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    const permission = getState().permissionEditor.permission
    dispatch(savePermissionRequest())

    if (permission?.id) {
      await api.permissions.updatePermission({
        id: permission.id,
        permissionModel: {
          ...permission,
          ...data
        } as PermissionModel
      })
      dispatch(getPermission(permission.id))
    } else {
      const createdPermissionId = await api.permissions.createPermission({
        permissionModel: data as PermissionModel
      })

      history.push(`/permissions/${createdPermissionId}`)
    }
    dispatch(savePermissionSuccess())
    message.success(i18n.t('common.message.save-success'), 5)
  } catch (err) {
    dispatch(savePermissionFail())
  }
}

export const deletePermission = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(deletePermissionRequest())
    await api.permissions.deletePermission({ id })
    dispatch(deletePermissionSuccess())
    message.success(i18n.t('common.message.delete-success'), 5)
    history.push(`/permissions`)
    return { id }
  } catch (err) {
    dispatch(deletePermissionFail())
    return { id, error: true }
  }
}
