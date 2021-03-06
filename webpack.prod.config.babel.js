import {join} from 'path';
import webpack from 'webpack';
import Clean from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import htmlConf from './html.conf';

const src = join(__dirname, 'src');
const dist = join(__dirname, 'dist');

export default {
  entry: {
    app: [
      './src/index',
    ],
    vendor: Object.keys(require('./package.json').dependencies),
  },
  output: {
    path: dist,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].chunk.js',
  },
  plugins: [
    new Clean(['dist'], {verbose: false}),
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
    new ExtractTextPlugin({
      filename: '[name].[contentHash].css',
      allChunks: true,
    }),
    new OfflinePlugin({
      externals: ['https://fonts.google*'],
    }),
    new CopyWebpackPlugin([
      {from: join(src, 'assets'), to: join(__dirname, 'dist')},
    ]),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [src, 'node_modules'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: src,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader?modules&importLoaders=1&localIdentName=[hash:base64:5]', 'postcss-loader'],
        }),
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        loader: 'file-loader',
        include: src,
      },
    ],
  },
};
