import { useParams as originalUseParams } from 'react-router-dom'

// The wrapper is necessary in order to be able to Mock the useSelector and useDispatch in unit tests

// export const useSelector = function<TState, TSelected>(
//   selector: (state: TState) => TSelected
// ): TSelected {
//   return originalUseSelector<TState, TSelected>(selector)
// }

// export function useParams<Params extends { [K in keyof Params]?: string } = {}>(): { [p in keyof Params]: string };

export const useParams = function<Params extends { [K in keyof Params]?: string } = {}>(): {
  [p in keyof Params]: string | undefined
} {
  return originalUseParams()
}
