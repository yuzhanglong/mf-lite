import { registerMicroApps, start } from 'qiankun';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './app';

const render = () => {
  ReactDOM.render(<App />, document.getElementById('base-app'));
};

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

registerMicroApps([
  {
    name: 'ReactMicroApp',
    entry: 'https://micro-fe.yuzzl.top/react-micro-app',
    container: '#micro-app',
    activeRule: '/react',
  },
]);

start();
