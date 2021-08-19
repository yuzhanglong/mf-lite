import { registerMicroApps, start } from 'qiankun';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './app';

const render = () => {
  ReactDOM.render(<App />, document.getElementById('base-app'));
};

render();

registerMicroApps([
  {
    name: 'ReactMicroApp',
    entry: 'https://micro-fe.yuzzl.top/react-micro-app',
    container: '#micro-app',
    activeRule: '/react',
  },
  {
    name: 'VueMicroApp',
    entry: 'https://micro-fe.yuzzl.top/vue-micro-app',
    container: '#micro-app',
    activeRule: '/vue',
  },
]);

start({
  prefetch: false,
});
