import React, { Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { routes } from './router';
import 'antd/dist/antd.css';

const App: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Suspense>
  );
};

const render = () => {
  ReactDOM.render(<App />, document.getElementById('base-app'));
};

render();

