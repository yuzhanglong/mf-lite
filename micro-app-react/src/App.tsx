import React from 'base_app/react';
import ReactDOM from 'base_app/react-dom';
import { Button } from 'base_app/@material-ui/core';
import BasicTable from './table-demo';

interface AppProps {

}

const App: React.FC<AppProps> = () => {
  return (
    <div>
      <Button variant="contained">Hello React! 🎉	</Button>
      <BasicTable/>
    </div>
  );
};

export const render = () => {
  ReactDOM.render(<App />, document.getElementById('react-app'));
};
