const webpack = require("webpack");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("./webpack.dev.config");
const path = require("path");
const express = require("express");

const app = new express();
const port = 4001;

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname, "/")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "app", "index.html"));
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info("Listening on " + port + ". Open up http://localhost:" + port + " in your browser.");
  }
});
