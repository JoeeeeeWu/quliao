const webpack = require("webpack");
const baseConfig = require("./webpack.base.config");
const path = require("path");

const config = Object.assign({}, baseConfig);

config.devtool = "cheap-module-eval-source-map";
config.entry = {
  bundle: "./app/index.js",
};
config.output.chunkFilename = "js/[id].chunk.js";
config.output.publicPath = "/";
config.plugins = config.plugins.concat([
  // new webpack.optimize.CommonsChunkPlugin("share.js"),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    "process.env.RUNTIME": "'web'",
    "process.env.NODE_ENV": "'development'",
  }),
]);

module.exports = config;
