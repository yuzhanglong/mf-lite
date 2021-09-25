import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';

const App: React.FC = observer(() => {
  return (
    <div>
      <Button>Hello world!</Button>
    </div>
  );
});

export const render = () => {
  ReactDOM.render(<App />, document.getElementById('react-app'));
};

export const destroy = () => {
  const el = document.getElementById('react-app');
  if (el) {
    ReactDOM.unmountComponentAtNode(el);
  }
};
