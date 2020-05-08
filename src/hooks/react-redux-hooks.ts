import { useSelector as originalUseSelector, useDispatch as originalUseDispatch } from 'react-redux'
import { Dispatch } from 'redux'

// The wrapper is necessary in order to be able to Mock the useSelector and useDispatch in unit tests

export const useSelector = function<TState, TSelected>(
  selector: (state: TState) => TSelected
): TSelected {
  return originalUseSelector<TState, TSelected>(selector)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDispatch = (): Dispatch<any> => originalUseDispatch()
