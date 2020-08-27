# REDUX
Redux is a pattern and library for managing and updating application **state**. This state is global and every data that can be manipulated during usage needs to be stored here. With this solution, this state will be the single point of truth: every component will display and modify the same data. They will be also notified if a change related to their connected data occurs, so they can re-render their view.

The data flow of the redux is the following:
* A Redux **store** is created using a **root reducer** function
* The **store** calls the **root reducer** once, and saves the return value as its **initial state**
* When the UI is first rendered, UI components access the current **state** of the Redux **store**, and use that data to decide what to render. They also subscribe to any future store updates so they can know if the **state** has changed.

Updates:
* Something happens in the app, such as a user clicking a button
* The app code **dispatches** an action to the Redux store, like dispatch({type: 'counter/increment'})
* Before the dispatched **action** gets called by the **reducer**, the configured **middlewares** will run. They can provide logging, debug, connection handling and other functionalities.
* The **store** runs the **reducer** function again with the **previous state** and the **current action**, and saves the return value as the **new state**
  * The same goes for the **thunks** as well: they will be called by the current **state** and **action**. It can call multiple **actions**, async functions and modify the **state**.
* The **store** notifies all parts of the UI that are subscribed that the store has been updated
* Each UI component that needs data from the store checks to see if the parts of the state they need have changed.
* Each component that sees its data has changed forces a re-render with the new data, so it can update what's shown on the screen

[Redux site](https://redux.js.org/introduction/getting-started) for further reference.

</br>

## Redux Toolkit

The toolkit provides various middlewares and functions to help simplify common Redux use cases:

* **configureStore** is a handy shortcut for creating the store and applying the middlewares.
* **createSlice** is a clean way for coupling states, reducers and their action within the same context.
* **devTools** is a powerful middleware that helps with debugging and visualizing the state changes with each step.
* **thunks** is a provided third party middleware for using thunks.
* **mutable state** with immer.js for writing reducers easier (it handles the changes while respecting the immutability of the states).

Other useful functions at [Redux ToolKit site](https://redux-toolkit.js.org/usage/usage-with-typescript)

</br>

#  STORE
The current Redux application state lives in an object called the store. This store is global for the Redux App, and is created by the reducers and their initial states by the **configureStore** function. The store will handle the state related functions, the dispatches for its reducers actions and the middleware functions as well.

</br>

## MIDDLEWARE

In redux middlewares provides an extension point between dispatching an action and the moment it reaches the reducer. 
If you want to know more, check this [amazing signalR and middleware readme](../../src/middlewares/signalR/readme.md).


* **thunk** extends the store's abilities, and lets you write async logic that interacts with the store. [Thunk page](https://github.com/reduxjs/redux-thunk)
* **signalrMiddleware** provides connection functions to enable receiving and processing notifications from the server. 

</br>

## HOT RELOAD

The following function keeps the actual state of the application during development HOT SWAP, for easier debugging:

```js
if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  ;(module as any).hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}
```

## STOREUTILS

App-wide, multi-state related functions can be placed in this file.
Currently the *hardResetStore* can be found here, that is called during login and logout to purge the current states and routing history.

When the user logs out, the routing history will be purged as well, to prevent any unauthenticated actions.

</br>

# REDUCER

Reducers specify how the application's state changes in response to actions sent to the store. 
In Redux, all the application state is stored as a single object, called the rootState. To create this state, the reducers are combined to a rootReducer. It's job is to provide a single entry point for the action dispatch calls, apply the middlewares on them and delegate the action to the right reducer.

The reducers should never do any of the following:
* Mutate its arguments; - wit the toolkit, the state can be mutated
* Perform side effects like API calls and routing transitions; - use **Thunks** instead
* Call non-pure functions, e.g. Date.now() or Math.random(). - pass them as an argument

As a feature of the redux toolkit, the reducers can be created as a part of a **slice**, that wraps the state and its related reducers within the same context.


```js
const initialState: SelfPartnerState = {
  error: null,
  loading: false
}

const selfPartnerSlice = createSlice({
  name: 'selfPartner',
  initialState,
  reducers: {
    resetSelfPartner: () => initialState,
    getPartnersSuccess(state, action: PayloadAction<Partner>) {
      state.partner = action.payload

      state.loading = false
      state.error = null
    },
    setLoadingStart(state) {
      state.loading = true
    }
  }
})
```

Following dispatch naming convention, the a reducers action can be called by its slice name / actionName:
```js
  dispatch({ type: 'selfPartner/resetSelfPartner' })
```
Or by exporting it from its slice:
```js
export const { resetSelfPartner } = selfPartnerSlice.actions
dispatch(resetSelfPartner())
```

</br>

# THUNK

For async functions and multiple action dispatches, a thunk function is needed for handling.
it can be used to pause, modify, delay, replace, or halt dispatched actions. It also has full accessibility to the state via the GetState() function.

```js
export const getMyPartner = (): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  try {
    const partner = await api.partner.getMyPartner()
    dispatch(
      getPartnersSuccess({
        ...partner
      })
    )
  } catch (err) {
    dispatch(setLoadingFailed(err.toString()))
  }
}
```

Example usage:
```js
  useEffect(() => {
    dispatch(getMyPartner())
  }, [dispatch])

```
</br>

# APP
The *App* is the highest level of react component of the application.
It contains the providers and the routers used by all of its child components.

* **BrowserRouter** handles the navigation and high level routing functions like presenting to the not found page. It uses the HTML5 history API to keep your UI in sync with the URL.
* **ConfigProvider** configures the antd designs localization
* **Provider** that connects the app with the **Store**
* **ConnectedRouter** Synchronize router state with redux store through uni-directional flow, support hot reloading and dispatching browser history methods.
* **BaseLayout** is a wrapper component for handling the actual pages title and the unseen notification count.
* **RouterView** is the main view that presents the actual page and handles the authority of the user based on its roles.
