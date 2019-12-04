import React from 'react';
import { Router } from 'react-router-dom';
import { history } from 'router';
import RouterView from 'router';

const App: React.FC = () => (
  <Router history={history}>
    <RouterView />
  </Router>
);

export default App;
