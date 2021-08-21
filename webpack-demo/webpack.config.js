const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;


module.exports = {
  mode: 'development',
  entry: './index.js',
  plugins: [
    new ModuleFederationPlugin({
      name: 'base-app',
      filename: 'base-entry.js',
      exposes: {
        'lodash': 'lodash',
      },
      shared: {
        lodash: {
          singleton: true
        },
      },
    }),
    new HtmlWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
};

