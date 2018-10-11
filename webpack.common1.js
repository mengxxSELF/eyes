const path = require('path')
const webpack = require('webpack')
const modules = require('./webpack/Modules')
const resolves = require('./webpack/Resolve')
const plugins = require('./webpack/Plugin')

console.log('I am common.js')

const webpackOptions = {
  entry: {
    vendor: ['react', 'react-dom'],
    index: './src/index.tsx'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash:6].js'
  },
  module: modules,
  plugins,
  resolve: resolves
}

module.exports = webpackOptions
