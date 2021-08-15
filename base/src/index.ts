import { registerMicroApps, start } from 'qiankun';
import './app';

registerMicroApps([
  {
    name: 'VueMicroApp',
    entry: 'http://localhost:10000',
    container: '#micro-app',
    activeRule: '/vue',
  },
  {
    name: 'ReactMicroApp',
    entry: 'http://localhost:10001',
    container: '#micro-app',
    activeRule: '/vue',
  },
], {
  beforeLoad: () => {
    console.log('before load!');
    return Promise.resolve();
  },
});

start();
