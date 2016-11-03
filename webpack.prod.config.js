const {join} = require('path');
const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const htmlConf = require('./html.conf');
const src = join(__dirname, 'src');
const dist = join(__dirname, 'dist');

module.exports = {
  entry: {
    app: [
      'tachyons-colors/src/tachyons-colors.css',
      './src/index',
    ],
    vendor: [
      'dexie',
      'history',
      'mobx',
      'mobx-react',
      'react',
      'react-router',
      'react-document-title',
    ],
  },
  output: {
    path: dist,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].chunk.js',
  },
  plugins: [
    new Clean(['dist'], {verbose: false}),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin(htmlConf),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      comments: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new OfflinePlugin({
      externals: ['https://fonts.google*'],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [src, 'node_modules'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: src,
        query: {
          plugins: ['lodash'],
          presets: ['es2015'],
        },
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: src,
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]', 'postcss'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file',
        include: src,
      },
    ],
  },
};
