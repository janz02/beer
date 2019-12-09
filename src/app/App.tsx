import React from 'react';
import { Router } from 'react-router-dom';
import { history } from 'app/router';
import RouterView from 'app/router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'app/store';

const App: React.FC = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Router history={history}>
        <RouterView />
      </Router>
    </Provider>
  </BrowserRouter>
);

export default App;
