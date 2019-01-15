import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
  mode: 'development',

  entry: 'webpack-dev-server/client?http://localhost:3030',

  output: {
    path: path.join(__dirname, '/dist/'),
  },

  plugins: [
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
    port: 3030
  },
}
