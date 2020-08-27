## **`Layout`**

The folder contains all the basic layouts, and the ones giving the general look of the UI, shown on every page. You can reather further on the used hooks under the [hooks readme](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Fhooks%2FREADME.md&_a=preview).

### **`AppVersion`**

AppVersion JSX element shows the application version in a div from an Environmental variable. Gets extra classname, or hidden state from props.

```js
const appVersion = process.env.REACT_APP_VERSION;
```

### **`BaseLayout`**

BaseLayout is used in the [App](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Fapp%2FApp.tsx), and it's on top of every single page. Importing the [useSmartBrowserTabTitle](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Fhooks%2FuseSmartBrowserTabTitle.ts) hook, which shows the unseen notification count in the title of the browser tab.

```html
<ConnectedRouter history="{history}">
  <BaseLayout>
    <RouterView />
  </BaseLayout>
</ConnectedRouter>
```

_BaseLayout used in App_

### **`PrivateLayout`**

PrivateLayout is used in [PrivateRoute](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Frouter%2FPrivateRoute.tsx).<br>
First it checks, if the user is on mobile, then dispatches an action, to [get the Profile](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Ffeatures%2Fprofile%2FprofileSlice.ts).
<br>

The next main step is that we define the [MenuOptions](#sidemenuoptions). the mainOptions are defined (the non-footer ones) in a [useMemo](https://reactjs.org/docs/hooks-reference.html) hook, then we also define the footerOptions.
<br>

Finally, we create the layout. First adding the [SideMenu](#sidemenu), with the [SideMenuOptions](#sidemenuoptions) children (main, footer). Then adding the [NotificationDrawer](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Ffeatures%2Fnotification%2FNotificationDrawer.tsx) if the user has permission for it. Finally, a Button is added, to open/close the menu, and we pass the given children elemnt to a new Layout (this layout is basically the content), and if the user has the role for it, a [NotificationFab](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Ffeatures%2Fnotification%2FNotificationFab.tsx) element in this layout.

### **`PublicLayout`**

PublicLayout is used in [PublicRoute](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Frouter%2FPublicRoute.tsx), showing the [LanguageSelector](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Fcomponents%2FLanguageSelector.tsx), then the child content with the [AppVersion](#appversion).

### **`SideMenu`**

SideMenu is the menu bar shown on the left side of every page after logging in. The menu has 2 main state, _open_, and _isMobile_. A header is shown at the top, and if it is _not open_ and _not mobile_, then a small logo is shown here. If it is _open_, then a bigger logo is shown. On _mobile_, a Drawer is shown, which on _open_ acts like on desktop, a full version of the menu opens from the left. Below the header are the children components ([SideMenuOptions](#sidemenuoptions)).

### **`SideMenuOptions`**

This component gets the following props: if its _collapsed_ (optional), if it's used in the _footer_ (optional), the _handleClose_ function, and the _options_ array. One option has a _label_, _labelTooltip_ (optional), _icon_, _roles_ (optional, with what role it is seen), a _link_ (optional), and an _onClick_ (optional) function.<br>

The menu gets from the current path, which option is selected:

```js
const path = useSelector((state: RootState) => state.router.location.pathname);
const pathRoot = useMemo(() => `/${path.split("/")[1]}`, [path]);
```

If the menu is the _footer_ one, then it gets an extra LanguageSelector on top, and the AppVersion on the bottom. Between these two, and on the non-footer one, are shown the options, based on the passed options array. It first checks, if the user has the required permission for that option, then building a Menu.Item from those.

```js
options.filter(option => hasPermission(option.roles ?? [])).map((option, i) => (...)
```

### **`Adding a new menu option`**

1. Create the page, and all the elements connected to it

```js
NewPage.tsx
...
```

2. Add the required role under the [roleHelpers.ts](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Fservices%2FroleHelpers.ts)

```js
export const pageViewRoles = {
  ...
  newPage: [Roles.NewPageRole],
  ...
}
```

3. Add a new route under [router.tsx](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Frouter%2Frouter.tsx)

```html
<PrivateRoute
  exact
  path="/newPage"
  roles="{pageViewRoles.newPage}"
  component="{newPage}"
/>
```

4. Finally add a new entry to either options under [PrivateLayout](#privatelayout) if it's a private page.

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
