const path = require('path'),
      webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    bundle: './js/index.js',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
