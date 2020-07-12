const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
//const ZopfliPlugin = require('zopfli-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contentHash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
 /*    sourceMapFilename: '[name].[contentHash].bundle.js.map' */
  },
  optimization: {
    noEmitOnErrors: true,
    splitChunks: {
      chunks: 'all',
      minSize: 0
    },
    minimizer: [
      new OptimizeCssAssetsPlugin({ cssProcessorOptions: {
        map: {
          inline: false,
          annotation: true,
        }
      }
    }) ,
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
    //new BundleAnalyzerPlugin()
  ]
});