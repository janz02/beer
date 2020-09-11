import React from 'react'
import ReactDOM from 'react-dom'
import 'assets/scss/index.scss'
import * as serviceWorker from 'serviceWorker'
import './app/i18n'
import { configApiMiddleware } from 'api/middleware'

const render = (): void => {
  const App = require('./app/App').App
  ReactDOM.render(<App />, document.getElementById('root'))
}

configApiMiddleware()

render()

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  ;(module as any).hot.accept('./app/App', render)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
