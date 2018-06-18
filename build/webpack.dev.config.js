const webpack = require("webpack");
const baseConfig = require("./webpack.base.config");
const path = require("path");
const merge = require('webpack-merge');

module.exports = merge(baseConfig, {
  mode: 'development',
  // devtool: '#cheap-module-eval-source-map',
  output: {
    chunkFilename: "js/[id].chunk.js",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    host: '0.0.0.0', // 我们可以允许我们用任意方式进行访问（127.0.0.1，localhost, 本机ip）
    port: '4001',
    contentBase: path.join(__dirname, '../dist'),
    hot: true, // 启动热加载
    overlay: { // 错误提醒弹窗小遮层
      errors: true // 只显示error
    },
    publicPath: '/',  // 访问所有静态路径都要前面加/才能访问生成的静态文件
    historyApiFallback: {
      index: '/index.html', // 所有404的请求全部访问该配置下的url
    },
  },
});
