# Introduction

Elastic APM measures performance of the application and reports errors that can be viewed in Kibana.
Performance measurements consists of transactions and spans, both of them are intervals of time, but
they are in a hierarchy, spans are subintervals of transactions. APM supports backend and frontend,
the frontend library is called RUM.

<br>

# Documentation links

- Intro: [https://www.elastic.co/guide/en/apm/agent/rum-js/master/intro.html](https://www.elastic.co/guide/en/apm/agent/rum-js/master/intro.html)
- Getting started: [https://www.elastic.co/guide/en/apm/agent/rum-js/master/getting-started.html](https://www.elastic.co/guide/en/apm/agent/rum-js/master/getting-started.html)
- Configuration: [https://www.elastic.co/guide/en/apm/agent/rum-js/master/configuration.html](https://www.elastic.co/guide/en/apm/agent/rum-js/master/configuration.html)
- Data model: [https://www.elastic.co/guide/en/apm/get-started/current/apm-data-model.html](https://www.elastic.co/guide/en/apm/get-started/current/apm-data-model.html)

<br>

# How it is used in PKM

- It's initialized in the [`index.ts`](index.ts) file
- Routes are using the `ApmRoute` instead of the existing `Route` to help APM measure `route-change`
  transactions.
- Most `user-interaction` are not well named, but clicking on the login button gives a better name
  to its transaction (see [useAuthUtils.tsx](../../features/auth/useAuthUtils.tsx)):

  ```ts
  withCurrentTransaction(t => (t.name = "Click - login"));
  ```

<br>

# Issues with RUM

<br>

## React integration has no typings

This is easy to solve, there's already a type definition file for it in
[apm-rum-react.d.ts](../../apm-rum-react.d.ts), which was taken from a
[Github issue](https://github.com/elastic/apm-agent-rum-js/issues/624)

<br>

## Lost state after route changes

If you define multiple paths for the same component in the router, e.g.:

```tsx
<Route path={["/something/new", "/something/:id"]} component={SomethingPage} />
```

or:

```tsx
<Route path={["/something/new"]} component={SomethingPage} />
<Route path={["/something/:id"]} component={SomethingPage} />
```

When the path changes, hooks lose their states because of `ApmRoute`. `useState` will reset to the
default value, the callback of `useEffect` will be run again, etc., as if you specify a different
component. These are the tickets created for it:

- [Elastic discuss](https://discuss.elastic.co/t/switching-to-apmroute-changes-the-behavior-of-the-application/252795)
- [Github issue](https://github.com/elastic/apm-agent-rum-js/issues/924)

The first solution would be to only use a single path for the route: `path="/settings/:tab?/:id?"`
instead of `path={['/settings', '/settings/:tab/:id']}`.

The other solution is to use `withTransaction` instead of `ApmRoute`:

```tsx
const ApmSettingsPage = withTransaction(
  "/settings",
  "route-change"
)(SettingsPage);
```

But for components that don't depend on hooks keeping their values, `ApmRoute` works fine.

<br>

## Event targets are not correct

The `user-interaction` transactions don't specify where the user were clicking, all of them will be
named `Click - html`. A way to specify a better name for the transactions was mentioned above:
`t.name = "Click - login"`, but it's not really convenient.

RUM works by patching `addEventListener` and `removeEventListener` methods, so the logging code is
injected whenever you use these methods in the code. But for `onclick` handlers, this doesn't work.
If you have a element like `<button name="something">` and you call `addEventListener` on that
element, RUM will log these as `Click - button["something"]`.

But React seems to have a global click handler attached to `document.documentElement`, whose
`tagName` is `html`, that's why the transactions are named `Click - html`.

<br>

## Writing custom transactions

There's a way to measure anything with a custom transaction:

```tsx
const transaction = apm.startTransaction("my-transaction", "my-type")!;
const span = transaction.startSpan("my-span")!;

setTimeout(() => {
  span.end();
  transaction.end();
}, 1000);
```

<br>
