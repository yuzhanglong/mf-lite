import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';
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
