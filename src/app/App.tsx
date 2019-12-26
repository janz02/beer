import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'app/router';
import RouterView from 'app/router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

const App: React.FC = () => (
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <RouterView />
      </ConnectedRouter>
    </Provider>
  </BrowserRouter>
);

export default App;
