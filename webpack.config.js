const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
      },
      {
        test: /\.s(a|c)ss$/,
        loader: 'css-loader',
      },
      {
        test: /\.s(a|c)ss$/,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                'autoprefixer',
              ],
            ],
          },
        },
      },
      {
        test: /\.s(a|c)ss$/,
        loader: 'sass-loader',
        options: {
          sourceMap: isDevelopment,
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: (file) => {
            const imagesPath = file.split('src/')[1];
            return imagesPath;
          },
        },
      },
      {
        test: /\.(mp3|wav)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: (file) => {
            const audioPath = file.split('src/')[1];
            return audioPath;
          },
        },
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.scss', '.mp3'],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: 'src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
  output: {
    publicPath: './',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
