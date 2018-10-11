// const path = require('path')
// const webpack = require('webpack')
// const modules = require('./webpack/Modules')
// const resolves = require('./webpack/Resolve')
// const plugins = require('./webpack/Plugin')

import path from 'path'
// import webpack from 'webpack'
import { Configuration } from 'webpack'
import { modules, plugins, resolves } from './webpack'

console.log('I am common.ts')

const config: Configuration = {
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

export default config

