import { registerMicroApps, start } from 'qiankun';
import './app';

registerMicroApps([
  {
    name: 'VueMicroApp',
    entry: 'https://micro-fe.yuzzl.top/vue-micro-app',
    container: '#micro-app',
    activeRule: '/vue',
  },
  {
    name: 'ReactMicroApp',
    entry: 'https://micro-fe.yuzzl.top/react-micro-app',
    container: '#micro-app',
    activeRule: '/react',
  },
]);

start();
