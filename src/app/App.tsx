import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { history, RouterView } from 'router/router'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import huHU from 'antd/lib/locale/hu_HU'
import enGB from 'antd/lib/locale/en_GB'
import { useTranslation } from 'react-i18next'
import { Locale } from 'antd/lib/locale-provider'
import { store } from './store'

export const App: React.FC = () => {
  const { i18n } = useTranslation()

  const antLocale: () => Locale | undefined = () => {
    switch (i18n.language) {
      case 'en':
        return enGB
      case 'hu':
        return huHU
    }
  }

  return (
    <BrowserRouter>
      <ConfigProvider locale={antLocale()}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <RouterView />
          </ConnectedRouter>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  )
}
