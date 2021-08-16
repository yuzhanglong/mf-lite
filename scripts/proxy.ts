import { ProxyServer } from '@attachments/proxy';

const runProxy = async () => {
  const server = new ProxyServer();

  server.addRule(
    'micro-fe.yuzzl.top',
    {
      location: '/',
      proxyPass: 'http://localhost:8080',
    },
    {
      location: '/vue-micro-app',
      proxyPass: 'http://localhost:10000/vue-micro-app',
    },
    {
      location: '/react-micro-app',
      proxyPass: 'http://localhost:10001/react-micro-app',
    }
  );
  await server.initServers();
  await server.listen();
};

runProxy().catch(e => {
  console.log(e);
});