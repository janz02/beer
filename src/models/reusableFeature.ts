import { AnyAction, Reducer } from 'redux'
import { AppThunk } from 'app/store'
import { ListRequestParams } from 'hooks/useTableUtils'

export interface CommonSliceActions<D = any> {
  deleteItem: (id: number) => AppThunk
  getItem: (id: number) => AppThunk
  saveItem: (id: number, data: D) => AppThunk
  getList: (params?: ListRequestParams) => AppThunk
  reset: () => AppThunk
  setListConstraints: (params?: ListRequestParams) => AppThunk
  clearEditor: () => AppThunk
}

export interface SliceFactoryProps {
  name: string
  getSliceState: () => AppThunk
}

export interface SliceFactoryUtils<T> {
  reducer: Reducer<T, AnyAction>
}
