import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { CampaignPermission } from 'models/campaign/campaignPermission'
import { CampaignAdGroup } from 'models/campaign/campaignAdGroup'
import { CampaignFunctionPermission } from 'models/campaign/campaignFunctionPermission'
import { CampaignUser } from 'models/campaign/campaignUser'
import { history } from 'router/router'
import i18n from 'app/i18n'
import { message } from 'antd'
import { api } from 'api'
import { AdGroupVm, FunctionPermissionVm, PermissionVm, UserVm } from 'api/swagger/campaign-editor'

interface PermissionEditorState {
  permission?: CampaignPermission
  campaignAdGroups?: CampaignAdGroup[]
  campaignUsers?: CampaignUser[]
  campaignFunctionPermissions?: CampaignFunctionPermission[]
  error: boolean
  loading: boolean
  loadingDelete: boolean
}

const initialState: PermissionEditorState = {
  error: false,
  loading: false,
  loadingDelete: false
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
    const permission = await api.campaignEditor.permissions.getPermission({ id })
    dispatch(getPermissionSuccess(permission))
  } catch (err) {
    dispatch(getPermissionFail())
  }
}

export const getFunctionPermissions = (id: number | undefined): AppThunk => async dispatch => {
  try {
    dispatch(getPermissionRequest())
    const { items } = await api.campaignEditor.accounts.getFunctionPermissions(
      id ? { permissionId: id } : {}
    )

    if (items) {
      dispatch(
        getFunctionPermissionsSuccess(items.map(x => ({ ...x } as CampaignFunctionPermission)))
      )
    } else {
      dispatch(getPermissionFail())
    }
  } catch (err) {
    dispatch(getPermissionFail())
  }
}

export const getAdGroups = (id: number | undefined): AppThunk => async dispatch => {
  try {
    dispatch(getPermissionRequest())
    const { items } = await api.campaignEditor.accounts.getAdGroups(id ? { permissionId: id } : {})

    if (items) {
      dispatch(getAdGroupsSuccess(items.map(x => ({ ...x } as CampaignAdGroup))))
    } else {
      dispatch(getPermissionFail())
    }
  } catch (err) {
    dispatch(getPermissionFail())
  }
}

export const getCampaignUsers = (id: number | undefined): AppThunk => async dispatch => {
  try {
    dispatch(getPermissionRequest())
    const { items } = await api.campaignEditor.accounts.getUsersForPermission(
      id ? { permissionId: id } : {}
    )

    if (items) {
      dispatch(getCampaignUsersSuccess(items.map(x => ({ ...x } as CampaignUser))))
    } else {
      dispatch(getPermissionFail())
    }
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
    const users = getState().permissionEditor.campaignUsers?.map(x => x as UserVm)
    const adGroups = getState().permissionEditor.campaignAdGroups?.map(x => x as AdGroupVm)
    const functionPermissions = getState().permissionEditor.campaignFunctionPermissions?.map(
      x => x as FunctionPermissionVm
    )

    dispatch(savePermissionRequest())

    if (permission?.id) {
      await api.campaignEditor.permissions.updatePermission({
        id: permission.id,
        createUpdatePermissionCommand: {
          ...permission,
          ...data,
          adGroups: adGroups,
          users: users,
          functionPermissions: functionPermissions
        } as PermissionVm
      })
      dispatch(getPermission(permission.id))
    } else {
      const createdPermissionId = await api.campaignEditor.permissions.createPermission({
        createUpdatePermissionCommand: {
          ...data,
          adGroups: adGroups,
          users: users,
          functionPermissions: functionPermissions
        } as PermissionVm
      })

      history.push(`/permissions/${createdPermissionId}`)
    }
    dispatch(savePermissionSuccess())
    message.success(i18n.t('common.message.save-success'), 5)
  } catch (err) {
    console.log(err)
    dispatch(savePermissionFail())
  }
}

export const deletePermission = (id: number): AppThunk => async dispatch => {
  try {
    dispatch(deletePermissionRequest())
    await api.campaignEditor.permissions.deletePermission({ id })
    dispatch(deletePermissionSuccess())
    message.success(i18n.t('common.message.delete-success'), 5)
    history.push(`/permissions`)
    return { id }
  } catch (err) {
    dispatch(deletePermissionFail())
    return { id, error: true }
  }
}
