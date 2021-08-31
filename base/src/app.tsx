import 'react-perfect-scrollbar/dist/css/styles.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import React, { Suspense, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import GlobalStyles from '~src/components/GlobalStyles';
import '~src/mixins/chartjs';
import { getThemes } from '~src/theme';
import routes from '~src/routes';
import { initIntl } from '~src/utils/init-intl';
import { GlobalContext } from './utils/global-context';
import { globalStore } from '~src/store/global-store';

const ThemeContext = observer(() => {
  const routing = useRoutes(routes);
  const store = useContext(GlobalContext);
  return (
    <ThemeProvider theme={getThemes(store.globalStore.local)}>
      <GlobalStyles />
      <Suspense fallback={null}>
        {routing}
      </Suspense>
    </ThemeProvider>
  );
});

const App = observer(() => {
  return (
    <GlobalContext.Provider
      value={{
        globalStore: globalStore,
      }}>
      <ThemeContext />
    </GlobalContext.Provider>
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


