const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    content: './content.js',
    background: './background.js',
    popup: './popup.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fallback: {
      'fs': require.resolve("graceful-fs"),
      'http': require.resolve("stream-http"),
      'https': require.resolve("https-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      'child_process': false
    },
  },
  plugins:[
    new CopyPlugin({
      patterns:[
        {from: "public"}
      ]
    })
  ],
}
