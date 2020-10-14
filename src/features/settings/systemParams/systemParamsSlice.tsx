import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import {
  ListRequestParams,
  reviseListRequestParams,
  storableListRequestParams
} from 'hooks/useTableUtils'
import { FeatureState } from 'models/featureState'
import { SystemParam } from 'models/systemParam'
import i18n from 'app/i18n'
import { api } from 'api'
import { SystemParameterVm } from 'api/swagger/coupon'

interface SystemParamsState {
  systemParamsList: SystemParam[]
  listParams: ListRequestParams
  listState: FeatureState
  editorState: FeatureState
}

const initialState: SystemParamsState = {
  systemParamsList: [],
  listParams: {
    pageSize: 10
  },
  listState: FeatureState.Initial,
  editorState: FeatureState.Initial
}

const systemParamsSlice = createSlice({
  name: 'systemParams',
  initialState,
  reducers: {
    resetSystemParams: () => initialState,
    resetListParams(state) {
      state.listParams = initialState.listParams
    },
    resetEditorState(state) {
      state.editorState = FeatureState.Initial
    },
    setListState: (state, action: PayloadAction<FeatureState>) => {
      state.listState = action.payload
    },
    setEditorState: (state, action: PayloadAction<FeatureState>) => {
      state.editorState = action.payload
    },
    getSystemParamsSuccess(
      state,
      action: PayloadAction<{ systemParams: SystemParam[]; listParams: ListRequestParams }>
    ) {
      state.systemParamsList = action.payload.systemParams
      state.listParams = action.payload.listParams
      state.listState = FeatureState.Success
    }
  }
})

const {
  resetListParams,
  setListState,
  setEditorState,
  getSystemParamsSuccess,
  resetSystemParams,
  resetEditorState
} = systemParamsSlice.actions

const getSystemParams = (params: ListRequestParams = {}): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(setListState(FeatureState.Loading))

    const keyMapper = (keyToFormat?: string | null): string =>
      keyToFormat ? keyToFormat.split('.').join('_') : ''

    const revisedParams = reviseListRequestParams(getState().systemParams.listParams, params)
    const { result, ...pagination } = await api.coupon.systemParameters.getSystemParameters(
      revisedParams
    )

    const mappedResult = result
      ? result.map(
          (sysparam: SystemParameterVm, index: number) =>
            ({
              ...sysparam,
              id: index,
              value: sysparam.value && +sysparam.value ? +sysparam.value : sysparam.value,
              type: sysparam.value && +sysparam.value ? 'number' : 'text',
              name: i18n.t(`system-params.keys.${keyMapper(sysparam.key)}.name`),
              description: i18n.t(`system-params.keys.${keyMapper(sysparam.key)}.description`)
            } as SystemParam)
        )
      : []

    dispatch(
      getSystemParamsSuccess({
        systemParams: mappedResult,
        listParams: storableListRequestParams(revisedParams, pagination)
      })
    )
  } catch (err) {
    dispatch(setListState(FeatureState.Error))
  }
}

const updateSystemParam = (
  param: SystemParam,
  callbackFn: Function
): AppThunk => async dispatch => {
  try {
    dispatch(setEditorState(FeatureState.Loading))

    console.log(param)
    await api.coupon.systemParameters.updateSystemParameter({
      key: param.key || null,
      systemParameterDto: { value: param.value }
    })
    dispatch(setEditorState(FeatureState.Success))
    callbackFn()
  } catch (err) {
    dispatch(setEditorState(FeatureState.Error))
  }
}

const resetSystemParamsFilters = (): AppThunk => async dispatch => {
  dispatch(resetListParams())
  dispatch(getSystemParams())
}

const resetSystemParamsEditor = (): AppThunk => async dispatch => {
  dispatch(resetEditorState())
  dispatch(getSystemParams())
}

export const systemParamsActions = {
  resetSystemParams,
  getSystemParams,
  resetSystemParamsFilters,
  updateSystemParam,
  resetSystemParamsEditor
}

export const systemParamsReducer = systemParamsSlice.reducer
