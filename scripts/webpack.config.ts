import * as webpack from "webpack";
import HtmlWebpackPlugin = require("html-webpack-plugin");
import * as path from "path";

const config: webpack.Configuration = {
  mode: 'development',
  entry: "./src/index.ts",
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.ProvidePlugin({
      'intl': [
        path.resolve(
          process.cwd(),
          './src/packages/intl/create-intl.ts'
        ),
        'default'
      ]
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
}

export default config;
