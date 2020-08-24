## **`Authentication`**

The **features/auth** folder contains the pages, components and the business logic (except api calls, which is located under [api/swagger/apis/AuthApi.ts](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Fapi%2Fswagger%2Fapis%2FAuthApi.ts)) connected to the authentication.

The folder built like other [feature](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Ffeatures%2README.md) folders:

- Pages: [LoginPage.tsx](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Ffeatures%2Fauth%2FLoginPage.tsx), [RecoveryPage.tsx](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Ffeatures%2Fauth%2FRecoveryPage.tsx), [SignupPage.tsx](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Ffeatures%2Fauth%2FSignupPage.tsx)
- Slice: [authSlice.ts](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Ffeatures%2Fauth%2FauthSlice.ts)
- Extra scss: [RecoveryPage.module.scss](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Ffeatures%2Fauth%2FRecoveryPage.module.scss), [SignupPage.module.scss](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Ffeatures%2Fauth%2FSignupPage.module.scss), [AuthLayout.module.scss](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Ffeatures%2Fauth%2Fcomponents%2FAuthLayout.module.scss)
- Extra smaller components: [AuthLayout.tsx](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Ffeatures%2Fauth%2Fcomponents%2FAuthLayout.tsx) (all the pages here using this, as their base component)
- Extra custom hook: [useAuth.tsx](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Ffeatures%2Fauth%2FuseAuth.tsx)

### **`Login flow`**

Starting from the useAuth hook, under the handleLogin function, we dispatch the **login action** with the form data (email, password), from the LoginPage.
The login action leads to the **login thunk** in the authSlice. This action resets the store, so we have a clean state ready after the login procedure.

First async call logins the user:

```js
const userVm = await api.auth.login(loginRequest);
```

After dispatching the **loginSuccess**.
We store the [jwt](https://jwt.io/) (and expiration) and the refreshToken in the **sessionStorage**:

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

> _We use the jwt bearer header for every api call, and also used in our [middleware](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Fmiddlewares%2FsignalR). After setting the tokens, we store the userData in the state, building it up from the jwt token._

then gets the logged in contact's partner (storing the partner id and partner name in the **state**, and in the **sessionStorage**):

```js
const partner = await api.partner.getMyPartner();
```

and finally gets the partner contact (storing the contact id in the **state**, and in the **sessionStorage**):

```js
const contact = await api.partnerContacts.getMyPartnerContact();
```

If the user came from a previous page, then gets redirected back, or normally redirected to the home page, if the login proccess was succesful.

### **`Logout`**

We dispatch the **logout action/thunk** on unsuccessful [token refresh](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Fapi%2FconfigApiMiddleware.ts), or manually from the [PrivateLayout](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Fcomponents%2Flayout%2FPrivateLayout.tsx) SideMenu. The logout process clears the stored session variables, then [hard resets](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Fapp%2FstoreUtils.ts) (also clearing the router history) the store.
No api/backend call happens.

### **`Sign up`**

Starting from the useAuth hook, under the handleSignup function, we dispatch the **signUp action** with the form data (email, password, fullname, phone, code, acceptUserAgreements) from the SignupPage. The signUp action leads to the **signUp thunk** in the authSlice.

There is one api call here

```js
await api.auth.registerPartnerContact(requestRequest);
```

and if it is successful, then the user gets [logged](#login-flow) in.

### **`Change password`**

Starting from the [useProfile](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Ffeatures%2Fprofile%2FuseProfile.ts) hook, under the handleFinish function, we dispatch the **changePassword action** with the form data (password, oldPassword) from the [ProfileEditorForm](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Ffeatures%2Fprofile%2FProfileEditorForm.tsx) ([ProfileEditorPage](https://grapesolutions.visualstudio.com/RTD-NKM/_git/pkm-couponmanager?path=%2Fsrc%2Ffeatures%2Fprofile%2FProfileEditorPage.tsx)). The changePassword action leads to the **changePassword thunk** in the authSlice.

There is one api call here

```js
await api.auth.changePassword({
  changePasswordDto: { newPassword, oldPassword }
});
```

and if it is successful, then we show a message with that on the page.

### **`Password recovery`**

Starting from the useAuth hook, under the handleRecoverPassword function, we dispatch the **recoverPassword action** from the RecoveryPage. The recoverPassword action leads to the **recoverPassword thunk** in the authSlice.

TODO, currently no real api call or business logic going on.
