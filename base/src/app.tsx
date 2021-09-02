import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import { observer } from 'mobx-react-lite';
import { renderRoutes } from 'react-router-config';
import { initIntl } from '~src/utils/init-intl';
import 'antd/dist/antd.css';
import { routes } from '~src/routes';

const App = observer(() => {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Suspense>
  );
});


const reactRenderer = () => {
  ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('base-app'));
};

const beforeAppStart = async () => {
  await initIntl();
};

beforeAppStart()
  .then(() => {
    reactRenderer();
  });


