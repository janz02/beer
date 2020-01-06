import React from 'react';
import ReactDOM from 'react-dom';
import MomentDisplay from './MomentDisplay';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MomentDisplay />, div);
  ReactDOM.unmountComponentAtNode(div);
});
