import path from 'path'
import { Configuration } from 'webpack'
import commonPlugin from './webpack.common'
import merge from 'webpack-merge'

console.log('i am dev webpack')

const config: Configuration = merge(commonPlugin, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: '../dist',
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
