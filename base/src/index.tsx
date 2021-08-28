import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import App from './app';
// import { initExternals } from '~src/utils/init-externals';

// initExternals({
//   'React': React,
// });

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('base-app'));

