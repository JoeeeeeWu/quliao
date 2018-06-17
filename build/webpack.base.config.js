const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HTMLPlugin = require('html-webpack-plugin');

const extractLib = new ExtractTextPlugin({
  filename: "css/lib.css",
});
const extractStyle = new ExtractTextPlugin({
  filename: "css/style.css",
  // allChunks: true,
});

module.exports = {
  entry: {
    bundle: [
      path.join(__dirname, '../app/index.js'),
    ],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/',
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: path.resolve(__dirname, '../node_modules'),
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, '../node_modules'),
        use: extractLib.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
            },
          ],
        }),
      },
      {
        test: /\.less$/,
        exclude: path.resolve(__dirname, '../node_modules'),
        use: extractStyle.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
            },
            {
              loader: "postcss-loader",
            },
            {
              loader: "less-loader",
            },
          ],
        }),
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 819200000,
              name: "images/[name].[hash:5].[ext]",
            },
          },
        ],
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              name: "fonts/[name].[hash:5].[ext]",
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "image/svg+xml",
              name: "fonts/[name].[hash:5].[ext]",
            },
          },
        ],
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/font-woff2",
              name: "fonts/[name].[hash:5].[ext]",
            },
          },
        ],
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/octet-stream",
              name: "fonts/[name].[hash:5].[ext]",
            },
          },
        ],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 10000,
              name: "fonts/[name].[hash:5].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    extractLib,
    extractStyle,
    new HTMLPlugin({
      template: path.join(__dirname, '../app/index.html'),
    }),
  ],
};
