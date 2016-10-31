const {join} = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: 6});
const DashboardPlugin = require('webpack-dashboard/plugin');
const src = join(__dirname, 'src');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
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
    path: join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new HappyPack({
      id: 'jsx',
      loaders: ['babel?cacheDirectory'],
      threadPool: happyThreadPool,
    }),
    new HappyPack({
      id: 'css',
      loaders: ['style?sourceMap', 'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]', 'postcss'],
      threadPool: happyThreadPool,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      title: 'Grimoire',
      appMountId: 'root',
      mobile: true,
      meta: {
        'apple-mobile-web-app-capable': 'yes',
      },
      links: [
        'https://fonts.googleapis.com/css?family=Asul:400',
      ],
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new DashboardPlugin(),
    new WebpackNotifierPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [src, 'node_modules'],
    unsafeCache: true,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=jsx',
        include: src,
      },
      {
        test: /\.jsx$/,
        loader: 'happypack/loader?id=jsx',
        include: src,
      },
      {
        test: /\.css$/,
        loader: 'happypack/loader?id=css',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file',
        include: src,
      },
    ],
  },
};
