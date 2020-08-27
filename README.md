## Introduction

This repository contains the frontend of the PKM project, where partners (mainly shops) can issue
coupons for their products. Partners can register as users if they have a code. Another type of
users are the NKM users (admins).

## Dependencies

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
It uses Redux Toolkit for state management and the Ant Design component library.

- **Redux Toolkit** is used for state management
- **Ant Design** is a component library
- **Jest** allows writing unit tests
- **React Router** handles the routing in the app
- **GrapesJS** is HTML template editor for the coupons that are sent out in email
- **i18next** helps with internationalization and translating the site
- **Sass** allow writing more advanced CSS
- **Typescript** makes it possible to have types in JavaScript
- **Curl** is used for generating the API client  
  Should be already installed with Windows or Linux.
- Other dependencies are listed in the `package.json` file.

## First start

Install the dependencies from the `package.json` file:

```bash
npm install
```

This should have created the `node_modules` folder, it's ready to start the app:

```bash
npm start
```

And now the frontend should be running on `http://localhost:3000`.

The following credentials can be used to log in:

```
username: devAdmin@g.hu
password: testeR#1
```

## Debug inside VS Code

The required extension for debugging is:
[Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome).

Once the extension is installed, run the application with the `npm start` command and start
debugging in VSCode, the default hotkey for it is F5. It will start a new instance of Chrome and now
it's possible to set breakpoints, checking the values of variables, etc in VS Code.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Uses [Webpack DevServer](https://webpack.js.org/configuration/dev-server/) for live reloading, so
the code will recompile and the browser reloads the page if you make edits to any imported file.
[Hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/) is also enabled,
but it only works for scss files, so you can change the styles without reloading.

You can also use the `npm run start:local` command to use the `local` environment which is defined
in the `.env-cmdrc` file, but the default is the `dev` environment.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

To generate reports, run this commmand:

```bash
npm test -- --watchAll=false --passWithNoTests --reporters default --reporters jest-junit --coverage --coverageDirectory=output --coverageReporters cobertura
```

This is taken from the `azure-pipelines.yml` file which contains a task called `Run Tests`. It will
generate a report and save it to the `junit.xml` file, this will contain status of the tests,
whether they are successful or not. It also generates a code coverage report to the
`output/cobertura-coverage.xml` file.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## Build using Docker

If Docker is installed, you can build a Docker image:

```bash
docker build --tag pkm-couponmanager .
```

An image contains files that will be necessary to run a container and it is build based on the
`Dockerfile` which contains commands telling what to do in order to build it. Dockerfiles can depend
on other Dockerfiles, in this case it depends on `node:13.2`.

If there is an error like `JavaScript heap out of memory`, you can just increase the memory size
allocated to the VM in the Docker settings.

To run an image:

```bash
docker run -p 3000:80 -d pkm-couponmanager
```

This will create a container based on the `pkm-couponmanager` image. A container is similar to a
virtual machine, but more lightweight, because one OS can run multiple containers. But it's more
common to use Linux containers, so Hyper-V or WSL is needed on Windows.

In the command, `-p 3000:80` tells Docker the port mapping, 3000 will be the host port, so you can
open it in the browser using `http://localhost:3000`, 80 is the port inside the container. The `-d`
option is short for detached mode and it allows using the command line after running the command,
the container will run in the background.

To stop the container:

```bash
docker container kill 0123456789abcdef
```

You need to know the name of the container to kill it. The command that was used to run it, didn't
specify a name for it, so Docker will generate one. It is written to the console when the image is
run, or you can find it using `docker container ls`.

## Learn More

You can learn more in the [`./src/README.md`](./src/README.md) file and other `README.md` files in
the subdirectories.
