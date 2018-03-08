const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const webpack = require('webpack');
const common = require('./webpack.common.js');

const dest = process.env.NODE_ENV === 'production' ? 'dist' : 'build';

const config = {
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', dest),
    libraryTarget: 'commonjs2',
    library: 'ywenMobileUI',
    publicPath: '/',
    auxiliaryComment: 'ywen mobile ui',
  },
  plugins: [
    new CleanWebpackPlugin([dest], {
      root: path.join(__dirname, '..'),
    }),
  ],
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'prop-types': 'prop-types',
  },
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new UglifyJSPlugin());
}

module.exports = () => new Promise((resolve, reject) => {
  const mergeConfig = {
    output: 'replace',
    plugins: 'replace',
  };
  common('src').then(commonConfig => resolve(merge.smartStrategy(mergeConfig)(commonConfig, config))).catch(e => reject(e));
});
