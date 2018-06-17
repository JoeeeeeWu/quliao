const webpack = require("webpack");
const baseConfig = require("./webpack.base.config");
const merge = require('webpack-merge');

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    chunkFilename: "js/[name].[chunkhash:5].chunk.js",
  },
});
