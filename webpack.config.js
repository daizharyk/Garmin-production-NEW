const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  mode: "development", // Измените на 'production' для финальной сборки
  entry: {
    main: path.resolve(__dirname, "src/js/index.js"),
    animation: path.resolve(__dirname, "src/js/animation.js"),
    html: path.resolve(__dirname, "src/js/htmlBuilder.js"),
    itempage: path.resolve(__dirname, "src/js/itempage.js"),
    itemService: path.resolve(__dirname, "src/js/itemService.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
    assetModuleFilename: "img/[name][ext]",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3001,
    open: true,
    hot: false,
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name][ext]", // Обновлено для правильного расположения изображений
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader" ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      title: "Garmin",
      filename: "index.html",
      template: "src/index.html",
      chunks: ["animation", "main"],
    }),
    new HtmlWebpackPlugin({
      title: "Product Page",
      filename: "pages/itempage.html",
      template: "src/pages/itempage.html",
      chunks: ["itempage", "animation"],
    }),
    new HtmlWebpackPlugin({
      title: "Shipping",
      filename: "pages/shipping.html",
      template: "src/pages/shipping.html",
      chunks: ["animation"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/img", to: "img" },
        { from: "src/data/item.json", to: "data/item.json" },
      ],
    }),
  ],
};
