## index.ts

This is the entry point of the application where `ReactDOM.render` is called. There is also some
code related to [hot module replacement](https://webpack.js.org/guides/hot-module-replacement/).

## The ServiceWorker

There's a `serviceWorker.ts` file. It would allow using the app in offline mode, or as a PWA. It
uses [Workbox](https://developers.google.com/web/tools/workbox) under the hood. But it's not needed
for PKM, so it's disabled.

## Directory structure

### build

Build output files are placed here when the `npm run build` command is run. These files will be
served for the browser. This folder is ignored by Git.

### config

Configations for nginx and code generators. See [../config/README.md](config/README.md).

### public

Files that are copied to the `build` folder by `npm run build`, but they are still part of the
repository.

### src

Sources code of the application, these files are private and not served for the browser. This
`README.md` file is about this folder.

#### api

Contains code that makes calling the backend easier. See [api/README.md](api/README.md).

#### app

Here is the topmost component defined, the `App`, and other root files that holds everything
together.

#### assets

Images and SCSS files stay in this folder:

- Images are in the SVG format so they work on displays with different scaling factors. They are
  also small, so it's ideal for the web.

- The SCSS files in this folder are not related to any component, they are more of a general styles
  and customizations for Ant Design.

#### components

Contains reusable React functional components and optionally the associated stylings. These are not
related to any specific page in the application.

#### features

This is where application specific components and the related logic are. See
[features/README.md](features/README.md).

#### hooks

Reusable React Hooks are here. See [hooks/README.md](hooks/README.md).

#### middlewares

In this folder, there is the SignalR middleware to handle notifications from the server without
polling. See [hooks/README.md](hooks/README.md).

#### models

Models are types that only contain data, no methods. See [models/README.md](models/README.md).

#### router

Different parts of the application can be accessed by certain URLs. The router is responsible for
choosing the correct component based on the URLs.

#### services

Reusable helper functions. See [services/README.md](services/README.md).

## Coding conventions

### Styling

The styles are written with SCSS and the rules are in the [../.stylelintrc](../.stylelintrc) file.
These rules are checked by the stylelint extension. If a component requires styling, there should be
a `.scss` file next to the component with the same name.

### Typescript

Typescript files may contain components, in this case their extension is `.tsx`, other typescript
files are `.ts` files. There can be only one component one component in a file and its name matches
the component's name. Only functional components are used, so their type is `React.FC` instead of
`React.Component`.

Formatting rules and lints for TS are in `.eslintrc` and compiler settings for TS is in the
`tsconfig.json` file.

Identifiers in TS should be typed and avoid using `any`. An exception to this rule is if a library
doesn't have typings. If typings are not included in the npm package, it may be in the `@types` scope
in npm, e.g. `@type/package-name`.

## VSCode Extensions

- [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify) for code
  formatting
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
  to prevent typos in variable names and comments
- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
  for debugging inside VSCode
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) shows lint
  errors as you type
- [npm](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script) allows running
  npm scripts without command line
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
  to check mardown formatting rules
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) a second
  option for code formatting, but it takes ESLint rules into account, so it might be better
- [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) to
  check SCSS formatting
- [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)
  checks for TS lint rule violations
- [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) for `.yml` file
  support
