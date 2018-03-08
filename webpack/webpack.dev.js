const path = require('path');
const merge = require('webpack-merge');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const webpack = require('webpack');
const common = require('./webpack.common.js');

const config = {
  devtool: 'inline-source-map',
  entry: {
    vendor: ['react', 'react-dom', 'fastclick'],
  },
  devServer: {
    contentBase: path.join(__dirname, '../doc'),
    port: 9000,
    index: 'index.html',
    open: true,
    openPage: 'index.html',
    hot: true,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
  ],
  output: {
    path: path.resolve(__dirname, '..', 'doc'),
  },
};

module.exports = () => new Promise((resolve, reject) => {
  common().then(commonConfig => resolve(merge(commonConfig, config))).catch(e => reject(e));
});
