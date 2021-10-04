import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import './init-common';
import { routes } from './routes';


const App: React.FC = () => {
  return (
    <BrowserRouter basename={'/react'}>
      {renderRoutes(routes)}
    </BrowserRouter>
  );
};

export const render = () => {
  const el = document.getElementById('react-app');
  if (el) {
    ReactDOM.render(<App />, el);
  }
};

export const destroy = () => {
  const el = document.getElementById('react-app');
  if (el) {
    ReactDOM.unmountComponentAtNode(el);
  }
};
