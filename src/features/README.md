## **`Features`**

This folder contains the business logic related components, and the state management (using [Redux Toolkit](https://redux-toolkit.js.org/)) connected with them.
Each folder represents a standalone feature, subpage under the application.

Each folder has a structure of:

- The page component (XyzPage.tsx)
- The Redux slice (xyzSlice.ts)
- extra: smaller components (eg: XyzForm.tsx) related to this feature
- extra: [custom hooks](https://reactjs.org/docs/hooks-custom.html) (useXyz.tsx)

### **`The page component`**

An exported functional component, returning the page jsx.
The structure of the function:

- [Hooks](https://reactjs.org/docs/hooks-intro.html) (eg: custom hooks, useState, useDispatch, etc..)
- Event functions (eg: handleClick)
- local methods (helper, small methods)
- returning the jsx component

### **`The Redux slice`**

The redux file, exporting the corresponding selectors, reducer and actions. In order to get it registered, must be added to the [rootReducer.ts](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Fapp%2FrootReducer.ts).
Structure:

- type of the initial state
- the initial state
- the slice object (containing the reducers)
- the destructured slice.actions (so thunks below has easier access)
- [thunks](https://redux-toolkit.js.org/tutorials/advanced-tutorial#thinking-in-thunks) containing the async [api](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Fapi%2FREADME.md) calls
- exporting actions, selectors, reducer

### **`Smaller components`**

If a large component can easily get divided into smaller components (like form, grid, searchbar), then it's a common practice, to create smaller ones for each segment, and then combining them under the main page. After dividing it to many pieces, it is recommended to put them under a **components** subfolder in the same feature folder.

### **`Custom hooks`**

if the main page component is big enough, a custom hook which contains most of the logic. If this hook is useful for other features, components, and not directly related to this feature, then it is recommended to put it under the [src/hooks](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Fhooks%2FREADME.md) folder
