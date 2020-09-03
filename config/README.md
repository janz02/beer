# NPM Script configs

The content of this folder are configurations/support scripts to support the NPM Scripts and the
CI/CD process of the project.

</br>

## Using the scripts

These scripts can be run manually by their corresponding NPM scripts.

For manually running some scripts, the command line tools needs to be available:
* curl
* java


> Chocolatey is a recommended tool to install the missing ones.

</br>

## Creating scripts

If there are additional pipeline steps needs to be written as scripts, their configuration and main function should be placed here.

> Using `node.js` is recommended as a base running environment, as it does not have any dependency.

</br>

## CI.PS1

A WIP script for the Continuos Integration pipeline to mitigate the instability of the Node.

</br>

## Generate client

A script to call in the BackEnd Swagger and generate its client for the Front End usage.
This script is also used as a CI required check, as the FE should use the latest BE API.

</br>

> As default, the script will generate the client based on the DEV environment. If you are running/integrating/testing the local BE as well, the url should be changed to the localhost swagger instead.  http://localhost:52136/swagger/v1/swagger.json

usage
```bash
npm run generate-client
```

</br>

## Generate backend translation keys

A script to support the Generate client script. It will get the validation error messages and enums
to be translated provided by the BE Swagger. It will also generate a file for using generated keys.

A check is added to ensure that notification link is added for every notification type.

By doing this, the called i18next scan script won't delete the generated keys because they are used.
Additional information at [i18next readme](../src/app/i18n/readme.md).

usage
```bash
npm run generate-backend-translation-keys
```

</br>

## i18next scanner config

An i18next-scanner configuration that provides the default missing value for the translations and
additional setup options. The scanner maintains the locale files by deleting the unused keys, ordering
and adding the newly created translations.

usage
```bash
npm run i18n:generate
```

</br>

## ngingx config

Is http server configuration for the production environment docker setup.
It specifies the index redirect in case of a slash ending. For example the `/auth` url will internally redirect to the `/auth/index.html` file, instead of trying to open it as a folder. This rule is also needed for the docker hosting, to support the navigation between static contents. Further information at [nginx serving static content](https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/ ) guide.

</br>

## SASS to javascript

A converter from SASS to LESS variables, to modify the default Ant design.
Further information: [Ant Design SASS variables](https://grapesolutions.atlassian.net/wiki/spaces/KB/pages/1077215272/AntDesign+SASS+v+ltoz+k)

</br>

## Setup tests and mocks

A configuration script to setup `enzyme` to use `jest` and the mocks by the `setupMocks` script.

This script is also used as a CI required check, as all the test should pass.

usage
```bash
npm test
```
