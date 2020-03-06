const CopyFiles = require('copy-webpack-plugin')
const distPath = 'lib'
const path = require('path')

module.exports = {
  entry: './src/index.js', // main file to generates the bundle
  output: {
    path: path.resolve(__dirname, `${distPath}`), // it defines its output folder
    filename: 'index.js', // bundle name
    publicPath: '/',
  },
  target: 'node',
  plugins: [
    new CopyFiles([
      {
        from: path.resolve(__dirname, 'src/files'),
        to: path.resolve(__dirname, `${distPath}/files`),
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // regex to find files that webpack applies
        resolve: {
          extensions: ['.js'], // resolves files extensiosn
        },
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // using babel loader for transpiling es6 to es5
          options: {
            cacheDirectory: true, // option to transpile only modfied files
          },
        },
      },
    ],
  },
}
