const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/script.ts',
    admin: './src/admin/script.ts',
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
  ],

  mode: 'production',
};