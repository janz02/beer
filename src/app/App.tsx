import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'app/router';
import RouterView from 'app/router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ConfigProvider } from 'antd';
import huHU from 'antd/es/locale/hu_HU';
import enGB from 'antd/es/locale/en_GB';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const { i18n } = useTranslation();

  const antLocale = () => {
    switch (i18n.language) {
      case 'en':
        return enGB;
      case 'hu':
        return huHU;
    }
  };

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
  );
};

export default App;
