import { ProxyServer } from '@attachments/proxy';

const runProxy = async () => {
  const server = new ProxyServer();

  server.addRule(
    'react-demo-app-yzl.vercel.app',
    {
      location: '/',
      proxyPass: 'http://localhost:10000',
    }
  );
  server.addRule(
    'base-yzl.vercel.app',
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
