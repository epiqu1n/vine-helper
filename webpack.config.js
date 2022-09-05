/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

/** @type {import('webpack').RuleSetUseItem} */
const cssLoaderOpts = {
  loader: 'css-loader',
  options: {
    modules: {
      localIdentName: process.env.NODE_ENV === 'development' ? 'vh__[local]--[hash:base64:4]' : '[hash:base64:8]'
    },
  },
};

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: process.env.NODE_ENV,
  devtool: process.env.NODE_ENV === 'development' && 'inline-source-map',
  entry: {
    content: './src/content/content.tsx',
    background: './src/background/background.ts',
    popup: './src/popup/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', cssLoaderOpts, 'sass-loader'],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/popup/popup.html',
      filename: 'popup.html',
      chunks: ['popup']
    })
  ],
};