import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import './init-common';
import { routes } from './routes';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  );
};

export const render = () => {
  const el = document.getElementById('micro-app-two');
  if (el) {
    ReactDOM.render(<App />, el);
  }
};

export const destroy = () => {
  const el = document.getElementById('micro-app-two');
  if (el) {
    ReactDOM.unmountComponentAtNode(el);
  }
};
