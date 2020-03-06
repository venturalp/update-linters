const CopyFiles = require('copy-webpack-plugin')
const distPath = 'lib'
const path = require('path')

module.exports = {
  entry: './src/index.js', // main file to generates the bundle
  output: {
    path: path.resolve(__dirname, `${distPath}`), // it defines its output folder
    filename: 'index.js', // bundle name
    publicPath: '/',
    library: '@venturalp/update-linters',
    libraryTarget: 'umd',
    publicPath: '/lib/',
    umdNamedDefine: true,
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
}
