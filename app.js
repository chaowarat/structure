const express = require('express')
const app = express()

const port = process.env.PORT

const bodyParser = require('body-parser');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

var argv = require('minimist')(process.argv.slice(2));

const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler,{
  path: '/__webpack_hmr'
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '50mb' }));

app.listen(port, () => { 
  console.log('Server listening on port %d', this.address().port);
});


