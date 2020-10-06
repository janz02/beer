# Navigation alerts

## The NavigationAlert component

This component is used to warn the user if he/she wants to leave the current page when a form has
unsaved changes. There are two ways to exit:

- The user can either click something within the application that changes the path, in this case
  `react-router`'s [`Prompt`](https://reactrouter.com/core/api/Prompt) component can be used to
  create a popup when the route changes.

- The other way is just closing the browser tab. In this case `Prompt` is useless, but there's a
  [`beforeunload`](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event) event
  implemented by the browsers.

Both these cases are handled by this `NavigationAlert` component:

```tsx
<NavigationAlert when={modified} />
```

The `when` parameter needs to be `true` if there's a change on the form.

## useFormUtils

The `useFormUtils` hook can be used to track the modified state of the form. It has a `modified`
property that is fed into the `NavigationAlert` and the `setFieldsValue` functions set the state to
modified
