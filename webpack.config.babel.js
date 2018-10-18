/**
 * https://github.com/gaearon/react-hot-boilerplate/blob/next/webpack.config.js
 * @type {file}
 */

import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  mode: 'development',

  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:3030',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './src/main.jsx',
    // the entry point of our app
  ],

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.js'
  },

  devtool: 'source-map',

  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.json'],
  },

  module: {
    rules: [
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(ttf|eot|svg|png|jpg|yml)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors

    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new HtmlWebpackPlugin({ filename: '404.html', template: './src/404.html' })
  ],

  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    compress: true,
    host: 'localhost',
    port: 3030,

    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true,
    // enable HMR on the server
  },
}
