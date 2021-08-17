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
      location: '/react-micro-app',
      proxyPass: 'http://localhost:10000/react-micro-app',
    },
    {
      location: '/vue-micro-app',
      proxyPass: 'http://localhost:10001/vue-micro-app',
    }
  );
  server.addRule('micro-fe.yuzzl.top:80',{
    location: '/',
    proxyPass: 'http://localhost:8080',
  });
  await server.initServers();
  await server.listen();
};

runProxy().catch(e => {
  console.log(e);
});
