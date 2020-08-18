## **`Features`**

This folder contains the business logic related components, and the state management (using [Redux Toolkit](https://redux-toolkit.js.org/)) connected with them.
Each folder represents a standalone feature, subpage under the application.

Each folder has a structure of:

- The page component (XyzPage.tsx)
- The Redux slice (xyzSlice.ts)
- extra: module scss file of the page (XyzPage.module.scss)
- extra: smaller components (eg: XyzForm.tsx) related to this feature
- extra: [custom hooks](https://reactjs.org/docs/hooks-custom.html) (useXyz.tsx)

### **`The page component`**

An exported functional component, returning the page JSX.Element.
The structure of the function:

- [Hooks](https://reactjs.org/docs/hooks-intro.html) (eg: custom hooks, useState, useDispatch, etc..)
- local methods (helper, small methods)
- Event functions (eg: handleClick)
- returning the jsx component (JSX.Element)

Example page, with a **Button** which increments the stored counter, showed in the **Text** below it:

```js
export const CounterPage: React.FC = () => {
  // hooks
  const dispatch = useDispatch();
  const { featureState, counter } = useSelector(
    (state: RootState) => state.counter
  );

  // local helper method
  const loading = featureState === FeatureState.Loading;

  // event function
  const handleIncrement = (): void => {
    dispatch(counterActions.increment());
  };

  // JSX element return
  return (
    <>
      <Button
        className="action-btn action-btn--main"
        loading={loading}
        size="large"
        type="primary"
        onClick={handleIncrement}
      >
        Increment
      </Button>
      <Text>{counter}</Text>
    </>
  );
};
```

### **`The Redux slice`**

The redux file, exporting the corresponding selectors, reducer and actions. In order to get it registered, must be added to the [rootReducer.ts](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Fapp%2FrootReducer.ts).
Structure:

- type of the state (containing one [FeatureState](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Fmodels%2FfeatureState.ts) object)
- the initial state (with the featureState as **Initial**)
- the slice object (containing the reducers)
- the destructured slice.actions (so thunks below has easier access)
- [thunks](https://redux-toolkit.js.org/tutorials/advanced-tutorial#thinking-in-thunks) containing the async [api](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Fapi%2FREADME.md) calls. We set the featureState to **Loading**, then put the async call in a try-catch block. If it ran succesfully, we set the feature state to **Success**, and if we catch any error during the call, then set it to **Error**.
- exporting actions, selectors, reducer

Example slice, storing a number, which we can increment:

```js
// state type
interface CounterState {
  counter: number
  featureState: FeatureState
}

// initial state
const initialState = (): CounterState => ({
  counter: 0,
  featureState: FeatureState.Initial
})

// slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState(),
  reducers: {
    setFeatureState(state, action: PayloadAction<FeatureState>) {
      state.featureState = action.payload
    },
    setCounterSuccess(state, action: PayloadAction<number>) {
      state.featureState = FeatureState.Success
      state.counter += action.payload
    }
  }
})

// destructured slice actions
const { setFeatureState, setCounterSuccess } = counterSlice.actions

// thunk
const increment = (): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    // api call, which returns a number, then we increment the stored counter by that much
    const incrementAmount = await api.counter.increment()
    dispatch(setCounterSuccess(incrementAmount))
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

// exports

// so we can dispatch it from a React component
export const counterActions = {
  increment
}

// to set it in the store
export const counterReducer = counterSlice.reducer
```

### **`Smaller components`**

If a large component can easily get divided into smaller components (like form, grid, searchbar), then it's a common practice, to create smaller ones for each segment, and then combining them under the main page. After dividing it to many pieces, it is recommended to put them under a **components** subfolder in the same feature folder.

### **`Custom hooks`**

if the main page component is big enough, a custom hook which contains most of the logic. If this hook is useful for other features, components, and not directly related to this feature, then it is recommended to put it under the [src/hooks](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Fhooks%2FREADME.md) folder
