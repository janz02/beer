import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import {
  ListRequestParams,
  Pagination,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { CampaignPermission } from 'models/campaignPermission'

interface PermissionListState {
  permissions: CampaignPermission[]
  error: boolean
  loading: boolean
  listParams: ListRequestParams
}

const initialState: PermissionListState = {
  error: false,
  loading: false,
  permissions: [],
  listParams: {
    pageSize: 10
  }
}

const permissionsListSlice = createSlice({
  name: 'permissionsList',
  initialState,
  reducers: {
    resetPermissionsList: () => initialState,
    resetListParams(state) {
      state.listParams = initialState.listParams
    },
    getPermissionsRequest(state) {
      state.loading = true
    },
    getPermissionsSuccess(
      state,
      action: PayloadAction<{ permissions: CampaignPermission[]; listParams: ListRequestParams }>
    ) {
      state.permissions = action.payload.permissions
      state.listParams = action.payload.listParams
      state.loading = false
      state.error = false
    },
    getPermissionsFail(state) {
      state.loading = false
      state.error = true
    }
  }
})

const {
  resetListParams,
  getPermissionsRequest,
  getPermissionsSuccess,
  getPermissionsFail
} = permissionsListSlice.actions
export const { resetPermissionsList } = permissionsListSlice.actions

export const permissionListReducer = permissionsListSlice.reducer

export const getPermissions = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(getPermissionsRequest())

    const revisedParams = reviseListRequestParams(getState().permissionList.listParams, params)

    const { items, ...pagination } = await api.campaignEditor.permissions.getPermissions(
      revisedParams
    )

    dispatch(
      getPermissionsSuccess({
        permissions: items as CampaignPermission[],
        listParams: storableListRequestParams(revisedParams, {
          ...pagination,
          size: pagination.totalCount
        } as Pagination)
      })
    )
  } catch (err) {
    dispatch(getPermissionsFail())
  }
}

export const resetPermissionFilters = (): AppThunk => async dispatch => {
  dispatch(resetListParams())
  dispatch(getPermissions())
}
