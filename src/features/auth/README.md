# Authentication

The current folder contains the pages, components and the business logic (except api calls, which is located under [api/swagger/apis/AuthApi.ts](../../api/swagger/apis/AuthApi.ts)) connected to the authentication.

The folder built like other [feature](../README.md) folders:

- Pages: [LoginPage.tsx](LoginPage.tsx), [RecoveryPage.tsx](RecoveryPage.tsx), [SignupPage.tsx](SignupPage.tsx)
- Slice: [authSlice.ts](authSlice.ts)
- Extra scss: [RecoveryPage.module.scss](RecoveryPage.module.scss), [SignupPage.module.scss](SignupPage.module.scss), [AuthLayout.module.scss](components/AuthLayout.module.scss)
- Extra smaller components: [AuthLayout.tsx](components/AuthLayout.tsx) (all the pages here using this, as their base component)
- Extra custom hook: [useAuth.tsx](useAuth.tsx)

</br>

## Login flow

Starting from the useAuth hook, under the handleLogin function, we dispatch the `login action` with the form data (email, password), from the LoginPage.
The login action leads to the `login thunk` in the authSlice. This action resets the store, so we have a clean state ready after the login procedure.

First async call logins the user:

```js
const userVm = await api.coupon.auth.login(loginRequest);
```

After dispatching the `loginSuccess`.
We store the [jwt](https://jwt.io/) (and expiration) and the refreshToken in the `sessionStorage`:

```js
const jwt = action.payload.jwtToken;
const refreshToken = action.payload.refreshToken;
const decodedJwt: any = jwt && JwtDecode(jwt);
const jwtExpiration = decodedJwt?.exp;

jwt && sessionStorage.setItem("jwt", jwt);
refreshToken && sessionStorage.setItem("refreshToken", refreshToken);

// Also correcting precision.
jwtExpiration && sessionStorage.setItem("jwtExpiration", `${jwtExpiration}000`);
```

</br>

> _We use the jwt bearer header for every api call, and also used in our [middleware](../../middlewares/signalR). After setting the tokens, we store the userData in the state, building it up from the jwt token._

</br>

then gets the logged in contact's partner (storing the partner id and partner name in the `state`, and in the `sessionStorage`):

```js
const partner = await api.coupon.partner.getMyPartner();
```

and finally gets the partner contact (storing the contact id in the `state`, and in the `sessionStorage`):

```js
const contact = await api.coupon.partnerContacts.getMyPartnerContact();
```

If the user came from a previous page, then gets redirected back, or normally redirected to the home page, if the login proccess was successful.

</br>

## Logout

We dispatch the `logout action/thunk` on unsuccessful [token refresh](../../api/configApiMiddleware.ts), or manually from the [PrivateLayout](../../components/layout/PrivateLayout.tsx) SideMenu. The logout process clears the stored session variables, then [hard resets](../../app/storeUtils.ts) (also clearing the router history) the store.
No api/backend call happens.

</br>

## Sign up

Starting from the useAuth hook, under the handleSignup function, we dispatch the `signUp action` with the form data (email, password, fullname, phone, code, acceptUserAgreements) from the SignupPage. The signUp action leads to the `signUp thunk` in the authSlice.

There is one api call here

```js
await api.coupon.auth.registerPartnerContact(requestRequest);
```

and if it is successful, then the user gets [logged](#login-flow) in.

</br>

## Change password

Starting from the [useProfile](../profile/useProfile.ts) hook, under the handleFinish function, we dispatch the `changePassword action` with the form data (password, oldPassword) from the [ProfileEditorForm](../profile/ProfileEditorForm.tsx) ([ProfileEditorPage](../profile/ProfileEditorPage.tsx)). The changePassword action leads to the `changePassword thunk` in the authSlice.

There is one api call here

```js
await api.coupon.auth.changePassword({
  changePasswordDto: { newPassword, oldPassword }
});
```

and if it is successful, then we show a message with that on the page.

</br>

## Password recovery

Starting from the useAuth hook, under the handleRecoverPassword function, we dispatch the `recoverPassword action` from the RecoveryPage. The recoverPassword action leads to the `recoverPassword thunk` in the authSlice.

TODO, currently no real api call or business logic going on.
