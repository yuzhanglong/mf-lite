import { ProxyServer } from '@attachments/proxy';

const runProxy = async () => {
  const server = new ProxyServer();

  // micro app 代理
  server.addRule(
    'mf-lite-quick-start-micro-app.vercel.app',
    {
      location: '/',
      proxyPass: 'http://localhost:10000',
    }
  );

  server.addRule(
    'mf-lite-quick-start-base-app.vercel.app',
    {
      location: '/',
      proxyPass: 'http://localhost:8080',
    }
  );

  await server.initServers();
  await server.listen();
};

runProxy().catch(e => {
  console.log(e);
});
