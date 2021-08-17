const packageName = require('../package.json').name;

module.exports = {
  devServer: {
    // 监听端口
    port: 10000,
    // 关闭主机检查，使微应用可以被 fetch
    disableHostCheck: true,
    // 配置跨域请求头，解决开发环境的跨域问题
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    public: '0.0.0.0',
    sockPath: '/vue-micro-app/sockjs-node'
  },
  publicPath: '/vue-micro-app',
  configureWebpack: {
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`,
    }
  },
};
