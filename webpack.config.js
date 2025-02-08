const path = require('path');

module.exports = {
  entry: {
    main: './src/script.ts',
    admin: './src/admin/script.ts'
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    extensions: ['.ts']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  mode: 'production'
};
