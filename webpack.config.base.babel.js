/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import { dependencies as externals } from './app/package.json';

export default {
  externals: Object.keys(externals || {}),

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /node_modules[\/\\](iconv-lite)[\/\\].+/, // eslint-disable-line
        resolve: {
          aliasFields: ['main'],
        },
      },
    ],
  },

  output: {
    path: path.join(__dirname, 'app'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2',
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.json'],
    modules: [
      path.join(__dirname, 'app'),
      'node_modules',
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),

    new webpack.NamedModulesPlugin(),

    new webpack.IgnorePlugin(/utf-8-validate|bufferutil/), // Required due to ws import issues
  ],
};