const { Configuration, container } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  // entry: path.resolve(__dirname, "./src/index.tsx"),
  // output: {
  //   path: path.resolve(__dirname, "./dist"),
  //   filename: "index_bundle.js",
  // },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: "MFE1",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./modules/Main/Button",
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      favicon: "./public/favicon.ico",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
