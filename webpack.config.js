const HtmlWebPackPlugin = require("html-webpack-plugin");
require('@babel/polyfill');

module.exports = {
  entry: [
    '@babel/polyfill',
    './src/web/index'
  ],
  target: 'web',
  output: {
    path: __dirname + '/src/web/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/web/index.html",
      filename: "./index.html"
    })
  ]
};
