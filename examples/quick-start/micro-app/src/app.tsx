import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import './init-common';
import { Button } from 'antd';
import add, { sayHello } from 'base_app/shared-utils';
import { routes } from './routes';


const App: React.FC = () => {
  sayHello();
  return (
    <BrowserRouter>
      <Button type={'primary'}>
        微应用正在消费子应用的组件
      </Button>
      <div>
        来自基座的 add 方法：1 + 2 = {add(1, 2)}
      </div>
      {renderRoutes(routes)}
    </BrowserRouter>
  );
};

export const render = () => {
  const el = document.getElementById('micro-app-react');
  if (el) {
    ReactDOM.render(<App />, el);
  }
};

export const destroy = () => {
  const el = document.getElementById('micro-app-react');
  if (el) {
    ReactDOM.unmountComponentAtNode(el);
  }
};
