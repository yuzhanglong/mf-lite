import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';

const App: React.FC = observer(() => {
  return (
   <div>
     <Button>React Micro App</Button>
   </div>
  );
});

export const render = () => {
  ReactDOM.render(<App />, document.getElementById('react-app'));
};
