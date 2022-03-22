const { container } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/index.ts",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
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
        "./Homepage": "./src/App",
      },
    }),
    new HtmlWebpackPlugin({
      title: "Hot Module Replacement",
      template: "public/index.html",
      // favicon: "./public/favicon.ico",
      // manifest: "./public/manifest.json",
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
