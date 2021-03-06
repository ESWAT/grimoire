import {join} from 'path';
import webpack from 'webpack';
import WebpackNotifierPlugin from 'webpack-notifier';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HappyPack from 'happypack';
import DashboardPlugin from 'webpack-dashboard/plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import htmlConf from './html.conf';

const src = join(__dirname, 'src');
// eslint-disable-next-line new-cap
const happyThreadPool = HappyPack.ThreadPool({size: 6});

export default {
  devtool: 'source-map',
  performance: {
    hints: false,
  },
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/index',
    ],
    vendor: Object.keys(require('./package.json').dependencies),
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
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool,
    }),
    new HappyPack({
      id: 'css',
      loaders: ['style-loader?sourceMap', 'css-loader?modules&importLoaders=1&localIdentName=[path][name]-[local]-[hash:base64:5]', 'postcss-loader'],
      threadPool: happyThreadPool,
    }),
    new HtmlWebpackPlugin(htmlConf),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CopyWebpackPlugin([
      {from: join(src, 'assets'), to: join(__dirname, 'dist')},
    ]),
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
        test: /\.(js|jsx)$/,
        loader: 'happypack/loader?id=jsx',
        include: src,
      },
      {
        test: /\.css$/,
        loader: 'happypack/loader?id=css',
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        loader: 'file-loader',
        include: src,
      },
    ],
  },
};
