const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const fs = require('fs');

const config = {
  target: 'web',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
  },
  entry: {},
  plugins: [],
  resolve: {
    modules: [
      path.resolve(__dirname, '../node_modules/'),
    ],
    extensions: ['.js', '.jsx', '.less'],
    alias: {
      'ywen-mobile-ui': path.resolve(__dirname, '..'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '../src/'),
          path.resolve(__dirname, '../examples/'),
        ],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};

module.exports = (target = 'examples') => new Promise((resolve, reject) => {
  config.module.rules.push({
    test: /\.less$/,
    include: path.resolve(__dirname, '../assets/styles/'),
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          minimize: true,
          module: false,
        },
      },
      {
        loader: 'postcss-loader',
      },
      {
        loader: 'less-loader',
        options: {
          strictMath: false,
          noIeCompat: true,
          // 因为我们的example中用了libflexible，所以不需要特别处理1px
          modifyVars: {
            'hairlines-support': target !== 'examples',
          },
        },
      },
    ],
  });
  if (target === 'examples') {
    fs.readdir(path.resolve(__dirname, '..', target), (err, files) => {
      if (err) {
        reject(new Error('read enties failed'));
      }
      files.forEach((file) => {
        console.log(`add entry in ${target}:`, file);
        const entry = file.split('.')[0];
        config.entry[entry] = path.resolve(__dirname, '..', target, file);
        config.plugins.push(new HtmlWebpackPlugin({
          title: `${entry} example`,
          filename: `${entry}.html`,
          chunks: ['vendor', entry],
          inject: 'body',
          template: path.resolve(__dirname, '../assets/html/tpl.html'),
        }));
      });
      resolve(config);
    });
  } else {
    config.entry.index = path.resolve(__dirname, '..', 'src', 'index.js');
    resolve(config);
  }
});
