const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    navigation: './utilities/navigation.js',
    images: './utilities/images.js',
    theme: './utilities/theme.js'
  },
  output: {
    filename: '[name].min.js', // This will create navigation.min.js, images.min.js, and theme.min.js
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};