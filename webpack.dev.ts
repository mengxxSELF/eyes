// const path = require('path')
// const commonPlugin = require('./webpack.common.js')
import path from 'path'
import { Configuration } from 'webpack'
import commonPlugin from './webpack.common'
import merge from 'webpack-merge'

const config: Configuration = merge(commonPlugin, {
// const config: Configuration = Object.assign({}, commonPlugin, {
  mode: 'development',
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

export default config
