import { ProxyServer } from '@attachments/proxy';

const runProxy = async () => {
  const server = new ProxyServer();

  // 基座代理
  server.addRule(
    'base-app.vercel.app',
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
