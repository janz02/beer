// we do it in such way to be able to mock it in test
import {
    useSelector as originalUseSelector,
    useDispatch as originalUseDispatch
  } from 'react-redux';
  

//   export function useSelector<TState, TSelected>(
//     selector: (state: TState) => TSelected,
//     equalityFn?: (left: TSelected, right: TSelected) => boolean
// ): TSelected;

  export const useSelector = function<TState, TSelected>(selector: (state: TState) => TSelected) { return originalUseSelector<TState, TSelected>(selector) };
  export const useDispatch = () => originalUseDispatch();
  