import 'react-perfect-scrollbar/dist/css/styles.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import React, { Suspense } from 'react';
import GlobalStyles from '~src/components/GlobalStyles';
import '~src/mixins/chartjs';
import theme from '~src/theme';
import routes from '~src/routes';
import { initIntl } from '~src/i18n';

const App = () => {
  const routing = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Suspense fallback={null}>
        {routing}
      </Suspense>
    </ThemeProvider>
  );
};

const beforeBaseAppStart = async () => {
  await initIntl();
};

beforeBaseAppStart().then(() => {
  ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('base-app'));
});



