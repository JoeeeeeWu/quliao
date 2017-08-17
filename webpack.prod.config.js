const webpack = require("webpack");
const baseConfig = require("./webpack.base.config");

const config = Object.assign({}, baseConfig);
config.entry = {
  bundle: "./app/index.js",
};
config.output.publicPath = "/";
config.output.chunkFilename = "js/[name].[chunkhash:5].chunk.js";
config.plugins = config.plugins.concat([
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_debugger: true,
      drop_console: true,
    },
  }),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production"),
    },
  }),
]);

module.exports = config;
