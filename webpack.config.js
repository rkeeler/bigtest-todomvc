const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const environment = process.env.NODE_ENV || "development";
console.log("environment = ", environment);
const isDev = environment === "development";
const isProd = environment === "production";
const isTest = environment === "testing";
const appEntry = isTest ? "./bigtest/index.js" : "./src/index.js";

module.exports = {
  mode: isTest ? "development" : environment,

  entry: appEntry,

  output: {
    filename: "bundle.js",
    path: path.resolve("./dist")
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development"
    }),
    isProd &&
      new MiniCssExtractPlugin({
        filename: "styles.css"
      }),
    new HTMLWebpackPlugin({
      template: "./src/index.html",
      inject: "body"
    })
  ].filter(Boolean),

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 2,
              localIdentName: "[name]__[local]--[hash:base64:5]"
            }
          }
        ]
      }
    ]
  }
};
