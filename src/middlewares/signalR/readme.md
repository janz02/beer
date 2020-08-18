# Middlewares

In backend services (Express, AspNet Core) middlewares are mostly used to control the request-response flow.  
Middlewares can be composed together (aka. request-response pipeline), note that the order of the middlewares could matter.  
**In redux middlewares provides an extension point between dispatching an action and the moment it reaches the reducer.**  
Probably the most commonly used ones are logging and tracing middlewares, to integrate your own solution to log api call exceptions or trace api call request-responses and save/send these logs/traces to your data store(s).

## Redux middlewares

[Here](https://redux.js.org/advanced/middleware) you can read about the redux middlewares, and you can find the basic redux implementations of a simple logging and tracing middleware.  
A simple logging middleware should look something like this:

```js
const logger = store => next => action => {
  console.log("dispatching", action); // before the next action - do your stuff here
  let result = next(action);
  console.log("next state", store.getState()); // after the next action - do your stuff here
  return result;
};
```

A `middleware` exist for the lifetime of the application, so it's a global place where you can place/handle top level concepts that belongs to the entire `App`, it's not about storing the data, it's rather about manipulating the data, or managing data flows, or handling common application logic.

### **How to use middlewares with RTK**

With the [Redux toolkit](https://redux-toolkit.js.org/) (RTK) you can configure middlewares by passing an array of middleware functions while creating the store with the [configureStore](https://redux-toolkit.js.org/api/configureStore) method.  
By default RTK includes the [thunk](https://github.com/reduxjs/redux-thunk) middleware in dev & prod environment, which adds support for the async/await pattern - mostly used for making api calls, but it can be used for any async operation. Read more about RTK default middlewares [here](https://redux-toolkit.js.org/api/getDefaultMiddleware#included-default-middleware).

**You can use middlewares for any common logic which (can) reside in your `App` dispatch flow.** From middlewares you can access the store and you can dispatch other actions too. **Note that any actions dispatched to the store will flow through the same flow again**, so if you dispatch an action from a middleware then it will hit the middlewares layer again.

![If the pic isn't available just search for 'redux dispatch flow with middleware'](https://designingforscale.com/content/images/2017/09/reduxMiddleware.png "Redux dispatch flow with middlewares")

## Used middlewares

### **SignalR**

> [SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-3.1) enables server-side to push messages to client-side and for client-side to call server-side methods by their name. We are using the [official npm package](https://www.npmjs.com/package/@microsoft/signalr) for SignalR integration.  
> [Where should SignalR live inside our `App`](https://redux.js.org/faq/code-structure#where-should-websockets-and-other-persistent-connections-live), and the answer is in a middleware. As a middleware we can manage the SignalR connection in a global manner.
>
> We use SignalR to enable receiving and processing notifications from the server.
>
> In [signalrMiddleware.ts](signalrMiddleware.ts) only exported function is the middleware itself, which is used during creating the redux store in [store.ts](../../app/store.ts).
>
> First we try to create a connection if there is an existing jwt token. This initialization logic runs only once, when the middleware is constructed, after this returns the new dispatch function which acts as the actual middleware and handles only the specified actions:
>
> 1. `loginSuccess` - connects to the server
> 2. `logout` - disconnects from the server
> 3. `open` - reconnects to the sever if there isn't already an open connection.
>
> During the initialization in `initConnection` after building the connection we are registering some default callbacks (onReconnected, onReconnecting, onClose, start, startFail), these will send status updates to the store by dispatching the `setConnectionState` action from the slice/store.  
> **Then in the `registerCallbacks` function we are registering our own callbacks** (currently only one for receiving `NewNotification`-s based by the logged in user roles/permissions).  
> Finally we try to start/open the connection (read more about the connection [configurations](https://docs.microsoft.com/en-us/aspnet/core/signalr/configuration?view=aspnetcore-3.1&tabs=dotnet#configure-client-options-1), about [withAutomaticReconnect](https://www.jerriepelser.com/blog/automatic-reconnects-signalr/), about [logging](https://docs.microsoft.com/en-us/aspnet/core/signalr/diagnostics?view=aspnetcore-3.1#javascript-client-logging)).
>
> **For every registered callback you can dispatch an action to the store to handle the state changes and reflect those on the UI** (like the connection status, or if any error occurs to display a message). So for example in the `NewNotification` callback when this event occurs we will dispatch the `getRecentNotifications` action from the [notificationSlice.ts](../../features/notification/notificationSlice.ts) to make an api call and get the (new) notifications from the server.
>
> #### **Extending**
>
> Register further callbacks in `registerCallbacks` for subscribing to other server-side methods. Note that you probably have to extend the store/slice also if you want to handle and display these new type of messages/notifications.
>
> Currently all `NewNotification`-s has a type field ([NotificationType](../../api/swagger/models/NotificationType.ts)) which describes the actual reason (not the audience) of why it was created.

## See More

- [Step by step ex. of redux logger middleware impl.](https://medium.com/better-programming/redux-middleware-in-depth-write-custom-redux-middleware-4f02e2497cd6)
- [Redux.js.org middleware ex.](https://redux.js.org/introduction/ecosystem#middleware)
- [A list of redux middlewares](https://github.com/xgrommx/awesome-redux#react---a-javascript-library-for-building-user-interfaces)
- [SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-3.1)
- [SignalR with React-Redux](https://medium.com/@lucavgobbi/signalr-react-redux-5a100a226871)
- [Redux middleware for SignalR (ASP.NET Core)](https://www.npmjs.com/package/redux-signalr), and check the source of [signalr-middleware.ts](https://github.com/Omhet/redux-signalr/blob/master/src/signalr-middleware.ts) on github
