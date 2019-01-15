/**
 * https://github.com/gaearon/react-hot-boilerplate/blob/next/webpack.config.js
 * @type {file}
 */

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
  mode: 'development',

  entry: [
    'react-hot-loader/patch', // Enable HMR for React
    'webpack-dev-server/client?http://localhost:3030', // Bundle the client for webpack-dev-server
    'webpack/hot/only-dev-server', // Enable hot reloading only on successful updates
    './src/main.jsx', // Entry point
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
    new webpack.HotModuleReplacementPlugin(), // Enable HMR globally
    new webpack.NamedModulesPlugin(), // Show readable module names in the browser console on HMR updates
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin(
      [
        {
          from: '',
          to: '',
        },
      ],
      { context: 'src' }
    ),
  ],

  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    compress: true,
    host: 'localhost',
    port: 3030,
    historyApiFallback: true, // Serve index.html in place of 404 response
    hot: true, // Enable HMR
  },
}
