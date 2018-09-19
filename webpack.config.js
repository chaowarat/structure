const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});


module.exports = {
  mode: 'development',
  entry: [
     'webpack-hot-middleware/client?reload=true',
     path.resolve(__dirname) + '/src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname,'src'),
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['react']
          }
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.ttf$/,
        use: [
          {
            loader: 'ttf-loader',
            options: {
              name: './font/[hash].[ext]',
            },
          },
        ]
      },
      {
        loader: 'file-loader',
        test: /\.(png)?$/
      },
      {
        loader: 'url-loader',
        test: /\.(svg|eot|woff|woff2)?$/
      },
    ]
  },
  plugins: [
    htmlPlugin,
    // OccurenceOrderPlugin is needed for webpack 1.x only
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  optimization: {
     splitChunks: {
       chunks: 'all'
     }
  }
};
