import path from 'path'
import { Configuration } from 'webpack'
import { modules, plugins, resolves } from './webpack'

console.log('I am common.ts', path.resolve(__dirname, '../dist'))

const config: Configuration = {
  entry: {
    vendor: ['react', 'react-dom'],
    index: './index.tsx'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:6].js'
  },
  module: modules,
  plugins,
  resolve: resolves
}

export default config

