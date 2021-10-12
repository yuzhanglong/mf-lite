import { ProxyServer } from '@attachments/proxy';

const runProxy = async () => {
  const server = new ProxyServer();

  // 基座代理，将 base-app.vercel.app 的所有请求代理到 http://localhost:8080
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
