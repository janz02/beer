# API

## How are the APIs generated?

The endpoints of the backend can be viewed in the
[SwaggerUI](https://pkm-coupon-dev.grapetest.xyz/swagger), but there is also a [JSON
version](https://pkm-coupon-dev.grapetest.xyz/swagger/v1/swagger.json) for it. This JSON file uses
the OpenAPI format, from which the client can be generated using a OpenAPI client generator. This
project uses the
[typescript-fetch](https://openapi-generator.tech/docs/generators/typescript-fetch/) generator to
generate clients.

To run the generator, use the following command:

```
npm run generate-client
```

which runs the [generate-client.js](../../config/generate-client.js) script.
For further information, check the [config readme](../../config/README.md).

</br>

## Why generate client APIs?

Some of the reasons:

- It saves the manual work of writing them by hand
- It's easier to update because you don't have to rewrite it, only regenerate it
- They are type checked, so if something changes in the backend, you get compile time error message
  after the client is regenerated
- The CI checks the version of the client, if it's out of date the build will fail and you have to
  fix and commit it.

</br>

## Authentication

For authentication, there are two tokens: a JWT token and a refresh token. When the JWT token expires,
it needs to be refreshed before it can be used again. The refresh works by checking the expiration
time before each call to the server. The generated client by OpenAPI supports middlewares that can
be used to intercept http requests and do the JWT checking there. If the token is too old, a
separate request is sent to the server to get a new JWT token. See [configApiMiddleware file](configApiMiddleware.ts).

</br>

## Error handling

There's another middleware in [index file](index.ts) to handle errors, if the HTTP status code doesn't indicate
success, it displays a notification for the user and also outputs it to the `console`. The server
returns a key for the error description so the message can be displayed with the correct localization.

</br>

## Environments

In the `.env-cmdrc` file, there are multiple environments defined with environment variables, most
notably the server url. You can select the environment when you run one of the npm start scripts
from [package.json](../../package.json):

```json
"start": "env-cmd -e dev react-app-rewired start",
"start:local": "env-cmd -e local react-app-rewired start",
```

Here the default `start` command will use the `dev` environment that is configured in the
`.env-cmdrc` file. The `local` environment can be launched with:

```bash
npm run start:local
```

Because `env-cmd` sets these environement variables, they can be accessed in the code with
`process.env`. When the code runs in some user's browser, environment variables make no sense, but
Webpack can replace expressions like `process.env.REACT_APP_API_URL` to their defined values in
compile time. This is implemented by the
[`EnvironmentPlugin`](https://webpack.js.org/plugins/environment-plugin/).

</br>

## Adding a new controller

In the [index file](index.ts), there's a global variable called `api`:

```ts
export const api = {
  coupons: new CouponsApi(config),
  tags: new TagsApi(config),
  ...
}
```

You can add new controllers here, if a new version of the backend has a new one. Controller refers
to a backend class that contains actions (endpoints), and it's part of the url:

```
/api/{controller}/{action}
```

</br>

## Using the generated APIs

An example call to the `/api/Partners/My` endpoint:

```ts
const partner = await api.partner.getMyPartner();
```

`getMyPartner` returns with a `Promise`, so you can use `await` for it. There are also raw functions
generated, like `getMyPartnerRaw`. They return value contain the `Response` object from the `fetch`
calls, but most of the time, there's no need for that, so the non-raw function should be used.
