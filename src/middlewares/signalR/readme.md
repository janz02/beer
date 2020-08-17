# Middlewares

In the web world middlewares are mostly used to intercept api calls (request-response).  
Middlewares can be composed together (aka. pipeline).  
Probably the most commonly used ones are logging and tracing middlewares,
where you can integrate your own solution to log api call exceptions or trace api call request-response headers & details
and save/send these logs/traces to your store(s).

## Redux middlewares

[Here](https://redux.js.org/advanced/middleware) you can read about the redux middlewares, and you can find the basic redux implementations of the simple logging and tracing middlewares.  
A simple logging middleware should look something like this:

```js
const logger = store => next => action => {
  console.log("dispatching", action); // before the next action - do your stuff here
  let result = next(action);
  console.log("next state", store.getState()); // after the next action - do your stuff here
  return result;
};
```

With the [Redux toolkit](https://redux-toolkit.js.org/) (RTK) you can configure middlewares by passing an array of middleware functions while creating the store with the [configureStore](https://redux-toolkit.js.org/api/configureStore) method.  
By default RTK includes the [thunk](https://github.com/reduxjs/redux-thunk) middleware in dev & prod environment, which adds support for the async/await pattern - mostly used for making api calls, but it can be used for any async operation. See more about RTK default middlewares [here](https://redux-toolkit.js.org/api/getDefaultMiddleware#included-default-middleware)

**You can use middlewares for any common logic which (can) reside in your `App` dispatch flow.** From middlewares you can access the store and you can dispatch other actions too. **Note that any actions dispatched to the store will flow through the same flow over and over again** so if you dispatch an action from a middleware then that action it will hit the middlewares layer again.  
A `middleware` exist for the lifetime of the application, so it's a global place where you can place/handle top level concepts that belongs to the entire `App`, it's not about storing the data, it's rather about manipulating the data, handling/altering data flows and handling common application logic.  
![If the pic isn't available just search for 'redux dispatch flow with middleware'](https://designingforscale.com/content/images/2017/09/reduxMiddleware.png "Redux dispatch flow with middleware")

## Used middlewares

### SignalR

[SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-3.1) enables server-side to push messages to client-side and for client-side to call server-side methods by their name.
[Where should SignalR live inside our `App`](https://redux.js.org/faq/code-structure#where-should-websockets-and-other-persistent-connections-live), and the answer is in a middleware. As a middleware we can manage the SignalR connection in a global manner.
We are using the [official npm package](https://www.npmjs.com/package/@microsoft/signalr) for SignalR integration.
**SignalR is used to enable receiving and processing notifications from the server.**
The only exported function is the middleware itself, which is used when creating the redux store in [store.ts](../../app/store.ts).
The middleware tries to create a connection if there is an existing jwt token, also registers some default callbacks (onReconnected, onReconnecting, onClose, start, startFail) beside registering a callback for receiving `NewNotification`-s based by the user role, finally tries to start/open the connection. More about the available connection [configurations](https://docs.microsoft.com/en-us/aspnet/core/signalr/configuration?view=aspnetcore-3.1&tabs=dotnet#configure-client-options-1), about [withAutomaticReconnect](https://www.jerriepelser.com/blog/automatic-reconnects-signalr/), about [logging](https://docs.microsoft.com/en-us/aspnet/core/signalr/diagnostics?view=aspnetcore-3.1#javascript-client-logging).
**For every registered callback you can dispatch an action to the store to handle the state changes and reflect those on the UI. So for example in the registerCallbacks where we are subscribing to receive the `NewNotification` messages from the server by registering a callback function so when this event occurs we will dispatch the `getRecentNotifications` action from the [notificationSlice.ts](../../features/notification/notificationSlice.ts) to actually make the api call and get the (new)notifications.** Here you can register further callbacks for subscribing to other server-side methods. Note that you have to extend the store/slice also if you want to handle these new type of messages/notifications. Currently all `NewNotification`-s has a type field ([NotificationType](../../api/swagger/models/NotificationType.ts)) which describes the actual reason (not the audience) of why it was created.  
The initialization runs only once, when the middleware is instantiated, then returns the new dispatch function which handles only the specified actions. On loginSuccess connects to the server, on logout disconnects from the server and on open reconnects to the sever if there isn't already an open connection.

## See More

- [Step by step ex. of redux logger middleware impl.](https://medium.com/better-programming/redux-middleware-in-depth-write-custom-redux-middleware-4f02e2497cd6)
- [Redux.js.org ecosystem#middleware](https://redux.js.org/introduction/ecosystem#middleware)
- [A list of redux middlewares](https://github.com/xgrommx/awesome-redux#react---a-javascript-library-for-building-user-interfaces)
- [SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-3.1)

- [SignalR with React-Redux](https://medium.com/@lucavgobbi/signalr-react-redux-5a100a226871)
