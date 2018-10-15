/* eslint-disable import/default */
/* eslint-disable no-console */
import open from 'open';
import webpack from 'webpack';
import config  from '../webpack.config.dev.js';
import WebpackDevServer from 'webpack-dev-server';
import progress from './progress';
import {DEV_PORT, LOCALHOST_PATH, DEV_APP_ENTRY_POINT} from './constants';

const compiler = webpack(config);

progress(compiler);

const server = new WebpackDevServer(compiler, {
  hot: true,
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  },
  watchOptions: {aggregateTimeout: 300, poll: 1000}
});
server.listen(DEV_PORT, LOCALHOST_PATH, function (err) {
  if (err) {
    console.log(err);
  } else {
    open(DEV_APP_ENTRY_POINT);
  }
});

