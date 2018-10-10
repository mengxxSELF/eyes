const path = require('path')
const commonPlugin = require('./webpack.common.js')

module.exports = Object.assign({}, commonPlugin , {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: 'localhost',
    inline: true,
    port: 7777,
    before: function (app) {
      console.log('devserver')
    }
  },
})
