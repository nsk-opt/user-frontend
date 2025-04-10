const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    login: './src/pages/auth/Login.ts',
    register: './src/pages/auth/Register.ts',
    categories: './src/pages/Categories.ts',
    adminCategories: './src/pages/admin/categories/AdminCategories.ts',
    adminCategoriesNew: './src/pages/admin/categories/AdminCategoriesNew.ts',


    products: './src/pages/Products.ts',
    admin: './src/pages/admin/Admin.ts',
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