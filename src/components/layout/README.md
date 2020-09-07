# Layout

The folder contains all the basic layouts, and the ones giving the general look of the UI, shown on every page. You can read further on the used hooks under the [hooks readme](../../hooks/README.md&a=preview).

</br>

## AppVersion

AppVersion JSX element shows the application version in a div from an Environmental variable. Gets an extra `classname`, and a `hide` flag (not shown when the sidebar is collapsed) via props.

```js
const appVersion = process.env.REACT_APP_VERSION;
```

</br>

## BaseLayout

BaseLayout is used in the [App](../../app/App.tsx), and it's on top of every single page. Importing the [useSmartBrowserTabTitle](../../hooks/useSmartBrowserTabTitle.ts) hook, which shows the unseen notification count in the title of the browser tab.

```html
<ConnectedRouter history="{history}">
  <BaseLayout>
    <RouterView />
  </BaseLayout>
</ConnectedRouter>
```

_BaseLayout used in App_

</br>

## PrivateLayout

PrivateLayout is used in [PrivateRoute](../../router/PrivateRoute.tsx).<br>
First it checks, if the user is on mobile, then dispatches an action, to [get the Profile](../../features/profile/profileSlice.ts).
<br>

The next main step is that we define the [MenuOptions](#sidemenuoptions). the mainOptions are defined (the non-footer ones) in a [useMemo](https://reactjs.org/docs/hooks-reference.html) hook, then we also define the footerOptions.
<br>

Finally, we create the layout. First adding the [SideMenu](#sidemenu), with the [SideMenuOptions](#sidemenuoptions) children (main, footer). Then adding the [NotificationDrawer](../../features/notification/NotificationDrawer.tsx) if the user has permission for it. Finally, a Button is added, to open/close the menu, and we pass the given children elemnt to a new Layout (this layout is basically the content), and if the user has the role for it, a [NotificationFab](../../features/notification/NotificationFab.tsx) element in this layout.

</br>

## PublicLayout

PublicLayout is used in [PublicRoute](../../router/PublicRoute.tsx), showing the [LanguageSelector](../../components/LanguageSelector.tsx), then the child content with the [AppVersion](#appversion).

</br>

## SideMenu

SideMenu is the menu bar shown on the left side of every page after logging in. The menu has 2 main state, `open`, and `isMobile`. A header is shown at the top, and if it is _not open_ and _not mobile_, then a small logo is shown here. If it is _open_, then a bigger logo is shown. On _mobile_, a Drawer is shown, which on _open_ acts like on desktop, a full version of the menu opens from the left. Below the header are the children components ([SideMenuOptions](#sidemenuoptions)).

</br>

## SideMenuOptions

This component gets the following props: if its `collapsed` (optional), if it's used in the `footer` (optional), the `handleClose` function, and the `options` array. One option has a `label`, `labelTooltip` (optional), `icon`, `roles` (optional, with what role it is seen), a `link` (optional), and an `onClick` (optional) function.<br>

The menu gets from the current path, which option is selected:

```js
const path = useSelector((state: RootState) => state.router.location.pathname);
const pathRoot = useMemo(() => `/${path.split("/")[1]}`, [path]);
```

If the menu is the `footer` one, then it gets an extra LanguageSelector on top, and the AppVersion on the bottom. Between these two, and on the non-footer one, are shown the options, based on the passed options array. It first checks, if the user has the required permission for that option, then building a Menu.Item from those.

```js
options.filter(option => hasPermission(option.roles ?? [])).map((option, i) => (...)
```

</br>

## Adding a new menu option

1. Create the page, and all the elements connected to it

```js
NewPage.tsx
...
```

2. Add the required role under the [roleHelpers.ts](../../services/roleHelpers.ts)

```js
export const pageViewRoles = {
  ...
  newPage: [Roles.NewPageRole],
  ...
}
```

3. Add a new route under [router.tsx](../../router/router.tsx)

```html
<PrivateRoute
  exact
  path="/newPage"
  roles="{pageViewRoles.newPage}"
  component="{newPage}"
/>
```

_Adding a new private route_

4. Finally add a new entry to options (`mainOptions` or `footerOptions`) under [PrivateLayout](#privatelayout) if it's a private page.

```js
const mainOptions = useMemo<SideMenuOptionProps[]>(
  () => [
    ...
    {
      label: t('menu.newPage'),
      link: '/newPage',
      icon: <SomeIcon />,
      roles: pageViewRoles.newPage
    },
    ...
```

_Adding it to mainOptions_
