import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';

const App: React.FC = () => {
  return (
    <div>
      <Button variant='contained'>
        {intl('Hello_World')}
      </Button>
    </div>
  );
};

export const render = () => {
  ReactDOM.render(<App />, document.getElementById('react-app'));
};
