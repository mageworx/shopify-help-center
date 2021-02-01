const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const PostCSSPresetEnv = require('postcss-preset-env');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDev ? 'development' : 'production',
  stats: {
    colors: true,
    preset: 'minimal',
  },
  performance: { hints: isDev ? false : 'warning' },
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  entry: [
    path.resolve(__dirname, 'src/assets/scripts/index.js'),
    path.resolve(__dirname, 'src/assets/styles/main.scss'),
  ],
  output: {
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build/assets'),
    publicPath: '/assets/',
  },
  plugins: [
    new WebpackManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash].css',
    }),
  ],
  ...(!isDev && {
    optimization: {
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
  }),
  module: {
    rules: [
      {
        test: /\.s?css/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { postcssOptions: { plugins: [PostCSSPresetEnv] } },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        generator: {
          filename: `images/${isDev ? '[name][ext]' : '[contenthash][ext]'}`,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: `fonts/${isDev ? '[name][ext]' : '[contenthash][ext]'}`,
        },
      },
    ],
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
    },
  },
};
