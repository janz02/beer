## Why we need hooks?

Functional components would be pure functions without hooks, because you are not allowed to mutate
any prop or access global variables. This means that the returned virtual dom would be always the
same, unless some prop changes.

If React allowed having side effects within a functional component, the problem would be that the
component wouldn't rerender.

## What are hooks?

Hooks make it possible to have side effects in FCs and they notify React to rerender the component
when something changes.

Example from the React [documentation](https://reactjs.org/docs/hooks-intro.html):

```ts
import React, { useState } from "react";

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

With the `useState` hook, it's possible to have the `count` variable that changes between the calls
to the `Example` component. `setState` changes the value, but only for the next call after rerender.
The naming convention for hooks is to start them with `use`.

Helper functions (found in the services folder) are different from hooks, they do not access global
variables and they have nothing to do with FCs.

## How to use hooks?

### Order of hook calls

It's important to always call hooks in the same order every time the component is called. This can
be achived by:

- Putting them on the top of the function body
- Not using hooks in loops or conditions, control flow needs to be linear

### Only use hooks in components

Hooks cause the functional component to rerender, but it won't rerender if it doesn't correspond to
any component.

## Implemenation details

Looking at Preact's implementation of
[hooks](https://github.com/preactjs/preact/blob/master/hooks/src/index.js), it seems that there is a
global variable `currentIndex` that is incremented every time a hook is called, and the internal
state of the hook is read from an array at that index, this explains why it is important to call the
hooks in the same order.

## Hooks in this folder

The `react-router-dom.ts` and `react-redux-hooks.ts` files contain wrappers around Redux's and the
React Router's own hooks. These wrappers are needed to be able to mock them in the unit tests. Jest
can overwrite the exports of these two files because they are ES modules.

Other hooks are documented in the files in which they are defined.
