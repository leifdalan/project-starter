const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './src/main.js',
  ],
  output: {
    filename: 'main.js',
    path: path.resolve('./dist'),
    publicPath: '/static',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
    }),
  ],
  module: {
    noParse: /\.min\.js/,
    rules: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.resolve('./src'),
      },
    ],
  },
};
