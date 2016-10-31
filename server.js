const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev.config');

new WebpackDevServer(webpack(config), {
  contentBase: 'src',
  hot: true,
  quiet: true,
  clientLogLevel: 'error',
  historyApiFallback: true,
}).listen(3000, 'localhost', (err, result) => {
  if (err) {
    console.log(err);
  }
});
