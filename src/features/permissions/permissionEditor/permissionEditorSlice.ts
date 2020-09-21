import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { CampaignPermission } from 'models/campaignPermission'
import { history } from 'router/router'
import i18n from 'app/i18n'
import { message } from 'antd'
import { api } from 'api'
import { PermissionModel } from 'api/swagger/campaign-editor'

interface PermissionEditorState {
  permission?: CampaignPermission
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
  getPermissionRequest
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
