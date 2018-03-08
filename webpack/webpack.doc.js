const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
// const webpack = require('webpack');
const common = require('./webpack.common.js');

const config = {
  entry: {
    vendor: ['react', 'react-dom', 'fastclick'],
  },
  plugins: [
    new CleanWebpackPlugin(['doc'], {
      root: path.resolve(__dirname, '..'),
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new UglifyJSPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, '..', 'doc'),
  },
};

module.exports = () => new Promise((resolve, reject) => {
  common().then(commonConfig => resolve(merge(commonConfig, config))).catch(e => reject(e));
});
